'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Shield, X, Lock } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import {
  useStripe,
  useElements,
  PaymentElement,
  ExpressCheckoutElement,
} from '@stripe/react-stripe-js';

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
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [showSheet, setShowSheet] = useState(false);

  const isReady = amount > 0 && !disabled && payerName && payerEmail;
  const platformFee = 0.50;
  const totalAmount = amount + platformFee;

  // Update Elements amount when total changes
  useEffect(() => {
    if (elements && totalAmount > 0) {
      elements.update({ amount: Math.round(totalAmount * 100) });
    }
  }, [elements, totalAmount]);

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

  // Helper to create payment intent on-demand
  const createIntentOnDemand = async (): Promise<string | null> => {
    if (clientSecret) return clientSecret;
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
        onError(data.error);
        return null;
      }
      setClientSecret(data.clientSecret);
      return data.clientSecret;
    } catch (err: any) {
      onError(err.message || 'Failed to create payment');
      return null;
    }
  };

  // Handle Express Checkout (Apple Pay, Google Pay, Link)
  const handleExpressCheckout = async () => {
    if (!stripe || !elements) return;
    setLoading(true);

    try {
      const { error: submitError } = await elements.submit();
      if (submitError) {
        onError(submitError.message || 'Validation failed');
        setLoading(false);
        return;
      }

      const secret = await createIntentOnDemand();
      if (!secret) {
        setLoading(false);
        return;
      }

      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        clientSecret: secret,
        confirmParams: {
          return_url: window.location.href,
        },
        redirect: 'if_required',
      });

      if (error) {
        onError(error.message || 'Payment failed');
      } else if (paymentIntent?.status === 'succeeded') {
        setShowSheet(false);
        onSuccess();
      }
    } catch (err: any) {
      onError(err.message || 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  // Handle card payment
  const handleSubmit = async () => {
    if (!stripe || !elements || !clientSecret) return;

    setLoading(true);

    try {
      const { error: submitError } = await elements.submit();
      if (submitError) {
        onError(submitError.message || 'Validation failed');
        setLoading(false);
        return;
      }

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
        setShowSheet(false);
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
    <>
      {/* Trigger Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowSheet(true)}
          style={{
            width: '100%',
            padding: '18px',
            borderRadius: '16px',
            border: 'none',
            background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
            color: 'white',
            fontSize: '17px',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            boxShadow: '0 6px 20px rgba(59, 130, 246, 0.35)',
          }}
        >
          <span>Pay {formatCurrency(totalAmount)}</span>
          <Shield size={18} style={{ opacity: 0.8 }} />
        </motion.button>

        {/* Fee Breakdown */}
        <div style={{
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
        }}>
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
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          padding: '14px',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%)',
        }}>
          <Shield size={16} color="#10B981" />
          <span style={{ fontSize: '13px', color: '#64748B', fontWeight: 500 }}>
            Secure payment powered by Stripe
          </span>
        </div>
      </motion.div>

      {/* Payment Sheet Modal */}
      <AnimatePresence>
        {showSheet && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !loading && setShowSheet(false)}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0, 0, 0, 0.6)',
                zIndex: 9998,
              }}
            />

            {/* Bottom Sheet */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              style={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 9999,
                background: '#1c1c2e',
                borderTopLeftRadius: '20px',
                borderTopRightRadius: '20px',
                maxHeight: '90vh',
                overflowY: 'auto',
                padding: '20px',
                paddingBottom: '40px',
              }}
            >
              {/* Sheet Header */}
              <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginBottom: '16px',
              }}>
                <button
                  onClick={() => !loading && setShowSheet(false)}
                  style={{
                    background: '#2a2a3e',
                    border: 'none',
                    borderRadius: '50%',
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <X size={18} color="#94A3B8" />
                </button>
              </div>

              {/* Express Checkout: Apple Pay, Google Pay, Link */}
              <div style={{ marginBottom: '8px' }}>
                <ExpressCheckoutElement
                  onConfirm={handleExpressCheckout}
                  options={{
                    wallets: {
                      applePay: 'auto',
                      googlePay: 'auto',
                    },
                  }}
                />
              </div>

              {/* Divider */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '16px 0',
              }}>
                <div style={{ flex: 1, height: '1px', background: '#3a3a4e' }} />
                <span style={{ fontSize: '13px', color: '#7a7a8e', fontWeight: 500 }}>Or pay using</span>
                <div style={{ flex: 1, height: '1px', background: '#3a3a4e' }} />
              </div>

              {/* Card Payment Form */}
              <div style={{ marginBottom: '20px' }}>
                <PaymentElement
                  options={{
                    wallets: {
                      applePay: 'never',
                      googlePay: 'never',
                    },
                  }}
                />
              </div>

              {/* Pay Button */}
              <button
                onClick={handleSubmit}
                disabled={loading || !stripe || !clientSecret}
                style={{
                  width: '100%',
                  padding: '16px',
                  borderRadius: '12px',
                  border: 'none',
                  background: '#3B82F6',
                  color: 'white',
                  fontSize: '17px',
                  fontWeight: 600,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  opacity: loading ? 0.7 : 1,
                }}
              >
                {loading ? (
                  <Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} />
                ) : (
                  <>
                    <span>Pay {formatCurrency(totalAmount)}</span>
                    <Lock size={16} style={{ opacity: 0.7 }} />
                  </>
                )}
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}
