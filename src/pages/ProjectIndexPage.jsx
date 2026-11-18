import React from 'react';
import { Link } from 'react-router-dom';
import { RollText, RollLink } from '../components/RollLink';
import { projectIndexItems } from '../data/projects';
import { useLanguage } from '../context/LanguageContext';

export const ProjectIndexPage = () => {
  const { lang, getPath, t } = useLanguage();

  return (
    <div className="project-index-page" style={{ paddingTop: 'calc(var(--header-height) + 3rem)' }}>
      <div className="container">
        {/* Header */}
        <div style={{ maxWidth: '800px', marginBottom: 'clamp(3rem, 6vw, 5rem)' }}>
          <div style={{ marginBottom: '1rem' }}>
            <Link
              to={getPath('/work')}
              style={{
                color: 'var(--text-muted)',
                fontSize: '0.875rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              ← {t.workPage.title}
            </Link>
          </div>
          <h1
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              fontWeight: 300,
              color: 'var(--text-white)',
              marginBottom: '1.25rem'
            }}
          >
            {t.projectIndexPage.title}
          </h1>
          <p
            style={{
              fontSize: 'clamp(1.125rem, 2vw, 1.35rem)',
              color: 'var(--text-primary)',
              lineHeight: 1.5
            }}
          >
            {t.projectIndexPage.lead}
          </p>
        </div>

        {/* Index List / Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
            gap: '2.5rem',
            marginBottom: 'var(--section-gap)'
          }}
        >
          {projectIndexItems.map((item, idx) => {
            const category = item.category?.[lang] || item.category?.en || item.category;
            const desc = item.description?.[lang] || item.description?.en || item.description;

            return (
              <div
                key={idx}
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border-subtle)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    aspectRatio: '16 / 10',
                    backgroundColor: '#050606',
                    overflow: 'hidden'
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '1rem',
                      left: '1rem'
                    }}
                  >
                    <span className="pill-tag">
                      <span className="pill-dot" />
                      {category}
                    </span>
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      top: '1rem',
                      right: '1rem'
                    }}
                  >
                    <span className="mono" style={{ color: 'var(--text-white)', background: 'rgba(0,0,0,0.6)', padding: '4px 8px', borderRadius: '4px' }}>
                      {item.year}
                    </span>
                  </div>
                </div>

                <div
                  style={{
                    padding: 'clamp(1.25rem, 3vw, 2rem)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem',
                    flexGrow: 1
                  }}
                >
                  <h2
                    style={{
                      fontSize: 'clamp(1.35rem, 2vw, 1.75rem)',
                      fontWeight: 300,
                      color: 'var(--text-white)'
                    }}
                  >
                    {item.title}
                  </h2>
                  <p
                    style={{
                      color: 'var(--text-muted)',
                      fontSize: '0.9375rem',
                      lineHeight: 1.6
                    }}
                  >
                    {desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Closing CTA */}
        <div
          style={{
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: 'clamp(2.5rem, 6vw, 4.5rem)'
          }}
        >
          <div style={{ maxWidth: '720px' }}>
            <h2
              style={{
                fontSize: 'clamp(2rem, 4vw, 3.25rem)',
                fontWeight: 300,
                color: 'var(--text-white)',
                marginBottom: '1rem'
              }}
            >
              {t.ctaBanner.title}
            </h2>
            <p style={{ color: 'var(--text-primary)', fontSize: '1.125rem', marginBottom: '2rem' }}>
              {t.ctaBanner.subtitle}
            </p>
            <RollLink to={getPath('/contact')} buttonStyle style={{ padding: '0.9rem 2rem' }}>
              {t.ctaBanner.button}
            </RollLink>
          </div>
        </div>
      </div>
    </div>
  );
};
