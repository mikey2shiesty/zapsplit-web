'use client';

import { Zap, ArrowLeft, FileText, Mail, MapPin } from 'lucide-react';

const CONTACT_EMAIL = 'zapsplit@gmail.com';
const EFFECTIVE_DATE = '18 February 2026';

export default function TermsOfServicePage() {
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
            <FileText size={14} />
            Legal Agreement
          </div>
          <h1 style={{ fontSize: '2.25rem', fontWeight: '800', color: 'var(--text-primary)', letterSpacing: '-0.025em', marginBottom: '0.75rem' }}>
            Terms of Service
          </h1>
          <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)' }}>
            Effective {EFFECTIVE_DATE}
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <Paragraph>
            Please read these Terms of Service (&ldquo;Terms&rdquo;) carefully before using ZapSplit. By accessing or using the Service, you agree to be bound by these Terms.
          </Paragraph>

          <Section title="1. Eligibility">
            <Paragraph>You must be at least 18 years old to use ZapSplit. By creating an account, you represent that:</Paragraph>
            <BulletList items={[
              { text: 'You are at least 18 years old.' },
              { text: 'You are legally capable of entering into a binding agreement.' },
              { text: 'You are not prohibited from using the Service under any applicable law.' },
            ]} />
          </Section>

          <Section title="2. Description of Service">
            <Paragraph>ZapSplit is a bill-splitting platform that allows users to:</Paragraph>
            <BulletList items={[
              { text: 'Create and manage shared expenses with friends and others.' },
              { text: 'Scan receipts using AI to extract items and prices automatically.' },
              { text: 'Share payment links with anyone, including non-app users.' },
              { text: 'Request and collect payments via Stripe.' },
              { text: 'Track payment history, balances, and settlement status.' },
            ]} />
            <Paragraph>ZapSplit is not a bank, financial institution, or licensed payment facility.</Paragraph>
          </Section>

          <Section title="3. Account Registration">
            <BulletList items={[
              { text: 'Provide accurate, current, and complete information during registration.' },
              { text: 'Maintain and promptly update your account information.' },
              { text: 'Keep your login credentials secure and confidential.' },
              { text: 'Accept responsibility for all activity under your account.' },
            ]} />
          </Section>

          <Section title="4. Payment Terms">
            <NumberedItem n="4.1">All payment processing is handled by Stripe, a PCI-compliant third-party processor.</NumberedItem>
            <NumberedItem n="4.2">A platform fee of $0.50 AUD applies per transaction. Stripe processing fees are displayed before confirmation.</NumberedItem>
            <NumberedItem n="4.3">You are responsible for ensuring sufficient funds for payments you initiate.</NumberedItem>
            <NumberedItem n="4.4">Refunds and disputes are subject to Stripe&apos;s dispute resolution process.</NumberedItem>
            <NumberedItem n="4.5">All amounts are in Australian Dollars (AUD) unless otherwise stated.</NumberedItem>
          </Section>

          <Section title="5. Receipt Scanning & AI">
            <NumberedItem n="5.1">The Service uses OpenAI&apos;s Vision API to analyse receipts and extract item data.</NumberedItem>
            <NumberedItem n="5.2">By using receipt scanning, you consent to images being processed by OpenAI.</NumberedItem>
            <NumberedItem n="5.3">AI results may not be 100% accurate. You must verify parsed data before creating splits.</NumberedItem>
            <NumberedItem n="5.4">We are not liable for errors or losses from inaccurate receipt parsing.</NumberedItem>
          </Section>

          <Section title="6. User Conduct">
            <Paragraph>You agree not to:</Paragraph>
            <BulletList items={[
              { text: 'Engage in illegal, fraudulent, or deceptive activity.' },
              { text: 'Defraud other users or create false payment requests.' },
              { text: 'Upload fabricated or misleading receipt images.' },
              { text: 'Harass, threaten, or abuse other users.' },
              { text: 'Attempt unauthorised access to the Service or other accounts.' },
              { text: 'Use the Service for money laundering or terrorism financing.' },
            ]} />
          </Section>

          <Section title="7. Intellectual Property">
            <Paragraph>
              The Service and all its content is owned by ZapSplit and protected by Australian and international IP laws. You may not copy, modify, or distribute any part without written consent.
            </Paragraph>
          </Section>

          <Section title="8. User Content">
            <Paragraph>
              You retain ownership of content you upload. By uploading, you grant us a limited licence to use, process, and store that content solely to provide the Service.
            </Paragraph>
          </Section>

          <Section title="9. Third-Party Services">
            <Paragraph>
              The Service integrates with Stripe, Supabase, OpenAI, and Apple/Google. Your use of these services is subject to their respective terms. We are not responsible for third-party actions or policies.
            </Paragraph>
          </Section>

          <Section title="10. Disclaimers">
            <div style={{ padding: '1rem 1.25rem', borderRadius: '0.75rem', backgroundColor: 'var(--surface)', border: '1px solid var(--border-light)', fontSize: '0.9375rem', lineHeight: '1.7', color: 'var(--text-secondary)' }}>
              THE SERVICE IS PROVIDED &ldquo;AS IS&rdquo; WITHOUT WARRANTIES OF ANY KIND. We do not guarantee uninterrupted or error-free service. We are not responsible for disputes between users regarding payments or split amounts.
            </div>
          </Section>

          <Section title="11. Limitation of Liability">
            <BulletList items={[
              { text: 'We shall not be liable for indirect, incidental, special, or consequential damages.' },
              { text: 'Total liability shall not exceed fees paid to us in the preceding 12 months.' },
              { text: 'Nothing excludes liability that cannot be limited under Australian Consumer Law.' },
            ]} />
          </Section>

          <Section title="12. Termination">
            <NumberedItem n="12.1">You may delete your account at any time through app settings.</NumberedItem>
            <NumberedItem n="12.2">We may suspend or terminate access at any time for Terms violations.</NumberedItem>
            <NumberedItem n="12.3">Outstanding payment obligations survive termination.</NumberedItem>
          </Section>

          <Section title="13. Governing Law">
            <Paragraph>
              These Terms are governed by the laws of Western Australia. Disputes are subject to the exclusive jurisdiction of Western Australian courts.
            </Paragraph>
          </Section>

          <Section title="14. Changes">
            <Paragraph>
              We may modify these Terms at any time. Material changes will be communicated via the effective date and in-app notification. Continued use constitutes acceptance.
            </Paragraph>
          </Section>

          <Section title="15. Contact Us">
            <ContactCard email={CONTACT_EMAIL} />
          </Section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.875rem', letterSpacing: '-0.01em' }}>{title}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>{children}</div>
    </div>
  );
}

