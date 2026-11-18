import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RollText } from './RollLink';
import { useLanguage } from '../context/LanguageContext';

export const ContactForm = () => {
  const { lang, getPath, t } = useLanguage();
  const formCopy = t.contactPage.form;

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    budget: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = lang === 'pl' ? 'Imię jest wymagane' : 'Name is required';
    }
    if (!formData.email.trim()) {
      errs.email = lang === 'pl' ? 'Email jest wymagany' : 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = lang === 'pl' ? 'Podaj prawidłowy adres email' : 'Please provide a valid email';
    }
    if (!formData.budget) {
      errs.budget = lang === 'pl' ? 'Wybierz szacowany budżet' : 'Please select a budget range';
    }
    if (!formData.message.trim()) {
      errs.message = lang === 'pl' ? 'Wiadomość jest wymagana' : 'Message is required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    // Demonstration handler simulation
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  if (submitted) {
    return (
      <div
        style={{
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-medium)',
          borderRadius: 'var(--radius-lg)',
          padding: 'clamp(2rem, 5vw, 3.5rem)',
          textAlign: 'center'
        }}
      >
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: 'rgba(201, 208, 210, 0.1)',
            border: '1px solid var(--text-primary)',
            color: 'var(--text-white)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem',
            fontSize: '1.25rem'
          }}
        >
          ✓
        </div>
        <h3 style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>
          {formCopy.successTitle}
        </h3>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', maxWidth: '440px', margin: '0 auto 2rem' }}>
          {formCopy.successMessage}
        </p>
        <button
          onClick={() => {
            setFormData({ name: '', company: '', email: '', budget: '', message: '' });
            setSubmitted(false);
          }}
          className="btn-secondary"
        >
          {lang === 'pl' ? 'Wyślij kolejną wiadomość' : 'Send Another Message'}
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem'
      }}
    >
      {/* Name & Company (2 columns on desktop) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1.5rem'
        }}
      >
        {/* Name Field */}
        <div>
          <label
            htmlFor="contact-name"
            style={{
              display: 'block',
              fontSize: '0.875rem',
              color: 'var(--text-muted)',
              marginBottom: '0.5rem'
            }}
          >
            {formCopy.nameLabel} <span style={{ color: 'var(--text-primary)' }}>*</span>
          </label>
          <input
            id="contact-name"
            type="text"
            required
            placeholder={formCopy.namePlaceholder}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            style={{
              width: '100%',
              padding: '0.875rem 1rem',
              backgroundColor: 'var(--bg-surface)',
              border: `1.5px solid ${errors.name ? '#e57373' : 'var(--border-subtle)'}`,
              borderRadius: 'var(--radius-md)',
              color: 'var(--text-white)',
              fontSize: '0.9375rem',
              outline: 'none',
              transition: 'border-color 0.2s ease'
            }}
          />
          {errors.name && (
            <p style={{ color: '#e57373', fontSize: '0.75rem', marginTop: '0.35rem' }}>
              {errors.name}
            </p>
          )}
        </div>

        {/* Company Field */}
        <div>
          <label
            htmlFor="contact-company"
            style={{
              display: 'block',
              fontSize: '0.875rem',
              color: 'var(--text-muted)',
              marginBottom: '0.5rem'
            }}
          >
            {formCopy.companyLabel}
          </label>
          <input
            id="contact-company"
            type="text"
            placeholder={formCopy.companyPlaceholder}
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            style={{
              width: '100%',
              padding: '0.875rem 1rem',
              backgroundColor: 'var(--bg-surface)',
              border: '1.5px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--text-white)',
              fontSize: '0.9375rem',
              outline: 'none',
              transition: 'border-color 0.2s ease'
            }}
          />
        </div>
      </div>

      {/* Email Field */}
      <div>
        <label
          htmlFor="contact-email"
          style={{
            display: 'block',
            fontSize: '0.875rem',
            color: 'var(--text-muted)',
            marginBottom: '0.5rem'
          }}
        >
          {formCopy.emailLabel} <span style={{ color: 'var(--text-primary)' }}>*</span>
        </label>
        <input
          id="contact-email"
          type="email"
          required
          placeholder={formCopy.emailPlaceholder}
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          style={{
            width: '100%',
            padding: '0.875rem 1rem',
            backgroundColor: 'var(--bg-surface)',
            border: `1.5px solid ${errors.email ? '#e57373' : 'var(--border-subtle)'}`,
            borderRadius: 'var(--radius-md)',
            color: 'var(--text-white)',
            fontSize: '0.9375rem',
            outline: 'none',
            transition: 'border-color 0.2s ease'
          }}
        />
        {errors.email && (
          <p style={{ color: '#e57373', fontSize: '0.75rem', marginTop: '0.35rem' }}>
            {errors.email}
          </p>
        )}
      </div>

      {/* Budget Selection Pills */}
      <div>
        <label
          style={{
            display: 'block',
            fontSize: '0.875rem',
            color: 'var(--text-muted)',
            marginBottom: '0.75rem'
          }}
        >
          {formCopy.budgetLabel} <span style={{ color: 'var(--text-primary)' }}>*</span>
        </label>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.75rem'
          }}
        >
          {formCopy.budgetOptions.map((opt) => {
            const isSelected = formData.budget === opt;
            return (
              <button
                key={opt}
                type="button"
                onClick={() => setFormData({ ...formData, budget: opt })}
                style={{
                  padding: '0.65rem 1.15rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: isSelected ? 'var(--text-primary)' : 'var(--bg-surface)',
                  color: isSelected ? 'var(--text-dark)' : 'var(--text-primary)',
                  border: isSelected ? '1.5px solid var(--text-primary)' : '1.5px solid var(--border-subtle)',
                  fontSize: '0.875rem',
                  fontWeight: isSelected ? 500 : 400,
                  transition: 'all 0.2s ease'
                }}
              >
                {opt}
              </button>
            );
          })}
        </div>
        {errors.budget && (
          <p style={{ color: '#e57373', fontSize: '0.75rem', marginTop: '0.5rem' }}>
            {errors.budget}
          </p>
        )}
      </div>

      {/* Message Textarea */}
      <div>
        <label
          htmlFor="contact-message"
          style={{
            display: 'block',
            fontSize: '0.875rem',
            color: 'var(--text-muted)',
            marginBottom: '0.5rem'
          }}
        >
          {formCopy.messageLabel} <span style={{ color: 'var(--text-primary)' }}>*</span>
        </label>
        <textarea
          id="contact-message"
          required
          rows={5}
          placeholder={formCopy.messagePlaceholder}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          style={{
            width: '100%',
            padding: '1rem',
            backgroundColor: 'var(--bg-surface)',
            border: `1.5px solid ${errors.message ? '#e57373' : 'var(--border-subtle)'}`,
            borderRadius: 'var(--radius-md)',
            color: 'var(--text-white)',
            fontSize: '0.9375rem',
            lineHeight: 1.6,
            outline: 'none',
            resize: 'vertical',
            transition: 'border-color 0.2s ease'
          }}
        />
        {errors.message && (
          <p style={{ color: '#e57373', fontSize: '0.75rem', marginTop: '0.35rem' }}>
            {errors.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          disabled={submitting}
          className="btn-primary"
          style={{ width: '100%', padding: '1rem', opacity: submitting ? 0.7 : 1 }}
        >
          <RollText text={submitting ? formCopy.submitting : formCopy.submit} />
        </button>
      </div>

      {/* Privacy Policy Note */}
      <p style={{ fontSize: '0.8125rem', color: 'var(--text-dimmed)', lineHeight: 1.5 }}>
        {formCopy.privacyNote}{' '}
        <Link
          to={getPath('/pp')}
          style={{ color: 'var(--text-muted)', textDecoration: 'underline', textUnderlineOffset: '3px' }}
        >
          {t.footer.privacy}
        </Link>
      </p>
    </form>
  );
};
