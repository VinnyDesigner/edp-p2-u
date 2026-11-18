import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { edpCatalogueCategories } from '../data/projects';
import { useLanguage } from '../context/LanguageContext';
import datasetsCardBg from '../assets/datasets-card-bg.png';

const DATASET_DISCOVERY_TABS = [
  { id: 'featured', label: 'Featured Datasets' },
  { id: 'latest', label: 'Latest Datasets' },
  { id: 'categories', label: 'Browse by Category' }
];

export const DatasetsPage = () => {
  const { getPath, t } = useLanguage();
  const [activeTab, setActiveTab] = useState('featured');

  return (
    <div
      className="datasets-page"
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
        <div style={{ maxWidth: '820px', marginBottom: '2.25rem' }}>
          <span className="pill-tag" style={{ marginBottom: '1.25rem' }}>
            <span className="pill-dot" />
            EXPLORE ENVIRONMENTAL DATA
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
            {t.datasetsPage.title}
          </h1>
          <p
            style={{
              fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)',
              color: 'var(--text-primary)',
              lineHeight: 1.6
            }}
          >
            {t.datasetsPage.lead}
          </p>
        </div>

        {/* Tab Bar matching homepage Datasets style */}
        <div
          className="datasets-tab-bar"
          role="tablist"
          aria-label="Dataset discovery tabs"
          style={{ marginBottom: '2.5rem' }}
        >
          {DATASET_DISCOVERY_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`datasets-tab-btn${isActive ? ' is-active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        {activeTab === 'categories' ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))',
              gap: '1.5rem'
            }}
          >
            {edpCatalogueCategories.map((cat) => (
              <article
                key={cat.id}
                style={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '1px solid rgba(116, 170, 80, 0.24)',
                  background:
                    'linear-gradient(150deg, rgba(10, 26, 18, 0.94) 0%, rgba(5, 9, 7, 0.98) 100%)'
                }}
              >
                <div style={{ aspectRatio: '16 / 9', overflow: 'hidden' }}>
                  <img
                    src={cat.image}
                    alt={cat.title}
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </div>
                <div style={{ padding: '1.4rem' }}>
                  <span className="featured-app-glass-chip" style={{ marginBottom: '0.75rem' }}>
                    <span>{cat.domain}</span>
                  </span>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 500, color: '#ffffff', marginBottom: '0.5rem' }}>
                    {cat.title}
                  </h2>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
                    {cat.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div
            style={{
              borderRadius: '18px',
              border: '1px solid rgba(116, 170, 80, 0.28)',
              backgroundImage: `url(${datasetsCardBg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              padding: 'clamp(2rem, 5vw, 3.75rem)',
              maxWidth: '920px'
            }}
          >
            <span className="featured-app-glass-chip" style={{ marginBottom: '1.15rem' }}>
              <span>{activeTab === 'featured' ? 'Featured Datasets' : 'Latest Datasets'}</span>
            </span>
            <h2
              style={{
                fontSize: 'clamp(1.6rem, 3vw, 2.25rem)',
                fontWeight: 500,
                color: '#ffffff',
                marginBottom: '0.85rem'
              }}
            >
              {activeTab === 'featured'
                ? 'Dataset Feed Integration Pending'
                : 'Latest Dataset Updates Pending'}
            </h2>
            <p
              style={{
                fontSize: '1rem',
                color: 'rgba(212, 220, 216, 0.88)',
                lineHeight: 1.65,
                maxWidth: '640px',
                marginBottom: '1.75rem'
              }}
            >
              {activeTab === 'featured'
                ? 'Live featured dataset records and metadata feeds from the Environment Agency – Abu Dhabi (EAD) repository are not yet connected in this frontend environment. Verified environmental domains can be explored in the Data Catalogue or via the Browse by Category tab.'
                : 'Live dataset publication timestamps and release feeds are not yet connected in this frontend environment. Browse the verified environmental domains below to inspect supported categories.'}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              <button
                type="button"
                onClick={() => setActiveTab('categories')}
                className="hero-ead-cta"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.55rem',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '9999px',
                  border: '2px solid #007749',
                  background:
                    'radial-gradient(97.07% 95.3% at 48.09% 47.12%, #007749 0%, #74AA50 100%)',
                  color: '#ffffff',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  cursor: 'pointer'
                }}
              >
                <span>Browse by Category</span>
                <span aria-hidden="true">→</span>
              </button>
              <Link
                to={getPath('/catalogue')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.45rem',
                  borderRadius: '9999px',
                  border: '1px solid rgba(116, 170, 80, 0.36)',
                  background: 'rgba(10, 26, 18, 0.72)',
                  color: '#ffffff',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  textDecoration: 'none'
                }}
              >
                <span>Open Data Catalogue</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
