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

// Premium Loading skeleton
function LoadingSkeleton() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #F8FAFC 0%, #EEF2FF 100%)',
      padding: '16px',
    }}>
      <div style={{ maxWidth: '420px', margin: '0 auto', paddingTop: '32px' }}>
        {/* Header skeleton */}
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '88px',
            height: '88px',
            margin: '0 auto',
            borderRadius: '50%',
            background: 'linear-gradient(90deg, #E2E8F0 25%, #F1F5F9 50%, #E2E8F0 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite',
          }} />
          <div style={{
            width: '200px',
            height: '28px',
            margin: '20px auto 0',
            borderRadius: '8px',
            background: 'linear-gradient(90deg, #E2E8F0 25%, #F1F5F9 50%, #E2E8F0 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite',
          }} />
        </div>
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

// Premium Error state
function ErrorState({ message }: { message: string }) {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #F8FAFC 0%, #FEF2F2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
    }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{ textAlign: 'center', maxWidth: '320px' }}
      >
        <div style={{
          width: '80px',
          height: '80px',
          margin: '0 auto',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #FEE2E2 0%, #FECACA 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 32px rgba(239, 68, 68, 0.2)',
        }}>
          <AlertCircle size={36} color="#DC2626" />
        </div>
        <h1 style={{
          marginTop: '24px',
          fontSize: '22px',
          fontWeight: 700,
          color: '#1E293B',
        }}>
          Link Not Found
        </h1>
        <p style={{
          marginTop: '8px',
          color: '#64748B',
          lineHeight: 1.5,
        }}>{message}</p>
      </motion.div>
    </div>
  );
}

