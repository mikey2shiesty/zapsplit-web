'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Shield, Smartphone } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import {
  useStripe,
  PaymentRequestButtonElement,
} from '@stripe/react-stripe-js';
import { PaymentRequest } from '@stripe/stripe-js';

interface PayButtonProps {
  amount: number;
  recipientName: string;
  creatorStripeAccountId?: string;
  splitId?: string;
  payerName: string;
  payerEmail: string;
  disabled?: boolean;
  onSuccess: () => void;
  onError: (error: string) => void;
}

export default function PayButton({
  amount,
  recipientName,
  creatorStripeAccountId,
  splitId,
  payerName,
  payerEmail,
  disabled = false,
  onSuccess,
  onError,
}: PayButtonProps) {
  const stripe = useStripe();
  const [loading, setLoading] = useState(true);
  const [paymentRequest, setPaymentRequest] = useState<PaymentRequest | null>(null);
  const [canMakePayment, setCanMakePayment] = useState<boolean | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const isReady = amount > 0 && !disabled && payerName && payerEmail;
  const platformFee = 0.50;
  const totalAmount = amount + platformFee;

  // Create payment intent when ready
  useEffect(() => {
    if (!isReady || !creatorStripeAccountId) return;

    const createPaymentIntent = async () => {
      try {
        const response = await fetch('/api/payment/create-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: totalAmount,
            creatorStripeAccountId,
            splitId,
            payerEmail,
            payerName,
          }),
        });

        const data = await response.json();
        if (data.error) {
          console.error('Payment intent error:', data.error);
          return;
        }

        setClientSecret(data.clientSecret);
      } catch (err) {
        console.error('Failed to create payment intent:', err);
      }
    };

    createPaymentIntent();
  }, [amount, creatorStripeAccountId, splitId, payerEmail, payerName, isReady, totalAmount]);

  // Set up Apple Pay / Google Pay
  useEffect(() => {
    if (!stripe || !isReady) {
      setLoading(false);
      return;
    }

    const pr = stripe.paymentRequest({
      country: 'AU',
      currency: 'aud',
      total: {
        label: `Pay ${recipientName}`,
        amount: Math.round(totalAmount * 100),
      },
      requestPayerName: true,
      requestPayerEmail: true,
    });

    pr.canMakePayment().then((result) => {
      setCanMakePayment(!!result);
      if (result) {
        setPaymentRequest(pr);
      }
      setLoading(false);
    });

    pr.on('paymentmethod', async (event) => {
      if (!clientSecret) {
        event.complete('fail');
        onError('Payment not ready. Please try again.');
        return;
      }

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        { payment_method: event.paymentMethod.id },
        { handleActions: false }
      );

      if (error) {
        event.complete('fail');
        onError(error.message || 'Payment failed');
        return;
      }

      event.complete('success');

      if (paymentIntent.status === 'requires_action') {
        const { error: confirmError } = await stripe.confirmCardPayment(clientSecret);
        if (confirmError) {
          onError(confirmError.message || 'Payment confirmation failed');
          return;
        }
      }

      onSuccess();
    });
  }, [stripe, isReady, totalAmount, recipientName, clientSecret, onSuccess, onError]);

  // Update payment request amount when it changes
  useEffect(() => {
    if (paymentRequest && isReady) {
      paymentRequest.update({
        total: {
          label: `Pay ${recipientName}`,
          amount: Math.round(totalAmount * 100),
        },
      });
    }
  }, [paymentRequest, totalAmount, recipientName, isReady]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
    >
      {/* Loading State */}
      {loading && (
        <div style={{
          padding: '24px',
          borderRadius: '24px',
          background: 'linear-gradient(135deg, #F1F5F9 0%, #E2E8F0 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
        }}>
          <Loader2 size={24} color="#64748B" style={{ animation: 'spin 1s linear infinite' }} />
          <span style={{ color: '#64748B', fontWeight: 500 }}>Loading payment options...</span>
        </div>
      )}

      {/* Apple Pay / Google Pay Button */}
      {!loading && canMakePayment && paymentRequest && isReady && (
        <>
          <div style={{
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
          }}>
            <PaymentRequestButtonElement
              options={{
                paymentRequest,
                style: {
                  paymentRequestButton: {
                    type: 'default',
                    theme: 'dark',
                    height: '56px',
                  },
                },
              }}
            />
          </div>

          {/* Fee Breakdown */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            <div style={{
              fontSize: '14px',
              color: '#64748B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}>
              <span>{formatCurrency(amount)}</span>
              <span style={{ color: '#CBD5E1' }}>+</span>
              <span style={{
                padding: '4px 10px',
                borderRadius: '8px',
                background: '#F1F5F9',
                fontSize: '13px',
                fontWeight: 500,
              }}>
                {formatCurrency(platformFee)} fee
              </span>
            </div>
            <div style={{ fontSize: '14px', color: '#94A3B8' }}>
              Paying <span style={{ fontWeight: 600, color: '#475569' }}>{recipientName}</span>
            </div>
          </motion.div>
        </>
      )}

      {/* Not Ready State - No items selected or missing info */}
      {!loading && !isReady && (
        <div style={{
          padding: '24px',
          borderRadius: '24px',
          background: 'linear-gradient(135deg, #F1F5F9 0%, #E2E8F0 100%)',
          textAlign: 'center',
        }}>
          <div style={{
            width: '56px',
            height: '56px',
            margin: '0 auto 16px',
            borderRadius: '18px',
            background: '#E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Smartphone size={28} color="#94A3B8" />
          </div>
          <p style={{ color: '#64748B', fontWeight: 500, marginBottom: '4px' }}>
            Apple Pay / Google Pay
          </p>
          <p style={{ color: '#94A3B8', fontSize: '14px' }}>
            {!payerName || !payerEmail
              ? 'Enter your details above to pay'
              : 'Select items to pay'}
          </p>
        </div>
      )}

      {/* No Apple/Google Pay Available */}
      {!loading && canMakePayment === false && isReady && (
        <div style={{
          padding: '24px',
          borderRadius: '24px',
          background: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)',
          border: '2px solid #F59E0B',
          textAlign: 'center',
        }}>
          <div style={{
            width: '56px',
            height: '56px',
            margin: '0 auto 16px',
            borderRadius: '18px',
            background: 'rgba(245, 158, 11, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Smartphone size={28} color="#D97706" />
          </div>
          <p style={{ color: '#92400E', fontWeight: 600, marginBottom: '8px' }}>
            Apple Pay / Google Pay Not Available
          </p>
          <p style={{ color: '#A16207', fontSize: '14px', lineHeight: 1.5 }}>
            Please use Safari on iPhone for Apple Pay, or Chrome on Android for Google Pay.
          </p>
        </div>
      )}

      {/* Security Note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          padding: '16px',
          borderRadius: '14px',
          background: 'linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%)',
        }}
      >
        <div style={{
          width: '28px',
          height: '28px',
          borderRadius: '8px',
          background: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.04)',
        }}>
          <Shield size={14} color="#10B981" />
        </div>
        <span style={{ fontSize: '13px', color: '#64748B', fontWeight: 500 }}>
          Secure payment powered by Stripe
        </span>
      </motion.div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </motion.div>
  );
}
