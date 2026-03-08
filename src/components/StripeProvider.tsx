'use client';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { ReactNode } from 'react';

// Load Stripe outside of component to avoid recreating on every render
let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  }
  return stripePromise;
};

interface StripeProviderProps {
  children: ReactNode;
  clientSecret: string;
}

export default function StripeProvider({ children, clientSecret }: StripeProviderProps) {
  return (
    <Elements
      stripe={getStripe()}
      options={{
        clientSecret,
        appearance: {
          theme: 'night',
          variables: {
            colorPrimary: '#3B82F6',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            borderRadius: '8px',
          },
        },
      }}
    >
      {children}
    </Elements>
  );
}
