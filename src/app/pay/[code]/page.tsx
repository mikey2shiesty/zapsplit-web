'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams } from 'next/navigation';
import {
  Receipt,
  User,
  AlertCircle,
  ChevronDown,
  Zap,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { cn, formatCurrency, formatDate } from '@/lib/utils';
import { getSplitByCode, SplitWithDetails, SplitItem } from '@/lib/supabase';
import ItemList from '@/components/ItemList';
import PaymentSummary from '@/components/PaymentSummary';
import PayButton from '@/components/PayButton';
import StripeProvider from '@/components/StripeProvider';

// Loading skeleton component
function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-[var(--background)] p-4">
      <div className="max-w-md mx-auto pt-8 space-y-6">
        {/* Header skeleton */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 mx-auto rounded-full shimmer" />
          <div className="h-8 w-48 mx-auto rounded-lg shimmer" />
          <div className="h-4 w-32 mx-auto rounded-lg shimmer" />
        </div>

        {/* Items skeleton */}
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-16 rounded-2xl shimmer" />
          ))}
        </div>

        {/* Summary skeleton */}
        <div className="h-40 rounded-3xl shimmer" />

        {/* Button skeleton */}
        <div className="h-20 rounded-2xl shimmer" />
      </div>
    </div>
  );
}

// Error state component
function ErrorState({ message }: { message: string }) {
  return (
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-4 max-w-sm"
      >
        <div className="w-20 h-20 mx-auto rounded-full bg-[var(--error)]/10 flex items-center justify-center">
          <AlertCircle size={40} className="text-[var(--error)]" />
        </div>
        <h1 className="text-xl font-bold text-[var(--text-primary)]">
          Link Not Found
        </h1>
        <p className="text-[var(--text-muted)]">{message}</p>
      </motion.div>
    </div>
  );
}

