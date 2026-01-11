'use client';

import { motion } from 'framer-motion';
import { Wallet, ArrowRight, Loader2 } from 'lucide-react';
import { cn, formatCurrency } from '@/lib/utils';

interface PayButtonProps {
  amount: number;
  recipientName: string;
  payId?: string;
  disabled?: boolean;
  loading?: boolean;
  onClick: () => void;
}

export default function PayButton({
  amount,
  recipientName,
  payId,
  disabled = false,
  loading = false,
  onClick,
}: PayButtonProps) {
  const isReady = amount > 0 && !disabled;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="space-y-3"
    >
      {/* Main Pay Button */}
      <motion.button
        whileHover={isReady && !loading ? { scale: 1.02 } : {}}
        whileTap={isReady && !loading ? { scale: 0.98 } : {}}
        onClick={onClick}
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
              {loading ? 'Processing...' : 'Pay with Bank'}
            </div>
            <div className="text-xl font-bold">
              {formatCurrency(amount)}
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

      {/* Recipient Info */}
      {isReady && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-sm text-[var(--text-muted)]"
        >
          <span>Paying </span>
          <span className="font-medium text-[var(--text-secondary)]">{recipientName}</span>
          {payId && (
            <>
              <span> via PayID </span>
              <span className="font-mono text-xs bg-[var(--surface)] px-2 py-0.5 rounded-md">
                {payId}
              </span>
            </>
          )}
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
        <span>Secure bank-to-bank payment via PayTo</span>
      </motion.div>
    </motion.div>
  );
}
