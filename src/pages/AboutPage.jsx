import React from 'react';
import { RollText, RollLink } from '../components/RollLink';
import { useLanguage } from '../context/LanguageContext';

export const AboutPage = () => {
  const { getPath, t } = useLanguage();
  const about = t.aboutPage;

  return (
    <div className="about-page" style={{ paddingTop: 'calc(var(--header-height) + 3rem)' }}>
      {/* Hero */}
      <section style={{ marginBottom: 'var(--section-gap)' }}>
        <div className="container">
          <div style={{ maxWidth: '900px' }}>
            <h1
              style={{
                fontSize: 'clamp(2.5rem, 6.5vw, 4.75rem)',
                fontWeight: 300,
                color: 'var(--text-white)',
                lineHeight: 1.08,
                marginBottom: '1.5rem'
              }}
            >
              {about.heroTitle}
            </h1>
            <p
              style={{
                fontSize: 'clamp(1.125rem, 2vw, 1.4rem)',
                color: 'var(--text-primary)',
                lineHeight: 1.5,
                maxWidth: '680px'
              }}
            >
              {about.heroLead}
            </p>
          </div>
        </div>
      </section>

      {/* Profile & Background */}
      <section
        style={{
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: 'var(--section-gap)',
          paddingBottom: 'var(--section-gap)'
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 'clamp(2rem, 5vw, 4rem)',
              alignItems: 'start'
            }}
          >
            <div>
              <span className="pill-tag" style={{ marginBottom: '1.5rem' }}>
                <span className="pill-dot" />
                {about.profileRole}
              </span>
              <h2
                style={{
                  fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
                  fontWeight: 300,
                  color: 'var(--text-white)'
                }}
              >
                Paweł Świniarski
              </h2>
              <p className="mono" style={{ color: 'var(--text-dimmed)', marginTop: '0.5rem' }}>
                Gdynia, Poland · 15 Years Experience
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {about.bioParagraphs.map((p, idx) => (
                <p
                  key={idx}
                  style={{
                    fontSize: 'clamp(1.05rem, 1.5vw, 1.25rem)',
                    color: 'var(--text-primary)',
                    lineHeight: 1.6
                  }}
                >
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Three-part Approach */}
      <section
        style={{
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: 'var(--section-gap)',
          paddingBottom: 'var(--section-gap)',
          backgroundColor: 'var(--bg-surface)'
        }}
      >
        <div className="container">
          <div style={{ marginBottom: '3.5rem' }}>
            <h2
              style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 300,
                color: 'var(--text-white)'
              }}
            >
              {about.approachTitle}
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2.5rem'
            }}
          >
            {about.approachSteps.map((step) => (
              <div
                key={step.num}
                style={{
                  borderTop: '1px solid var(--border-medium)',
                  paddingTop: '1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem'
                }}
              >
                <span className="mono" style={{ color: 'var(--text-muted)' }}>
                  {step.num}
                </span>
                <h3
                  style={{
                    fontSize: '1.75rem',
                    fontWeight: 300,
                    color: 'var(--text-white)'
                  }}
                >
                  {step.title}
                </h3>
                <p style={{ color: 'var(--text-primary)', fontSize: '1rem', lineHeight: 1.6 }}>
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Me / 4 Pillars */}
      <section
        style={{
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: 'var(--section-gap)',
          paddingBottom: 'var(--section-gap)'
        }}
      >
        <div className="container">
          <div style={{ maxWidth: '780px', marginBottom: '3.5rem' }}>
            <h2
              style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 300,
                color: 'var(--text-white)',
                marginBottom: '1rem'
              }}
            >
              {about.whyMeTitle}
            </h2>
            <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)' }}>
              {about.whyMeLead}
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '2rem'
            }}
          >
            {about.whyMePoints.map((point, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '2rem'
                }}
              >
                <h3
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 400,
                    color: 'var(--text-white)',
                    marginBottom: '0.75rem'
                  }}
                >
                  {point.title}
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem', lineHeight: 1.6 }}>
                  {point.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ways to Work Together */}
      <section
        style={{
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: 'var(--section-gap)',
          paddingBottom: 'var(--section-gap)',
          backgroundColor: 'var(--bg-surface)'
        }}
      >
        <div className="container">
          <div style={{ marginBottom: '3.5rem' }}>
            <h2
              style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 300,
                color: 'var(--text-white)'
              }}
            >
              {about.waysToWorkTitle}
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem',
              marginBottom: '4rem'
            }}
          >
            {about.waysToWorkItems.map((item, idx) => (
              <div
                key={idx}
                style={{
                  padding: '2.25rem',
                  backgroundColor: 'var(--bg-primary)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                <h3
                  style={{
                    fontSize: '1.35rem',
                    fontWeight: 300,
                    color: 'var(--text-white)',
                    marginBottom: '0.75rem'
                  }}
                >
                  {item.title}
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem', lineHeight: 1.6 }}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div style={{ textAlign: 'center' }}>
            <RollLink to={getPath('/contact')} buttonStyle style={{ padding: '1rem 2.5rem' }}>
              {t.hero.cta}
            </RollLink>
          </div>
        </div>
      </section>
    </div>
  );
};
