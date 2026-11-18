import React from 'react';
import { ContactForm } from '../components/ContactForm';
import { useLanguage } from '../context/LanguageContext';

export const ContactPage = () => {
  const { t } = useLanguage();
  const contact = t.contactPage;

  return (
    <div className="contact-page" style={{ paddingTop: 'calc(var(--header-height) + 3rem)' }}>
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
            gap: 'clamp(3rem, 6vw, 6rem)',
            alignItems: 'start'
          }}
        >
          {/* Left: Presentation & Context */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            <div>
              <h1
                style={{
                  fontSize: 'clamp(2.75rem, 6vw, 4.5rem)',
                  fontWeight: 300,
                  color: 'var(--text-white)',
                  marginBottom: '1.5rem',
                  lineHeight: 1.05
                }}
              >
                {contact.title}
              </h1>
              <p
                style={{
                  fontSize: 'clamp(1.15rem, 2vw, 1.4rem)',
                  color: 'var(--text-primary)',
                  lineHeight: 1.5,
                  marginBottom: '1.5rem'
                }}
              >
                {contact.portraitQuote}
              </p>
              <p
                style={{
                  fontSize: '1rem',
                  color: 'var(--text-muted)',
                  lineHeight: 1.6
                }}
              >
                {contact.availability}
              </p>
            </div>

            <div
              style={{
                borderTop: '1px solid var(--border-subtle)',
                paddingTop: '2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}
            >
              <div>
                <p className="mono" style={{ color: 'var(--text-dimmed)', marginBottom: '0.35rem' }}>
                  {contact.form.emailDirect}
                </p>
                <a
                  href={`mailto:${t.footer.email}`}
                  style={{
                    fontSize: '1.125rem',
                    color: 'var(--text-white)',
                    textDecoration: 'underline',
                    textUnderlineOffset: '4px'
                  }}
                >
                  {t.footer.email}
                </a>
              </div>

              <div>
                <p className="mono" style={{ color: 'var(--text-dimmed)', marginBottom: '0.35rem' }}>
                  Location:
                </p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem' }}>
                  {t.footer.studio} · {t.footer.designer}
                  <br />
                  {t.footer.location}
                </p>
              </div>
            </div>
          </div>

          {/* Right: Interactive Inquiry Form */}
          <div
            style={{
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-lg)',
              padding: 'clamp(1.75rem, 4vw, 3rem)'
            }}
          >
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
};
