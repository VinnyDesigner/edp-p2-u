import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import logoImg from '../assets/logo.png';

export const Logo = ({ className = '' }) => {
  const { getPath } = useLanguage();

  return (
    <Link
      to={getPath('/')}
      className={`logo-link ${className}`}
      aria-label="Environment Agency - Abu Dhabi Home"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        textDecoration: 'none',
        transition: 'opacity 0.25s ease',
        cursor: 'pointer'
      }}
    >
      <img
        src={logoImg}
        alt="Environment Agency - Abu Dhabi"
        width="486"
        height="140"
        style={{
          display: 'block',
          height: '54px',
          width: 'auto',
          objectFit: 'contain',
          filter: 'brightness(1.12) contrast(1.06)',
          transition: 'opacity 0.25s ease'
        }}
      />
    </Link>
  );
};
