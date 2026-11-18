import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { edpApplications } from '../data/projects';
import { useLanguage } from '../context/LanguageContext';

export const WorkPage = () => {
  const { getPath, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...Array.from(new Set(edpApplications.map((app) => app.category)))];
  const visibleApps =
    selectedCategory === 'All'
      ? edpApplications
      : edpApplications.filter((app) => app.category === selectedCategory);

  return (
    <div
      className="work-page"
      style={{
        paddingTop: 'calc(var(--header-height) + 3.5rem)',
        paddingBottom: 'clamp(4rem, 8vw, 6.5rem)',
        background:
          'radial-gradient(ellipse 65% 40% at 20% 10%, rgba(0, 119, 73, 0.24) 0%, transparent 72%), radial-gradient(ellipse 58% 38% at 84% 44%, rgba(116, 170, 80, 0.14) 0%, transparent 72%)'
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
        <div style={{ maxWidth: '820px', marginBottom: '2.25rem' }}>
          <span className="pill-tag" style={{ marginBottom: '1.25rem' }}>
            <span className="pill-dot" />
            DIGITAL APPLICATIONS DIRECTORY
          </span>
          <h1
            style={{
              fontSize: 'clamp(2.35rem, 5.2vw, 4rem)',
              fontWeight: 400,
              color: 'var(--text-white)',
              lineHeight: 1.1,
              marginBottom: '1.1rem'
            }}
          >
            {t.workPage.title}
          </h1>
          <p
            style={{
              fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)',
              color: 'var(--text-primary)',
              lineHeight: 1.6
            }}
          >
            {t.workPage.lead}
          </p>
        </div>

        {/* Category Filter Pills */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.55rem',
            marginBottom: 'clamp(2.25rem, 4vw, 3.25rem)'
          }}
        >
          {categories.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '9999px',
                  border: active ? '1.5px solid #007749' : '1px solid rgba(116, 170, 80, 0.25)',
                  background: active
                    ? 'radial-gradient(97.07% 95.3% at 48.09% 47.12%, #007749 0%, #74AA50 100%)'
                    : 'rgba(10, 24, 17, 0.72)',
                  color: '#ffffff',
                  fontSize: '0.8125rem',
                  fontWeight: 500,
                  cursor: 'pointer'
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Applications Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
            gap: '1.75rem',
            marginBottom: 'clamp(3.5rem, 6vw, 5rem)'
          }}
        >
          {visibleApps.map((app) => (
            <article
              key={app.id}
              style={{
                borderRadius: '16px',
                overflow: 'hidden',
                border: '1px solid rgba(116, 170, 80, 0.24)',
                background:
                  'linear-gradient(150deg, rgba(10, 26, 18, 0.94) 0%, rgba(5, 9, 7, 0.98) 100%)',
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
                    src={app.image}
                    alt={app.title}
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <span
                    className="featured-app-glass-chip"
                    style={{ marginBottom: '0.9rem' }}
                  >
                    <span>{app.category}</span>
                  </span>
                  <h2
                    style={{
                      fontSize: '1.3rem',
                      fontWeight: 500,
                      color: '#ffffff',
                      marginBottom: '0.55rem'
                    }}
                  >
                    {app.title}
                  </h2>
                  <p
                    style={{
                      fontSize: '0.9rem',
                      color: 'var(--text-muted)',
                      lineHeight: 1.6,
                      margin: 0
                    }}
                  >
                    {app.description}
                  </p>
                </div>
              </div>

              <div
                style={{
                  padding: '0 1.5rem 1.35rem',
                  fontSize: '0.78rem',
                  color: '#91D19D',
                  letterSpacing: '0.02em'
                }}
              >
                EAD Environmental Data Platform
              </div>
            </article>
          ))}
        </div>

        {/* Catalogue Callout */}
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
              {t.recentWork.exploreIndex}
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.6, margin: 0 }}>
              {t.workPage.exploreIndexLead}
            </p>
          </div>
          <Link
            to={getPath('/catalogue')}
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
            <span>{t.workPage.indexCta}</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
