import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export const Preloader = () => {
  const { lang } = useLanguage();

  // If in headless test environment or explicitly requested, bypass preloader
  const isHeadless =
    typeof navigator !== 'undefined' &&
    (navigator.userAgent.includes('Headless') ||
      (typeof window !== 'undefined' && window.location.search.includes('nopreloader')));

  const [visible, setVisible] = useState(!isHeadless);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (isHeadless) return;

    // Check if previously loaded in session
    const hasLoaded = sessionStorage.getItem('fragment-preloader-complete');
    if (hasLoaded) {
      setVisible(false);
      return;
    }

    const timer = setTimeout(() => {
      setFading(true);
      setTimeout(() => {
        setVisible(false);
        try {
          sessionStorage.setItem('fragment-preloader-complete', '1');
        } catch (e) {}
      }, 400);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isHeadless]);

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: '#000000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.4s ease',
        pointerEvents: fading ? 'none' : 'auto'
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
        <div
          style={{
            width: '24px',
            height: '24px',
            border: '2px solid rgba(201, 208, 210, 0.2)',
            borderTopColor: '#c9d0d2',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite'
          }}
        />
        <p
          className="mono"
          style={{
            color: '#c9d0d2',
            fontSize: '0.8125rem',
            letterSpacing: '0.1em'
          }}
        >
          {lang === 'ar' ? 'جاري تحميل الصفحة' : 'Loading Page'}
        </p>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
