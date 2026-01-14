'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Shield } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import {
  useStripe,
  useElements,
  PaymentRequestButtonElement,
  PaymentElement,
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
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [paymentRequest, setPaymentRequest] = useState<PaymentRequest | null>(null);
  const [canMakePayment, setCanMakePayment] = useState(false);
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
    if (!stripe || !isReady) return;

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
      if (result) {
        setPaymentRequest(pr);
        setCanMakePayment(true);
      }
    });

    pr.on('paymentmethod', async (event) => {
      if (!clientSecret) {
        event.complete('fail');
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

  const handleSubmit = async () => {
    if (!stripe || !elements || !clientSecret) return;

    setLoading(true);

    try {
      // First submit the payment element to validate
      const { error: submitError } = await elements.submit();
      if (submitError) {
        onError(submitError.message || 'Validation failed');
        setLoading(false);
        return;
      }

      // Then confirm the payment with the clientSecret
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: window.location.href,
        },
        redirect: 'if_required',
      });

      if (error) {
        onError(error.message || 'Payment failed');
      } else if (paymentIntent?.status === 'succeeded') {
        onSuccess();
      }
    } catch (err: any) {
      onError(err.message || 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  if (!isReady) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          padding: '24px',
          borderRadius: '24px',
          background: 'linear-gradient(135deg, #F1F5F9 0%, #E2E8F0 100%)',
          textAlign: 'center',
        }}
      >
        <p style={{ color: '#64748B', fontWeight: 500 }}>
          {!payerName || !payerEmail
            ? 'Enter your details above to pay'
            : 'Select items to pay'}
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
    >
      {/* Apple Pay / Google Pay Button */}
      {canMakePayment && paymentRequest && (
        <div style={{
          borderRadius: '16px',
          overflow: 'hidden',
        }}>
          <PaymentRequestButtonElement
            options={{
              paymentRequest,
              style: {
                paymentRequestButton: {
                  type: 'default',
                  theme: 'dark',
                  height: '54px',
                },
              },
            }}
          />
        </div>
      )}

      {/* Payment Form (Link + Card) */}
      {clientSecret && (
        <>
          <div style={{
            padding: '20px',
            borderRadius: '20px',
            background: '#FFFFFF',
            border: '1.5px solid #E2E8F0',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
          }}>
            <PaymentElement
              options={{
                layout: 'tabs',
                wallets: {
                  applePay: 'never',
                  googlePay: 'never',
                }
              }}
            />
          </div>

          {/* Pay Button */}
          <motion.button
            whileHover={!loading ? { scale: 1.02 } : {}}
            whileTap={!loading ? { scale: 0.98 } : {}}
            onClick={handleSubmit}
            disabled={loading || !stripe}
            style={{
              width: '100%',
              padding: '18px',
              borderRadius: '16px',
              border: 'none',
              background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
              color: 'white',
              fontSize: '17px',
              fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              boxShadow: '0 6px 20px rgba(59, 130, 246, 0.35)',
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? (
              <Loader2 size={22} style={{ animation: 'spin 1s linear infinite' }} />
            ) : (
              <>
                <span>Pay {formatCurrency(totalAmount)}</span>
                <Shield size={18} style={{ opacity: 0.8 }} />
              </>
            )}
          </motion.button>
        </>
      )}

      {/* Fee Breakdown */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
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
          padding: '14px',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%)',
        }}
      >
        <Shield size={16} color="#10B981" />
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
