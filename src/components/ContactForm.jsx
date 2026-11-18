import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export const ContactForm = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    topic: '',
    message: ''
  });
  const [statusMessage, setStatusMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatusMessage(
      'Inquiry submission is currently unavailable: no official EAD backend endpoint is connected in this environment.'
    );
  };

  const inputStyle = {
    width: '100%',
    padding: '0.85rem 1rem',
    backgroundColor: 'rgba(5, 14, 10, 0.85)',
    border: '1px solid rgba(116, 170, 80, 0.25)',
    borderRadius: '10px',
    color: 'var(--text-white)',
    fontSize: '0.9375rem',
    outline: 'none'
  };

  const labelStyle = {
    display: 'block',
    fontSize: '0.84375rem',
    color: 'var(--text-muted)',
    marginBottom: '0.45rem'
  };

  return (
    <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1.35rem' }}>
      <div
        style={{
          padding: '0.85rem 1rem',
          borderRadius: '10px',
          border: '1px solid rgba(116, 170, 80, 0.3)',
          background: 'rgba(0, 119, 73, 0.14)',
          fontSize: '0.84375rem',
          color: 'rgba(220, 234, 226, 0.92)',
          lineHeight: 1.5
        }}
      >
        {t.contactPage.formNotice}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.15rem' }}>
        <div>
          <label htmlFor="edp-contact-name" style={labelStyle}>
            Full Name
          </label>
          <input
            id="edp-contact-name"
            type="text"
            placeholder="Your name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            style={inputStyle}
          />
        </div>
        <div>
          <label htmlFor="edp-contact-org" style={labelStyle}>
            Organization / Entity
          </label>
          <input
            id="edp-contact-org"
            type="text"
            placeholder="Organization or research institution"
            value={formData.organization}
            onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
            style={inputStyle}
          />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.15rem' }}>
        <div>
          <label htmlFor="edp-contact-email" style={labelStyle}>
            Email Address
          </label>
          <input
            id="edp-contact-email"
            type="email"
            placeholder="name@organization.ae"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            style={inputStyle}
          />
        </div>
        <div>
          <label htmlFor="edp-contact-topic" style={labelStyle}>
            Inquiry Area
          </label>
          <select
            id="edp-contact-topic"
            value={formData.topic}
            onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
            style={inputStyle}
          >
            <option value="">Select an area</option>
            <option value="datasets">Environmental Datasets</option>
            <option value="applications">Digital Applications</option>
            <option value="catalogue">Data Catalogue</option>
            <option value="general">General Platform Inquiry</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="edp-contact-message" style={labelStyle}>
          Message
        </label>
        <textarea
          id="edp-contact-message"
          rows={4}
          placeholder="Describe your environmental data or platform inquiry..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          style={{ ...inputStyle, resize: 'vertical' }}
        />
      </div>

      {statusMessage && (
        <p role="status" style={{ fontSize: '0.875rem', color: '#f2b8b5', margin: 0, lineHeight: 1.5 }}>
          {statusMessage}
        </p>
      )}

      <div>
        <button
          type="submit"
          disabled
          aria-disabled="true"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.78rem 1.6rem',
            borderRadius: '9999px',
            border: '1px solid rgba(116, 170, 80, 0.35)',
            background: 'rgba(10, 26, 18, 0.6)',
            color: 'rgba(212, 220, 216, 0.72)',
            fontSize: '0.875rem',
            fontWeight: 500,
            cursor: 'not-allowed'
          }}
        >
          <span>Submission Unavailable (No Backend Endpoint)</span>
        </button>
      </div>
    </form>
  );
};
