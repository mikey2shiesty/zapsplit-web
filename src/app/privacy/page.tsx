'use client';

import { Zap, ArrowLeft, Shield, Mail, MapPin } from 'lucide-react';

const CONTACT_EMAIL = 'support@zapsplit.com.au';
const EFFECTIVE_DATE = '18 February 2026';

export default function PrivacyPolicyPage() {
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
        {/* Title Section */}
        <div style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.375rem 0.875rem', borderRadius: '9999px', backgroundColor: 'rgba(59, 130, 246, 0.1)', color: 'var(--primary)', fontSize: '0.8125rem', fontWeight: '600', marginBottom: '1.25rem' }}>
            <Shield size={14} />
            Your Privacy Matters
          </div>
          <h1 style={{ fontSize: '2.25rem', fontWeight: '800', color: 'var(--text-primary)', letterSpacing: '-0.025em', marginBottom: '0.75rem' }}>
            Privacy Policy
          </h1>
          <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)' }}>
            Effective {EFFECTIVE_DATE}
          </p>
        </div>

        {/* Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <Paragraph>
            ZapSplit (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) operates the ZapSplit mobile application and website (collectively, the &ldquo;Service&rdquo;). This Privacy Policy explains how we collect, use, disclose, and protect your personal information in accordance with the Australian Privacy Act 1988 (Cth) and the Australian Privacy Principles (APPs).
          </Paragraph>

          <Section title="1. Information We Collect">
            <SubTitle>Information you provide:</SubTitle>
            <BulletList items={[
              { bold: 'Account information', text: 'your name, email address, and profile photo.' },
              { bold: 'Authentication data', text: 'credentials from Apple or Google sign-in. We only receive your name and email.' },
              { bold: 'Payment information', text: 'card details processed directly by Stripe. Never stored on our servers.' },
              { bold: 'Receipt images', text: 'photos of receipts uploaded for bill splitting and item extraction.' },
              { bold: 'Split data', text: 'details of splits including amounts, participants, and payment status.' },
              { bold: 'Contact info of others', text: 'names and optionally email or phone of people added to splits.' },
            ]} />
            <SubTitle>Collected automatically:</SubTitle>
            <BulletList items={[
              { bold: 'Device information', text: 'device model, OS version, and unique identifiers.' },
              { bold: 'Usage data', text: 'features used and actions taken within the Service.' },
              { bold: 'Log data', text: 'IP address, access times, and referring URLs.' },
            ]} />
          </Section>

          <Section title="2. How We Use Your Information">
            <BulletList items={[
              { text: 'Provide, operate, and maintain the Service.' },
              { text: 'Process payments and facilitate bill splitting.' },
              { text: 'Analyse receipt images using AI-powered OCR.' },
              { text: 'Send notifications about payment requests and settlements.' },
              { text: 'Generate shareable payment links for participants.' },
              { text: 'Detect, prevent, and address fraud or technical issues.' },
              { text: 'Comply with legal obligations.' },
            ]} />
          </Section>

          <Section title="3. Third-Party Services">
            <ThirdPartyCard name="Stripe" purpose="Payment Processing" description="Processes all payment transactions. Card details are collected directly by Stripe." url="https://stripe.com/au/privacy" />
            <ThirdPartyCard name="Supabase" purpose="Infrastructure" description="Hosts our database and handles authentication. Data encrypted in transit and at rest." url="https://supabase.com/privacy" />
            <ThirdPartyCard name="OpenAI" purpose="Receipt Scanning" description="Analyses receipt images to extract items and prices. Does not use your data for training." url="https://openai.com/policies/privacy-policy" />
            <ThirdPartyCard name="Apple / Google" purpose="Authentication" description="Provides sign-in services. We receive only your name and email, never your password." />
            <ThirdPartyCard name="Expo" purpose="App Delivery" description="Delivers app updates and handles push notifications for payment activity." />
          </Section>

          <Section title="4. Data Storage & Security">
            <Paragraph>
              Your data is stored on secure servers provided by Supabase (hosted on AWS). We implement industry-standard security measures:
            </Paragraph>
            <BulletList items={[
              { text: 'Encryption in transit (TLS/SSL) and at rest.' },
              { text: 'Row Level Security (RLS) on all database tables.' },
              { text: 'Secure authentication with hashed passwords.' },
              { text: 'Payment data handled exclusively by PCI-compliant Stripe.' },
            ]} />
          </Section>

          <Section title="5. Data Retention">
            <Paragraph>
              We retain your information while your account is active. Upon deletion, data is removed within 30 days, except where required for legal or regulatory purposes. Transaction records may be kept up to 7 years for financial compliance.
            </Paragraph>
          </Section>

          <Section title="6. Your Rights">
            <Paragraph>Under the Australian Privacy Act 1988, you have the right to:</Paragraph>
            <BulletList items={[
              { bold: 'Access', text: 'request a copy of your personal information.' },
              { bold: 'Correction', text: 'request correction of inaccurate data.' },
              { bold: 'Deletion', text: 'request deletion of your account and data.' },
              { bold: 'Withdraw consent', text: 'withdraw consent for data processing at any time.' },
              { bold: 'Complain', text: 'lodge a complaint with the OAIC.' },
            ]} />
          </Section>

          <Section title="7. Children's Privacy">
            <Paragraph>
              ZapSplit is not intended for anyone under 18. We do not knowingly collect data from children.
            </Paragraph>
          </Section>

          <Section title="8. International Transfers">
            <Paragraph>
              Your data may be transferred to countries outside Australia, including the United States, where our providers operate. By using the Service, you consent to these transfers.
            </Paragraph>
          </Section>

          <Section title="9. Changes to This Policy">
            <Paragraph>
              We may update this policy from time to time. Material changes will be communicated by updating the effective date and, where appropriate, via in-app notification.
            </Paragraph>
          </Section>

          <Section title="10. Contact Us">
            <Paragraph>
              Questions, concerns, or requests? Get in touch.
            </Paragraph>
            <ContactCard email={CONTACT_EMAIL} />
          </Section>

          <div style={{ padding: '1.25rem', borderRadius: '0.75rem', backgroundColor: 'var(--surface)', border: '1px solid var(--border-light)', fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
            If you are not satisfied with our response, you may lodge a complaint with the Office of the Australian Information Commissioner (OAIC) at <a href="https://www.oaic.gov.au" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', textDecoration: 'none' }}>www.oaic.gov.au</a>.
          </div>
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

function SubTitle({ children }: { children: React.ReactNode }) {
  return <p style={{ fontSize: '0.9375rem', fontWeight: '600', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>{children}</p>;
}

function Paragraph({ children }: { children: React.ReactNode }) {
  return <p style={{ fontSize: '0.9375rem', lineHeight: '1.7', color: 'var(--text-secondary)' }}>{children}</p>;
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

function ThirdPartyCard({ name, purpose, description, url }: { name: string; purpose: string; description: string; url?: string }) {
  return (
    <div style={{ padding: '1rem 1.25rem', borderRadius: '0.75rem', backgroundColor: 'var(--surface)', border: '1px solid var(--border-light)', marginBottom: '0.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.375rem' }}>
        <span style={{ fontWeight: '600', color: 'var(--text-primary)', fontSize: '0.9375rem' }}>{name}</span>
        <span style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--primary)', backgroundColor: 'rgba(59, 130, 246, 0.1)', padding: '0.2rem 0.6rem', borderRadius: '9999px' }}>{purpose}</span>
      </div>
      <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>{description}</p>
      {url && (
        <a href={url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.8125rem', color: 'var(--primary)', textDecoration: 'none', fontWeight: '500', marginTop: '0.5rem', display: 'inline-block' }}>
          View their privacy policy &rarr;
        </a>
      )}
    </div>
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
