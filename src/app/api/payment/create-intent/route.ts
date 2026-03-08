import { NextRequest, NextResponse } from 'next/server';

// ZapSplit platform fee (50 cents per transaction)
const PLATFORM_FEE = 50; // in cents

export async function POST(request: NextRequest) {
  try {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
      return NextResponse.json(
        { error: 'STRIPE_SECRET_KEY is not configured' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const {
      amount, // Amount in dollars
      creatorStripeAccountId, // The bill creator's connected Stripe account
      splitId,
      payerEmail,
      payerName,
    } = body;

    // Validate required fields
    if (!amount || !creatorStripeAccountId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Convert to cents (amount already includes platform fee from frontend)
    const amountInCents = Math.round(amount * 100);
    const totalCents = amountInCents;

    // Create payment intent via Stripe REST API
    const params = new URLSearchParams();
    params.append('amount', totalCents.toString());
    params.append('currency', 'aud');
    params.append('payment_method_types[]', 'card');
    params.append('application_fee_amount', PLATFORM_FEE.toString());
    params.append('transfer_data[destination]', creatorStripeAccountId);
    params.append('metadata[split_id]', splitId || '');
    params.append('metadata[splitId]', splitId || '');
    params.append('metadata[payer_email]', payerEmail || '');
    params.append('metadata[payer_name]', payerName || '');
    // For instant payouts via webhook
    params.append('metadata[connectedAccountId]', creatorStripeAccountId);
    params.append('metadata[instantPayoutAmount]', (totalCents - PLATFORM_FEE).toString());

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
      amount: amountInCents,
      platformFee: PLATFORM_FEE,
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
