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
        amount: 1000, // Default amount, will be updated
        currency: 'aud',
        appearance: {
          theme: 'night',
          variables: {
            colorPrimary: '#3B82F6',
            colorBackground: '#1C1C1E',
            colorText: '#FFFFFF',
            colorDanger: '#EF4444',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            borderRadius: '12px',
          },
        },
      }}
    >
      {children}
    </Elements>
  );
}
