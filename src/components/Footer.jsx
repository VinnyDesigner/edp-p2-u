import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { useLanguage } from '../context/LanguageContext';

export const Footer = () => {
  const { getPath } = useLanguage();

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Applications', to: '/applications' },
    { label: 'Catalogues', to: '/catalogues' },
    { label: 'About Us', to: '/about' },
    { label: 'Contact Us', to: '/contact' }
  ];

  return (
    <footer className="ead-footer">
      <div className="ead-footer-grid">
        {/* Column 1: EAD Logo & Contact Details */}
        <div className="ead-footer-col-left">
          <div className="ead-footer-brand-box">
            <Link to={getPath('/')} aria-label="Environment Agency - Abu Dhabi Home" style={{ display: 'inline-flex', textDecoration: 'none' }}>
              <Logo height={48} />
            </Link>
          </div>

          <div className="ead-footer-contact-box">
            <div className="ead-footer-contact-row">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ flexShrink: 0, opacity: 0.92 }}>
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
              </svg>
              <span>Abu Dhabi, UAE</span>
            </div>

            <a href="tel:+11234567893" className="ead-footer-contact-row">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0, opacity: 0.92 }}>
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>(+1) 123 456 7893</span>
            </a>

            <a href="mailto:ead@email.com" className="ead-footer-contact-row">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ flexShrink: 0, opacity: 0.92 }}>
                <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
              <span>ead@email.com</span>
            </a>
          </div>
        </div>

        {/* Column 2: Navigation Links */}
        <div className="ead-footer-col-mid">
          <nav className="ead-footer-nav-box" aria-label="Footer navigation">
            {navLinks.map((item) => (
              <Link key={item.to} to={getPath(item.to)} className="ead-footer-nav-link">
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="ead-footer-mid-bottom" aria-hidden="true" />
        </div>

        {/* Column 3: Connect CTA, Globe Watermark & Legal */}
        <div className="ead-footer-col-right">
          {/* Subtle EAD Globe & Arc Watermark */}
          <svg
            className="ead-footer-watermark"
            viewBox="0 0 260 260"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M255 18 C 165 48, 82 110, 48 168 C 28 202, 42 236, 92 238 C 145 240, 204 202, 245 148"
              stroke="#ffffff"
              strokeWidth="16"
              strokeLinecap="round"
              opacity="0.22"
            />
            <circle cx="152" cy="142" r="56" stroke="#ffffff" strokeWidth="2.5" />
            <ellipse cx="152" cy="142" rx="34" ry="56" stroke="#ffffff" strokeWidth="2" />
            <ellipse cx="152" cy="142" rx="14" ry="56" stroke="#ffffff" strokeWidth="2" />
            <ellipse cx="152" cy="142" rx="56" ry="20" stroke="#ffffff" strokeWidth="2" />
            <ellipse cx="152" cy="142" rx="56" ry="38" stroke="#ffffff" strokeWidth="2" />
          </svg>

          <div style={{ position: 'relative', zIndex: 1 }}>
            <h3
              style={{
                fontSize: 'clamp(1.45rem, 2.25vw, 1.95rem)',
                fontWeight: 400,
                lineHeight: 1.24,
                letterSpacing: '-0.02em',
                color: '#ffffff',
                margin: '0 0 1.45rem 0'
              }}
            >
              Let&apos;s Connect for a
              <br />
              Sustainable Future.
            </h3>

            <div style={{ position: 'relative', display: 'inline-block' }}>
              <Link
                to={getPath('/contact')}
                className="hero-ead-cta"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.68rem 1.4rem',
                  borderRadius: '9999px',
                  border: '2px solid #007749',
                  background:
                    'radial-gradient(97.07% 95.3% at 48.09% 47.12%, #007749 0%, #74AA50 100%)',
                  boxShadow:
                    '0 1px 3px 0 rgba(0, 0, 0, 0.25), 0 3px 2px 0 rgba(255, 255, 255, 0.65) inset',
                  color: '#ffffff',
                  fontSize: '0.84375rem',
                  fontWeight: 500,
                  textDecoration: 'none'
                }}
              >
                <span>Get In Touch</span>
                <span aria-hidden="true">→</span>
              </Link>

              {/* Dashed trail + pointer arrow matching footer reference */}
              <svg
                width="96"
                height="56"
                viewBox="0 0 96 56"
                fill="none"
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  left: '-56px',
                  top: '36px',
                  pointerEvents: 'none'
                }}
              >
                <path
                  d="M 4 54 C 14 26, 40 20, 56 32 C 70 42, 76 28, 76 14"
                  stroke="rgba(255, 255, 255, 0.35)"
                  strokeWidth="1.35"
                  strokeDasharray="3 3"
                />
                <path
                  d="M 76 4 L 84 20 L 76 16.5 L 68 20 Z"
                  fill="#ffffff"
                />
              </svg>
            </div>
          </div>

          <div className="ead-footer-legal">
            <span>@2026 Abu Dhabi Government. All rights reserved.</span>
            <span aria-hidden="true">•</span>
            <Link to={getPath('/pp')}>Privacy</Link>
            <span aria-hidden="true">•</span>
            <Link to={getPath('/pp')}>Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
