import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// ─────────────────────────────────────────────────────────────────────────
// SECURITY MODEL (read before editing):
// This route NEVER trusts money values or the destination account from the
// browser. A previous version took `amount`, `fee`, and `creatorStripeAccountId`
// straight from the request body — which let card-testing/cash-out bots send
// `amount: 3994` and even redirect funds to an account they control.
//
// Now the browser sends only the split `code` + which items it selected. The
// server looks up the real item prices and the real recipient's connected
// account from the database, recomputes the amount + fee itself, and charges
// that. The browser literally cannot influence the dollar figure or where the
// money goes. The $500 cap is a backstop, not the primary defense.
// ─────────────────────────────────────────────────────────────────────────

const MAX_PAYMENT_AUD = 500;

// Service fee — MUST stay in sync with the client (pay page calculateFee) and
// the mobile create-payment-intent edge function. $1.05 fixed + 1.75% grossed
// up by /0.9825; nets ~$0.75/txn after Stripe's cut.
function calculateFee(amount: number): number {
  if (amount <= 0) return 0;
  return Math.round(((1.05 + 0.0175 * amount) / 0.9825) * 100) / 100;
}

interface SelectionEntry {
  itemIndex: number;
  quantity: number;
  shareCount: number;
}

export async function POST(request: NextRequest) {
  try {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
      return NextResponse.json(
        { error: 'STRIPE_SECRET_KEY is not configured' },
        { status: 500 }
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json(
        { error: 'Supabase is not configured' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { code, selection, payerEmail, payerName } = body as {
      code?: string;
      selection?: SelectionEntry[];
      payerEmail?: string;
      payerName?: string;
    };

    // Basic input validation
    if (!code || typeof code !== 'string') {
      return NextResponse.json({ error: 'Missing payment code' }, { status: 400 });
    }
    if (!Array.isArray(selection) || selection.length === 0) {
      return NextResponse.json({ error: 'No items selected' }, { status: 400 });
    }
    if (!payerEmail || typeof payerEmail !== 'string' || !payerEmail.includes('@')) {
      return NextResponse.json({ error: 'A valid email is required' }, { status: 400 });
    }
    if (!payerName || typeof payerName !== 'string' || !payerName.trim()) {
      return NextResponse.json({ error: 'Your name is required' }, { status: 400 });
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // 1. Resolve the payment link from the code (must be active + unexpired).
    const { data: paymentLink, error: linkError } = await supabase
      .from('payment_links')
      .select('id, split_id, is_active, expires_at')
      .eq('short_code', code)
      .eq('is_active', true)
      .single();

    if (linkError || !paymentLink) {
      return NextResponse.json({ error: 'This payment link is invalid or no longer active.' }, { status: 400 });
    }
    if (paymentLink.expires_at && new Date(paymentLink.expires_at) < new Date()) {
      return NextResponse.json({ error: 'This payment link has expired.' }, { status: 400 });
    }

    // 2. Load the split.
    const { data: split, error: splitError } = await supabase
      .from('splits')
      .select('id, creator_id, status')
      .eq('id', paymentLink.split_id)
      .single();

    if (splitError || !split) {
      return NextResponse.json({ error: 'Split not found.' }, { status: 404 });
    }

    // 3. The destination is ALWAYS the split creator's connected account from
    //    the DB — never a value supplied by the caller.
    const { data: creator, error: creatorError } = await supabase
      .from('profiles')
      .select('stripe_connect_account_id, full_name')
      .eq('id', split.creator_id)
      .single();

    if (creatorError || !creator?.stripe_connect_account_id) {
      return NextResponse.json(
        { error: `${creator?.full_name || 'The recipient'} hasn't set up their payment account yet.` },
        { status: 400 }
      );
    }
    const destination = creator.stripe_connect_account_id;

    // 4. Load the real item prices, ordered by position so array index lines up
    //    with the item_index the client selects against.
    const { data: itemsData, error: itemsError } = await supabase
      .from('split_items')
      .select('name, quantity, unit_price, total_price, position')
      .eq('split_id', split.id)
      .order('position', { ascending: true });

    if (itemsError || !itemsData || itemsData.length === 0) {
      return NextResponse.json({ error: 'This split has no items to pay for.' }, { status: 400 });
    }

    // 5. Recompute the amount server-side from trusted prices. Mirrors the
    //    client formula in pay/[code]/page.tsx exactly.
    let itemsTotal = 0;
    for (const sel of selection) {
      const idx = Number(sel?.itemIndex);
      if (!Number.isInteger(idx) || idx < 0 || idx >= itemsData.length) {
        return NextResponse.json({ error: 'Invalid item selection.' }, { status: 400 });
      }
      const item = itemsData[idx];
      const itemQty = Number(item.quantity) || 1;
      const unitPrice = Number(item.unit_price) || (Number(item.total_price) / itemQty) || 0;

      // Sanitize quantity (1..itemQty) and shareCount (>=1). quantity multiplies
      // the charge so it's clamped to what actually exists; shareCount only ever
      // divides so it can't inflate.
      let qty = Number(sel?.quantity) || 1;
      if (!Number.isFinite(qty) || qty < 1) qty = 1;
      if (qty > itemQty) qty = itemQty;

      let shareCount = Number(sel?.shareCount) || 1;
      if (!Number.isFinite(shareCount) || shareCount < 1) shareCount = 1;

      itemsTotal += (unitPrice * qty) / shareCount;
    }

    itemsTotal = Math.round(itemsTotal * 100) / 100;

    if (itemsTotal <= 0) {
      return NextResponse.json({ error: 'Nothing to pay.' }, { status: 400 });
    }
    if (itemsTotal > MAX_PAYMENT_AUD) {
      console.warn('Rejected over-limit web payment:', JSON.stringify({ itemsTotal, code, splitId: split.id }));
      return NextResponse.json(
        { error: `For security, payments are capped at $${MAX_PAYMENT_AUD}.` },
        { status: 400 }
      );
    }

    const fee = calculateFee(itemsTotal);
    const itemsCents = Math.round(itemsTotal * 100);
    const feeCents = Math.round(fee * 100);
    const totalCents = itemsCents + feeCents;

    // 6. Create the PaymentIntent with server-computed values only.
    const params = new URLSearchParams();
    params.append('amount', totalCents.toString());
    params.append('currency', 'aud');
    params.append('payment_method_types[]', 'card');
    params.append('application_fee_amount', feeCents.toString());
    params.append('transfer_data[destination]', destination);
    params.append('metadata[split_id]', split.id);
    params.append('metadata[splitId]', split.id);
    params.append('metadata[payer_email]', payerEmail);
    params.append('metadata[payer_name]', payerName);
    // For instant payouts via webhook
    params.append('metadata[connectedAccountId]', destination);
    params.append('metadata[instantPayoutAmount]', itemsCents.toString());

    const response = await fetch('https://api.stripe.com/v1/payment_intents', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${secretKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    const paymentIntent = await response.json();

    if (!response.ok) {
      console.error('Stripe error:', paymentIntent.error?.message);
      return NextResponse.json(
        { error: paymentIntent.error?.message || 'Failed to create payment' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      amount: itemsCents,
      platformFee: feeCents,
      total: totalCents,
    });
  } catch (error: any) {
    console.error('Error creating payment intent:', error.message);
    return NextResponse.json(
      { error: error.message || 'Failed to create payment' },
      { status: 500 }
    );
  }
}
