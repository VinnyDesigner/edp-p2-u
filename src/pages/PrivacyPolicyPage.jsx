import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export const PrivacyPolicyPage = () => {
  const { lang, t } = useLanguage();

  return (
    <div className="privacy-page" style={{ paddingTop: 'calc(var(--header-height) + 3rem)' }}>
      <div className="container" style={{ maxWidth: '840px' }}>
        <h1
          style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 300,
            color: 'var(--text-white)',
            marginBottom: '2rem'
          }}
        >
          {lang === 'pl' ? 'Polityka Prywatności' : 'Privacy Policy'}
        </h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', color: 'var(--text-primary)', lineHeight: 1.7 }}>
          <p>
            {lang === 'pl'
              ? 'Niniejsza Polityka Prywatności określa zasady przetwarzania danych osobowych w związku z korzystaniem ze strony internetowej www.fragment.im („Strona”), w tym podczas jej przeglądania oraz przesyłania zapytań za pośrednictwem formularza kontaktowego, zgodnie z Ogólnym Rozporządzeniem o Ochronie Danych (RODO).'
              : 'This Privacy Policy explains how personal data is processed in connection with the website www.fragment.im (the “Website”), including when you visit the Website or send an enquiry through the contact form. It is intended to provide the information required under the EU General Data Protection Regulation (GDPR).'}
          </p>

          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 400, color: 'var(--text-white)', marginBottom: '1rem' }}>
              {lang === 'pl' ? '1. Administrator danych' : '1. Data Controller'}
            </h2>
            <p>
              {lang === 'pl' ? 'Administratorem Twoich danych osobowych jest:' : 'The controller of personal data processed through the Website is:'}
            </p>
            <ul style={{ listStyle: 'none', paddingLeft: '1rem', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <li>• <strong>Fragment Paweł Świniarski</strong></li>
              <li>• {lang === 'pl' ? 'Adres: ul. Lipowa 6a/12, 81-572 Gdynia, Polska' : 'Address: ul. Lipowa 6a/12, 81-572 Gdynia, Poland'}</li>
              <li>• Email: <a href="mailto:pawel@fragment.im" style={{ textDecoration: 'underline' }}>pawel@fragment.im</a></li>
              <li>• Website: www.fragment.im</li>
            </ul>
          </div>

          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 400, color: 'var(--text-white)', marginBottom: '1rem' }}>
              {lang === 'pl' ? '2. Jakie dane są zbierane' : '2. What Data Is Collected'}
            </h2>
            <p>
              {lang === 'pl'
                ? 'W przypadku skorzystania z formularza kontaktowego zbierane są następujące dane:'
                : 'If you contact me through the Website, the form may collect the following information:'}
            </p>
            <ul style={{ listStyle: 'none', paddingLeft: '1rem', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <li>• {lang === 'pl' ? 'imię i nazwisko' : 'name'}</li>
              <li>• {lang === 'pl' ? 'nazwa firmy / organizacji' : 'company / organization name'}</li>
              <li>• {lang === 'pl' ? 'adres poczty elektronicznej (email)' : 'email address'}</li>
              <li>• {lang === 'pl' ? 'szacowany przedział budżetowy' : 'estimated budget range'}</li>
              <li>• {lang === 'pl' ? 'treść zapytania projektowego' : 'message and project details'}</li>
            </ul>
          </div>

          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 400, color: 'var(--text-white)', marginBottom: '1rem' }}>
              {lang === 'pl' ? '3. Cel i podstawa przetwarzania' : '3. Purpose & Legal Basis'}
            </h2>
            <p>
              {lang === 'pl'
                ? 'Dane przekazane w formularzu przetwarzane są w celu podjęcia działań na Twoje żądanie przed zawarciem umowy oraz odpowiedzi na przesłane zapytanie (art. 6 ust. 1 lit. b oraz lit. f RODO).'
                : 'Data submitted via the inquiry form is processed for the purpose of taking steps prior to entering into a potential contract and responding to your inquiry (Article 6(1)(b) and (f) GDPR).'}
            </p>
          </div>

          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 400, color: 'var(--text-white)', marginBottom: '1rem' }}>
              {lang === 'pl' ? '4. Twoje prawa' : '4. Your Rights'}
            </h2>
            <p>
              {lang === 'pl'
                ? 'Przysługuje Ci prawo dostępu do swoich danych, ich sprostowania, usunięcia, ograniczenia przetwarzania oraz wniesienia sprzeciwu. W celu realizacji praw skontaktuj się pod adresem pawel@fragment.im.'
                : 'Under GDPR, you have the right to access, rectify, erase, restrict or object to the processing of your personal data. To exercise these rights, please email pawel@fragment.im.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