// User info input component
function UserInfoForm({
  name,
  email,
  onNameChange,
  onEmailChange,
  isCollapsed,
  onToggle
}: {
  name: string;
  email: string;
  onNameChange: (name: string) => void;
  onEmailChange: (email: string) => void;
  isCollapsed: boolean;
  onToggle: () => void;
}) {
  const isComplete = name.trim() && email.trim() && email.includes('@');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'rounded-2xl border transition-all duration-300 overflow-hidden',
        isComplete
          ? 'bg-[var(--success)]/5 border-[var(--success)]/30'
          : 'bg-[var(--surface)] border-[var(--border-light)]'
      )}
    >
      <button
        onClick={onToggle}
        className="w-full p-4 flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <div className={cn(
            'w-10 h-10 rounded-xl flex items-center justify-center',
            isComplete
              ? 'bg-[var(--success)]/10 text-[var(--success)]'
              : 'bg-[var(--border-light)] text-[var(--text-muted)]'
          )}>
            {isComplete ? <CheckCircle2 size={20} /> : <User size={20} />}
          </div>
          <div className="text-left">
            {isComplete ? (
              <>
                <div className="font-medium text-[var(--text-primary)]">{name}</div>
                <div className="text-sm text-[var(--text-muted)]">{email}</div>
              </>
            ) : (
              <>
                <div className="font-medium text-[var(--text-primary)]">Your Details</div>
                <div className="text-sm text-[var(--text-muted)]">Required for payment</div>
              </>
            )}
          </div>
        </div>
        <motion.div
          animate={{ rotate: isCollapsed ? 0 : 180 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={20} className="text-[var(--text-muted)]" />
        </motion.div>
      </button>

      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-4 pb-4 space-y-3">
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => onNameChange(e.target.value)}
                  placeholder="Enter your name"
                  className={cn(
                    'w-full px-4 py-3 rounded-xl border bg-[var(--background)] transition-all',
                    'text-[var(--text-primary)] placeholder:text-[var(--text-muted)]',
                    'focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent',
                    'border-[var(--border)]'
                  )}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => onEmailChange(e.target.value)}
                  placeholder="your@email.com"
                  className={cn(
                    'w-full px-4 py-3 rounded-xl border bg-[var(--background)] transition-all',
                    'text-[var(--text-primary)] placeholder:text-[var(--text-muted)]',
                    'focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent',
                    'border-[var(--border)]'
                  )}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function PaymentPage() {
  const params = useParams();
  const code = params.code as string;

  // State
  const [split, setSplit] = useState<SplitWithDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());
  const [sharedItems, setSharedItems] = useState<Map<number, number>>(new Map());
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userInfoCollapsed, setUserInfoCollapsed] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  // Fetch split data
  useEffect(() => {
    async function fetchSplit() {
      if (!code) return;

      try {
        const data = await getSplitByCode(code);
        if (data) {
          setSplit(data);
        } else {
          setError('This payment link is invalid or has expired.');
        }
      } catch (err) {
        console.error('Error fetching split:', err);
        setError('Failed to load payment details. Please try again.');
      } finally {
        setLoading(false);
      }
    }

    fetchSplit();
  }, [code]);

  // Calculate totals
  const { itemsTotal, taxShare, tipShare, total } = useMemo(() => {
    if (!split?.items) {
      return { itemsTotal: 0, taxShare: 0, tipShare: 0, total: 0 };
    }

    const items = split.items as SplitItem[];
    const selectedItemsTotal = Array.from(selectedItems).reduce((sum, index) => {
      const item = items[index];
      if (!item) return sum;
      const shareCount = sharedItems.get(index) || 1;
      return sum + (item.price / shareCount);
    }, 0);

    // Calculate proportional tax and tip
    const billSubtotal = items.reduce((sum, item) => sum + item.price, 0);
    const proportion = billSubtotal > 0 ? selectedItemsTotal / billSubtotal : 0;

    // Assuming tax and tip are stored in the split (you may need to adjust based on actual data)
    const totalTax = (split.total_amount - billSubtotal) * 0.5 || 0; // Rough estimate
    const totalTip = (split.total_amount - billSubtotal) * 0.5 || 0; // Rough estimate

    const calcTaxShare = totalTax * proportion;
    const calcTipShare = totalTip * proportion;
    const calcTotal = selectedItemsTotal + calcTaxShare + calcTipShare;

    return {
      itemsTotal: selectedItemsTotal,
      taxShare: calcTaxShare,
      tipShare: calcTipShare,
      total: calcTotal,
    };
  }, [split, selectedItems, sharedItems]);

  // Build claimed by map from existing claims
  const claimedBy = useMemo(() => {
    const map = new Map<number, string[]>();
    if (split?.claims) {
      split.claims.forEach(claim => {
        const existing = map.get(claim.item_index) || [];
        existing.push(claim.claimed_by_name);
        map.set(claim.item_index, existing);
      });
    }
    return map;
  }, [split?.claims]);

  // Handlers
  const handleToggleItem = (index: number) => {
    setSelectedItems(prev => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
        // Also remove from shared if deselected
        setSharedItems(prevShared => {
          const nextShared = new Map(prevShared);
          nextShared.delete(index);
          return nextShared;
        });
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const handleToggleShared = (index: number) => {
    setSharedItems(prev => {
      const next = new Map(prev);
      if (next.has(index)) {
        const current = next.get(index)!;
        if (current >= 4) {
          next.delete(index); // Reset after 4
        } else {
          next.set(index, current + 1);
        }
      } else {
        next.set(index, 2); // Start at splitting by 2
      }
      return next;
    });
  };

  const handlePaymentSuccess = () => {
    setPaymentSuccess(true);
  };

  const handlePaymentError = (errorMessage: string) => {
    setPaymentError(errorMessage);
  };

  // Loading state
  if (loading) {
    return <LoadingSkeleton />;
  }

  // Error state
  if (error || !split) {
    return <ErrorState message={error || 'Payment link not found'} />;
  }

  // Success state
  if (paymentSuccess) {
    return (
      <PaymentSuccessScreen
        recipientName={split.creator?.full_name || 'Unknown'}
        amount={total}
      />
    );
  }

  const items = (split.items || []) as SplitItem[];
  const isUserInfoComplete = userName.trim() && userEmail.trim() && userEmail.includes('@');

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-50 glass safe-top"
      >
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[var(--primary)] flex items-center justify-center">
              <Zap size={18} className="text-white" />
            </div>
            <span className="font-bold text-lg text-[var(--text-primary)]">ZapSplit</span>
          </div>
        </div>
      </motion.header>

      <main className="max-w-md mx-auto px-4 pb-8 space-y-6">
        {/* Split Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="pt-4 text-center"
        >
          {/* Creator Avatar */}
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-[var(--primary)]/20">
            {split.creator?.full_name?.charAt(0) || '?'}
          </div>

          <h1 className="mt-4 text-2xl font-bold text-[var(--text-primary)]">
            {split.title || 'Bill Split'}
          </h1>

          <p className="mt-1 text-[var(--text-muted)]">
            from <span className="font-medium text-[var(--text-secondary)]">
              {split.creator?.full_name || 'Someone'}
            </span>
          </p>

          <div className="mt-2 flex items-center justify-center gap-1 text-sm text-[var(--text-muted)]">
            <Clock size={14} />
            <span>{formatDate(split.created_at)}</span>
          </div>

          <div className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--surface)] border border-[var(--border-light)]">
            <Receipt size={16} className="text-[var(--primary)]" />
            <span className="font-semibold text-[var(--text-primary)]">
              {formatCurrency(split.total_amount)}
            </span>
            <span className="text-[var(--text-muted)]">total</span>
          </div>
        </motion.div>

        {/* User Info Section */}
        <UserInfoForm
          name={userName}
          email={userEmail}
          onNameChange={setUserName}
          onEmailChange={setUserEmail}
          isCollapsed={userInfoCollapsed}
          onToggle={() => setUserInfoCollapsed(!userInfoCollapsed)}
        />

        {/* Items Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-[var(--text-primary)]">
              Select Your Items
            </h2>
            <span className="text-sm text-[var(--text-muted)]">
              {selectedItems.size} of {items.length} selected
            </span>
          </div>

          <ItemList
            items={items}
            selectedItems={selectedItems}
            sharedItems={sharedItems}
            onToggleItem={handleToggleItem}
            onToggleShared={handleToggleShared}
            claimedBy={claimedBy}
          />
        </motion.div>

        {/* Payment Summary */}
        <PaymentSummary
          itemsTotal={itemsTotal}
          taxShare={taxShare}
          tipShare={tipShare}
          total={total}
          selectedCount={selectedItems.size}
        />

        {/* Payment Error */}
        {paymentError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-xl bg-[var(--error)]/10 border border-[var(--error)]/30"
          >
            <p className="text-sm text-[var(--error)]">{paymentError}</p>
            <button
              onClick={() => setPaymentError(null)}
              className="mt-2 text-sm text-[var(--text-muted)] underline"
            >
              Try again
            </button>
          </motion.div>
        )}

        {/* Pay Button */}
        <div className="safe-bottom">
          <StripeProvider>
            <PayButton
              amount={total}
              recipientName={split.creator?.full_name || 'Unknown'}
              creatorStripeAccountId={split.creator?.stripe_connect_account_id}
              splitId={split.id}
              payerName={userName}
              payerEmail={userEmail}
              disabled={!isUserInfoComplete || selectedItems.size === 0}
              onSuccess={handlePaymentSuccess}
              onError={handlePaymentError}
            />
          </StripeProvider>
        </div>
      </main>
    </div>
  );
}

// Payment success component
function PaymentSuccessScreen({ recipientName, amount }: { recipientName: string; amount: number }) {
  return (
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-6 max-w-sm"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-24 h-24 mx-auto rounded-full bg-[var(--success)]/10 flex items-center justify-center"
        >
          <CheckCircle2 size={48} className="text-[var(--success)]" />
        </motion.div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">
            Payment Successful!
          </h1>
          <p className="text-[var(--text-muted)]">
            You paid <span className="font-semibold text-[var(--text-secondary)]">{formatCurrency(amount)}</span> to{' '}
            <span className="font-semibold text-[var(--text-secondary)]">{recipientName}</span>
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="pt-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--surface)] border border-[var(--border-light)]">
            <Zap size={16} className="text-[var(--primary)]" />
            <span className="text-sm text-[var(--text-muted)]">Powered by ZapSplit</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
