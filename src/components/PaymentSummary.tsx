'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { formatCurrency } from '@/lib/utils';

interface PaymentSummaryProps {
  itemsTotal: number;
  serviceFee: number;
  total: number;
  selectedCount: number;
}

export default function PaymentSummary({
  itemsTotal,
  serviceFee,
  total,
  selectedCount,
}: PaymentSummaryProps) {
  const hasSelection = selectedCount > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        borderRadius: '12px',
        padding: '20px',
        background: '#FFFFFF',
        border: '1px solid #E5E7EB',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
      }}
    >
      {/* Line Items */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
        {/* Items Total */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px 0',
          borderBottom: '1px solid #F3F4F6',
        }}>
          <span style={{ color: '#64748B', fontSize: '14px', fontWeight: 400 }}>
            Items ({selectedCount})
          </span>
          <AnimatePresence mode="wait">
            <motion.span
              key={itemsTotal}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              style={{
                fontWeight: 500,
                fontVariantNumeric: 'tabular-nums',
                color: '#0F172A',
                fontSize: '14px',
              }}
            >
              {formatCurrency(itemsTotal)}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Service Fee */}
        {serviceFee > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px 0',
              borderBottom: '1px solid #F3F4F6',
            }}
          >
            <span style={{ color: '#64748B', fontSize: '14px', fontWeight: 400 }}>
              Service fee
            </span>
            <span style={{
              fontWeight: 500,
              fontVariantNumeric: 'tabular-nums',
              color: '#0F172A',
              fontSize: '14px',
            }}>
              {formatCurrency(serviceFee)}
            </span>
          </motion.div>
        )}
      </div>

      {/* Total */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: '16px',
        borderTop: hasSelection ? '2px solid #0F172A' : '2px solid #E5E7EB',
        marginTop: '0',
      }}>
        <span style={{
          fontSize: '15px',
          fontWeight: 600,
          color: '#0F172A',
        }}>
          Total
        </span>
        <AnimatePresence mode="wait">
          <motion.span
            key={total}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            style={{
              fontSize: '22px',
              fontWeight: 700,
              fontVariantNumeric: 'tabular-nums',
              color: hasSelection ? '#0F172A' : '#94A3B8',
              letterSpacing: '-0.5px',
            }}
          >
            {formatCurrency(total)}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* No selection hint */}
      <AnimatePresence>
        {!hasSelection && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              marginTop: '12px',
              fontSize: '13px',
              color: '#94A3B8',
              textAlign: 'center',
            }}
          >
            Select items above to see your total
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