function Paragraph({ children }: { children: React.ReactNode }) {
  return <p style={{ fontSize: '0.9375rem', lineHeight: '1.7', color: 'var(--text-secondary)' }}>{children}</p>;
}

function NumberedItem({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <p style={{ fontSize: '0.9375rem', lineHeight: '1.7', color: 'var(--text-secondary)' }}>
      <strong style={{ color: 'var(--text-primary)', fontWeight: '600' }}>{n}</strong> {children}
    </p>
  );
}

function BulletList({ items }: { items: { bold?: string; text: string }[] }) {
  return (
    <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      {items.map((item, i) => (
        <li key={i} style={{ display: 'flex', gap: '0.75rem', fontSize: '0.9375rem', lineHeight: '1.6', color: 'var(--text-secondary)' }}>
          <span style={{ color: 'var(--primary)', marginTop: '0.125rem', flexShrink: 0 }}>&bull;</span>
          <span>{item.bold && <strong style={{ color: 'var(--text-primary)', fontWeight: '600' }}>{item.bold}</strong>} {item.text}</span>
        </li>
      ))}
    </ul>
  );
}

function ContactCard({ email }: { email: string }) {
  return (
    <div style={{ padding: '1.25rem', borderRadius: '0.75rem', backgroundColor: 'var(--surface)', border: '1px solid var(--border-light)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <Mail size={18} style={{ color: 'var(--primary)' }} />
        <a href={`mailto:${email}`} style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: '500', fontSize: '0.9375rem' }}>{email}</a>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <MapPin size={18} style={{ color: 'var(--text-muted)' }} />
        <span style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem' }}>Perth, Western Australia</span>
      </div>
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
