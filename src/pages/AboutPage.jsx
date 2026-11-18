import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import about01EnvironmentalData from '../assets/about-01-environmental-data.jpg';
import about02GeospatialIntelligence from '../assets/about-02-geospatial-intelligence.jpg';
import about03DigitalApplications from '../assets/about-03-digital-applications.jpg';
import quickAccessMangrovesImg from '../assets/quick-access-mangroves.png';

export const AboutPage = () => {
  const { getPath, t } = useLanguage();
  const about = t.aboutPage;

  const pillarImages = [
    about01EnvironmentalData,
    about02GeospatialIntelligence,
    about03DigitalApplications
  ];

  return (
    <div
      className="about-page"
      style={{
        paddingTop: 'calc(var(--header-height) + 3.5rem)',
        paddingBottom: 'clamp(4rem, 8vw, 6.5rem)',
        background:
          'radial-gradient(ellipse 65% 42% at 18% 12%, rgba(0, 119, 73, 0.24) 0%, transparent 72%), radial-gradient(ellipse 58% 40% at 84% 48%, rgba(116, 170, 80, 0.14) 0%, transparent 72%)'
      }}
    >
      {/* Hero */}
      <section style={{ marginBottom: 'clamp(3.5rem, 7vw, 5.5rem)' }}>
        <div
          style={{
            width: '100%',
            paddingLeft: 'var(--header-padding)',
            paddingRight: 'var(--header-padding)'
          }}
        >
          <div style={{ maxWidth: '940px' }}>
            <span className="pill-tag" style={{ marginBottom: '1.5rem' }}>
              <span className="pill-dot" />
              {about.overviewLabel}
            </span>
            <h1
              style={{
                fontSize: 'clamp(2.35rem, 5.4vw, 4.25rem)',
                fontWeight: 400,
                color: 'var(--text-white)',
                lineHeight: 1.08,
                letterSpacing: '-0.025em',
                marginBottom: '1.5rem'
              }}
            >
              {about.heroTitle}
            </h1>
            <p
              style={{
                fontSize: 'clamp(1.05rem, 1.8vw, 1.3rem)',
                color: 'var(--text-primary)',
                lineHeight: 1.6,
                maxWidth: '720px',
                marginBottom: '2rem'
              }}
            >
              {about.heroLead}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              <Link
                to={getPath('/applications')}
                className="hero-ead-cta"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.78rem 1.6rem',
                  borderRadius: '9999px',
                  border: '2px solid #007749',
                  background:
                    'radial-gradient(97.07% 95.3% at 48.09% 47.12%, #007749 0%, #74AA50 100%)',
                  boxShadow:
                    '0 1px 3px 0 rgba(0, 0, 0, 0.20), 0 3px 2px 0 rgba(255, 255, 255, 0.70) inset',
                  color: '#ffffff',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  textDecoration: 'none'
                }}
              >
                <span>Explore Applications</span>
                <span aria-hidden="true">→</span>
              </Link>
              <Link
                to={getPath('/catalogue')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.78rem 1.5rem',
                  borderRadius: '9999px',
                  border: '1px solid rgba(116, 170, 80, 0.36)',
                  background: 'rgba(10, 26, 18, 0.72)',
                  color: '#ffffff',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  textDecoration: 'none'
                }}
              >
                <span>Browse Data Catalogue</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Platform Overview */}
      <section
        style={{
          borderTop: '1px solid rgba(116, 170, 80, 0.18)',
          paddingTop: 'clamp(3.5rem, 6vw, 5.5rem)',
          paddingBottom: 'clamp(3.5rem, 6vw, 5.5rem)'
        }}
      >
        <div
          style={{
            width: '100%',
            paddingLeft: 'var(--header-padding)',
            paddingRight: 'var(--header-padding)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
            gap: 'clamp(2rem, 5vw, 4rem)',
            alignItems: 'center'
          }}
        >
          <div
            style={{
              borderRadius: '18px',
              overflow: 'hidden',
              border: '1px solid rgba(116, 170, 80, 0.25)',
              aspectRatio: '16 / 10',
              backgroundColor: '#050907'
            }}
          >
            <img
              src={quickAccessMangrovesImg}
              alt="Aerial view of Abu Dhabi coastal mangroves"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.35rem' }}>
            <h2
              style={{
                fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                fontWeight: 400,
                color: 'var(--text-white)',
                lineHeight: 1.18
              }}
            >
              {about.overviewTitle}
            </h2>
            {about.overviewParagraphs.map((paragraph, idx) => (
              <p
                key={idx}
                style={{
                  fontSize: '1rem',
                  color: 'var(--text-primary)',
                  lineHeight: 1.7,
                  fontWeight: 300
                }}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Core Platform Pillars */}
      <section
        style={{
          borderTop: '1px solid rgba(116, 170, 80, 0.18)',
          paddingTop: 'clamp(3.5rem, 6vw, 5.5rem)',
          paddingBottom: 'clamp(3.5rem, 6vw, 5.5rem)',
          background: 'rgba(6, 14, 10, 0.65)'
        }}
      >
        <div
          style={{
            width: '100%',
            paddingLeft: 'var(--header-padding)',
            paddingRight: 'var(--header-padding)'
          }}
        >
          <h2
            style={{
              fontSize: 'clamp(1.85rem, 3.4vw, 2.75rem)',
              fontWeight: 400,
              color: 'var(--text-white)',
              marginBottom: '2.5rem'
            }}
          >
            {about.pillarsTitle}
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
              gap: '1.75rem'
            }}
          >
            {about.pillars.map((pillar, idx) => (
              <article
                key={pillar.num}
                style={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '1px solid rgba(116, 170, 80, 0.24)',
                  background: 'linear-gradient(155deg, rgba(10, 24, 17, 0.94) 0%, rgba(5, 9, 7, 0.98) 100%)',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <div style={{ aspectRatio: '16 / 9', overflow: 'hidden', position: 'relative' }}>
                  <img
                    src={pillarImages[idx]}
                    alt={pillar.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                  <span
                    className="mono"
                    style={{
                      position: 'absolute',
                      top: '0.9rem',
                      left: '0.9rem',
                      padding: '0.22rem 0.7rem',
                      borderRadius: '9999px',
                      background: 'rgba(5, 14, 10, 0.76)',
                      border: '1px solid rgba(116, 170, 80, 0.35)',
                      color: '#91D19D',
                      fontSize: '0.75rem'
                    }}
                  >
                    {pillar.num}
                  </span>
                </div>
                <div style={{ padding: '1.65rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 500, color: '#ffffff', margin: 0 }}>
                    {pillar.title}
                  </h3>
                  <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)', lineHeight: 1.65, margin: 0 }}>
                    {pillar.text}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Decision-Making & Discovery Value */}
      <section
        style={{
          borderTop: '1px solid rgba(116, 170, 80, 0.18)',
          paddingTop: 'clamp(3.5rem, 6vw, 5.5rem)'
        }}
      >
        <div
          style={{
            width: '100%',
            paddingLeft: 'var(--header-padding)',
            paddingRight: 'var(--header-padding)'
          }}
        >
          <div style={{ maxWidth: '760px', marginBottom: '2.75rem' }}>
            <h2
              style={{
                fontSize: 'clamp(1.85rem, 3.4vw, 2.75rem)',
                fontWeight: 400,
                color: 'var(--text-white)',
                marginBottom: '0.85rem'
              }}
            >
              {about.valueTitle}
            </h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              {about.valueLead}
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
              gap: '1.5rem'
            }}
          >
            {about.valuePoints.map((point, idx) => (
              <div
                key={idx}
                style={{
                  background: 'linear-gradient(145deg, rgba(10, 24, 17, 0.85) 0%, rgba(5, 9, 7, 0.96) 100%)',
                  border: '1px solid rgba(116, 170, 80, 0.22)',
                  borderRadius: '14px',
                  padding: '1.75rem'
                }}
              >
                <h3 style={{ fontSize: '1.15rem', fontWeight: 500, color: '#ffffff', marginBottom: '0.65rem' }}>
                  {point.title}
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem', lineHeight: 1.6, margin: 0 }}>
                  {point.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
