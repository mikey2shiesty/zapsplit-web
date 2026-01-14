'use client';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { ReactNode, useEffect, useState } from 'react';

// Load Stripe outside of component to avoid recreating on every render
let stripePromise: Promise<Stripe | null>;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  }
  return stripePromise;
};

interface StripeProviderProps {
  children: ReactNode;
}

export default function StripeProvider({ children }: StripeProviderProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Elements
      stripe={getStripe()}
      options={{
        mode: 'payment',
        amount: 1000,
        currency: 'aud',
        appearance: {
          theme: 'stripe',
          variables: {
            colorPrimary: '#3B82F6',
            colorBackground: '#FFFFFF',
            colorText: '#0F172A',
            colorDanger: '#EF4444',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            borderRadius: '12px',
            spacingUnit: '4px',
          },
          rules: {
            '.Input': {
              backgroundColor: '#F8FAFC',
              border: '2px solid #E2E8F0',
              boxShadow: 'none',
            },
            '.Input:focus': {
              border: '2px solid #3B82F6',
              boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
            },
            '.Tab': {
              backgroundColor: '#F1F5F9',
              border: '2px solid transparent',
            },
            '.Tab--selected': {
              backgroundColor: '#3B82F6',
              color: '#FFFFFF',
              border: '2px solid #3B82F6',
            },
            '.Label': {
              color: '#475569',
              fontWeight: '600',
              fontSize: '13px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            },
          },
        },
      }}
    >
      {children}
    </Elements>
  );
}
