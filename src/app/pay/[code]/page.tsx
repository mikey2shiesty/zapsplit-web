'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams } from 'next/navigation';
import {
  AlertCircle,
  ChevronDown,
  CheckCircle2
} from 'lucide-react';
import Image from 'next/image';
import { formatCurrency, formatDate } from '@/lib/utils';
import { getSplitByCode, SplitWithDetails, SplitItem, saveItemClaims, createPaymentRecord } from '@/lib/supabase';
import ItemList from '@/components/ItemList';
import PaymentSummary from '@/components/PaymentSummary';
import PayButton from '@/components/PayButton';

// Loading skeleton — flat white with grey shimmers
function LoadingSkeleton() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#FAFAFA',
      padding: '16px',
    }}>
      <div className="pay-skeleton-inner">
        <div style={{
          width: '180px',
          height: '24px',
          margin: '0 auto',
          borderRadius: '6px',
          background: 'linear-gradient(90deg, #E5E7EB 25%, #F3F4F6 50%, #E5E7EB 75%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 1.5s infinite',
        }} />
        <div style={{
          width: '240px',
          height: '16px',
          margin: '16px auto 0',
          borderRadius: '6px',
          background: 'linear-gradient(90deg, #E5E7EB 25%, #F3F4F6 50%, #E5E7EB 75%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 1.5s infinite',
        }} />
        <div style={{
          width: '100%',
          height: '120px',
          margin: '32px auto 0',
          borderRadius: '12px',
          background: 'linear-gradient(90deg, #E5E7EB 25%, #F3F4F6 50%, #E5E7EB 75%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 1.5s infinite',
        }} />
        <style>{`
          @keyframes shimmer {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }
        `}</style>
      </div>
    </div>
  );
}

// Error state — clean, minimal
function ErrorState({ message }: { message: string }) {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#FAFAFA',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
    }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{ textAlign: 'center', maxWidth: '320px' }}
      >
        <div style={{
          width: '56px',
          height: '56px',
          margin: '0 auto',
          borderRadius: '50%',
          background: '#FEF2F2',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <AlertCircle size={28} color="#DC2626" />
        </div>
        <h1 style={{
          marginTop: '20px',
          fontSize: '20px',
          fontWeight: 600,
          color: '#0F172A',
        }}>
          Link not found
        </h1>
        <p style={{
          marginTop: '8px',
          color: '#64748B',
          fontSize: '15px',
          lineHeight: 1.5,
        }}>{message}</p>
      </motion.div>
    </div>
  );
}

