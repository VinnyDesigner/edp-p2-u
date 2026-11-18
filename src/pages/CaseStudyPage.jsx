import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { RollText, RollLink } from '../components/RollLink';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';
import { WorkCard } from '../components/WorkCard';
import { featuredProjects } from '../data/projects';
import { useLanguage } from '../context/LanguageContext';

export const CaseStudyPage = () => {
  const { slug } = useParams();
  const { lang, getPath, t } = useLanguage();

  const project = featuredProjects.find((p) => p.slug === slug);
  if (!project) {
    return <Navigate to={getPath('/work')} replace />;
  }

  const category = project.category?.[lang] || project.category?.en || project.category;
  const summary = project.summary?.[lang] || project.summary?.en || project.summary;
  const scopeList = project.scope?.[lang] || project.scope?.en || project.scope || [];
  const challengeText = project.challenge?.[lang] || project.challenge?.en || [];
  const solutionText = project.solution?.[lang] || project.solution?.en || [];
  const resultText = project.result?.[lang] || project.result?.en || [];
  const brandBookText = project.brandBook?.[lang] || project.brandBook?.en;

  // Next project
  const nextProject = featuredProjects.find((p) => p.slug === project.nextSlug) || featuredProjects[0];

  return (
    <div className="case-study-page" style={{ paddingTop: 'calc(var(--header-height) + 2.5rem)' }}>
      <div className="container">
        {/* Back Link */}
        <div style={{ marginBottom: '2rem' }}>
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
            ← {t.caseStudy.allProjects}
          </Link>
        </div>

        {/* Project Header */}
        <div style={{ maxWidth: '900px', marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <div style={{ marginBottom: '1.25rem' }}>
            <span className="pill-tag">
              <span className="pill-dot" />
              {category}
            </span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 4.75rem)',
              fontWeight: 300,
              color: 'var(--text-white)',
              lineHeight: 1.05,
              marginBottom: '1.5rem'
            }}
          >
            {project.title}
          </h1>

          <p
            style={{
              fontSize: 'clamp(1.15rem, 2vw, 1.45rem)',
              color: 'var(--text-primary)',
              lineHeight: 1.5,
              marginBottom: '2rem'
            }}
          >
            {summary}
          </p>

          {/* Scope Tags */}
          <div>
            <p className="mono" style={{ color: 'var(--text-dimmed)', marginBottom: '0.65rem' }}>
              ◦ {t.caseStudy.scope}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {scopeList.map((item, idx) => (
                <span
                  key={idx}
                  style={{
                    padding: '0.35rem 0.85rem',
                    backgroundColor: 'var(--bg-surface)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-pill)',
                    fontSize: '0.8125rem',
                    color: 'var(--text-primary)'
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Hero Media (Video or Image) */}
        <div
          style={{
            width: '100%',
            aspectRatio: '16 / 9',
            backgroundColor: '#050606',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            border: '1px solid var(--border-subtle)',
            marginBottom: 'var(--section-gap)'
          }}
        >
          {project.heroVideo ? (
            <video
              src={project.heroVideo}
              autoPlay
              loop
              muted
              playsInline
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block'
              }}
            />
          ) : (
            <img
              src={project.cardImage || project.gallery?.[0]}
              alt={project.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block'
              }}
            />
          )}
        </div>

        {/* Challenge Section */}
        <section
          style={{
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: 'clamp(3rem, 6vw, 5rem)',
            paddingBottom: 'clamp(3rem, 6vw, 5rem)'
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 'clamp(2rem, 5vw, 4rem)',
              alignItems: 'start'
            }}
          >
            <h2
              style={{
                fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                fontWeight: 300,
                color: 'var(--text-white)'
              }}
            >
              {t.caseStudy.challenge}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {challengeText.map((p, i) => (
                <p key={i} style={{ fontSize: '1.125rem', lineHeight: 1.6, color: 'var(--text-primary)' }}>
                  {p}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Before/After for EWM */}
        {project.beforeAfter && (
          <section
            style={{
              borderTop: '1px solid var(--border-subtle)',
              paddingTop: 'clamp(3rem, 6vw, 5rem)',
              paddingBottom: 'clamp(3rem, 6vw, 5rem)'
            }}
          >
            <div style={{ marginBottom: '2rem' }}>
              <h2
                style={{
                  fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                  fontWeight: 300,
                  color: 'var(--text-white)',
                  marginBottom: '0.75rem'
                }}
              >
                {t.caseStudy.beforeAfter}
              </h2>
              <p style={{ color: 'var(--text-muted)' }}>
                {lang === 'pl'
                  ? 'Przeciągnij suwak, aby porównać wersję pierwotną i nową tożsamość 3D.'
                  : 'Drag the slider to compare the original state with the redefined 3D identity.'}
              </p>
            </div>
            <BeforeAfterSlider
              beforeImage={project.beforeAfter.beforeImage}
              afterImage={project.beforeAfter.afterImage}
              beforeLabel={lang === 'pl' ? 'Przed' : 'Before'}
              afterLabel={lang === 'pl' ? 'Po' : 'After'}
            />
          </section>
        )}

        {/* Solution Section */}
        <section
          style={{
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: 'clamp(3rem, 6vw, 5rem)',
            paddingBottom: 'clamp(3rem, 6vw, 5rem)'
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 'clamp(2rem, 5vw, 4rem)',
              alignItems: 'start'
            }}
          >
            <h2
              style={{
                fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                fontWeight: 300,
                color: 'var(--text-white)'
              }}
            >
              {t.caseStudy.solution}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {solutionText.map((p, i) => (
                <p key={i} style={{ fontSize: '1.125rem', lineHeight: 1.6, color: 'var(--text-primary)' }}>
                  {p}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* Media Gallery / Visual Sequence */}
        {project.gallery && project.gallery.length > 0 && (
          <section
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '2.5rem',
              marginBottom: 'clamp(3rem, 6vw, 5rem)'
            }}
          >
            {project.gallery.map((img, idx) => (
              <div
                key={idx}
                style={{
                  width: '100%',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  backgroundColor: '#050606',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                <img
                  src={img}
                  alt={`${project.title} asset ${idx + 1}`}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block'
                  }}
                />
              </div>
            ))}
          </section>
        )}

        {/* Result Section */}
        <section
          style={{
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: 'clamp(3rem, 6vw, 5rem)',
            paddingBottom: 'clamp(3rem, 6vw, 5rem)',
            backgroundColor: 'var(--bg-surface)',
            borderRadius: 'var(--radius-lg)',
            padding: 'clamp(2rem, 5vw, 4rem)',
            marginBottom: 'var(--section-gap)'
          }}
        >
          <div style={{ maxWidth: '820px' }}>
            <h2
              style={{
                fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                fontWeight: 300,
                color: 'var(--text-white)',
                marginBottom: '1.5rem'
              }}
            >
              {t.caseStudy.result}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {resultText.map((p, i) => (
                <p key={i} style={{ fontSize: '1.125rem', lineHeight: 1.6, color: 'var(--text-primary)' }}>
                  {p}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* Brand Book Callout if present */}
        {brandBookText && (
          <section
            style={{
              borderTop: '1px solid var(--border-subtle)',
              paddingTop: 'clamp(3rem, 6vw, 4rem)',
              paddingBottom: 'clamp(3rem, 6vw, 4rem)',
              marginBottom: 'var(--section-gap)'
            }}
          >
            <div style={{ maxWidth: '800px' }}>
              <h2
                style={{
                  fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
                  fontWeight: 300,
                  color: 'var(--text-white)',
                  marginBottom: '1rem'
                }}
              >
                {t.caseStudy.brandBook}
              </h2>
              <p style={{ fontSize: '1.125rem', lineHeight: 1.6, color: 'var(--text-muted)' }}>
                {brandBookText}
              </p>
            </div>
          </section>
        )}

        {/* See More Projects / Next Project */}
        <section
          style={{
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: 'var(--section-gap)'
          }}
        >
          <div style={{ marginBottom: '2.5rem' }}>
            <h2
              style={{
                fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                fontWeight: 300,
                color: 'var(--text-white)'
              }}
            >
              {t.caseStudy.seeMore}
            </h2>
          </div>
          <div style={{ maxWidth: '640px' }}>
            <WorkCard project={nextProject} />
          </div>
        </section>
      </div>
    </div>
  );
};
