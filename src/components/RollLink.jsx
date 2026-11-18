import React from 'react';
import { Link } from 'react-router-dom';

export const RollText = ({ text, className = '' }) => {
  return (
    <span className={`roll-link ${className}`} aria-label={text}>
      <span className="roll-link-inner" aria-hidden="true">
        <span className="roll-link-item">{text}</span>
        <span className="roll-link-item">{text}</span>
      </span>
      <span className="sr-only" style={{ position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0,0,0,0)', border: 0 }}>
        {text}
      </span>
    </span>
  );
};

export const RollLink = ({ to, href, onClick, children, className = '', buttonStyle = false, ...props }) => {
  const content = typeof children === 'string' ? <RollText text={children} /> : children;

  if (to) {
    return (
      <Link to={to} className={`${buttonStyle ? 'btn-primary' : ''} ${className}`} {...props}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={`${buttonStyle ? 'btn-primary' : ''} ${className}`} {...props}>
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={`${buttonStyle ? 'btn-primary' : ''} ${className}`} {...props}>
      {content}
    </button>
  );
};
