import { NextRequest, NextResponse } from 'next/server';

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
      amount, // Total amount in dollars (items + fee)
      fee, // Service fee in dollars (calculated by frontend)
      creatorStripeAccountId, // The bill creator's connected Stripe account
      splitId,
      payerEmail,
      payerName,
    } = body;

    // Validate required fields
    if (!amount || !creatorStripeAccountId || !fee) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Convert to cents (amount already includes fee from frontend)
    const totalCents = Math.round(amount * 100);
    const feeCents = Math.round(fee * 100);

    // Create payment intent via Stripe REST API
    const params = new URLSearchParams();
    params.append('amount', totalCents.toString());
    params.append('currency', 'aud');
    params.append('payment_method_types[]', 'card');
    params.append('application_fee_amount', feeCents.toString());
    params.append('transfer_data[destination]', creatorStripeAccountId);
    params.append('metadata[split_id]', splitId || '');
    params.append('metadata[splitId]', splitId || '');
    params.append('metadata[payer_email]', payerEmail || '');
    params.append('metadata[payer_name]', payerName || '');
    // For instant payouts via webhook
    params.append('metadata[connectedAccountId]', creatorStripeAccountId);
    params.append('metadata[instantPayoutAmount]', (totalCents - feeCents).toString());

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
