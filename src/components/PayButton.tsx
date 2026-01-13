'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Wallet, ArrowRight, Loader2, CreditCard } from 'lucide-react';
import { cn, formatCurrency } from '@/lib/utils';
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
  const platformFee = 0.50; // $0.50 platform fee
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
        amount: Math.round(totalAmount * 100), // Convert to cents
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

  // Mock payment for demo (when Stripe isn't configured)
  const handleMockPayment = async () => {
    setLoading(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // For demo, show success
    alert(`Payment of ${formatCurrency(totalAmount)} to ${recipientName} would be processed here.\n\nTo enable real payments, add Stripe keys to environment variables.`);

    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="space-y-3"
    >
      {/* Apple Pay / Google Pay Button */}
      {canMakePayment && paymentRequest && (
        <div className="mb-4">
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
          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-px bg-[var(--border)]" />
            <span className="text-sm text-[var(--text-muted)]">or pay with card</span>
            <div className="flex-1 h-px bg-[var(--border)]" />
          </div>
        </div>
      )}

      {/* Card Payment Form */}
      {showCardForm && clientSecret ? (
        <div className="space-y-4">
          <PaymentElement
            options={{
              layout: 'tabs',
            }}
          />
          <motion.button
            whileHover={!loading ? { scale: 1.02 } : {}}
            whileTap={!loading ? { scale: 0.98 } : {}}
            onClick={handleCardPayment}
            disabled={loading || !stripe}
            className={cn(
              'w-full rounded-2xl p-5 transition-all duration-300',
              'flex items-center justify-center gap-3',
              'font-semibold text-lg',
              'bg-[var(--primary)] text-white shadow-lg shadow-[var(--primary)]/30'
            )}
          >
            {loading ? (
              <Loader2 size={24} className="animate-spin" />
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
          whileHover={isReady && !loading ? { scale: 1.02 } : {}}
          whileTap={isReady && !loading ? { scale: 0.98 } : {}}
          onClick={() => {
            if (clientSecret) {
              setShowCardForm(true);
            } else {
              handleMockPayment();
            }
          }}
          disabled={!isReady || loading}
          className={cn(
            'w-full relative overflow-hidden rounded-2xl p-5 transition-all duration-300',
            'flex items-center justify-between gap-4',
            'font-semibold text-lg',
            isReady && !loading
              ? 'bg-[var(--primary)] text-white shadow-lg shadow-[var(--primary)]/30 hover:shadow-xl hover:shadow-[var(--primary)]/40'
              : 'bg-[var(--border-light)] text-[var(--text-muted)] cursor-not-allowed',
            'btn-shine'
          )}
        >
          <div className="flex items-center gap-3">
            {loading ? (
              <Loader2 size={24} className="animate-spin" />
            ) : (
              <div className={cn(
                'w-10 h-10 rounded-xl flex items-center justify-center',
                isReady ? 'bg-white/20' : 'bg-[var(--border)]'
              )}>
                <Wallet size={20} />
              </div>
            )}
            <div className="text-left">
              <div className="text-sm opacity-80">
                {loading ? 'Processing...' : 'Pay with Card'}
              </div>
              <div className="text-xl font-bold">
                {formatCurrency(totalAmount)}
              </div>
            </div>
          </div>

          {!loading && (
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
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
          className="text-center space-y-1"
        >
          <div className="text-sm text-[var(--text-muted)]">
            <span>{formatCurrency(amount)} + {formatCurrency(platformFee)} fee</span>
          </div>
          <div className="text-sm text-[var(--text-muted)]">
            Paying <span className="font-medium text-[var(--text-secondary)]">{recipientName}</span>
          </div>
        </motion.div>
      )}

      {/* Security Note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex items-center justify-center gap-2 text-xs text-[var(--text-muted)]"
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        <span>Secure payment powered by Stripe</span>
      </motion.div>
    </motion.div>
  );
}
