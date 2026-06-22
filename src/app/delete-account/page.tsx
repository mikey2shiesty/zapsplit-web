'use client';

import { Zap, ArrowLeft, Mail, Trash2, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

const CONTACT_EMAIL = 'support@zapsplit.com.au';

const deletedItems = [
  'Your profile and account information',
  "All splits you've created or participated in",
  'Your payment history',
  'Your friends list and group memberships',
  'All notifications and preferences',
];

const retainedItems = [
  'Anonymized transaction data we are legally required to keep for financial compliance',
  'Outstanding payments already in progress may still be processed through Stripe',
  'Your Stripe Connect account (if linked) remains active unless deactivated separately',
];

export default function DeleteAccountPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      {/* Header */}
      <header className="glass" style={{ borderBottom: '1px solid var(--border-light)' }}>
        <div style={{ maxWidth: '56rem', marginLeft: 'auto', marginRight: 'auto', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '0.75rem', backgroundColor: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Zap size={22} color="white" />
            </div>
            <span style={{ fontWeight: 'bold', fontSize: '1.25rem', color: 'var(--text-primary)' }}>ZapSplit</span>
          </div>
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.875rem', fontWeight: '500' }}>
            <ArrowLeft size={16} />
            Back
          </a>
        </div>
      </header>

      <main style={{ maxWidth: '48rem', marginLeft: 'auto', marginRight: 'auto', padding: '3rem 1.5rem 4rem' }}>
        {/* Title */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.375rem 0.875rem', borderRadius: '9999px', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', fontSize: '0.8125rem', fontWeight: '600', marginBottom: '1.25rem' }}>
            <Trash2 size={14} />
            Account Deletion
          </div>
          <h1 style={{ fontSize: '2.25rem', fontWeight: '800', color: 'var(--text-primary)', letterSpacing: '-0.025em', marginBottom: '0.75rem' }}>
            Delete Your ZapSplit Account
          </h1>
          <p style={{ fontSize: '1.0625rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            You can permanently delete your ZapSplit account and associated data at any time. This page explains how to request deletion and what happens to your data.
          </p>
        </div>

        {/* How to delete - in app */}
        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.375rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '1rem', letterSpacing: '-0.01em' }}>
            How to delete your account in the app
          </h2>
          <ol style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.625rem', fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            <li>Open the ZapSplit app and sign in.</li>
            <li>Go to <strong style={{ color: 'var(--text-primary)' }}>Settings</strong>.</li>
            <li>Tap <strong style={{ color: 'var(--text-primary)' }}>Delete Account</strong>.</li>
            <li>Type <strong style={{ color: 'var(--text-primary)' }}>&quot;delete my account&quot;</strong> to confirm.</li>
            <li>Confirm the final prompt. Your account and data will be permanently removed.</li>
          </ol>
        </section>

        {/* How to delete - email */}
        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.375rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '1rem', letterSpacing: '-0.01em' }}>
            Prefer to request by email?
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1rem' }}>
            If you can&apos;t access the app, email us from the address on your account and we&apos;ll process the deletion for you.
          </p>
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=ZapSplit%20Account%20Deletion%20Request`}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', borderRadius: '0.75rem', backgroundColor: 'var(--primary)', color: 'white', textDecoration: 'none', fontWeight: '600', fontSize: '0.9375rem' }}
          >
            <Mail size={18} />
            {CONTACT_EMAIL}
          </a>
        </section>

        {/* What gets deleted */}
        <section style={{ padding: '1.75rem', borderRadius: '1rem', backgroundColor: 'var(--surface)', border: '1px solid var(--border-light)', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1rem' }}>
            <AlertTriangle size={20} style={{ color: '#ef4444' }} />
            <h2 style={{ fontSize: '1.125rem', fontWeight: '700', color: 'var(--text-primary)' }}>What gets deleted</h2>
          </div>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {deletedItems.map((item, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem', fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                <Trash2 size={16} style={{ color: '#ef4444', flexShrink: 0, marginTop: '0.15rem' }} />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* What is kept */}
        <section style={{ padding: '1.75rem', borderRadius: '1rem', backgroundColor: 'var(--surface)', border: '1px solid var(--border-light)', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1rem' }}>
            <CheckCircle size={20} style={{ color: 'var(--text-muted)' }} />
            <h2 style={{ fontSize: '1.125rem', fontWeight: '700', color: 'var(--text-primary)' }}>What may be retained</h2>
          </div>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {retainedItems.map((item, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem', fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                <CheckCircle size={16} style={{ color: 'var(--text-muted)', flexShrink: 0, marginTop: '0.15rem' }} />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Retention period */}
        <section style={{ padding: '1.25rem 1.5rem', borderRadius: '0.75rem', backgroundColor: 'rgba(59, 130, 246, 0.08)', border: '1px solid rgba(59, 130, 246, 0.2)', marginBottom: '3rem', display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
          <Clock size={20} style={{ color: 'var(--primary)', flexShrink: 0, marginTop: '0.1rem' }} />
          <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
            <strong style={{ color: 'var(--text-primary)' }}>Processing time:</strong> Account deletions are processed within 30 days of your request. Data retained for legal or financial compliance is kept only as long as required by Australian law, then deleted.
          </p>
        </section>

        {/* App info */}
        <div style={{ padding: '1.5rem', borderRadius: '0.75rem', backgroundColor: 'var(--surface)', border: '1px solid var(--border-light)' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '1rem' }}>App Information</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem', fontSize: '0.9375rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Zap size={16} style={{ color: 'var(--primary)', flexShrink: 0 }} />
              <span style={{ color: 'var(--text-secondary)' }}><strong style={{ color: 'var(--text-primary)' }}>App:</strong> ZapSplit</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Mail size={16} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
              <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: 'var(--primary)', textDecoration: 'none' }}>{CONTACT_EMAIL}</a>
            </div>
          </div>
          <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-light)', display: 'flex', gap: '1.5rem', fontSize: '0.875rem' }}>
            <a href="/privacy" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: '500' }}>Privacy Policy</a>
            <a href="/terms" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: '500' }}>Terms of Service</a>
            <a href="/support" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: '500' }}>Support</a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--border-light)', padding: '2rem 0' }}>
        <div style={{ maxWidth: '56rem', marginLeft: 'auto', marginRight: 'auto', padding: '0 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '1.5rem', height: '1.5rem', borderRadius: '0.375rem', backgroundColor: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Zap size={12} color="white" />
            </div>
            <span>&copy; {new Date().getFullYear()} ZapSplit</span>
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="/privacy" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Privacy</a>
            <a href="/terms" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Terms</a>
            <a href="/support" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
