import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Logo } from './Logo';
import { RollText } from './RollLink';
import { useLanguage } from '../context/LanguageContext';

export const Header = () => {
  const { lang, switchLanguage, getPath, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { to: getPath('/'), label: t.nav.home },
    { to: getPath('/about'), label: t.nav.aboutUs },
    { to: getPath('/applications'), label: t.nav.applications },
    { to: getPath('/catalogues'), label: t.nav.catalogues },
    { to: getPath('/contact'), label: t.nav.contactUs }
  ];

  const signInStyle = {
    borderRadius: '32px',
    border: '2px solid #007749',
    background: 'radial-gradient(97.07% 95.3% at 48.09% 47.12%, #007749 0%, #74AA50 100%)',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.20), 0 3px 2px 0 rgba(255, 255, 255, 0.70) inset',
    color: '#ffffff',
    fontFamily: 'var(--font-body)',
    fontSize: '0.8125rem',
    fontWeight: 500,
    letterSpacing: '0.06em',
    padding: '7px 20px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    whiteSpace: 'nowrap',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'filter 0.2s ease, transform 0.2s ease'
  };

  return (
    <>
      <header
        className="site-header"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: 'var(--header-height)',
          zIndex: 900,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 var(--header-padding)',
          background: scrolled ? 'rgba(0, 0, 0, 0.65)' : 'rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: scrolled ? '1px solid var(--border-subtle)' : '1px solid transparent',
          transition: 'background 0.3s ease, border-color 0.3s ease'
        }}
      >
        {/* Left: Logo */}
        <Logo />

        {/* Center / Right: Desktop Navigation */}
        <nav
          className="desktop-nav"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'clamp(1.5rem, 2.5vw, 3rem)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(1.25rem, 2vw, 2.25rem)' }}>
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === getPath('/')}
                className={({ isActive }) => `header-nav-link ${isActive ? 'is-active' : ''}`}
                style={({ isActive }) => ({
                  color: isActive ? 'var(--text-white, #ffffff)' : 'var(--text-secondary, #c9d0d2)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  fontWeight: isActive ? 500 : 400,
                  letterSpacing: '0.02em',
                  textTransform: 'none',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '8px 0',
                  whiteSpace: 'nowrap',
                  transition: 'color 0.2s ease, opacity 0.2s ease',
                  opacity: isActive ? 1 : 0.9
                })}
              >
                <RollText text={link.label} />
              </NavLink>
            ))}
          </div>

          {/* Right Action Group: Language Switcher + Sign In */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
            {/* Language Switcher Capsule (EN | AR) */}
            <div
              className="lang-switcher-capsule"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                border: '1.2px solid rgba(200, 207, 209, 0.32)',
                borderRadius: '24px',
                padding: '2px',
                height: '34px',
                boxSizing: 'border-box'
              }}
            >
              <button
                onClick={() => switchLanguage('en')}
                className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
                style={{
                  border: 'none',
                  padding: '4px 10px',
                  borderRadius: '20px',
                  backgroundColor: lang === 'en' ? '#c9d0d2' : 'transparent',
                  color: lang === 'en' ? '#0c0d0e' : '#c9d0d2',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.75rem',
                  fontWeight: lang === 'en' ? 600 : 400,
                  letterSpacing: '0.08em',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  lineHeight: 1.2
                }}
                aria-label="Switch to English"
              >
                EN
              </button>
              <button
                onClick={() => switchLanguage('ar')}
                className={`lang-btn ${lang === 'ar' ? 'active' : ''}`}
                style={{
                  border: 'none',
                  padding: '4px 10px',
                  borderRadius: '20px',
                  backgroundColor: lang === 'ar' ? '#c9d0d2' : 'transparent',
                  color: lang === 'ar' ? '#0c0d0e' : '#c9d0d2',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.75rem',
                  fontWeight: lang === 'ar' ? 600 : 400,
                  letterSpacing: '0.08em',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  lineHeight: 1.2
                }}
                aria-label="Switch to Arabic"
              >
                AR
              </button>
            </div>

            {/* Sign In Button */}
            <Link
              to={getPath('/contact')}
              className="header-signin-btn"
              style={signInStyle}
            >
              <RollText text={t.nav.signIn} />
            </Link>
          </div>
        </nav>

        {/* Mobile Right Controls: Language Switcher Capsule + Hamburger Menu */}
        <div className="mobile-nav" style={{ display: 'none', alignItems: 'center', gap: '12px' }}>
          <div
            className="lang-switcher-capsule"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              border: '1.2px solid rgba(200, 207, 209, 0.32)',
              borderRadius: '24px',
              padding: '2px',
              height: '32px',
              boxSizing: 'border-box'
            }}
          >
            <button
              onClick={() => switchLanguage('en')}
              className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
              style={{
                border: 'none',
                padding: '3px 8px',
                borderRadius: '20px',
                backgroundColor: lang === 'en' ? '#c9d0d2' : 'transparent',
                color: lang === 'en' ? '#0c0d0e' : '#c9d0d2',
                fontFamily: 'var(--font-body)',
                fontSize: '0.7rem',
                fontWeight: lang === 'en' ? 600 : 400,
                letterSpacing: '0.08em',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                lineHeight: 1.2
              }}
              aria-label="Switch to English"
            >
              EN
            </button>
            <button
              onClick={() => switchLanguage('ar')}
              className={`lang-btn ${lang === 'ar' ? 'active' : ''}`}
              style={{
                border: 'none',
                padding: '3px 8px',
                borderRadius: '20px',
                backgroundColor: lang === 'ar' ? '#c9d0d2' : 'transparent',
                color: lang === 'ar' ? '#0c0d0e' : '#c9d0d2',
                fontFamily: 'var(--font-body)',
                fontSize: '0.7rem',
                fontWeight: lang === 'ar' ? 600 : 400,
                letterSpacing: '0.08em',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                lineHeight: 1.2
              }}
              aria-label="Switch to Arabic"
            >
              AR
            </button>
          </div>

          <button
            className="mobile-menu-trigger"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              width: '38px',
              height: '38px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid rgba(200, 207, 209, 0.32)',
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              cursor: 'pointer',
              padding: 0
            }}
          >
            <div
              style={{
                width: '18px',
                height: '1.5px',
                backgroundColor: 'var(--text-white)',
                transform: mobileMenuOpen ? 'rotate(45deg) translate(3px, 3px)' : 'none',
                transition: 'transform 0.25s ease'
              }}
            />
            <div
              style={{
                width: '18px',
                height: '1.5px',
                backgroundColor: 'var(--text-white)',
                marginTop: '5px',
                transform: mobileMenuOpen ? 'rotate(-45deg) translate(2px, -2px)' : 'none',
                transition: 'transform 0.25s ease'
              }}
            />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="mobile-menu"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 890,
            backgroundColor: 'var(--bg-primary)',
            padding: 'calc(var(--header-height) + 2rem) var(--page-padding) 3rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            overflowY: 'auto'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                style={({ isActive }) => ({
                  color: isActive ? 'var(--text-white)' : 'var(--text-primary)',
                  fontSize: 'clamp(1.5rem, 5vw, 2.25rem)',
                  fontFamily: 'var(--font-headline)',
                  fontWeight: 300,
                  textDecoration: 'none'
                })}
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '2.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span className="mono" style={{ color: 'var(--text-muted)' }}>Language:</span>
              <div
                style={{
                  display: 'inline-flex',
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-pill)',
                  padding: '3px'
                }}
              >
                <button
                  onClick={() => switchLanguage('en')}
                  style={{
                    padding: '6px 14px',
                    borderRadius: 'var(--radius-pill)',
                    backgroundColor: lang === 'en' ? 'var(--text-primary)' : 'transparent',
                    color: lang === 'en' ? 'var(--text-dark)' : 'var(--text-muted)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8125rem'
                  }}
                >
                  EN
                </button>
                <button
                  onClick={() => switchLanguage('ar')}
                  style={{
                    padding: '6px 14px',
                    borderRadius: 'var(--radius-pill)',
                    backgroundColor: lang === 'ar' ? 'var(--text-primary)' : 'transparent',
                    color: lang === 'ar' ? 'var(--text-dark)' : 'var(--text-muted)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8125rem'
                  }}
                >
                  AR
                </button>
              </div>
            </div>

            <Link
              to={getPath('/contact')}
              className="header-signin-btn"
              style={{
                ...signInStyle,
                width: '100%',
                padding: '0.9rem 1.5rem',
                fontSize: '0.9375rem'
              }}
              onClick={() => setMobileMenuOpen(false)}
            >
              <RollText text={t.nav.signIn} />
            </Link>

            <p className="mono" style={{ color: 'var(--text-dimmed)', marginTop: '0.5rem' }}>
              {t.footer.email}
            </p>
          </div>
        </div>
      )}

      <style>{`
        .header-nav-link {
          position: relative;
        }
        .header-nav-link:hover {
          color: #ffffff !important;
        }
        .header-nav-link:hover .roll-link-inner {
          transform: translateY(-50%);
        }
        .logo-link:hover {
          opacity: 0.85;
        }
        .lang-btn:not(.active):hover {
          color: #ffffff !important;
        }
        .header-signin-btn:hover {
          filter: brightness(1.08);
          transform: translateY(-1px);
        }
        .header-signin-btn:hover .roll-link-inner {
          transform: translateY(-50%);
        }
        @media (max-width: 1020px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-nav {
            display: flex !important;
          }
        }
        @media (max-width: 600px) {
          .logo-link img {
            height: 40px !important;
            width: auto !important;
          }
          .site-header {
            padding: 0 1rem !important;
          }
        }
      `}</style>
    </>
  );
};
