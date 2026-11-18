import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { Preloader } from './components/Preloader';
import { ScrollToTop, PageTransition } from './components/PageTransition';
import { SmoothScroll } from './components/SmoothScroll';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

// Pages
import { HomePage } from './pages/HomePage';
import { WorkPage } from './pages/WorkPage';
import { ProjectIndexPage } from './pages/ProjectIndexPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { CaseStudyPage } from './pages/CaseStudyPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';

export default function App() {
  return (
    <LanguageProvider>
      <SmoothScroll>
        <Preloader />
        <ScrollToTop />
        <div className="site-wrapper" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Header />
          <main style={{ flexGrow: 1 }}>
            <PageTransition>
              <Routes>
              {/* English Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/work" element={<WorkPage />} />
              <Route path="/applications" element={<WorkPage />} />
              <Route path="/work/index" element={<ProjectIndexPage />} />
              <Route path="/catalogues" element={<ProjectIndexPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/work/:slug" element={<CaseStudyPage />} />
              <Route path="/pp" element={<PrivacyPolicyPage />} />
              <Route path="/privacy" element={<Navigate to="/pp" replace />} />

              {/* Arabic Routes */}
              <Route path="/ar" element={<HomePage />} />
              <Route path="/ar/work" element={<WorkPage />} />
              <Route path="/ar/applications" element={<WorkPage />} />
              <Route path="/ar/work/index" element={<ProjectIndexPage />} />
              <Route path="/ar/catalogues" element={<ProjectIndexPage />} />
              <Route path="/ar/about" element={<AboutPage />} />
              <Route path="/ar/contact" element={<ContactPage />} />
              <Route path="/ar/work/:slug" element={<CaseStudyPage />} />
              <Route path="/ar/pp" element={<PrivacyPolicyPage />} />
              <Route path="/ar/privacy" element={<Navigate to="/ar/pp" replace />} />

              {/* Legacy Polish Routes */}
              <Route path="/pl" element={<HomePage />} />
              <Route path="/pl/work" element={<WorkPage />} />
              <Route path="/pl/work/index" element={<ProjectIndexPage />} />
              <Route path="/pl/about" element={<AboutPage />} />
              <Route path="/pl/contact" element={<ContactPage />} />
              <Route path="/pl/work/:slug" element={<CaseStudyPage />} />
              <Route path="/pl/pp" element={<PrivacyPolicyPage />} />
              <Route path="/pl/privacy" element={<Navigate to="/pl/pp" replace />} />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </PageTransition>
        </main>
        <Footer />
      </div>
      </SmoothScroll>
    </LanguageProvider>
  );
}
