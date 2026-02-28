'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Smartphone, Receipt, Users, ArrowRight, Zap, Shield, Clock, CreditCard } from 'lucide-react';
import Image from 'next/image';
import { useRef } from 'react';

const features = [
  {
    icon: Receipt,
    title: 'Scan Any Receipt',
    description: 'Point your camera at any receipt. Our AI reads every item and price instantly.',
    gradient: 'linear-gradient(135deg, #1e3a5f, #0f2744)',
  },
  {
    icon: Users,
    title: 'Split Fairly',
    description: 'Everyone picks what they ordered. No more awkward mental math or guessing.',
    gradient: 'linear-gradient(135deg, #1a3352, #0d2238)',
  },
  {
    icon: Zap,
    title: 'Instant Payouts',
    description: 'Money hits the creator\'s bank account instantly. No waiting around.',
    gradient: 'linear-gradient(135deg, #162d4a, #0b1e33)',
  },
];

const steps = [
  { num: '01', title: 'Scan', desc: 'The bill creator scans the receipt in the app' },
  { num: '02', title: 'Share', desc: 'A payment link is shared with the group' },
  { num: '03', title: 'Select', desc: 'Each person picks what they ordered' },
  { num: '04', title: 'Pay', desc: 'One tap to pay — straight to their bank' },
];

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const phoneY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const phoneScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <div style={{ minHeight: '100vh', background: '#030712', color: '#F9FAFB', overflow: 'hidden' }}>

      {/* Header */}
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: 'rgba(3, 7, 18, 0.95)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{
          maxWidth: '72rem',
          margin: '0 auto',
          padding: '0.875rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
            <Image src="/logo.png" alt="ZapSplit" width={30} height={30} style={{ filter: 'brightness(1.2)' }} />
            <span style={{ fontWeight: 700, fontSize: '1.125rem', letterSpacing: '-0.02em' }}>ZapSplit</span>
          </div>
          <a
            href="https://apps.apple.com"
            style={{
              padding: '0.5rem 1.25rem',
              borderRadius: '9999px',
              fontSize: '0.8125rem',
              fontWeight: 600,
              background: 'white',
              color: '#030712',
              textDecoration: 'none',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(255,255,255,0.15)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            Get the App
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section ref={heroRef} style={{ position: 'relative', paddingTop: '8rem', paddingBottom: '2rem' }}>
        {/* Ambient glow */}
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '400px',
          background: 'radial-gradient(ellipse, rgba(59,130,246,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: '56rem', margin: '0 auto', padding: '0 1.5rem', textAlign: 'center', position: 'relative' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.375rem 1rem',
                borderRadius: '9999px',
                border: '1px solid rgba(59,130,246,0.2)',
                background: 'rgba(59,130,246,0.08)',
                fontSize: '0.8125rem',
                fontWeight: 500,
                color: '#60A5FA',
                marginBottom: '2rem',
              }}
            >
              <Zap size={14} />
              The fastest way to split bills
            </motion.div>

            <h1 style={{
              fontSize: 'clamp(2.75rem, 6vw, 4.5rem)',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.04em',
              marginBottom: '1.5rem',
            }}>
              Split bills in seconds,
              <br />
              <span style={{ color: '#60A5FA' }}>not arguments</span>
            </h1>

            <p style={{
              fontSize: '1.125rem',
              color: '#94A3B8',
              maxWidth: '36rem',
              margin: '0 auto 2.5rem',
              lineHeight: 1.6,
            }}>
              Scan receipts, share a link, and let everyone pay their fair share.
              Direct to your bank. No awkward IOUs.
            </p>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href="https://apps.apple.com"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.875rem 2rem',
                  borderRadius: '0.75rem',
                  fontWeight: 600,
                  fontSize: '1rem',
                  background: 'white',
                  color: '#030712',
                  textDecoration: 'none',
                  boxShadow: '0 0 30px rgba(255,255,255,0.1)',
                }}
              >
                <Smartphone size={20} />
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
                  padding: '0.875rem 2rem',
                  borderRadius: '0.75rem',
                  fontWeight: 600,
                  fontSize: '1rem',
                  background: 'transparent',
                  color: '#94A3B8',
                  textDecoration: 'none',
                  border: '1px solid rgba(255,255,255,0.1)',
                  transition: 'border-color 0.2s, color 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; e.currentTarget.style.color = '#F9FAFB'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#94A3B8'; }}
              >
                See How It Works
                <ArrowRight size={18} />
              </motion.a>
            </div>
          </motion.div>

          {/* Phone Mockup */}
          <motion.div
            style={{ y: phoneY, scale: phoneScale }}
          >
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              style={{ marginTop: '4rem', position: 'relative' }}
            >
              {/* Phone glow */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '320px',
                height: '500px',
                background: 'radial-gradient(ellipse, rgba(59,130,246,0.12) 0%, transparent 60%)',
                filter: 'blur(40px)',
                pointerEvents: 'none',
              }} />

              {/* Fade overlay */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, #030712 0%, transparent 30%)',
                zIndex: 10,
                pointerEvents: 'none',
                borderRadius: '3rem',
              }} />

              <div style={{
                position: 'relative',
                margin: '0 auto',
                width: '17rem',
                height: '460px',
                borderRadius: '2.5rem',
                padding: '0.5rem',
                background: 'linear-gradient(160deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.03) 100%)',
                boxShadow: '0 25px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1)',
              }}>
                <div style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '2.25rem',
                  background: '#0B1120',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                }}>
                  {/* Phone header */}
                  <div style={{
                    padding: '1rem 1rem 0.75rem',
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.375rem',
                  }}>
                    <Image src="/logo.png" alt="" width={18} height={18} style={{ filter: 'brightness(1.2)' }} />
                    <span style={{ fontWeight: 700, fontSize: '0.8125rem', color: '#F9FAFB' }}>ZapSplit</span>
                  </div>

                  {/* Animated skeleton items */}
                  <div style={{ flex: 1, padding: '0.875rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 + i * 0.15 }}
                        style={{
                          height: '2.75rem',
                          borderRadius: '0.625rem',
                          background: 'rgba(255,255,255,0.04)',
                          border: '1px solid rgba(255,255,255,0.06)',
                          display: 'flex',
                          alignItems: 'center',
                          padding: '0 0.75rem',
                          justifyContent: 'space-between',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <div style={{
                            width: '16px', height: '16px', borderRadius: '4px',
                            background: i === 0 ? '#3B82F6' : 'rgba(255,255,255,0.1)',
                            border: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.15)',
                          }} />
                          <div style={{
                            width: `${60 + i * 15}px`, height: '10px', borderRadius: '4px',
                            background: 'rgba(255,255,255,0.12)',
                          }} />
                        </div>
                        <div style={{ width: '36px', height: '10px', borderRadius: '4px', background: 'rgba(255,255,255,0.08)' }} />
                      </motion.div>
                    ))}

                    {/* Summary card */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.3 }}
                      style={{
                        marginTop: '0.5rem',
                        padding: '0.875rem',
                        borderRadius: '0.75rem',
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.06)',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <div style={{ width: '50px', height: '8px', borderRadius: '4px', background: 'rgba(255,255,255,0.08)' }} />
                        <div style={{ width: '40px', height: '8px', borderRadius: '4px', background: 'rgba(255,255,255,0.08)' }} />
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ width: '35px', height: '12px', borderRadius: '4px', background: 'rgba(255,255,255,0.12)' }} />
                        <div style={{ width: '50px', height: '12px', borderRadius: '4px', background: '#3B82F6' }} />
                      </div>
                    </motion.div>
                  </div>

                  {/* Pay button */}
                  <div style={{ padding: '0.875rem' }}>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.5 }}
                      style={{
                        height: '2.75rem',
                        borderRadius: '0.625rem',
                        background: 'linear-gradient(135deg, #3B82F6, #2563EB)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'white' }}>Pay $12.50</span>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '6rem 0' }}>
        <div style={{ maxWidth: '64rem', margin: '0 auto', padding: '0 1.5rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '3.5rem' }}
          >
            <h2 style={{
              fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              marginBottom: '1rem',
            }}>
              Why people love ZapSplit
            </h2>
            <p style={{ color: '#64748B', fontSize: '1.0625rem', maxWidth: '32rem', margin: '0 auto' }}>
              Built for real-life bill splitting. No sign-up needed to pay.
            </p>
          </motion.div>

          <div className="features-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                style={{
                  padding: '2rem 1.75rem',
                  borderRadius: '1rem',
                  background: feature.gradient,
                  border: '1px solid rgba(255,255,255,0.06)',
                  transition: 'transform 0.3s, border-color 0.3s, box-shadow 0.3s',
                  cursor: 'default',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.borderColor = 'rgba(59,130,246,0.25)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.3)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                {/* Subtle corner glow */}
                <div style={{
                  position: 'absolute',
                  top: '-30px',
                  right: '-30px',
                  width: '100px',
                  height: '100px',
                  background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)',
                  pointerEvents: 'none',
                }} />
                <div style={{
                  width: '2.75rem',
                  height: '2.75rem',
                  borderRadius: '0.75rem',
                  background: 'rgba(59,130,246,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem',
                }}>
                  <feature.icon size={22} color="#60A5FA" />
                </div>
                <h3 style={{ fontWeight: 700, fontSize: '1.125rem', marginBottom: '0.5rem', letterSpacing: '-0.01em' }}>
                  {feature.title}
                </h3>
                <p style={{ color: '#94A3B8', fontSize: '0.9375rem', lineHeight: 1.6 }}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" style={{ padding: '6rem 0' }}>
        <div style={{ maxWidth: '64rem', margin: '0 auto', padding: '0 1.5rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '4rem' }}
          >
            <h2 style={{
              fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              marginBottom: '1rem',
            }}>
              How it works
            </h2>
            <p style={{ color: '#64748B', fontSize: '1.0625rem' }}>
              Four steps. Under 30 seconds. Seriously.
            </p>
          </motion.div>

          <div className="steps-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem' }}>
            {steps.map((step, index) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                whileHover={{ y: -6, borderColor: 'rgba(59,130,246,0.3)' }}
                style={{
                  position: 'relative',
                  padding: '2rem 1.5rem 1.75rem',
                  borderRadius: '1rem',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  overflow: 'hidden',
                  transition: 'box-shadow 0.3s',
                }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.3)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; }}
              >
                {/* Large faded step number background */}
                <div style={{
                  position: 'absolute',
                  top: '-10px',
                  right: '-5px',
                  fontSize: '6rem',
                  fontWeight: 900,
                  color: 'rgba(255,255,255,0.03)',
                  lineHeight: 1,
                  pointerEvents: 'none',
                  userSelect: 'none',
                }}>
                  {step.num}
                </div>

                {/* Top accent line */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.15, duration: 0.6 }}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: index === 0
                      ? 'linear-gradient(90deg, #3B82F6, #60A5FA)'
                      : 'linear-gradient(90deg, rgba(59,130,246,0.4), rgba(59,130,246,0.1))',
                    transformOrigin: 'left center',
                  }}
                />

                <div style={{ position: 'relative', zIndex: 1 }}>
                  {/* Step number badge */}
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '2rem',
                    height: '2rem',
                    borderRadius: '0.5rem',
                    background: index === 0
                      ? 'linear-gradient(135deg, #3B82F6, #2563EB)'
                      : 'rgba(59,130,246,0.1)',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    color: index === 0 ? 'white' : '#60A5FA',
                    marginBottom: '1.25rem',
                  }}>
                    {step.num}
                  </div>

                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    marginBottom: '0.5rem',
                    letterSpacing: '-0.01em',
                  }}>
                    {step.title}
                  </h3>
                  <p style={{ color: '#64748B', fontSize: '0.875rem', lineHeight: 1.55 }}>
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section style={{ padding: '5rem 0' }}>
        <div style={{ maxWidth: '56rem', margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '3rem',
            flexWrap: 'wrap',
          }}>
            {[
              { icon: Shield, text: 'Bank-grade encryption' },
              { icon: CreditCard, text: 'Powered by Stripe' },
              { icon: Clock, text: 'Instant payouts' },
            ].map((item, i) => (
              <motion.div
                key={item.text}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}
              >
                <item.icon size={18} color="#64748B" />
                <span style={{ fontSize: '0.875rem', color: '#64748B', fontWeight: 500 }}>{item.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '4rem 0 6rem' }}>
        <div style={{ maxWidth: '42rem', margin: '0 auto', padding: '0 1.5rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              position: 'relative',
              overflow: 'hidden',
              borderRadius: '1.5rem',
              padding: '3.5rem 2rem',
              textAlign: 'center',
              background: 'linear-gradient(135deg, #0f2744 0%, #162d4a 50%, #0f2744 100%)',
              border: '1px solid rgba(59,130,246,0.15)',
            }}
          >
            {/* Glow */}
            <div style={{
              position: 'absolute',
              top: '-50%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '400px',
              height: '300px',
              background: 'radial-gradient(ellipse, rgba(59,130,246,0.15) 0%, transparent 60%)',
              pointerEvents: 'none',
            }} />

            <div style={{ position: 'relative', zIndex: 10 }}>
              <h2 style={{
                fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                fontWeight: 800,
                marginBottom: '0.75rem',
                letterSpacing: '-0.03em',
              }}>
                Stop chasing IOUs
              </h2>
              <p style={{
                fontSize: '1rem',
                color: '#94A3B8',
                marginBottom: '2rem',
                maxWidth: '24rem',
                margin: '0 auto 2rem',
                lineHeight: 1.6,
              }}>
                Join the people who&apos;ve made bill splitting painless. Get paid instantly.
              </p>
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href="https://apps.apple.com"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.875rem 2rem',
                  borderRadius: '0.75rem',
                  fontWeight: 600,
                  fontSize: '1rem',
                  background: 'white',
                  color: '#030712',
                  textDecoration: 'none',
                  boxShadow: '0 0 30px rgba(255,255,255,0.1)',
                }}
              >
                <Smartphone size={20} />
                Get ZapSplit Free
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '3rem 0 2rem' }}>
        <div style={{ maxWidth: '56rem', margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Image src="/logo.png" alt="ZapSplit" width={24} height={24} style={{ filter: 'brightness(1.2)' }} />
              <span style={{ fontWeight: 700, fontSize: '0.9375rem' }}>ZapSplit</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', fontSize: '0.8125rem' }}>
              {['Support', 'Privacy', 'Terms'].map(link => (
                <a
                  key={link}
                  href={`/${link.toLowerCase()}`}
                  style={{ color: '#64748B', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#F9FAFB')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#64748B')}
                >
                  {link}
                </a>
              ))}
              <a
                href="mailto:zapsplit@gmail.com"
                style={{ color: '#64748B', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#F9FAFB')}
                onMouseLeave={e => (e.currentTarget.style.color = '#64748B')}
              >
                Contact
              </a>
            </div>

            <p style={{ fontSize: '0.75rem', color: '#475569' }}>
              &copy; {new Date().getFullYear()} ZapSplit. Made in Perth, Australia.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
