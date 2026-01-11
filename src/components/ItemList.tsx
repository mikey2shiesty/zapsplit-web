'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Check, Users } from 'lucide-react';
import { cn, formatCurrency } from '@/lib/utils';

interface Item {
  name: string;
  price: number;
  quantity: number;
}

interface ItemListProps {
  items: Item[];
  selectedItems: Set<number>;
  sharedItems: Map<number, number>; // itemIndex -> shareCount
  onToggleItem: (index: number) => void;
  onToggleShared: (index: number) => void;
  claimedBy?: Map<number, string[]>; // itemIndex -> array of names who claimed
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
    <div className="space-y-2">
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
              className={cn(
                'relative flex items-center gap-3 p-4 rounded-2xl cursor-pointer transition-all duration-200 tap-scale',
                'border-2',
                isSelected
                  ? 'bg-[var(--primary)]/5 border-[var(--primary)] dark:bg-[var(--primary)]/10'
                  : 'bg-[var(--surface)] border-transparent hover:border-[var(--border)]'
              )}
            >
              {/* Checkbox */}
              <div
                className={cn(
                  'w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200',
                  isSelected
                    ? 'bg-[var(--primary)] text-white'
                    : 'bg-[var(--border-light)] dark:bg-[var(--border)]'
                )}
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
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      'font-medium truncate transition-colors',
                      isSelected ? 'text-[var(--text-primary)]' : 'text-[var(--text-primary)]'
                    )}
                  >
                    {item.name}
                  </span>
                  {item.quantity > 1 && (
                    <span className="text-xs text-[var(--text-muted)] bg-[var(--border-light)] dark:bg-[var(--border)] px-1.5 py-0.5 rounded-md">
                      ×{item.quantity}
                    </span>
                  )}
                </div>

                {/* Claimed by indicator */}
                {claimers.length > 0 && (
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-xs text-[var(--text-muted)]">
                      {claimers.length === 1
                        ? `${claimers[0]} claimed this`
                        : `${claimers.length} people claimed`}
                    </span>
                  </div>
                )}
              </div>

              {/* Price */}
              <div className="flex flex-col items-end gap-1">
                <span
                  className={cn(
                    'font-semibold tabular-nums transition-colors',
                    isSelected ? 'text-[var(--primary)]' : 'text-[var(--text-primary)]'
                  )}
                >
                  {formatCurrency(itemPrice)}
                </span>
                {isShared && (
                  <span className="text-xs text-[var(--text-muted)]">
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
                  className={cn(
                    'absolute -right-2 -top-2 w-8 h-8 rounded-full flex items-center justify-center transition-all',
                    'shadow-lg',
                    isShared
                      ? 'bg-[var(--success)] text-white'
                      : 'bg-[var(--surface-elevated)] text-[var(--text-muted)] border border-[var(--border)]'
                  )}
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
