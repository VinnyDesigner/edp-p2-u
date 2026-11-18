import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export const PrivacyPolicyPage = () => {
  const { lang } = useLanguage();

  return (
    <div
      className="privacy-page"
      style={{
        paddingTop: 'calc(var(--header-height) + 3.5rem)',
        paddingBottom: 'clamp(4rem, 8vw, 6.5rem)'
      }}
    >
      <div className="container" style={{ maxWidth: '840px' }}>
        <span className="pill-tag" style={{ marginBottom: '1.25rem' }}>
          <span className="pill-dot" />
          EAD ENVIRONMENTAL DATA PLATFORM
        </span>
        <h1
          style={{
            fontSize: 'clamp(2.35rem, 5vw, 3.75rem)',
            fontWeight: 400,
            color: 'var(--text-white)',
            marginBottom: '1.75rem'
          }}
        >
          {lang === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy & Legal Notice'}
        </h1>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            color: 'var(--text-primary)',
            lineHeight: 1.7,
            background: 'linear-gradient(150deg, rgba(10, 26, 18, 0.92) 0%, rgba(5, 9, 7, 0.98) 100%)',
            border: '1px solid rgba(116, 170, 80, 0.24)',
            borderRadius: '18px',
            padding: 'clamp(1.75rem, 4vw, 2.75rem)'
          }}
        >
          <p style={{ margin: 0 }}>
            {lang === 'ar'
              ? 'إشعار الخصوصية الرسمي الخاص بمنصة البيانات البيئية لهيئة البيئة – أبوظبي قيد المراجعة والاعتماد الرسمي قبل النشر.'
              : 'This page is reserved for the official Environment Agency – Abu Dhabi (EAD) Privacy Policy and Terms of Use for the Environmental Data Platform (EDP) – Phase II.'}
          </p>
          <p style={{ margin: 0, color: 'var(--text-muted)' }}>
            {lang === 'ar'
              ? 'يرجى تزويدنا بالنص القانوني المعتمد من هيئة البيئة – أبوظبي لاستبدال هذا الإشعار المؤقت.'
              : 'Official EAD legal statements, data governance policies, and verified contact channels have not been fabricated and are pending confirmation from EAD.'}
          </p>
        </div>
      </div>
    </div>
  );
};
