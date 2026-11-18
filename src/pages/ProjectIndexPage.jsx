import React from 'react';
import { Link } from 'react-router-dom';
import { edpCatalogueCategories } from '../data/projects';
import { useLanguage } from '../context/LanguageContext';

export const ProjectIndexPage = () => {
  const { getPath, t } = useLanguage();

  return (
    <div
      className="project-index-page"
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
        {/* Header */}
        <div style={{ maxWidth: '820px', marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <div style={{ marginBottom: '1rem' }}>
            <Link
              to={getPath('/applications')}
              style={{
                color: '#91D19D',
                fontSize: '0.875rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                textDecoration: 'none'
              }}
            >
              ← {t.workPage.title}
            </Link>
          </div>
          <h1
            style={{
              fontSize: 'clamp(2.35rem, 5.2vw, 4rem)',
              fontWeight: 400,
              color: 'var(--text-white)',
              lineHeight: 1.1,
              marginBottom: '1.1rem'
            }}
          >
            {t.projectIndexPage.title}
          </h1>
          <p
            style={{
              fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)',
              color: 'var(--text-primary)',
              lineHeight: 1.6
            }}
          >
            {t.projectIndexPage.lead}
          </p>
        </div>

        {/* Category Cards Grid (No fabricated dataset counts) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
            gap: '1.75rem',
            marginBottom: 'clamp(3.5rem, 6vw, 5rem)'
          }}
        >
          {edpCatalogueCategories.map((cat) => (
            <article
              key={cat.id}
              style={{
                background:
                  'linear-gradient(150deg, rgba(10, 26, 18, 0.94) 0%, rgba(5, 9, 7, 0.98) 100%)',
                borderRadius: '16px',
                border: '1px solid rgba(116, 170, 80, 0.24)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div
                  style={{
                    position: 'relative',
                    aspectRatio: '16 / 10',
                    backgroundColor: '#050907',
                    overflow: 'hidden'
                  }}
                >
                  <img
                    src={cat.image}
                    alt={cat.title}
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                  <div style={{ position: 'absolute', top: '0.9rem', left: '0.9rem' }}>
                    <span className="pill-tag">
                      <span className="pill-dot" />
                      {cat.domain}
                    </span>
                  </div>
                </div>

                <div style={{ padding: '1.5rem' }}>
                  <h2
                    style={{
                      fontSize: '1.35rem',
                      fontWeight: 500,
                      color: 'var(--text-white)',
                      marginBottom: '0.6rem'
                    }}
                  >
                    {cat.title}
                  </h2>
                  <p
                    style={{
                      color: 'var(--text-muted)',
                      fontSize: '0.9375rem',
                      lineHeight: 1.6,
                      margin: 0
                    }}
                  >
                    {cat.description}
                  </p>
                </div>
              </div>

              <div style={{ padding: '0 1.5rem 1.35rem' }}>
                <Link
                  to={getPath('/datasets')}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    fontSize: '0.84375rem',
                    fontWeight: 500,
                    color: '#74AA50',
                    textDecoration: 'none'
                  }}
                >
                  <span>Explore Datasets</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Datasets Discovery Callout */}
        <div
          style={{
            background:
              'linear-gradient(145deg, rgba(10, 28, 19, 0.92) 0%, rgba(5, 11, 8, 0.98) 100%)',
            border: '1px solid rgba(116, 170, 80, 0.28)',
            borderRadius: '18px',
            padding: 'clamp(2rem, 5vw, 3.5rem)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.75rem'
          }}
        >
          <div style={{ maxWidth: '640px' }}>
            <h2
              style={{
                fontSize: 'clamp(1.6rem, 3vw, 2.35rem)',
                fontWeight: 400,
                color: 'var(--text-white)',
                marginBottom: '0.65rem'
              }}
            >
              {t.datasetsPage.title}
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.6, margin: 0 }}>
              {t.datasetsPage.lead}
            </p>
          </div>
          <Link
            to={getPath('/datasets')}
            className="hero-ead-cta"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '0.82rem 1.65rem',
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
            <span>Explore Datasets</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
