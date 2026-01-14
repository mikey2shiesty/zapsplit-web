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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
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
                gap: '16px',
                padding: '18px 20px',
                borderRadius: '20px',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                border: isSelected ? '2px solid #3B82F6' : '2px solid transparent',
                background: isSelected
                  ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(37, 99, 235, 0.04) 100%)'
                  : '#FFFFFF',
                boxShadow: isSelected
                  ? '0 8px 24px rgba(59, 130, 246, 0.15)'
                  : '0 2px 12px rgba(0, 0, 0, 0.04)',
              }}
            >
              {/* Premium Checkbox */}
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  background: isSelected
                    ? 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)'
                    : 'linear-gradient(135deg, #F1F5F9 0%, #E2E8F0 100%)',
                  boxShadow: isSelected
                    ? '0 4px 12px rgba(59, 130, 246, 0.3)'
                    : '0 1px 3px rgba(0, 0, 0, 0.04)',
                }}
              >
                <AnimatePresence mode="wait">
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.2, type: 'spring', stiffness: 500 }}
                    >
                      <Check size={16} color="white" strokeWidth={3} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Item Details */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span
                    style={{
                      fontWeight: 600,
                      fontSize: '15px',
                      color: isSelected ? '#1E40AF' : '#0F172A',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      transition: 'color 0.2s ease',
                    }}
                  >
                    {item.name}
                  </span>
                  {item.quantity > 1 && (
                    <span style={{
                      fontSize: '12px',
                      fontWeight: 600,
                      color: '#64748B',
                      background: 'linear-gradient(135deg, #F1F5F9 0%, #E2E8F0 100%)',
                      padding: '4px 10px',
                      borderRadius: '8px',
                    }}>
                      x{item.quantity}
                    </span>
                  )}
                </div>

                {/* Claimed by indicator */}
                {claimers.length > 0 && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px' }}>
                    <div style={{
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <Users size={8} color="white" />
                    </div>
                    <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 500 }}>
                      {claimers.length === 1
                        ? `${claimers[0]} claimed`
                        : `${claimers.length} people claimed`}
                    </span>
                  </div>
                )}
              </div>

              {/* Price */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '2px' }}>
                <span
                  style={{
                    fontWeight: 700,
                    fontSize: '16px',
                    fontVariantNumeric: 'tabular-nums',
                    color: isSelected ? '#2563EB' : '#0F172A',
                    transition: 'color 0.2s ease',
                  }}
                >
                  {formatCurrency(itemPrice)}
                </span>
                {isShared && (
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    color: '#10B981',
                    background: 'rgba(16, 185, 129, 0.1)',
                    padding: '2px 8px',
                    borderRadius: '6px',
                  }}>
                    ÷{shareCount} split
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
                    right: '-10px',
                    top: '-10px',
                    width: '36px',
                    height: '36px',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                    border: 'none',
                    background: isShared
                      ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)'
                      : '#FFFFFF',
                    color: isShared ? 'white' : '#64748B',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <Users size={16} />
                </motion.button>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
