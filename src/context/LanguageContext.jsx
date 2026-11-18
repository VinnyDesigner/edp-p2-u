import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { siteContent } from '../data/content';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Determine language from pathname (/ar for Arabic, default EN)
  const isArabic = location.pathname === '/ar' || location.pathname.startsWith('/ar/');
  const [lang, setLang] = useState(isArabic ? 'ar' : 'en');

  useEffect(() => {
    const isAr = location.pathname === '/ar' || location.pathname.startsWith('/ar/');
    const nextLang = isAr ? 'ar' : 'en';
    setLang(nextLang);
    document.documentElement.lang = nextLang;
  }, [location.pathname]);

  const switchLanguage = (targetLang) => {
    if (targetLang === lang) return;
    const currentPath = location.pathname;
    let newPath = '/';

    if (targetLang === 'ar') {
      newPath = currentPath === '/' ? '/ar' : `/ar${currentPath.replace(/^\/ar/, '')}`;
    } else {
      newPath = currentPath === '/ar' ? '/' : currentPath.replace(/^\/ar/, '') || '/';
    }
    navigate(newPath);
  };

  const getPath = (basePath) => {
    if (lang === 'ar') {
      return basePath === '/' ? '/ar' : `/ar${basePath}`;
    }
    return basePath;
  };

  const t = siteContent[lang] || siteContent.en;

  return (
    <LanguageContext.Provider value={{ lang, setLang, switchLanguage, getPath, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
