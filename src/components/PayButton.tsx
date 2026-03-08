'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, X, Lock } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import {
  Elements,
  CardElement,
  PaymentRequestButtonElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { getStripe } from '@/components/StripeProvider';
import type { PaymentRequest } from '@stripe/stripe-js';

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

// Inner component with Apple Pay + Card form
function CardForm({
  totalAmount,
  clientSecret,
  payerName,
  payerEmail,
  loading,
  setLoading,
  onSuccess,
  onError,
  onClose,
}: {
  totalAmount: number;
  clientSecret: string;
  payerName: string;
  payerEmail: string;
  loading: boolean;
  setLoading: (v: boolean) => void;
  onSuccess: () => void;
  onError: (error: string) => void;
  onClose: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [cardReady, setCardReady] = useState(false);
  const [paymentRequest, setPaymentRequest] = useState<PaymentRequest | null>(null);
  const [canApplePay, setCanApplePay] = useState(false);

  // Set up Apple Pay / Google Pay
  useEffect(() => {
    if (!stripe) return;

    const pr = stripe.paymentRequest({
      country: 'AU',
      currency: 'aud',
      total: {
        label: 'ZapSplit Payment',
        amount: Math.round(totalAmount * 100),
      },
      requestPayerName: true,
      requestPayerEmail: true,
    });

    pr.canMakePayment().then((result) => {
      if (result) {
        setCanApplePay(true);
        setPaymentRequest(pr);
      }
    });

    // Handle payment from Apple Pay / Google Pay
    pr.on('paymentmethod', async (ev) => {
      setLoading(true);
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        { payment_method: ev.paymentMethod.id },
        { handleActions: false }
      );

      if (error) {
        ev.complete('fail');
        onError(error.message || 'Payment failed');
        setLoading(false);
      } else if (paymentIntent?.status === 'requires_action') {
        ev.complete('success');
        const { error: actionError } = await stripe.confirmCardPayment(clientSecret);
        if (actionError) {
          onError(actionError.message || 'Payment failed');
        } else {
          onClose();
          onSuccess();
        }
        setLoading(false);
      } else {
        ev.complete('success');
        onClose();
        onSuccess();
        setLoading(false);
      }
    });
  }, [stripe, totalAmount, clientSecret]);

  // Handle card payment
  const handleSubmit = async () => {
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      onError('Card form not ready');
      return;
    }

    setLoading(true);
    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: payerName,
            email: payerEmail,
          },
        },
      });

      if (error) {
        onError(error.message || 'Payment failed');
      } else if (paymentIntent?.status === 'succeeded') {
        onClose();
        onSuccess();
      }
    } catch (err: any) {
      onError(err.message || 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Apple Pay / Google Pay Button */}
      {canApplePay && paymentRequest && (
        <>
          <div style={{ marginBottom: '8px' }}>
            <PaymentRequestButtonElement
              options={{
                paymentRequest,
                style: {
                  paymentRequestButton: {
                    type: 'default',
                    theme: 'light',
                    height: '48px',
                  },
                },
              }}
            />
          </div>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 0' }}>
            <div style={{ flex: 1, height: '1px', background: '#3a3a4e' }} />
            <span style={{ fontSize: '13px', color: '#7a7a8e', fontWeight: 500 }}>Or pay with card</span>
            <div style={{ flex: 1, height: '1px', background: '#3a3a4e' }} />
          </div>
        </>
      )}

      {/* Card Input */}
      <div style={{ marginBottom: '24px' }}>
        {!canApplePay && (
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: 500,
            color: '#CBD5E1',
            marginBottom: '10px',
          }}>
            Card details
          </label>
        )}
        <div style={{
          padding: '14px',
          borderRadius: '8px',
          border: '1px solid #3a3a4e',
          background: '#252540',
        }}>
          <CardElement
            onReady={() => setCardReady(true)}
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#E2E8F0',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  '::placeholder': { color: '#64748B' },
                },
                invalid: { color: '#EF4444' },
              },
              hidePostalCode: true,
            }}
          />
        </div>
      </div>

      {/* Pay Button */}
      <button
        onClick={handleSubmit}
        disabled={loading || !stripe || !cardReady}
        style={{
          width: '100%',
          padding: '16px',
          borderRadius: '10px',
          border: 'none',
          background: loading || !cardReady ? '#374151' : '#0F172A',
          color: 'white',
          fontSize: '16px',
          fontWeight: 600,
          cursor: loading ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          opacity: loading || !cardReady ? 0.7 : 1,
        }}
      >
        {loading ? (
          <Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} />
        ) : (
          <>
            <span>Pay {formatCurrency(totalAmount)}</span>
            <Lock size={15} style={{ opacity: 0.5 }} />
          </>
        )}
      </button>

      <p style={{ textAlign: 'center', fontSize: '12px', color: '#64748B', marginTop: '12px' }}>
        Secured by Stripe
      </p>
    </>
  );
}

