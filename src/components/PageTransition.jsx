import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, [pathname]);

  return null;
};

export const PageTransition = ({ children }) => {
  const location = useLocation();

  return (
    <div
      key={location.pathname}
      style={{
        // 'backwards' (not 'forwards'): once the fade finishes, the element drops the
        // animated transform entirely. A held transform (even translateY(0)) creates a
        // containing block that makes position:fixed descendants (the Spline 3D layer)
        // scroll away with the page.
        animation: 'pageFadeIn 0.4s var(--ease-out) backwards'
      }}
    >
      {children}
      <style>{`
        @keyframes pageFadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};
