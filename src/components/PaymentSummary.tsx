'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Receipt, Percent, Sparkles } from 'lucide-react';
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
        borderRadius: '28px',
        padding: '28px',
        background: hasSelection
          ? 'linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)'
          : '#FFFFFF',
        border: hasSelection ? '2px solid #E2E8F0' : '2px solid #F1F5F9',
        boxShadow: hasSelection
          ? '0 12px 40px rgba(59, 130, 246, 0.08), 0 4px 12px rgba(0, 0, 0, 0.03)'
          : '0 4px 24px rgba(0, 0, 0, 0.03)',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        paddingBottom: '20px',
        borderBottom: '1px solid #F1F5F9',
        marginBottom: '20px',
      }}>
        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: '16px',
          background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(59, 130, 246, 0.25)',
        }}>
          <Sparkles size={22} color="white" />
        </div>
        <div>
          <span style={{
            fontWeight: 700,
            fontSize: '18px',
            color: '#0F172A',
            letterSpacing: '-0.3px',
          }}>
            Your Summary
          </span>
          <p style={{ fontSize: '13px', color: '#94A3B8', marginTop: '2px' }}>
            Breakdown of your share
          </p>
        </div>
      </div>

      {/* Line Items */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Items Total */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '14px 16px',
          borderRadius: '14px',
          background: '#F8FAFC',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '10px',
              background: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.04)',
            }}>
              <Receipt size={16} color="#64748B" />
            </div>
            <span style={{ color: '#475569', fontSize: '15px', fontWeight: 500 }}>
              Items ({selectedCount})
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
                color: '#0F172A',
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
              padding: '14px 16px',
              borderRadius: '14px',
              background: '#F8FAFC',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '10px',
                background: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.04)',
              }}>
                <Percent size={16} color="#64748B" />
              </div>
              <span style={{ color: '#475569', fontSize: '15px', fontWeight: 500 }}>Tax</span>
            </div>
            <span style={{
              fontWeight: 600,
              fontVariantNumeric: 'tabular-nums',
              color: '#0F172A',
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
              padding: '14px 16px',
              borderRadius: '14px',
              background: '#F8FAFC',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '10px',
                background: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.04)',
              }}>
                <span style={{ fontSize: '14px' }}>💝</span>
              </div>
              <span style={{ color: '#475569', fontSize: '15px', fontWeight: 500 }}>Tip</span>
            </div>
            <span style={{
              fontWeight: 600,
              fontVariantNumeric: 'tabular-nums',
              color: '#0F172A',
              fontSize: '15px',
            }}>
              {formatCurrency(tipShare)}
            </span>
          </motion.div>
        )}
      </div>

      {/* Total Section */}
      <div style={{
        marginTop: '24px',
        padding: '24px',
        borderRadius: '20px',
        background: hasSelection
          ? 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)'
          : 'linear-gradient(135deg, #F1F5F9 0%, #E2E8F0 100%)',
        boxShadow: hasSelection
          ? '0 8px 24px rgba(59, 130, 246, 0.3)'
          : 'none',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <span style={{
            fontSize: '16px',
            fontWeight: 600,
            color: hasSelection ? 'rgba(255, 255, 255, 0.9)' : '#64748B',
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
                fontSize: '32px',
                fontWeight: 800,
                fontVariantNumeric: 'tabular-nums',
                color: hasSelection ? '#FFFFFF' : '#94A3B8',
                letterSpacing: '-1px',
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                marginTop: '12px',
                fontSize: '14px',
                color: '#94A3B8',
                textAlign: 'center',
              }}
            >
              Select items above to see your total
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
