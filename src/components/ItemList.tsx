'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Check, Users } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface Item {
  name: string;
  price: number;
  quantity: number;
}

interface ItemListProps {
  items: Item[];
  selectedItems: Set<number>;
  sharedItems: Map<number, number>;
  onToggleItem: (index: number) => void;
  onToggleShared: (index: number) => void;
  claimedBy?: Map<number, string[]>;
}

export default function ItemList({
  items,
  selectedItems,
  sharedItems,
  onToggleItem,
  onToggleShared,
  claimedBy = new Map(),
}: ItemListProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {items.map((item, index) => {
        const isSelected = selectedItems.has(index);
        const isShared = sharedItems.has(index);
        const shareCount = sharedItems.get(index) || 1;
        const claimers = claimedBy.get(index) || [];
        const itemPrice = isShared ? item.price / shareCount : item.price;

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03 }}
          >
            <div
              onClick={() => onToggleItem(index)}
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '16px',
                borderRadius: '16px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                border: isSelected ? '2px solid #3B82F6' : '2px solid transparent',
                backgroundColor: isSelected ? 'rgba(59, 130, 246, 0.08)' : 'var(--surface)',
              }}
            >
              {/* Checkbox */}
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  transition: 'all 0.2s ease',
                  backgroundColor: isSelected ? '#3B82F6' : 'var(--border-light)',
                  color: isSelected ? 'white' : 'transparent',
                }}
              >
                <AnimatePresence mode="wait">
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Check size={14} strokeWidth={3} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Item Details */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span
                    style={{
                      fontWeight: 500,
                      color: 'var(--text-primary)',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {item.name}
                  </span>
                  {item.quantity > 1 && (
                    <span style={{
                      fontSize: '12px',
                      color: 'var(--text-muted)',
                      backgroundColor: 'var(--border-light)',
                      padding: '2px 6px',
                      borderRadius: '4px',
                    }}>
                      ×{item.quantity}
                    </span>
                  )}
                </div>

                {/* Claimed by indicator */}
                {claimers.length > 0 && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                      {claimers.length === 1
                        ? `${claimers[0]} claimed this`
                        : `${claimers.length} people claimed`}
                    </span>
                  </div>
                )}
              </div>

              {/* Price */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '2px' }}>
                <span
                  style={{
                    fontWeight: 600,
                    fontVariantNumeric: 'tabular-nums',
                    color: isSelected ? '#3B82F6' : 'var(--text-primary)',
                  }}
                >
                  {formatCurrency(itemPrice)}
                </span>
                {isShared && (
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                    ÷{shareCount}
                  </span>
                )}
              </div>

              {/* Share Toggle Button */}
              {isSelected && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleShared(index);
                  }}
                  style={{
                    position: 'absolute',
                    right: '-8px',
                    top: '-8px',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                    border: isShared ? 'none' : '1px solid var(--border)',
                    backgroundColor: isShared ? '#10B981' : 'var(--surface-elevated)',
                    color: isShared ? 'white' : 'var(--text-muted)',
                    cursor: 'pointer',
                  }}
                >
                  <Users size={14} />
                </motion.button>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
