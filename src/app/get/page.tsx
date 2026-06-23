'use client';

import { useEffect, useState } from 'react';

const APP_STORE_URL = 'https://apps.apple.com/au/app/id6759526469';
const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.zapsplit.app';

export default function GetAppPage() {
  const [platform, setPlatform] = useState<'ios' | 'android' | 'other'>('other');

  useEffect(() => {
    const ua = navigator.userAgent || navigator.vendor || '';
    if (/iPad|iPhone|iPod/.test(ua)) setPlatform('ios');
    else if (/android/i.test(ua)) setPlatform('android');
    else setPlatform('other');
  }, []);

  const primaryStyle = {
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.625rem',
    padding: '1rem 1.25rem', borderRadius: '0.875rem', textDecoration: 'none',
    backgroundColor: '#ffffff', color: '#0a1530', fontWeight: 700, fontSize: '1.0625rem',
  } as const;
  const secondaryStyle = {
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.625rem',
    padding: '1rem 1.25rem', borderRadius: '0.875rem', textDecoration: 'none',
    backgroundColor: 'rgba(255,255,255,0.12)', color: '#ffffff', fontWeight: 700, fontSize: '1.0625rem',
    border: '1px solid rgba(255,255,255,0.4)',
  } as const;

  const appStoreBtn = (
    <a key="ios" href={APP_STORE_URL} style={platform === 'android' ? secondaryStyle : primaryStyle}>
      Download on the App Store
    </a>
  );
  const playStoreBtn = (
    <a key="android" href={PLAY_STORE_URL} style={platform === 'android' ? primaryStyle : secondaryStyle}>
      Get it on Google Play
    </a>
  );

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1.5rem',
        textAlign: 'center',
        backgroundColor: '#0a1530',
        backgroundImage:
          'radial-gradient(circle at 50% 38%, #2e74d6 0%, #142a5c 45%, #060c1c 100%)',
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo.png"
        alt="ZapSplit logo"
        style={{ width: '5.5rem', height: '5.5rem', objectFit: 'contain', marginBottom: '1rem' }}
      />
      <h1 style={{ color: '#ffffff', fontSize: '2.25rem', fontWeight: 800, letterSpacing: '-0.02em', margin: 0 }}>
        Get ZapSplit
      </h1>
      <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: '1.0625rem', marginTop: '0.625rem', marginBottom: '2.25rem', maxWidth: '24rem', lineHeight: 1.55 }}>
        Split bills with friends, scan receipts, and get paid back instantly. Free to download.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', width: '100%', maxWidth: '21rem' }}>
        {/* only the relevant store on a phone; both on desktop/unknown */}
        {platform === 'ios' && appStoreBtn}
        {platform === 'android' && playStoreBtn}
        {platform === 'other' && [appStoreBtn, playStoreBtn]}
      </div>

      <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8125rem', marginTop: '2.5rem' }}>
        Made in Australia · zapsplit.com.au
      </p>
    </div>
  );
}
