'use client';

import { motion } from 'framer-motion';
import { Zap, Smartphone, Receipt, Users, ArrowRight, CheckCircle2 } from 'lucide-react';

const features = [
  {
    icon: Receipt,
    title: 'Scan Any Receipt',
    description: 'AI-powered receipt scanning extracts items automatically',
  },
  {
    icon: Users,
    title: 'Split Fairly',
    description: 'Everyone pays only for what they ordered',
  },
  {
    icon: Zap,
    title: 'Instant Payments',
    description: 'Direct bank transfers via PayTo - no app needed',
  },
];

const steps = [
  'Someone scans the receipt in the ZapSplit app',
  'They share a link with the group',
  'Each person selects their items',
  'Pay instantly via bank transfer',
];

export default function Home() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass">
        <div style={{ maxWidth: '56rem', marginLeft: 'auto', marginRight: 'auto', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '0.75rem', backgroundColor: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Zap size={22} color="white" />
            </div>
            <span style={{ fontWeight: 'bold', fontSize: '1.25rem', color: 'var(--text-primary)' }}>ZapSplit</span>
          </div>
          <a
            href="https://apps.apple.com"
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '9999px',
              fontSize: '0.875rem',
              fontWeight: '500',
              backgroundColor: 'var(--primary)',
              color: 'white',
              textDecoration: 'none',
              transition: 'all 0.2s'
            }}
          >
            Get the App
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <main style={{ paddingTop: '6rem', paddingBottom: '4rem' }}>
        <section style={{ maxWidth: '56rem', marginLeft: 'auto', marginRight: 'auto', padding: '4rem 1rem', textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              borderRadius: '9999px',
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              color: 'var(--primary)',
              fontSize: '0.875rem',
              fontWeight: '500',
              marginBottom: '2rem'
            }}>
              <Zap size={16} />
              <span>The fastest way to split bills</span>
            </div>

            {/* Main Headline */}
            <h1 style={{
              fontSize: 'clamp(2.5rem, 5vw, 3.75rem)',
              fontWeight: 'bold',
              color: 'var(--text-primary)',
              lineHeight: '1.1',
              marginBottom: '1.5rem'
            }}>
              Split bills in{' '}
              <span className="gradient-text">seconds</span>,<br />
              not arguments
            </h1>

            <p style={{
              fontSize: '1.25rem',
              color: 'var(--text-secondary)',
              maxWidth: '42rem',
              marginLeft: 'auto',
              marginRight: 'auto',
              marginBottom: '2.5rem'
            }}>
              Scan receipts, share a link, and let everyone pay their fair share.
              Direct to your bank. No awkward IOUs.
            </p>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://apps.apple.com"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '1rem 2rem',
                  borderRadius: '1rem',
                  fontWeight: '600',
                  fontSize: '1.125rem',
                  backgroundColor: 'var(--primary)',
                  color: 'white',
                  textDecoration: 'none',
                  boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.3)'
                }}
                className="btn-shine"
              >
                <Smartphone size={22} />
                Download Free
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#how-it-works"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '1rem 2rem',
                  borderRadius: '1rem',
                  fontWeight: '600',
                  fontSize: '1.125rem',
                  backgroundColor: 'var(--surface)',
                  color: 'var(--text-primary)',
                  textDecoration: 'none',
                  border: '1px solid var(--border)'
                }}
              >
                See How It Works
                <ArrowRight size={20} />
              </motion.a>
            </div>
          </motion.div>

          {/* App Preview */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            style={{ marginTop: '4rem', position: 'relative' }}
          >
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, var(--background), transparent)',
              zIndex: 10,
              pointerEvents: 'none'
            }} />
            <div style={{
              position: 'relative',
              marginLeft: 'auto',
              marginRight: 'auto',
              width: '18rem',
              height: '500px',
              borderRadius: '3rem',
              padding: '0.75rem',
              background: 'linear-gradient(to bottom right, var(--surface-elevated), var(--surface))',
              border: '1px solid var(--border)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
            }}>
              <div style={{
                width: '100%',
                height: '100%',
                borderRadius: '2.5rem',
                backgroundColor: 'var(--background)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
              }}>
                {/* Mock App Content */}
                <div style={{ padding: '1rem', borderBottom: '1px solid var(--border-light)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                    <div style={{ width: '1.5rem', height: '1.5rem', borderRadius: '0.5rem', backgroundColor: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Zap size={14} color="white" />
                    </div>
                    <span style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>ZapSplit</span>
                  </div>
                </div>
                <div style={{ flex: 1, padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div className="shimmer" style={{ height: '3rem', borderRadius: '0.75rem' }} />
                  <div className="shimmer" style={{ height: '3rem', borderRadius: '0.75rem' }} />
                  <div className="shimmer" style={{ height: '3rem', borderRadius: '0.75rem' }} />
                  <div className="shimmer" style={{ height: '8rem', borderRadius: '1rem' }} />
                </div>
                <div style={{ padding: '1rem' }}>
                  <div style={{ height: '3.5rem', borderRadius: '0.75rem', backgroundColor: 'var(--primary)' }} />
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section style={{ maxWidth: '56rem', marginLeft: 'auto', marginRight: 'auto', padding: '4rem 1rem' }}>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{ fontSize: '1.875rem', fontWeight: 'bold', textAlign: 'center', color: 'var(--text-primary)', marginBottom: '3rem' }}
          >
            Why people love ZapSplit
          </motion.h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                style={{
                  padding: '1.5rem',
                  borderRadius: '1rem',
                  backgroundColor: 'var(--surface)',
                  border: '1px solid var(--border-light)'
                }}
              >
                <div style={{
                  width: '3rem',
                  height: '3rem',
                  borderRadius: '0.75rem',
                  backgroundColor: 'rgba(59, 130, 246, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem'
                }}>
                  <feature.icon size={24} color="var(--primary)" />
                </div>
                <h3 style={{ fontWeight: '600', fontSize: '1.125rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                  {feature.title}
                </h3>
                <p style={{ color: 'var(--text-muted)' }}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" style={{ maxWidth: '56rem', marginLeft: 'auto', marginRight: 'auto', padding: '4rem 1rem' }}>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{ fontSize: '1.875rem', fontWeight: 'bold', textAlign: 'center', color: 'var(--text-primary)', marginBottom: '3rem' }}
          >
            How it works
          </motion.h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {steps.map((step, index) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1.25rem',
                  borderRadius: '1rem',
                  backgroundColor: 'var(--surface)',
                  border: '1px solid var(--border-light)'
                }}
              >
                <div style={{
                  width: '2.5rem',
                  height: '2.5rem',
                  borderRadius: '9999px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  backgroundColor: 'var(--primary)',
                  color: 'white',
                  fontWeight: 'bold'
                }}>
                  {index + 1}
                </div>
                <span style={{ fontSize: '1.125rem', color: 'var(--text-primary)', flex: 1 }}>{step}</span>
                <CheckCircle2 size={20} color="var(--success)" />
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section style={{ maxWidth: '56rem', marginLeft: 'auto', marginRight: 'auto', padding: '4rem 1rem' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            style={{
              position: 'relative',
              overflow: 'hidden',
              borderRadius: '1.5rem',
              padding: '3rem 2rem',
              textAlign: 'center',
              background: 'linear-gradient(to bottom right, var(--primary), var(--primary-dark))',
              boxShadow: '0 25px 50px -12px rgba(59, 130, 246, 0.3)'
            }}
          >
            {/* Decorative dots pattern */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                opacity: 0.3,
                backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)',
                backgroundSize: '20px 20px'
              }}
            />

            <div style={{ position: 'relative', zIndex: 10 }}>
              <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white', marginBottom: '1rem' }}>
                Stop chasing IOUs
              </h2>
              <p style={{ fontSize: '1.125rem', color: 'rgba(255,255,255,0.8)', marginBottom: '2rem', maxWidth: '28rem', marginLeft: 'auto', marginRight: 'auto' }}>
                Join thousands who&apos;ve made bill splitting painless. Get paid instantly.
              </p>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://apps.apple.com"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '1rem 2rem',
                  borderRadius: '1rem',
                  fontWeight: '600',
                  fontSize: '1.125rem',
                  backgroundColor: 'white',
                  color: 'var(--primary)',
                  textDecoration: 'none',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2)'
                }}
              >
                <Smartphone size={22} />
                Get ZapSplit Free
              </motion.a>
            </div>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--border-light)', padding: '2rem 0' }}>
        <div style={{ maxWidth: '56rem', marginLeft: 'auto', marginRight: 'auto', padding: '0 1rem', textAlign: 'center', color: 'var(--text-muted)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <div style={{ width: '2rem', height: '2rem', borderRadius: '0.5rem', backgroundColor: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Zap size={16} color="white" />
            </div>
            <span style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>ZapSplit</span>
          </div>
          <p style={{ fontSize: '0.875rem' }}>
            Made with care in Australia
          </p>
        </div>
      </footer>
    </div>
  );
}
