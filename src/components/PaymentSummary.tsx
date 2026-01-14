'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Receipt, Percent, Calculator } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

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
      style={{
        borderRadius: '24px',
        padding: '24px',
        background: 'linear-gradient(135deg, var(--surface) 0%, var(--surface-elevated) 100%)',
        border: '2px solid var(--border-light)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
      }}
    >
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '24px',
        paddingBottom: '16px',
        borderBottom: '1px solid var(--border-light)',
      }}>
        <div style={{
          width: '44px',
          height: '44px',
          borderRadius: '14px',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Calculator size={20} color="#3B82F6" />
        </div>
        <span style={{
          fontWeight: 700,
          fontSize: '18px',
          color: 'var(--text-primary)',
        }}>
          Your Summary
        </span>
      </div>

      {/* Line Items */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Items Total */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Receipt size={16} style={{ color: 'var(--text-muted)' }} />
            <span style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>
              Your items ({selectedCount})
            </span>
          </div>
          <AnimatePresence mode="wait">
            <motion.span
              key={itemsTotal}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              style={{
                fontWeight: 600,
                fontVariantNumeric: 'tabular-nums',
                color: 'var(--text-primary)',
                fontSize: '15px',
              }}
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
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Percent size={16} style={{ color: 'var(--text-muted)' }} />
              <span style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>Tax share</span>
            </div>
            <span style={{
              fontWeight: 600,
              fontVariantNumeric: 'tabular-nums',
              color: 'var(--text-primary)',
              fontSize: '15px',
            }}>
              {formatCurrency(taxShare)}
            </span>
          </motion.div>
        )}

        {/* Tip */}
        {tipShare > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>💝</span>
              <span style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>Tip share</span>
            </div>
            <span style={{
              fontWeight: 600,
              fontVariantNumeric: 'tabular-nums',
              color: 'var(--text-primary)',
              fontSize: '15px',
            }}>
              {formatCurrency(tipShare)}
            </span>
          </motion.div>
        )}
      </div>

      {/* Divider */}
      <div style={{
        margin: '24px 0',
        borderTop: '2px dashed var(--border)',
      }} />

      {/* Total */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <span style={{
          fontSize: '18px',
          fontWeight: 700,
          color: 'var(--text-primary)',
        }}>
          Your Total
        </span>
        <AnimatePresence mode="wait">
          <motion.div
            key={total}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            style={{
              fontSize: '28px',
              fontWeight: 800,
              fontVariantNumeric: 'tabular-nums',
              color: hasSelection ? '#3B82F6' : 'var(--text-muted)',
            }}
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
            style={{
              marginTop: '20px',
              padding: '16px',
              borderRadius: '12px',
              backgroundColor: 'var(--background)',
              fontSize: '14px',
              color: 'var(--text-muted)',
              textAlign: 'center',
            }}
          >
            👆 Tap items above to select what you had
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