export default function PayButton({
  amount,
  creatorStripeAccountId,
  splitId,
  payerName,
  payerEmail,
  disabled = false,
  onSuccess,
  onError,
}: PayButtonProps) {
  const [loading, setLoading] = useState(false);
  const [showSheet, setShowSheet] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const platformFee = 0.50;
  const totalAmount = amount + platformFee;
  const isReady = amount > 0 && !disabled && payerName && payerEmail;

  const handlePayClick = async () => {
    if (!creatorStripeAccountId) {
      onError('Recipient has not set up payments yet');
      return;
    }

    setLoading(true);
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
        setLoading(false);
        return;
      }

      setClientSecret(data.clientSecret);
      setShowSheet(true);
    } catch (err: any) {
      onError(err.message || 'Failed to create payment');
    } finally {
      setLoading(false);
    }
  };

  if (!isReady) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ padding: '16px', borderRadius: '10px', background: '#F3F4F6', textAlign: 'center' }}
      >
        <p style={{ color: '#9CA3AF', fontSize: '14px', fontWeight: 500 }}>
          {!payerName || !payerEmail ? 'Enter your details above to pay' : 'Select items to pay'}
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
        style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
      >
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handlePayClick}
          disabled={loading}
          style={{
            width: '100%',
            padding: '16px',
            borderRadius: '10px',
            border: 'none',
            background: '#0F172A',
            color: 'white',
            fontSize: '16px',
            fontWeight: 600,
            cursor: loading ? 'wait' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            opacity: loading ? 0.8 : 1,
          }}
        >
          {loading ? (
            <>
              <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
              <span>Preparing...</span>
            </>
          ) : (
            <span>Pay {formatCurrency(totalAmount)}</span>
          )}
        </motion.button>

        <div style={{ textAlign: 'center' }}>
          <span style={{ fontSize: '13px', color: '#9CA3AF' }}>
            {formatCurrency(amount)} + {formatCurrency(platformFee)} fee
          </span>
          <span style={{ fontSize: '13px', color: '#D1D5DB', margin: '0 8px' }}>&middot;</span>
          <span style={{ fontSize: '12px', color: '#9CA3AF' }}>Secured by Stripe</span>
        </div>
      </motion.div>

      {/* Payment Sheet */}
      <AnimatePresence>
        {showSheet && clientSecret && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !loading && setShowSheet(false)}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9998 }}
            />

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
                borderTopLeftRadius: '16px',
                borderTopRightRadius: '16px',
                maxHeight: '90vh',
                overflowY: 'auto',
                padding: '20px',
                paddingBottom: '40px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <span style={{ fontSize: '17px', fontWeight: 600, color: '#E2E8F0' }}>
                  Pay {formatCurrency(totalAmount)}
                </span>
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

              <Elements
                stripe={getStripe()}
                options={{
                  clientSecret,
                  appearance: { theme: 'night' },
                }}
              >
                <CardForm
                  totalAmount={totalAmount}
                  clientSecret={clientSecret}
                  payerName={payerName}
                  payerEmail={payerEmail}
                  loading={loading}
                  setLoading={setLoading}
                  onSuccess={onSuccess}
                  onError={(err) => { setShowSheet(false); onError(err); }}
                  onClose={() => setShowSheet(false)}
                />
              </Elements>
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
