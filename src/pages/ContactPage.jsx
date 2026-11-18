import React from 'react';
import { ContactForm } from '../components/ContactForm';
import { useLanguage } from '../context/LanguageContext';

export const ContactPage = () => {
  const { t } = useLanguage();
  const contact = t.contactPage;

  return (
    <div
      className="contact-page"
      style={{
        paddingTop: 'calc(var(--header-height) + 3.5rem)',
        paddingBottom: 'clamp(4rem, 8vw, 6.5rem)',
        background:
          'radial-gradient(ellipse 65% 40% at 18% 12%, rgba(0, 119, 73, 0.24) 0%, transparent 72%), radial-gradient(ellipse 58% 38% at 84% 48%, rgba(116, 170, 80, 0.14) 0%, transparent 72%)'
      }}
    >
      <div
        style={{
          width: '100%',
          paddingLeft: 'var(--header-padding)',
          paddingRight: 'var(--header-padding)'
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
            gap: 'clamp(2.5rem, 5vw, 5rem)',
            alignItems: 'start'
          }}
        >
          {/* Left: EAD Platform Context */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div>
              <span className="pill-tag" style={{ marginBottom: '1.25rem' }}>
                <span className="pill-dot" />
                ENVIRONMENT AGENCY – ABU DHABI
              </span>
              <h1
                style={{
                  fontSize: 'clamp(2.35rem, 5vw, 4rem)',
                  fontWeight: 400,
                  color: 'var(--text-white)',
                  marginBottom: '1.25rem',
                  lineHeight: 1.08
                }}
              >
                {contact.title}
              </h1>
              <p
                style={{
                  fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)',
                  color: 'var(--text-primary)',
                  lineHeight: 1.6,
                  marginBottom: '1.25rem'
                }}
              >
                {contact.lead}
              </p>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>
                {contact.availability}
              </p>
            </div>

            <div
              style={{
                borderTop: '1px solid rgba(116, 170, 80, 0.22)',
                paddingTop: '1.75rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.1rem'
              }}
            >
              <div>
                <p className="mono" style={{ color: '#91D19D', marginBottom: '0.35rem', fontSize: '0.78rem' }}>
                  PLATFORM
                </p>
                <p style={{ color: 'var(--text-white)', fontSize: '1rem', margin: 0 }}>
                  {t.footer.studio}
                  <br />
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.9375rem' }}>
                    {t.footer.designer} · {t.footer.location}
                  </span>
                </p>
              </div>

              <div
                style={{
                  padding: '1rem 1.2rem',
                  borderRadius: '12px',
                  border: '1px solid rgba(116, 170, 80, 0.25)',
                  background: 'rgba(10, 26, 18, 0.7)'
                }}
              >
                <p className="mono" style={{ color: '#91D19D', fontSize: '0.75rem', marginBottom: '0.35rem' }}>
                  OFFICIAL CONTACT DETAILS PENDING CONFIRMATION
                </p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.55, margin: 0 }}>
                  Verified EAD email address, telephone number, and inquiry routing endpoint should be supplied by EAD before production deployment.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Inquiry Form (Explicitly marked unavailable for backend submission) */}
          <div
            style={{
              background: 'linear-gradient(150deg, rgba(10, 26, 18, 0.94) 0%, rgba(5, 9, 7, 0.98) 100%)',
              border: '1px solid rgba(116, 170, 80, 0.24)',
              borderRadius: '18px',
              padding: 'clamp(1.75rem, 4vw, 2.75rem)'
            }}
          >
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
};
