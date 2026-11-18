import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RollText } from './RollLink';
import { useLanguage } from '../context/LanguageContext';

export const WorkCard = ({ project, priority = false }) => {
  const { lang, getPath, t } = useLanguage();
  const [hovered, setHovered] = useState(false);

  const category = project.category?.[lang] || project.category?.en || project.category;
  const summary = project.summary?.[lang] || project.summary?.en || project.summary;
  const linkTo = getPath(`/work/${project.slug}`);

  return (
    <Link
      to={linkTo}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'var(--bg-surface)',
        backgroundImage: 'linear-gradient(160deg, rgba(11, 21, 16, 0.94) 0%, rgba(7, 17, 12, 0.98) 100%)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-subtle)',
        overflow: 'hidden',
        textDecoration: 'none',
        color: 'inherit',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s var(--ease-out)'
      }}
      className="work-card"
    >
      {/* Media Window */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '16 / 10',
          overflow: 'hidden',
          backgroundColor: '#050606'
        }}
      >
        {project.heroVideo ? (
          <video
            src={project.heroVideo}
            autoPlay
            loop
            muted
            playsInline
            className="card-media-element"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: hovered ? 'scale(1.05)' : 'scale(1)',
              transition: 'transform 0.6s var(--ease-out)',
              display: 'block'
            }}
          />
        ) : (
          <img
            src={project.cardImage || project.gallery?.[0]}
            alt={project.title}
            loading={priority ? 'eager' : 'lazy'}
            className="card-media-element"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: hovered ? 'scale(1.05)' : 'scale(1)',
              transition: 'transform 0.6s var(--ease-out)',
              display: 'block'
            }}
          />
        )}

        {/* Subtle Dark Gradient Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 40%)',
            pointerEvents: 'none'
          }}
        />

        {/* Category Pill Tag */}
        <div
          style={{
            position: 'absolute',
            top: '1.25rem',
            left: '1.25rem',
            zIndex: 2
          }}
        >
          <span className="pill-tag">
            <span className="pill-dot" />
            {category}
          </span>
        </div>
      </div>

      {/* Content Details */}
      <div
        style={{
          padding: 'clamp(1.25rem, 3vw, 2rem)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          flexGrow: 1,
          gap: '1.25rem'
        }}
      >
        <div>
          <h3
            style={{
              fontSize: 'clamp(1.35rem, 2.5vw, 1.75rem)',
              fontWeight: 300,
              color: 'var(--text-white)',
              marginBottom: '0.5rem',
              letterSpacing: '-0.02em'
            }}
          >
            {project.title}
          </h3>
          <p
            style={{
              color: 'var(--text-muted)',
              fontSize: '0.9375rem',
              lineHeight: 1.5,
              maxWidth: '560px'
            }}
          >
            {summary}
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: 'var(--text-primary)',
            fontSize: '0.875rem',
            fontWeight: 450,
            paddingTop: '0.5rem',
            borderTop: '1px solid var(--border-subtle)'
          }}
        >
          <RollText text={t.recentWork.seeProject} />
          <span
            style={{
              transform: hovered ? 'translateX(4px)' : 'translateX(0)',
              transition: 'transform 0.25s ease'
            }}
          >
            →
          </span>
        </div>
      </div>
    </Link>
  );
};
