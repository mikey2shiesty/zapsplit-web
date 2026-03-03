'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Smartphone, Receipt, Users, ArrowRight, Zap, Shield, Clock, CreditCard, Camera, Link2, CheckCircle2, Banknote } from 'lucide-react';
import Image from 'next/image';
import { useRef } from 'react';

const features = [
  {
    icon: Camera,
    title: 'Scan Any Receipt',
    description: 'Point your camera at any receipt. Our AI reads every item and price instantly.',
    accent: '#818CF8',
  },
  {
    icon: Users,
    title: 'Split Fairly',
    description: 'Everyone picks what they ordered. No more awkward mental math or guessing.',
    accent: '#34D399',
  },
  {
    icon: Banknote,
    title: 'Instant Payouts',
    description: 'Money hits the creator\'s bank account instantly. No waiting around.',
    accent: '#F59E0B',
  },
];

const steps = [
  { num: '1', title: 'Someone scans the receipt in the ZapSplit app', icon: Camera },
  { num: '2', title: 'They share a link with the group', icon: Link2 },
  { num: '3', title: 'Each person selects their items', icon: CheckCircle2 },
  { num: '4', title: 'Pay instantly via bank transfer', icon: Banknote },
];

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const phoneY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <div style={{ minHeight: '100vh', background: '#0A0A0B', color: '#FAFAFA', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>

      {/* ── Header ── */}
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: 'rgba(10, 10, 11, 0.8)',
        backdropFilter: 'saturate(180%) blur(20px)',
        WebkitBackdropFilter: 'saturate(180%) blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}>
        <div style={{
          maxWidth: '76rem',
          margin: '0 auto',
          padding: '0.75rem 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Image src="/logo.png" alt="ZapSplit" width={28} height={28} />
            <span style={{ fontWeight: 700, fontSize: '1.0625rem', letterSpacing: '-0.02em' }}>ZapSplit</span>
          </div>
          <motion.a
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            href="https://apps.apple.com"
            style={{
              padding: '0.4375rem 1.125rem',
              borderRadius: '9999px',
              fontSize: '0.8125rem',
              fontWeight: 600,
              background: '#FAFAFA',
              color: '#0A0A0B',
              textDecoration: 'none',
              transition: 'box-shadow 0.2s',
            }}
          >
            Get the App
          </motion.a>
        </div>
      </header>

      {/* ── Hero ── */}
      <section ref={heroRef} style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Gradient mesh background */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(ellipse 80% 50% at 50% -20%, rgba(99,102,241,0.15), transparent),
            radial-gradient(ellipse 60% 40% at 80% 50%, rgba(59,130,246,0.08), transparent),
            radial-gradient(ellipse 60% 40% at 20% 60%, rgba(139,92,246,0.06), transparent)
          `,
          pointerEvents: 'none',
        }} />

        <div style={{
          maxWidth: '76rem',
          margin: '0 auto',
          padding: '10rem 2rem 6rem',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          alignItems: 'center',
          gap: '4rem',
          position: 'relative',
        }}
          className="hero-grid"
        >
          {/* Left — Copy */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.3125rem 0.875rem',
                borderRadius: '9999px',
                border: '1px solid rgba(99,102,241,0.25)',
                background: 'rgba(99,102,241,0.08)',
                fontSize: '0.8125rem',
                fontWeight: 500,
                color: '#A5B4FC',
                marginBottom: '1.75rem',
              }}
            >
              <Zap size={13} />
              Built for Australia
            </motion.div>

            <h1 style={{
              fontSize: 'clamp(2.5rem, 5vw, 3.75rem)',
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: '-0.04em',
              marginBottom: '1.5rem',
            }}>
              Split bills in
              <br />
              seconds, not
              <br />
              <span style={{
                background: 'linear-gradient(135deg, #818CF8, #60A5FA, #34D399)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>arguments</span>
            </h1>

            <p style={{
              fontSize: '1.125rem',
              color: '#71717A',
              maxWidth: '28rem',
              lineHeight: 1.7,
              marginBottom: '2.5rem',
            }}>
              Scan any receipt, share a link, and let everyone pay
              their fair share. Direct to your bank account.
            </p>

            <div className="hero-buttons" style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <motion.a
                whileHover={{ scale: 1.03, boxShadow: '0 0 30px rgba(99,102,241,0.2)' }}
                whileTap={{ scale: 0.97 }}
                href="https://apps.apple.com"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.625rem',
                  padding: '0.8125rem 1.75rem',
                  borderRadius: '0.75rem',
                  fontWeight: 600,
                  fontSize: '0.9375rem',
                  background: '#FAFAFA',
                  color: '#0A0A0B',
                  textDecoration: 'none',
                }}
              >
                <Smartphone size={18} />
                Download Free
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href="#how-it-works"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.8125rem 1.75rem',
                  borderRadius: '0.75rem',
                  fontWeight: 600,
                  fontSize: '0.9375rem',
                  background: 'transparent',
                  color: '#A1A1AA',
                  textDecoration: 'none',
                  border: '1px solid rgba(255,255,255,0.12)',
                  transition: 'border-color 0.2s, color 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; e.currentTarget.style.color = '#FAFAFA'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = '#A1A1AA'; }}
              >
                How it works
                <ArrowRight size={16} />
              </motion.a>
            </div>

            {/* Trust row */}
            <div className="hero-trust" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginTop: '3rem', flexWrap: 'wrap' }}>
              {[
                { icon: Shield, label: 'Bank-grade security' },
                { icon: CreditCard, label: 'Powered by Stripe' },
                { icon: Clock, label: 'Instant payouts' },
              ].map((item) => (
                <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                  <item.icon size={14} color="#52525B" />
                  <span style={{ fontSize: '0.75rem', color: '#52525B', fontWeight: 500 }}>{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — Phone Mockup */}
          <motion.div
            style={{ y: phoneY }}
            className="hero-phone"
          >
            <motion.div
              initial={{ opacity: 0, y: 50, rotateY: -8 }}
              animate={{ opacity: 1, y: 0, rotateY: 0 }}
              transition={{ delay: 0.3, duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
              style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}
            >
              {/* Glow behind phone */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '340px',
                height: '480px',
                background: 'radial-gradient(ellipse, rgba(99,102,241,0.15) 0%, transparent 60%)',
                filter: 'blur(60px)',
                pointerEvents: 'none',
              }} />

              <div style={{
                position: 'relative',
                width: '280px',
                height: '560px',
                borderRadius: '2.5rem',
                padding: '4px',
                background: 'linear-gradient(160deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.02) 50%, rgba(255,255,255,0.08) 100%)',
                boxShadow: '0 40px 100px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)',
              }}>
                <div style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 'calc(2.5rem - 4px)',
                  background: '#111113',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                }}>
                  {/* Status bar */}
                  <div style={{ padding: '0.75rem 1.25rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.6875rem', fontWeight: 600, color: '#FAFAFA' }}>9:41</span>
                    <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                      <div style={{ width: 14, height: 10, borderRadius: 2, border: '1px solid rgba(255,255,255,0.4)' }}>
                        <div style={{ width: '70%', height: '100%', background: '#34D399', borderRadius: 1 }} />
                      </div>
                    </div>
                  </div>

                  {/* App header */}
                  <div style={{
                    padding: '1rem 1.25rem 0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.375rem',
                  }}>
                    <Image src="/logo.png" alt="" width={16} height={16} />
                    <span style={{ fontWeight: 700, fontSize: '0.8125rem' }}>ZapSplit</span>
                  </div>

                  {/* Receipt items */}
                  <div style={{ flex: 1, padding: '0.625rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                    <div style={{ fontSize: '0.625rem', fontWeight: 600, color: '#71717A', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>
                      Receipt Items
                    </div>
                    {[
                      { name: 'Margherita Pizza', price: '$18.90', checked: true },
                      { name: 'Caesar Salad', price: '$14.50', checked: true },
                      { name: 'Sparkling Water', price: '$5.00', checked: false },
                      { name: 'Tiramisu', price: '$12.00', checked: false },
                    ].map((item, i) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 + i * 0.12 }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '0.5rem 0.625rem',
                          borderRadius: '0.5rem',
                          background: item.checked ? 'rgba(99,102,241,0.08)' : 'rgba(255,255,255,0.03)',
                          border: `1px solid ${item.checked ? 'rgba(99,102,241,0.2)' : 'rgba(255,255,255,0.05)'}`,
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <div style={{
                            width: 16, height: 16, borderRadius: 4,
                            background: item.checked ? '#818CF8' : 'transparent',
                            border: item.checked ? 'none' : '1.5px solid rgba(255,255,255,0.2)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                          }}>
                            {item.checked && <span style={{ fontSize: '0.5rem', color: 'white' }}>✓</span>}
                          </div>
                          <span style={{ fontSize: '0.6875rem', color: item.checked ? '#FAFAFA' : '#71717A', fontWeight: 500 }}>{item.name}</span>
                        </div>
                        <span style={{ fontSize: '0.6875rem', fontWeight: 600, color: item.checked ? '#FAFAFA' : '#52525B' }}>{item.price}</span>
                      </motion.div>
                    ))}

                    {/* Total */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.3 }}
                      style={{
                        marginTop: '0.5rem',
                        padding: '0.75rem',
                        borderRadius: '0.5rem',
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.06)',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.625rem', color: '#71717A', fontWeight: 500 }}>Your total</span>
                        <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#FAFAFA' }}>$33.40</span>
                      </div>
                    </motion.div>
                  </div>

                  {/* Pay button */}
                  <div style={{ padding: '0.75rem 1rem 1.25rem' }}>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.5 }}
                      style={{
                        height: '2.75rem',
                        borderRadius: '0.625rem',
                        background: 'linear-gradient(135deg, #818CF8, #6366F1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 12px rgba(99,102,241,0.3)',
                      }}
                    >
                      <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'white' }}>Pay $33.40</span>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Features — Bento Grid ── */}
      <section style={{ padding: '8rem 0 6rem' }}>
        <div style={{ maxWidth: '76rem', margin: '0 auto', padding: '0 2rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ marginBottom: '4rem' }}
          >
            <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#818CF8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
              Features
            </p>
            <h2 style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              maxWidth: '30rem',
              lineHeight: 1.15,
            }}>
              Everything you need to split bills effortlessly
            </h2>
          </motion.div>

          <div className="features-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'rgba(255,255,255,0.06)', borderRadius: '1.25rem', overflow: 'hidden' }}>
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                style={{
                  background: '#0A0A0B',
                  padding: '2.5rem 2rem',
                  transition: 'background 0.3s',
                  cursor: 'default',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#111113'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#0A0A0B'; }}
              >
                <div style={{
                  width: '2.5rem',
                  height: '2.5rem',
                  borderRadius: '0.625rem',
                  background: `${feature.accent}15`,
                  border: `1px solid ${feature.accent}25`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem',
                }}>
                  <feature.icon size={20} color={feature.accent} />
                </div>
                <h3 style={{ fontWeight: 700, fontSize: '1.125rem', marginBottom: '0.625rem', letterSpacing: '-0.01em' }}>
                  {feature.title}
                </h3>
                <p style={{ color: '#71717A', fontSize: '0.9375rem', lineHeight: 1.65 }}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how-it-works" style={{ padding: '6rem 0 8rem' }}>
        <div style={{ maxWidth: '76rem', margin: '0 auto', padding: '0 2rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ marginBottom: '4rem' }}
          >
            <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#34D399', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
              How it works
            </p>
            <h2 style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              maxWidth: '28rem',
              lineHeight: 1.15,
            }}>
              Four steps. Under 30 seconds.
            </h2>
          </motion.div>

          <div className="steps-grid" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '48rem' }}>
            {steps.map((step, index) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.25rem',
                  padding: '1.25rem 1.5rem',
                  borderRadius: '0.875rem',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  transition: 'background 0.3s, border-color 0.3s',
                  cursor: 'default',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; }}
              >
                <div style={{
                  width: '2.25rem',
                  height: '2.25rem',
                  borderRadius: '0.5rem',
                  background: 'linear-gradient(135deg, rgba(52,211,153,0.15), rgba(52,211,153,0.05))',
                  border: '1px solid rgba(52,211,153,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  color: '#34D399',
                  flexShrink: 0,
                }}>
                  {step.num}
                </div>
                <span style={{ fontSize: '0.9375rem', fontWeight: 500, color: '#D4D4D8', flex: 1 }}>
                  {step.title}
                </span>
                <step.icon size={18} color="#3F3F46" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section style={{ padding: '2rem 0 8rem' }}>
        <div style={{ maxWidth: '76rem', margin: '0 auto', padding: '0 2rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              position: 'relative',
              overflow: 'hidden',
              borderRadius: '1.5rem',
              padding: '5rem 2rem',
              textAlign: 'center',
              background: '#111113',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            {/* Gradient mesh */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: `
                radial-gradient(ellipse 50% 80% at 20% 0%, rgba(99,102,241,0.12), transparent),
                radial-gradient(ellipse 50% 80% at 80% 100%, rgba(52,211,153,0.08), transparent)
              `,
              pointerEvents: 'none',
            }} />

            <div style={{ position: 'relative', zIndex: 10 }}>
              <h2 style={{
                fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                fontWeight: 800,
                marginBottom: '1rem',
                letterSpacing: '-0.03em',
              }}>
                Stop chasing IOUs
              </h2>
              <p style={{
                fontSize: '1.0625rem',
                color: '#71717A',
                maxWidth: '28rem',
                margin: '0 auto 2.5rem',
                lineHeight: 1.65,
              }}>
                Join thousands who&apos;ve made bill splitting painless.
                Get paid instantly, every time.
              </p>
              <motion.a
                whileHover={{ scale: 1.03, boxShadow: '0 0 40px rgba(99,102,241,0.15)' }}
                whileTap={{ scale: 0.97 }}
                href="https://apps.apple.com"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.625rem',
                  padding: '0.875rem 2rem',
                  borderRadius: '0.75rem',
                  fontWeight: 600,
                  fontSize: '0.9375rem',
                  background: '#FAFAFA',
                  color: '#0A0A0B',
                  textDecoration: 'none',
                }}
              >
                <Smartphone size={18} />
                Get ZapSplit Free
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '3rem 0 2.5rem' }}>
        <div style={{ maxWidth: '76rem', margin: '0 auto', padding: '0 2rem' }}>
          <div className="footer-inner" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Image src="/logo.png" alt="ZapSplit" width={20} height={20} />
              <span style={{ fontWeight: 700, fontSize: '0.875rem' }}>ZapSplit</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', fontSize: '0.8125rem' }}>
              {['Support', 'Privacy', 'Terms'].map(link => (
                <a
                  key={link}
                  href={`/${link.toLowerCase()}`}
                  style={{ color: '#52525B', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#FAFAFA')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#52525B')}
                >
                  {link}
                </a>
              ))}
              <a
                href="mailto:zapsplit@gmail.com"
                style={{ color: '#52525B', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#FAFAFA')}
                onMouseLeave={e => (e.currentTarget.style.color = '#52525B')}
              >
                Contact
              </a>
            </div>

            <p style={{ fontSize: '0.75rem', color: '#3F3F46' }}>
              &copy; {new Date().getFullYear()} ZapSplit. Made in Perth, Australia.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
