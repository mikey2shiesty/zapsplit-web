'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Check, Users, Lock } from 'lucide-react';
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
  currentUserEmail?: string; // To check if current user already claimed
}

export default function ItemList({
  items,
  selectedItems,
  sharedItems,
  onToggleItem,
  onToggleShared,
  claimedBy = new Map(),
  currentUserEmail = '',
}: ItemListProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {items.map((item, index) => {
        const isSelected = selectedItems.has(index);
        const isShared = sharedItems.has(index);
        const shareCount = sharedItems.get(index) || 1;
        const claimers = claimedBy.get(index) || [];
        const itemPrice = isShared ? item.price / shareCount : item.price;

        // Check if item is already claimed by someone else (not current user)
        const isClaimedByOthers = claimers.length > 0 && !claimers.some(name =>
          currentUserEmail && name.toLowerCase().includes(currentUserEmail.split('@')[0].toLowerCase())
        );
        const isDisabled = isClaimedByOthers;

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03 }}
          >
            <div
              onClick={() => !isDisabled && onToggleItem(index)}
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '18px 20px',
                borderRadius: '20px',
                cursor: isDisabled ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                border: isDisabled
                  ? '2px solid #E2E8F0'
                  : isSelected
                    ? '2px solid #3B82F6'
                    : '2px solid transparent',
                background: isDisabled
                  ? 'linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%)'
                  : isSelected
                    ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(37, 99, 235, 0.04) 100%)'
                    : '#FFFFFF',
                boxShadow: isDisabled
                  ? 'none'
                  : isSelected
                    ? '0 8px 24px rgba(59, 130, 246, 0.15)'
                    : '0 2px 12px rgba(0, 0, 0, 0.04)',
                opacity: isDisabled ? 0.7 : 1,
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
                  background: isDisabled
                    ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)'
                    : isSelected
                      ? 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)'
                      : 'linear-gradient(135deg, #F1F5F9 0%, #E2E8F0 100%)',
                  boxShadow: isDisabled
                    ? '0 2px 8px rgba(16, 185, 129, 0.2)'
                    : isSelected
                      ? '0 4px 12px rgba(59, 130, 246, 0.3)'
                      : '0 1px 3px rgba(0, 0, 0, 0.04)',
                }}
              >
                <AnimatePresence mode="wait">
                  {isDisabled ? (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.2, type: 'spring', stiffness: 500 }}
                    >
                      <Lock size={14} color="white" strokeWidth={2.5} />
                    </motion.div>
                  ) : isSelected ? (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.2, type: 'spring', stiffness: 500 }}
                    >
                      <Check size={16} color="white" strokeWidth={3} />
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>

              {/* Item Details */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span
                    style={{
                      fontWeight: 600,
                      fontSize: '15px',
                      color: isDisabled ? '#94A3B8' : isSelected ? '#1E40AF' : '#0F172A',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      transition: 'color 0.2s ease',
                      textDecoration: isDisabled ? 'line-through' : 'none',
                    }}
                  >
                    {item.name}
                  </span>
                  {item.quantity > 1 && (
                    <span style={{
                      fontSize: '12px',
                      fontWeight: 600,
                      color: isDisabled ? '#CBD5E1' : '#64748B',
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
                    <span style={{ fontSize: '12px', color: isDisabled ? '#10B981' : '#64748B', fontWeight: 500 }}>
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
                    fontWeight: 700,
                    fontSize: '16px',
                    fontVariantNumeric: 'tabular-nums',
                    color: isDisabled ? '#94A3B8' : isSelected ? '#2563EB' : '#0F172A',
                    transition: 'color 0.2s ease',
                    textDecoration: isDisabled ? 'line-through' : 'none',
                  }}
                >
                  {formatCurrency(itemPrice)}
                </span>
                {isShared && !isDisabled && (
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
                {isDisabled && (
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    color: '#10B981',
                    background: 'rgba(16, 185, 129, 0.1)',
                    padding: '2px 8px',
                    borderRadius: '6px',
                  }}>
                    Claimed
                  </span>
                )}
              </div>

              {/* Share Toggle Button */}
              {isSelected && !isDisabled && (
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