// User info form — clean card, no icon squares
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
        background: '#FFFFFF',
        borderRadius: '12px',
        border: '1px solid #E5E7EB',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
        overflow: 'hidden',
      }}
    >
      <button
        onClick={onToggle}
        style={{
          width: '100%',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        <div style={{ textAlign: 'left' }}>
          {isComplete ? (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontWeight: 600, fontSize: '15px', color: '#0F172A' }}>{name}</span>
                <CheckCircle2 size={16} color="#10B981" />
              </div>
              <div style={{ fontSize: '14px', color: '#64748B', marginTop: '2px' }}>{email}</div>
            </>
          ) : (
            <>
              <div style={{ fontWeight: 600, fontSize: '15px', color: '#0F172A' }}>Your details</div>
              <div style={{ fontSize: '14px', color: '#94A3B8', marginTop: '2px' }}>Required for payment</div>
            </>
          )}
        </div>
        <motion.div
          animate={{ rotate: isCollapsed ? 0 : 180 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={18} color="#94A3B8" />
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
              padding: '0 20px 20px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}>
              <div style={{ height: '1px', background: '#F1F5F9' }} />

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: 500,
                  color: '#475569',
                  marginBottom: '6px',
                }}>
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => onNameChange(e.target.value)}
                  placeholder="Your name"
                  className="input-field"
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: 500,
                  color: '#475569',
                  marginBottom: '6px',
                }}>
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => onEmailChange(e.target.value)}
                  placeholder="you@example.com"
                  className="input-field"
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
  const [selectedQuantities, setSelectedQuantities] = useState<Map<number, number>>(new Map());
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

  // Dynamic fee: covers Stripe fees (1.75% + $0.30) + $0.50 profit
  // Formula: fee = (0.80 + 0.0175 * amount) / 0.9825
  const calculateFee = (amount: number) => {
    if (amount <= 0) return 0;
    return Math.round(((0.80 + 0.0175 * amount) / 0.9825) * 100) / 100;
  };

  // Calculate totals
  const { itemsTotal, serviceFee, total } = useMemo(() => {
    if (!split?.items) {
      return { itemsTotal: 0, serviceFee: 0, total: 0 };
    }

    const items = split.items as SplitItem[];
    const selectedItemsTotal = Array.from(selectedItems).reduce((sum, index) => {
      const item = items[index];
      if (!item) return sum;
      const shareCount = sharedItems.get(index) || 1;
      const qty = selectedQuantities.get(index) || 1;
      const itemQty = Number(item.quantity) || 1;
      const unitPrice = Number(item.unit_price) || (Number(item.price) / itemQty);
      return sum + ((unitPrice * qty) / shareCount);
    }, 0);

    const calcServiceFee = calculateFee(selectedItemsTotal);

    const calcTotal = selectedItemsTotal + calcServiceFee;

    return {
      itemsTotal: Math.round(selectedItemsTotal * 100) / 100,
      serviceFee: Math.round(calcServiceFee * 100) / 100,
      total: Math.round(calcTotal * 100) / 100,
    };
  }, [split, selectedItems, sharedItems, selectedQuantities]);

  // Build claim info map with names and total quantity claimed
  const claimInfo = useMemo(() => {
    const map = new Map<number, { names: string[]; totalQtyClaimed: number }>();
    if (split?.claims) {
      split.claims.forEach(claim => {
        const existing = map.get(claim.item_index) || { names: [], totalQtyClaimed: 0 };
        existing.names.push(claim.claimed_by_name);
        existing.totalQtyClaimed += Number(claim.quantity_claimed) || 1;
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
        setSharedItems(prevShared => {
          const nextShared = new Map(prevShared);
          nextShared.delete(index);
          return nextShared;
        });
        setSelectedQuantities(prevQty => {
          const nextQty = new Map(prevQty);
          nextQty.delete(index);
          return nextQty;
        });
      } else {
        next.add(index);
        setSelectedQuantities(prevQty => {
          const nextQty = new Map(prevQty);
          nextQty.set(index, 1);
          return nextQty;
        });
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
          next.delete(index);
        } else {
          next.set(index, current + 1);
        }
      } else {
        next.set(index, 2);
      }
      return next;
    });
  };

  const handleQuantityChange = (index: number, delta: number) => {
    const items = (split?.items || []) as SplitItem[];
    const item = items[index];
    if (!item) return;

    const claim = claimInfo.get(index);
    const totalQtyClaimed = Number(claim?.totalQtyClaimed) || 0;
    const itemQty = Number(item.quantity) || 1;
    const qtyRemaining = Math.max(0, itemQty - totalQtyClaimed);

    setSelectedQuantities(prev => {
      const next = new Map(prev);
      const current = next.get(index) || 1;
      const newQty = Math.max(1, Math.min(qtyRemaining, current + delta));
      next.set(index, newQty);
      return next;
    });
  };

  const handlePaymentSuccess = async () => {
    if (split && selectedItems.size > 0) {
      const items = (split.items || []) as SplitItem[];
      const claims = Array.from(selectedItems).map(index => {
        const item = items[index];
        const qty = selectedQuantities.get(index) || 1;
        const itemQty = Number(item?.quantity) || 1;
        const unitPrice = Number(item?.unit_price) || (Number(item?.price) || 0) / itemQty;
        return {
          itemIndex: index,
          itemName: item?.name || `Item ${index + 1}`,
          itemAmount: unitPrice * qty,
          claimedByEmail: userEmail,
          claimedByName: userName,
          shareCount: sharedItems.get(index) || 1,
          quantityClaimed: qty,
        };
      });

      await saveItemClaims(
        split.id,
        split.payment_link_id || '',
        claims
      );

      await createPaymentRecord(
        split.id,
        split.payment_link_id || null,
        userEmail,
        userName,
        total,
        split.creator_id,
        split.creator?.payid || null
      );
    }

    setPaymentSuccess(true);
  };
  const handlePaymentError = (errorMessage: string) => setPaymentError(errorMessage);

  if (loading) return <LoadingSkeleton />;
  if (error || !split) return <ErrorState message={error || 'Payment link not found'} />;
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
    <div style={{
      minHeight: '100vh',
      background: '#FAFAFA',
    }}>
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid #F1F5F9',
          paddingTop: 'env(safe-area-inset-top, 0px)',
        }}
      >
        <div className="pay-header-inner">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Image src="/logo.png" alt="ZapSplit" width={28} height={28} />
              <span style={{ fontWeight: 700, fontSize: '17px', color: '#0F172A', letterSpacing: '-0.3px' }}>ZapSplit</span>
            </div>
            <span style={{ fontSize: '12px', color: '#94A3B8', fontWeight: 500 }}>Secure checkout</span>
          </div>
        </div>
      </motion.header>

      <main className="pay-main">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ paddingTop: '32px', textAlign: 'center' }}
        >
          <h1 style={{
            fontSize: '24px',
            fontWeight: 700,
            color: '#0F172A',
            letterSpacing: '-0.5px',
            lineHeight: 1.2,
          }}>
            {split.title || 'Bill Split'}
          </h1>

          <p style={{ marginTop: '6px', color: '#64748B', fontSize: '15px' }}>
            from <span style={{ fontWeight: 600, color: '#334155' }}>
              {split.creator?.full_name || 'Someone'}
            </span> &middot; {formatCurrency(split.total_amount)} total
          </p>
        </motion.div>

        {/* User Info Section */}
        <div style={{ marginTop: '28px' }}>
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
          style={{ marginTop: '28px' }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px',
          }}>
            <h2 style={{
              fontWeight: 600,
              fontSize: '15px',
              color: '#0F172A',
            }}>
              Select your items
            </h2>
            <span style={{
              fontSize: '13px',
              fontWeight: 500,
              color: '#94A3B8',
            }}>
              {selectedItems.size} of {items.length}
            </span>
          </div>

          <ItemList
            items={items}
            selectedItems={selectedItems}
            sharedItems={sharedItems}
            selectedQuantities={selectedQuantities}
            onToggleItem={handleToggleItem}
            onToggleShared={handleToggleShared}
            onQuantityChange={handleQuantityChange}
            claimInfo={claimInfo}
            currentUserEmail={userEmail}
          />
        </motion.div>

        {/* Payment Summary */}
        <div style={{ marginTop: '28px' }}>
          <PaymentSummary
            itemsTotal={itemsTotal}
            serviceFee={serviceFee}
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
              borderRadius: '10px',
              background: '#FEF2F2',
              border: '1px solid #FECACA',
            }}
          >
            <p style={{ fontSize: '14px', color: '#DC2626', fontWeight: 500 }}>{paymentError}</p>
            <button
              onClick={() => setPaymentError(null)}
              style={{
                marginTop: '10px',
                padding: '8px 16px',
                borderRadius: '8px',
                background: '#DC2626',
                color: 'white',
                fontSize: '14px',
                fontWeight: 500,
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Try again
            </button>
          </motion.div>
        )}

        {/* Pay Button */}
        <div style={{ marginTop: '28px', paddingBottom: 'max(env(safe-area-inset-bottom, 20px), 20px)' }}>
          <PayButton
            amount={itemsTotal}
            fee={serviceFee}
            recipientName={split.creator?.full_name || 'Unknown'}
            creatorStripeAccountId={split.creator?.stripe_connect_account_id}
            splitId={split.id}
            payerName={userName}
            payerEmail={userEmail}
            disabled={!isUserInfoComplete || selectedItems.size === 0}
            onSuccess={handlePaymentSuccess}
            onError={handlePaymentError}
          />
        </div>
      </main>
    </div>
  );
}

// Payment success — white background, small green check, clean text
function PaymentSuccessScreen({ recipientName, amount }: { recipientName: string; amount: number }) {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#FAFAFA',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
    }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{ textAlign: 'center', maxWidth: '400px', width: '100%', padding: '0 20px' }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          style={{
            width: '64px',
            height: '64px',
            margin: '0 auto',
            borderRadius: '50%',
            background: '#ECFDF5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CheckCircle2 size={32} color="#10B981" />
        </motion.div>

        <h1 style={{
          marginTop: '24px',
          fontSize: '22px',
          fontWeight: 600,
          color: '#0F172A',
        }}>
          Payment complete
        </h1>

        <p style={{
          marginTop: '8px',
          color: '#64748B',
          fontSize: '15px',
          lineHeight: 1.5,
        }}>
          You paid <span style={{ fontWeight: 600, color: '#0F172A' }}>{formatCurrency(amount)}</span> to{' '}
          <span style={{ fontWeight: 600, color: '#0F172A' }}>{recipientName}</span>
        </p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{ marginTop: '32px' }}
        >
          <span style={{ fontSize: '13px', color: '#94A3B8' }}>Powered by ZapSplit</span>
        </motion.div>
      </motion.div>
    </div>
  );
}