// Premium User info form
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
        background: isComplete
          ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(5, 150, 105, 0.04) 100%)'
          : '#FFFFFF',
        borderRadius: '24px',
        border: isComplete ? '1.5px solid rgba(16, 185, 129, 0.3)' : '1.5px solid #E2E8F0',
        boxShadow: isComplete
          ? '0 4px 24px rgba(16, 185, 129, 0.12)'
          : '0 4px 24px rgba(0, 0, 0, 0.04)',
        overflow: 'hidden',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      <button
        onClick={onToggle}
        style={{
          width: '100%',
          padding: '20px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '52px',
            height: '52px',
            borderRadius: '16px',
            background: isComplete
              ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)'
              : 'linear-gradient(135deg, #F1F5F9 0%, #E2E8F0 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: isComplete
              ? '0 4px 12px rgba(16, 185, 129, 0.3)'
              : '0 2px 8px rgba(0, 0, 0, 0.04)',
          }}>
            {isComplete
              ? <CheckCircle2 size={24} color="white" />
              : <User size={24} color="#64748B" />
            }
          </div>
          <div style={{ textAlign: 'left' }}>
            {isComplete ? (
              <>
                <div style={{ fontWeight: 600, fontSize: '16px', color: '#0F172A' }}>{name}</div>
                <div style={{ fontSize: '14px', color: '#64748B', marginTop: '2px' }}>{email}</div>
              </>
            ) : (
              <>
                <div style={{ fontWeight: 600, fontSize: '16px', color: '#0F172A' }}>Your Details</div>
                <div style={{ fontSize: '14px', color: '#94A3B8', marginTop: '2px' }}>Required for payment</div>
              </>
            )}
          </div>
        </div>
        <motion.div
          animate={{ rotate: isCollapsed ? 0 : 180 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '12px',
            background: '#F8FAFC',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ChevronDown size={20} color="#64748B" />
        </motion.div>
      </button>

      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            <div style={{
              padding: '0 24px 28px 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}>
              <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent 0%, #E2E8F0 50%, transparent 100%)' }} />

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#475569',
                  marginBottom: '10px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
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
                    padding: '16px 20px',
                    borderRadius: '16px',
                    border: '2px solid #E2E8F0',
                    background: '#F8FAFC',
                    color: '#0F172A',
                    fontSize: '16px',
                    fontWeight: 500,
                    outline: 'none',
                    transition: 'all 0.2s ease',
                    boxSizing: 'border-box',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#3B82F6';
                    e.target.style.background = '#FFFFFF';
                    e.target.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#E2E8F0';
                    e.target.style.background = '#F8FAFC';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#475569',
                  marginBottom: '10px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
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
                    padding: '16px 20px',
                    borderRadius: '16px',
                    border: '2px solid #E2E8F0',
                    background: '#F8FAFC',
                    color: '#0F172A',
                    fontSize: '16px',
                    fontWeight: 500,
                    outline: 'none',
                    transition: 'all 0.2s ease',
                    boxSizing: 'border-box',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#3B82F6';
                    e.target.style.background = '#FFFFFF';
                    e.target.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#E2E8F0';
                    e.target.style.background = '#F8FAFC';
                    e.target.style.boxShadow = 'none';
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

    const billSubtotal = items.reduce((sum, item) => sum + item.price, 0);
    const proportion = billSubtotal > 0 ? selectedItemsTotal / billSubtotal : 0;

    const totalTax = (split.total_amount - billSubtotal) * 0.5 || 0;
    const totalTip = (split.total_amount - billSubtotal) * 0.5 || 0;

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

  // Build claimed by map
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

  const handlePaymentSuccess = () => setPaymentSuccess(true);
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
      background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 50%, #EEF2FF 100%)',
    }}>
      {/* Premium Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
          paddingTop: 'env(safe-area-inset-top, 0px)',
        }}
      >
        <div style={{ maxWidth: '420px', margin: '0 auto', padding: '16px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
            }}>
              <Zap size={20} color="white" strokeWidth={2.5} />
            </div>
            <span style={{ fontWeight: 800, fontSize: '20px', color: '#0F172A', letterSpacing: '-0.5px' }}>ZapSplit</span>
          </div>
        </div>
      </motion.header>

      <main style={{ maxWidth: '420px', margin: '0 auto', padding: '0 20px 40px' }}>
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ paddingTop: '32px', textAlign: 'center' }}
        >
          {/* Premium Avatar */}
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <div style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '36px',
              fontWeight: 700,
              boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3), 0 0 0 4px rgba(255, 255, 255, 0.9)',
            }}>
              {split.creator?.full_name?.charAt(0).toUpperCase() || '?'}
            </div>
            <div style={{
              position: 'absolute',
              bottom: '-4px',
              right: '-4px',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 8px rgba(16, 185, 129, 0.3), 0 0 0 3px white',
            }}>
              <CheckCircle2 size={18} color="white" />
            </div>
          </div>

          <h1 style={{
            marginTop: '24px',
            fontSize: '26px',
            fontWeight: 800,
            color: '#0F172A',
            letterSpacing: '-0.5px',
            lineHeight: 1.2,
          }}>
            {split.title || 'Bill Split'}
          </h1>

          <p style={{ marginTop: '8px', color: '#64748B', fontSize: '16px' }}>
            from <span style={{ fontWeight: 600, color: '#334155' }}>
              {split.creator?.full_name || 'Someone'}
            </span>
          </p>

          <div style={{
            marginTop: '12px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            color: '#94A3B8',
            fontSize: '14px',
          }}>
            <Clock size={14} />
            <span>{formatDate(split.created_at)}</span>
          </div>

          {/* Total Badge */}
          <div style={{
            marginTop: '20px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: '12px 24px',
            borderRadius: '100px',
            background: 'linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%)',
            border: '1.5px solid #E2E8F0',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
          }}>
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Receipt size={14} color="white" />
            </div>
            <span style={{ fontWeight: 700, fontSize: '18px', color: '#0F172A' }}>
              {formatCurrency(split.total_amount)}
            </span>
            <span style={{ color: '#94A3B8', fontWeight: 500 }}>total</span>
          </div>
        </motion.div>

        {/* User Info Section */}
        <div style={{ marginTop: '36px' }}>
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
          style={{ marginTop: '36px' }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '20px',
          }}>
            <h2 style={{
              fontWeight: 700,
              fontSize: '18px',
              color: '#0F172A',
              letterSpacing: '-0.3px',
            }}>
              Select Your Items
            </h2>
            <div style={{
              padding: '8px 14px',
              borderRadius: '100px',
              background: selectedItems.size > 0
                ? 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)'
                : '#F1F5F9',
              color: selectedItems.size > 0 ? 'white' : '#64748B',
              fontSize: '13px',
              fontWeight: 600,
              boxShadow: selectedItems.size > 0 ? '0 4px 12px rgba(59, 130, 246, 0.3)' : 'none',
              transition: 'all 0.3s ease',
            }}>
              {selectedItems.size} of {items.length}
            </div>
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
        <div style={{ marginTop: '36px' }}>
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
              marginTop: '20px',
              padding: '20px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, #FEF2F2 0%, #FEE2E2 100%)',
              border: '1.5px solid #FECACA',
            }}
          >
            <p style={{ fontSize: '14px', color: '#DC2626', fontWeight: 500 }}>{paymentError}</p>
            <button
              onClick={() => setPaymentError(null)}
              style={{
                marginTop: '12px',
                padding: '10px 20px',
                borderRadius: '12px',
                background: '#DC2626',
                color: 'white',
                fontSize: '14px',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Try again
            </button>
          </motion.div>
        )}

        {/* Pay Button */}
        <div style={{ marginTop: '36px', paddingBottom: 'max(env(safe-area-inset-bottom, 20px), 20px)' }}>
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

// Premium Payment success
function PaymentSuccessScreen({ recipientName, amount }: { recipientName: string; amount: number }) {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #ECFDF5 0%, #D1FAE5 50%, #A7F3D0 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
    }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{ textAlign: 'center', maxWidth: '340px' }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          style={{
            width: '100px',
            height: '100px',
            margin: '0 auto',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 20px 40px rgba(16, 185, 129, 0.3), 0 0 0 4px rgba(255, 255, 255, 0.9)',
          }}
        >
          <CheckCircle2 size={48} color="white" />
        </motion.div>

        <h1 style={{
          marginTop: '28px',
          fontSize: '28px',
          fontWeight: 800,
          color: '#064E3B',
          letterSpacing: '-0.5px',
        }}>
          Payment Successful!
        </h1>

        <p style={{
          marginTop: '12px',
          color: '#047857',
          fontSize: '16px',
          lineHeight: 1.5,
        }}>
          You paid <span style={{ fontWeight: 700 }}>{formatCurrency(amount)}</span> to{' '}
          <span style={{ fontWeight: 700 }}>{recipientName}</span>
        </p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{ marginTop: '32px' }}
        >
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 20px',
            borderRadius: '100px',
            background: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
          }}>
            <Zap size={18} color="#10B981" />
            <span style={{ fontSize: '14px', fontWeight: 600, color: '#064E3B' }}>Powered by ZapSplit</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
