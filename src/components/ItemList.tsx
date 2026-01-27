'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Check, Users, Lock, Plus, Minus } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface Item {
  name: string;
  price: number;
  quantity: number;
  unit_price: number;
}

interface ClaimInfo {
  names: string[];
  totalQtyClaimed: number;
}

interface ItemListProps {
  items: Item[];
  selectedItems: Set<number>;
  sharedItems: Map<number, number>;
  selectedQuantities: Map<number, number>;
  onToggleItem: (index: number) => void;
  onToggleShared: (index: number) => void;
  onQuantityChange: (index: number, delta: number) => void;
  claimInfo?: Map<number, ClaimInfo>;
  currentUserEmail?: string;
}

export default function ItemList({
  items,
  selectedItems,
  sharedItems,
  selectedQuantities,
  onToggleItem,
  onToggleShared,
  onQuantityChange,
  claimInfo = new Map(),
  currentUserEmail = '',
}: ItemListProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {items.map((item, index) => {
        const isSelected = selectedItems.has(index);
        const isShared = sharedItems.has(index);
        const shareCount = sharedItems.get(index) || 1;
        const claim = claimInfo.get(index) || { names: [], totalQtyClaimed: 0 };
        const claimers = claim.names;
        const totalQtyClaimed = Number(claim.totalQtyClaimed) || 0;

        // Calculate remaining quantity - ensure numeric comparison
        const itemQty = Number(item.quantity) || 1;
        const qtyRemaining = Math.max(0, itemQty - totalQtyClaimed);
        const selectedQty = selectedQuantities.get(index) || 1;
        const unitPrice = Number(item.unit_price) || (Number(item.price) / itemQty);
        const itemPrice = isShared ? (unitPrice * selectedQty) / shareCount : unitPrice * selectedQty;

        // Item is fully claimed if no quantity remaining
        const isFullyClaimed = qtyRemaining === 0;
        const isDisabled = isFullyClaimed;

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
                  {itemQty > 1 && (
                    <span style={{
                      fontSize: '12px',
                      fontWeight: 600,
                      color: isDisabled ? '#CBD5E1' : '#64748B',
                      background: 'linear-gradient(135deg, #F1F5F9 0%, #E2E8F0 100%)',
                      padding: '4px 10px',
                      borderRadius: '8px',
                    }}>
                      x{itemQty}
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
                      {itemQty > 1
                        ? `${totalQtyClaimed} of ${itemQty} claimed`
                        : claimers.length === 1
                          ? `${claimers[0]} claimed this`
                          : `${claimers.length} people claimed`}
                    </span>
                  </div>
                )}

                {/* Quantity selector for items with multiple quantities */}
                {isSelected && !isDisabled && itemQty > 1 && qtyRemaining > 0 && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginTop: '8px',
                    background: 'linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%)',
                    padding: '8px 12px',
                    borderRadius: '12px',
                  }}>
                    <span style={{ fontSize: '13px', color: '#64748B', fontWeight: 500 }}>
                      Quantity:
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onQuantityChange(index, -1);
                        }}
                        disabled={selectedQty <= 1}
                        style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '8px',
                          border: 'none',
                          background: selectedQty <= 1
                            ? '#E2E8F0'
                            : 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
                          color: selectedQty <= 1 ? '#94A3B8' : 'white',
                          cursor: selectedQty <= 1 ? 'not-allowed' : 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: selectedQty <= 1 ? 'none' : '0 2px 8px rgba(59, 130, 246, 0.3)',
                        }}
                      >
                        <Minus size={14} />
                      </button>
                      <span style={{
                        minWidth: '32px',
                        textAlign: 'center',
                        fontWeight: 700,
                        fontSize: '15px',
                        color: '#0F172A',
                      }}>
                        {selectedQty}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onQuantityChange(index, 1);
                        }}
                        disabled={selectedQty >= qtyRemaining}
                        style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '8px',
                          border: 'none',
                          background: selectedQty >= qtyRemaining
                            ? '#E2E8F0'
                            : 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
                          color: selectedQty >= qtyRemaining ? '#94A3B8' : 'white',
                          cursor: selectedQty >= qtyRemaining ? 'not-allowed' : 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: selectedQty >= qtyRemaining ? 'none' : '0 2px 8px rgba(59, 130, 246, 0.3)',
                        }}
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <span style={{ fontSize: '12px', color: '#94A3B8', fontWeight: 500 }}>
                      of {qtyRemaining} available
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
