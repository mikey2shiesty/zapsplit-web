'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Check, Users, Minus, Plus } from 'lucide-react';
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
}: ItemListProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {items.map((item, index) => {
        const isSelected = selectedItems.has(index);
        const isShared = sharedItems.has(index);
        const shareCount = sharedItems.get(index) || 1;
        const claim = claimInfo.get(index) || { names: [], totalQtyClaimed: 0 };
        const claimers = claim.names;
        const totalQtyClaimed = Number(claim.totalQtyClaimed) || 0;

        const itemQty = Number(item.quantity) || 1;
        const qtyRemaining = Math.max(0, itemQty - totalQtyClaimed);
        const selectedQty = selectedQuantities.get(index) || 1;
        const unitPrice = Number(item.unit_price) || (Number(item.price) / itemQty);
        const itemPrice = isShared ? (unitPrice * selectedQty) / shareCount : unitPrice * selectedQty;

        const isFullyClaimed = qtyRemaining === 0;
        const isDisabled = isFullyClaimed;

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.02 }}
          >
            <div
              onClick={() => !isDisabled && onToggleItem(index)}
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                padding: '14px 16px',
                borderRadius: '12px',
                cursor: isDisabled ? 'not-allowed' : 'pointer',
                transition: 'all 0.15s ease',
                border: isDisabled
                  ? '1px solid #E5E7EB'
                  : isSelected
                    ? '1.5px solid #0F172A'
                    : '1px solid #E5E7EB',
                background: '#FFFFFF',
                boxShadow: isSelected
                  ? '0 1px 3px rgba(0,0,0,0.08)'
                  : '0 1px 3px rgba(0,0,0,0.04)',
                opacity: isDisabled ? 0.6 : 1,
              }}
            >
              {/* Checkbox */}
              <div
                style={{
                  width: '22px',
                  height: '22px',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  transition: 'all 0.15s ease',
                  background: isDisabled
                    ? '#D1D5DB'
                    : isSelected
                      ? '#0F172A'
                      : '#FFFFFF',
                  border: isDisabled
                    ? 'none'
                    : isSelected
                      ? 'none'
                      : '1.5px solid #D1D5DB',
                }}
              >
                <AnimatePresence mode="wait">
                  {(isDisabled || isSelected) && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Check size={13} color="white" strokeWidth={3} />
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
                      fontSize: '14px',
                      color: isDisabled ? '#9CA3AF' : '#0F172A',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      textDecoration: isDisabled ? 'line-through' : 'none',
                    }}
                  >
                    {item.name}
                  </span>
                  {itemQty > 1 && (
                    <span style={{
                      fontSize: '12px',
                      fontWeight: 500,
                      color: '#9CA3AF',
                      background: '#F3F4F6',
                      padding: '2px 8px',
                      borderRadius: '4px',
                    }}>
                      x{itemQty}
                    </span>
                  )}
                </div>

                {/* Claimed indicator — plain text */}
                {claimers.length > 0 && (
                  <span style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '4px', display: 'block' }}>
                    {itemQty > 1
                      ? `${totalQtyClaimed} of ${itemQty} claimed`
                      : claimers.length === 1
                        ? `${claimers[0]} claimed this`
                        : `${claimers.length} people claimed`}
                  </span>
                )}

                {/* Quantity selector */}
                {isSelected && !isDisabled && itemQty > 1 && qtyRemaining > 0 && (
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginTop: '8px',
                    background: '#F3F4F6',
                    padding: '4px 8px',
                    borderRadius: '6px',
                  }}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onQuantityChange(index, -1);
                      }}
                      disabled={selectedQty <= 1}
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '6px',
                        border: 'none',
                        background: selectedQty <= 1 ? '#E5E7EB' : '#D1D5DB',
                        color: selectedQty <= 1 ? '#9CA3AF' : '#374151',
                        cursor: selectedQty <= 1 ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Minus size={12} />
                    </button>
                    <span style={{
                      minWidth: '18px',
                      textAlign: 'center',
                      fontWeight: 600,
                      fontSize: '13px',
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
                        width: '24px',
                        height: '24px',
                        borderRadius: '6px',
                        border: 'none',
                        background: selectedQty >= qtyRemaining ? '#E5E7EB' : '#D1D5DB',
                        color: selectedQty >= qtyRemaining ? '#9CA3AF' : '#374151',
                        cursor: selectedQty >= qtyRemaining ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Plus size={12} />
                    </button>
                    <span style={{ fontSize: '11px', color: '#9CA3AF', fontWeight: 500, marginLeft: '2px' }}>
                      /{qtyRemaining}
                    </span>
                  </div>
                )}
              </div>

              {/* Price */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '2px' }}>
                <span
                  style={{
                    fontWeight: 600,
                    fontSize: '14px',
                    fontVariantNumeric: 'tabular-nums',
                    color: isDisabled ? '#9CA3AF' : '#0F172A',
                    textDecoration: isDisabled ? 'line-through' : 'none',
                  }}
                >
                  {formatCurrency(itemPrice)}
                </span>
                {isShared && !isDisabled && (
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 500,
                    color: '#64748B',
                  }}>
                    /{shareCount} split
                  </span>
                )}
                {isDisabled && (
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 500,
                    color: '#9CA3AF',
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
                    right: '-8px',
                    top: '-8px',
                    width: '28px',
                    height: '28px',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
                    border: isShared ? 'none' : '1px solid #E5E7EB',
                    background: isShared ? '#0F172A' : '#FFFFFF',
                    color: isShared ? 'white' : '#64748B',
                    cursor: 'pointer',
                  }}
                >
                  <Users size={13} />
                </motion.button>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
