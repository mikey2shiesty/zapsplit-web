'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Receipt, Percent, Calculator } from 'lucide-react';
import { cn, formatCurrency } from '@/lib/utils';

interface PaymentSummaryProps {
  itemsTotal: number;
  taxShare: number;
  tipShare: number;
  total: number;
  selectedCount: number;
}

export default function PaymentSummary({
  itemsTotal,
  taxShare,
  tipShare,
  total,
  selectedCount,
}: PaymentSummaryProps) {
  const hasSelection = selectedCount > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'rounded-3xl p-5 transition-all duration-300',
        'bg-gradient-to-br from-[var(--surface)] to-[var(--surface-elevated)]',
        'border border-[var(--border-light)]',
        'shadow-sm'
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center">
          <Calculator size={16} className="text-[var(--primary)]" />
        </div>
        <span className="font-semibold text-[var(--text-primary)]">Your Summary</span>
      </div>

      {/* Line Items */}
      <div className="space-y-3">
        {/* Items Total */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Receipt size={14} className="text-[var(--text-muted)]" />
            <span className="text-[var(--text-secondary)]">
              Your items ({selectedCount})
            </span>
          </div>
          <AnimatePresence mode="wait">
            <motion.span
              key={itemsTotal}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="font-medium tabular-nums text-[var(--text-primary)]"
            >
              {formatCurrency(itemsTotal)}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Tax */}
        {taxShare > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="flex justify-between items-center"
          >
            <div className="flex items-center gap-2">
              <Percent size={14} className="text-[var(--text-muted)]" />
              <span className="text-[var(--text-secondary)]">Tax share</span>
            </div>
            <span className="font-medium tabular-nums text-[var(--text-primary)]">
              {formatCurrency(taxShare)}
            </span>
          </motion.div>
        )}

        {/* Tip */}
        {tipShare > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="flex justify-between items-center"
          >
            <div className="flex items-center gap-2">
              <span className="text-[var(--text-muted)] text-sm">💝</span>
              <span className="text-[var(--text-secondary)]">Tip share</span>
            </div>
            <span className="font-medium tabular-nums text-[var(--text-primary)]">
              {formatCurrency(tipShare)}
            </span>
          </motion.div>
        )}
      </div>

      {/* Divider */}
      <div className="my-4 border-t border-dashed border-[var(--border)]" />

      {/* Total */}
      <div className="flex justify-between items-center">
        <span className="text-lg font-semibold text-[var(--text-primary)]">Your Total</span>
        <AnimatePresence mode="wait">
          <motion.div
            key={total}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className={cn(
              'text-2xl font-bold tabular-nums',
              hasSelection ? 'text-[var(--primary)]' : 'text-[var(--text-muted)]'
            )}
          >
            {formatCurrency(total)}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* No selection hint */}
      <AnimatePresence>
        {!hasSelection && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 text-sm text-[var(--text-muted)] text-center"
          >
            Tap items above to select what you had
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
