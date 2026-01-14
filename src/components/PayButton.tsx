'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Loader2, CreditCard, Shield } from 'lucide-react';
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
  const [showCardForm, setShowCardForm] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const isReady = amount > 0 && !disabled && payerName && payerEmail;
  const platformFee = 0.50;
  const totalAmount = amount + platformFee;

  // Create payment intent when amount changes
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

  const handleCardPayment = async () => {
    if (!stripe || !elements || !clientSecret) return;

    setLoading(true);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
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

  const handleMockPayment = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    alert(`Payment of ${formatCurrency(totalAmount)} to ${recipientName} would be processed here.\n\nTo enable real payments, add Stripe keys to environment variables.`);
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
    >
      {/* Apple Pay / Google Pay Button */}
      {canMakePayment && paymentRequest && (
        <div style={{ marginBottom: '16px' }}>
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
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            margin: '20px 0',
          }}>
            <div style={{ flex: 1, height: '1px', background: '#E2E8F0' }} />
            <span style={{ fontSize: '13px', color: '#94A3B8', fontWeight: 500 }}>or pay with card</span>
            <div style={{ flex: 1, height: '1px', background: '#E2E8F0' }} />
          </div>
        </div>
      )}

      {/* Card Payment Form */}
      {showCardForm && clientSecret ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{
            padding: '24px',
            borderRadius: '20px',
            background: '#FFFFFF',
            border: '2px solid #E2E8F0',
            boxShadow: '0 4px 24px rgba(0, 0, 0, 0.04)',
          }}>
            <PaymentElement options={{ layout: 'tabs' }} />
          </div>
          <motion.button
            whileHover={!loading ? { scale: 1.02 } : {}}
            whileTap={!loading ? { scale: 0.98 } : {}}
            onClick={handleCardPayment}
            disabled={loading || !stripe}
            style={{
              width: '100%',
              padding: '20px',
              borderRadius: '20px',
              border: 'none',
              background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
              color: 'white',
              fontSize: '18px',
              fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              boxShadow: '0 8px 24px rgba(59, 130, 246, 0.35)',
              transition: 'all 0.3s ease',
            }}
          >
            {loading ? (
              <Loader2 size={24} style={{ animation: 'spin 1s linear infinite' }} />
            ) : (
              <>
                <CreditCard size={24} />
                <span>Pay {formatCurrency(totalAmount)}</span>
              </>
            )}
          </motion.button>
        </div>
      ) : (
        /* Main Pay Button */
        <motion.button
          whileHover={isReady && !loading ? { scale: 1.02, boxShadow: '0 12px 32px rgba(59, 130, 246, 0.4)' } : {}}
          whileTap={isReady && !loading ? { scale: 0.98 } : {}}
          onClick={() => {
            if (clientSecret) {
              setShowCardForm(true);
            } else {
              handleMockPayment();
            }
          }}
          disabled={!isReady || loading}
          style={{
            width: '100%',
            position: 'relative',
            overflow: 'hidden',
            padding: '24px',
            borderRadius: '24px',
            border: 'none',
            background: isReady && !loading
              ? 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)'
              : 'linear-gradient(135deg, #F1F5F9 0%, #E2E8F0 100%)',
            color: isReady && !loading ? 'white' : '#94A3B8',
            cursor: isReady && !loading ? 'pointer' : 'not-allowed',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: isReady && !loading
              ? '0 8px 24px rgba(59, 130, 246, 0.35)'
              : '0 2px 12px rgba(0, 0, 0, 0.04)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {loading ? (
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '18px',
                background: 'rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Loader2 size={24} style={{ animation: 'spin 1s linear infinite' }} />
              </div>
            ) : (
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '18px',
                background: isReady ? 'rgba(255, 255, 255, 0.2)' : '#E2E8F0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: isReady ? '0 4px 12px rgba(0, 0, 0, 0.1)' : 'none',
              }}>
                <CreditCard size={26} />
              </div>
            )}
            <div style={{ textAlign: 'left' }}>
              <div style={{
                fontSize: '14px',
                fontWeight: 500,
                opacity: 0.85,
                marginBottom: '4px',
              }}>
                {loading ? 'Processing...' : 'Pay with Card'}
              </div>
              <div style={{
                fontSize: '26px',
                fontWeight: 800,
                letterSpacing: '-0.5px',
              }}>
                {formatCurrency(totalAmount)}
              </div>
            </div>
          </div>

          {!loading && isReady && (
            <motion.div
              animate={{ x: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '14px',
                background: 'rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ArrowRight size={24} />
            </motion.div>
          )}
        </motion.button>
      )}

      {/* Fee Breakdown */}
      {isReady && (
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
