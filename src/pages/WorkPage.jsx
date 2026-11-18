import React from 'react';
import { Link } from 'react-router-dom';
import { RollText, RollLink } from '../components/RollLink';
import { WorkCard } from '../components/WorkCard';
import { featuredProjects } from '../data/projects';
import { useLanguage } from '../context/LanguageContext';

export const WorkPage = () => {
  const { getPath, t } = useLanguage();

  return (
    <div className="work-page" style={{ paddingTop: 'calc(var(--header-height) + 3rem)' }}>
      <div className="container">
        {/* Header */}
        <div style={{ maxWidth: '800px', marginBottom: 'clamp(3rem, 6vw, 5rem)' }}>
          <h1
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              fontWeight: 300,
              color: 'var(--text-white)',
              marginBottom: '1.25rem'
            }}
          >
            {t.workPage.title}
          </h1>
          <p
            style={{
              fontSize: 'clamp(1.125rem, 2vw, 1.35rem)',
              color: 'var(--text-primary)',
              lineHeight: 1.5
            }}
          >
            {t.workPage.lead}
          </p>
        </div>

        {/* 2-Column Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 540px), 1fr))',
            gap: '2.5rem',
            marginBottom: 'var(--section-gap)'
          }}
        >
          {featuredProjects.map((project) => (
            <WorkCard key={project.id} project={project} />
          ))}
        </div>

        {/* Project Index Callout Banner */}
        <div
          style={{
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: 'clamp(2.5rem, 6vw, 4.5rem)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '2rem'
          }}
        >
          <div style={{ maxWidth: '640px' }}>
            <h2
              style={{
                fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
                fontWeight: 300,
                color: 'var(--text-white)',
                marginBottom: '1rem'
              }}
            >
              {t.recentWork.exploreIndex}
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem', lineHeight: 1.6 }}>
              {t.workPage.exploreIndexLead}
            </p>
          </div>
          <div>
            <RollLink to={getPath('/work/index')} buttonStyle style={{ padding: '0.9rem 2rem' }}>
              {t.workPage.indexCta}
            </RollLink>
          </div>
        </div>
      </div>
    </div>
  );
};
