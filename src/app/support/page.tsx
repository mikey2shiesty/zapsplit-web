'use client';

import { useState } from 'react';
import { Zap, ArrowLeft, Mail, MapPin, HelpCircle, ChevronDown, MessageCircle } from 'lucide-react';

const CONTACT_EMAIL = 'zapsplit@gmail.com';

const faqs = [
  {
    q: 'How do I split a bill?',
    a: 'Open ZapSplit, tap "New Split", enter the total amount and title, select friends, choose a split method (equal, custom, or receipt scan), and share the payment link.',
  },
  {
    q: 'How does receipt scanning work?',
    a: 'Take a photo of your receipt or choose one from your gallery. Our AI automatically extracts item names and prices. Assign items to specific people for a fair split.',
  },
  {
    q: 'Can people pay without downloading the app?',
    a: 'Yes. Share the payment link via text, WhatsApp, or any messaging app. They can pay directly through the web page — no app needed.',
  },
  {
    q: 'What payment methods are accepted?',
    a: 'All major credit and debit cards via Stripe. Apple Pay and Google Pay are supported on compatible devices.',
  },
  {
    q: 'Is my payment information secure?',
    a: 'Yes. We never store your card details. All payments are processed by Stripe, a PCI-compliant processor trusted by millions of businesses worldwide.',
  },
  {
    q: 'How do I delete my account?',
    a: 'Go to Settings → Delete Account. Type "delete my account" to confirm. All your data will be permanently removed within 30 days.',
  },
  {
    q: 'What does ZapSplit charge?',
    a: 'A platform fee of $0.50 AUD per transaction. Standard card processing fees from Stripe also apply and are shown before you confirm payment.',
  },
  {
    q: 'Can I get a refund?',
    a: 'Refunds are handled through Stripe\'s dispute process. Contact us if you believe a payment was made in error and we\'ll help resolve it.',
  },
];

export default function SupportPage() {
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
        <div style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.375rem 0.875rem', borderRadius: '9999px', backgroundColor: 'rgba(59, 130, 246, 0.1)', color: 'var(--primary)', fontSize: '0.8125rem', fontWeight: '600', marginBottom: '1.25rem' }}>
            <HelpCircle size={14} />
            We&apos;re Here to Help
          </div>
          <h1 style={{ fontSize: '2.25rem', fontWeight: '800', color: 'var(--text-primary)', letterSpacing: '-0.025em', marginBottom: '0.75rem' }}>
            Help & Support
          </h1>
          <p style={{ fontSize: '1.0625rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            Got a question or running into an issue? Check the FAQs below or reach out directly.
          </p>
        </div>

        {/* Contact Card */}
        <div style={{
          padding: '2rem',
          borderRadius: '1rem',
          background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
          marginBottom: '3rem',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', inset: 0, opacity: 0.15, backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.2) 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <MessageCircle size={24} color="white" />
              <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'white' }}>Get in Touch</h2>
            </div>
            <p style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.8)', marginBottom: '1.5rem', lineHeight: '1.6' }}>
              We respond within 24 hours. Send us an email with your question, feedback, or issue.
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}?subject=ZapSplit%20Support%20Request`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.75rem',
                backgroundColor: 'white',
                color: 'var(--primary)',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '0.9375rem',
              }}
            >
              <Mail size={18} />
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>

        {/* FAQ Section */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '1.5rem', letterSpacing: '-0.01em' }}>
            Frequently Asked Questions
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {faqs.map((faq, i) => (
              <FaqItem key={i} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </div>

        {/* App Info */}
        <div style={{ padding: '1.5rem', borderRadius: '0.75rem', backgroundColor: 'var(--surface)', border: '1px solid var(--border-light)' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '1rem' }}>App Information</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem', fontSize: '0.9375rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Zap size={16} style={{ color: 'var(--primary)', flexShrink: 0 }} />
              <span style={{ color: 'var(--text-secondary)' }}><strong style={{ color: 'var(--text-primary)' }}>Developer:</strong> ZapSplit</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <MapPin size={16} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
              <span style={{ color: 'var(--text-secondary)' }}>Perth, Western Australia</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Mail size={16} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
              <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: 'var(--primary)', textDecoration: 'none' }}>{CONTACT_EMAIL}</a>
            </div>
          </div>
          <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-light)', display: 'flex', gap: '1.5rem', fontSize: '0.875rem' }}>
            <a href="/privacy" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: '500' }}>Privacy Policy</a>
            <a href="/terms" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: '500' }}>Terms of Service</a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        borderRadius: '0.75rem',
        border: '1px solid var(--border-light)',
        backgroundColor: open ? 'var(--surface)' : 'transparent',
        transition: 'background-color 0.2s',
        overflow: 'hidden',
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1rem 1.25rem',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          fontSize: '0.9375rem',
          fontWeight: '600',
          color: 'var(--text-primary)',
        }}
      >
        {question}
        <ChevronDown
          size={18}
          style={{
            color: 'var(--text-muted)',
            transition: 'transform 0.2s',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            flexShrink: 0,
            marginLeft: '1rem',
          }}
        />
      </button>
      {open && (
        <div style={{ padding: '0 1.25rem 1rem', fontSize: '0.9375rem', lineHeight: '1.7', color: 'var(--text-secondary)' }}>
          {answer}
        </div>
      )}
    </div>
  );
}

function Footer() {
  return (
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
  );
}
