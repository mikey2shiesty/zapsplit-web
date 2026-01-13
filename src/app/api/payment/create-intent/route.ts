import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// ZapSplit platform fee (50 cents per transaction)
const PLATFORM_FEE = 50; // in cents

// Lazy initialization of Stripe client
let stripe: Stripe | null = null;

function getStripe(): Stripe {
  if (!stripe) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('STRIPE_SECRET_KEY is not configured');
    }
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-12-15.clover',
    });
  }
  return stripe;
}

export async function POST(request: NextRequest) {
  try {
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

    // Convert to cents
    const amountInCents = Math.round(amount * 100);

    // Create payment intent with Stripe Connect
    const paymentIntent = await getStripe().paymentIntents.create({
      amount: amountInCents + PLATFORM_FEE, // Total charged includes platform fee
      currency: 'aud',
      automatic_payment_methods: {
        enabled: true,
      },
      application_fee_amount: PLATFORM_FEE,
      transfer_data: {
        destination: creatorStripeAccountId,
      },
      metadata: {
        split_id: splitId || '',
        payer_email: payerEmail || '',
        payer_name: payerName || '',
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      amount: amountInCents,
      platformFee: PLATFORM_FEE,
      total: amountInCents + PLATFORM_FEE,
    });
  } catch (error: any) {
    console.error('Error creating payment intent:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create payment' },
      { status: 500 }
    );
  }
}
