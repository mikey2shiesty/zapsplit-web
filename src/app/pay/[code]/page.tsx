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
import { formatCurrency, formatDate } from '@/lib/utils';
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
      style={{
        borderRadius: '20px',
        border: isComplete ? '2px solid rgba(16, 185, 129, 0.3)' : '2px solid var(--border-light)',
        backgroundColor: isComplete ? 'rgba(16, 185, 129, 0.05)' : 'var(--surface)',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
      }}
    >
      <button
        onClick={onToggle}
        style={{
          width: '100%',
          padding: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: isComplete ? 'rgba(16, 185, 129, 0.1)' : 'var(--border-light)',
            color: isComplete ? '#10B981' : 'var(--text-muted)',
          }}>
            {isComplete ? <CheckCircle2 size={24} /> : <User size={24} />}
          </div>
          <div style={{ textAlign: 'left' }}>
            {isComplete ? (
              <>
                <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '16px' }}>{name}</div>
                <div style={{ fontSize: '14px', color: 'var(--text-muted)', marginTop: '2px' }}>{email}</div>
              </>
            ) : (
              <>
                <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '16px' }}>Your Details</div>
                <div style={{ fontSize: '14px', color: 'var(--text-muted)', marginTop: '2px' }}>Required for payment</div>
              </>
            )}
          </div>
        </div>
        <motion.div
          animate={{ rotate: isCollapsed ? 0 : 180 }}
          transition={{ duration: 0.2 }}
          style={{ color: 'var(--text-muted)' }}
        >
          <ChevronDown size={20} />
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
            <div style={{
              padding: '0 20px 24px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: 'var(--text-secondary)',
                  marginBottom: '10px',
                }}>
                  Your Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => onNameChange(e.target.value)}
                  placeholder="Enter your name"
                  style={{
                    width: '100%',
                    padding: '16px 18px',
                    borderRadius: '14px',
                    border: '2px solid var(--border)',
                    backgroundColor: 'var(--background)',
                    color: 'var(--text-primary)',
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'all 0.2s ease',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: 'var(--text-secondary)',
                  marginBottom: '10px',
                }}>
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => onEmailChange(e.target.value)}
                  placeholder="your@email.com"
                  style={{
                    width: '100%',
                    padding: '16px 18px',
                    borderRadius: '14px',
                    border: '2px solid var(--border)',
                    backgroundColor: 'var(--background)',
                    color: 'var(--text-primary)',
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'all 0.2s ease',
                    boxSizing: 'border-box',
                  }}
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
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--background)', paddingBottom: '2rem' }}>
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          backgroundColor: 'var(--background)',
          borderBottom: '1px solid var(--border-light)',
          paddingTop: 'env(safe-area-inset-top, 0px)',
        }}
      >
        <div style={{ maxWidth: '448px', margin: '0 auto', padding: '12px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              backgroundColor: '#3B82F6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Zap size={18} color="white" />
            </div>
            <span style={{ fontWeight: 700, fontSize: '18px', color: 'var(--text-primary)' }}>ZapSplit</span>
          </div>
        </div>
      </motion.header>

      <main style={{ maxWidth: '448px', margin: '0 auto', padding: '0 16px' }}>
        {/* Split Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ paddingTop: '24px', textAlign: 'center' }}
        >
          {/* Creator Avatar */}
          <div style={{
            width: '80px',
            height: '80px',
            margin: '0 auto',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '28px',
            fontWeight: 700,
            boxShadow: '0 10px 25px rgba(59, 130, 246, 0.3)',
          }}>
            {split.creator?.full_name?.charAt(0) || '?'}
          </div>

          <h1 style={{ marginTop: '16px', fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)' }}>
            {split.title || 'Bill Split'}
          </h1>

          <p style={{ marginTop: '4px', color: 'var(--text-muted)' }}>
            from <span style={{ fontWeight: 500, color: 'var(--text-secondary)' }}>
              {split.creator?.full_name || 'Someone'}
            </span>
          </p>

          <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', fontSize: '14px', color: 'var(--text-muted)' }}>
            <Clock size={14} />
            <span>{formatDate(split.created_at)}</span>
          </div>

          <div style={{
            marginTop: '12px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            borderRadius: '9999px',
            backgroundColor: 'var(--surface)',
            border: '1px solid var(--border-light)',
          }}>
            <Receipt size={16} color="#3B82F6" />
            <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
              {formatCurrency(split.total_amount)}
            </span>
            <span style={{ color: 'var(--text-muted)' }}>total</span>
          </div>
        </motion.div>

        {/* User Info Section */}
        <div style={{ marginTop: '32px' }}>
          <UserInfoForm
            name={userName}
            email={userEmail}
            onNameChange={setUserName}
            onEmailChange={setUserEmail}
            isCollapsed={userInfoCollapsed}
            onToggle={() => setUserInfoCollapsed(!userInfoCollapsed)}
          />
        </div>

        {/* Items Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{ marginTop: '32px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h2 style={{ fontWeight: 700, fontSize: '18px', color: 'var(--text-primary)' }}>
              Select Your Items
            </h2>
            <span style={{ fontSize: '14px', color: 'var(--text-muted)', backgroundColor: 'var(--surface)', padding: '6px 12px', borderRadius: '20px' }}>
              {selectedItems.size} of {items.length}
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
        <div style={{ marginTop: '32px' }}>
          <PaymentSummary
            itemsTotal={itemsTotal}
            taxShare={taxShare}
            tipShare={tipShare}
            total={total}
            selectedCount={selectedItems.size}
          />
        </div>

        {/* Payment Error */}
        {paymentError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              marginTop: '16px',
              padding: '16px',
              borderRadius: '12px',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
            }}
          >
            <p style={{ fontSize: '14px', color: '#EF4444' }}>{paymentError}</p>
            <button
              onClick={() => setPaymentError(null)}
              style={{ marginTop: '8px', fontSize: '14px', color: 'var(--text-muted)', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              Try again
            </button>
          </motion.div>
        )}

        {/* Pay Button */}
        <div style={{ marginTop: '32px', paddingBottom: 'max(env(safe-area-inset-bottom, 20px), 20px)' }}>
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
