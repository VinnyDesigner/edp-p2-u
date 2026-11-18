import React, { useState, useRef, useCallback } from 'react';

export const BeforeAfterSlider = ({ beforeImage, afterImage, beforeLabel = 'Before', afterLabel = 'After' }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  return (
    <div
      ref={containerRef}
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onMouseMove={handleMouseMove}
      onTouchStart={() => setIsDragging(true)}
      onTouchEnd={() => setIsDragging(false)}
      onTouchMove={handleTouchMove}
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '16 / 10',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        cursor: 'ew-resize',
        userSelect: 'none',
        backgroundColor: '#050606',
        border: '1px solid var(--border-subtle)'
      }}
      role="slider"
      aria-valuenow={sliderPosition}
      aria-label="Before and after comparison slider"
    >
      {/* After image (Background / Full) */}
      <img
        src={afterImage}
        alt={afterLabel}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          pointerEvents: 'none'
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '1.25rem',
          right: '1.25rem',
          zIndex: 3
        }}
      >
        <span className="pill-tag">{afterLabel}</span>
      </div>

      {/* Before image (Clipped overlay) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          width: `${sliderPosition}%`,
          overflow: 'hidden',
          zIndex: 2
        }}
      >
        <img
          src={beforeImage}
          alt={beforeLabel}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: containerRef.current ? `${containerRef.current.offsetWidth}px` : '100%',
            height: '100%',
            objectFit: 'cover',
            maxWidth: 'none',
            pointerEvents: 'none'
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '1.25rem',
            left: '1.25rem',
            zIndex: 3
          }}
        >
          <span className="pill-tag">{beforeLabel}</span>
        </div>
      </div>

      {/* Divider Bar & Handle */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: `${sliderPosition}%`,
          width: '2px',
          backgroundColor: 'var(--text-white)',
          zIndex: 10,
          transform: 'translateX(-50%)'
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: 'var(--text-white)',
            color: 'var(--text-dark)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px',
            fontWeight: 700,
            boxShadow: '0 4px 16px rgba(0,0,0,0.6)'
          }}
        >
          ↔
        </div>
      </div>
    </div>
  );
};
