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
import { DatasetsPage } from './pages/DatasetsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
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
                <Route path="/about" element={<AboutPage />} />
                <Route path="/applications" element={<WorkPage />} />
                <Route path="/catalogue" element={<ProjectIndexPage />} />
                <Route path="/datasets" element={<DatasetsPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/pp" element={<PrivacyPolicyPage />} />

                {/* Preserved Legacy Route Redirects (do not disturb homepage links) */}
                <Route path="/work" element={<Navigate to="/applications" replace />} />
                <Route path="/work/index" element={<Navigate to="/catalogue" replace />} />
                <Route path="/catalogues" element={<Navigate to="/catalogue" replace />} />
                <Route path="/work/:slug" element={<Navigate to="/applications" replace />} />
                <Route path="/privacy" element={<Navigate to="/pp" replace />} />

                {/* Arabic Routes */}
                <Route path="/ar" element={<HomePage />} />
                <Route path="/ar/about" element={<AboutPage />} />
                <Route path="/ar/applications" element={<WorkPage />} />
                <Route path="/ar/catalogue" element={<ProjectIndexPage />} />
                <Route path="/ar/datasets" element={<DatasetsPage />} />
                <Route path="/ar/contact" element={<ContactPage />} />
                <Route path="/ar/pp" element={<PrivacyPolicyPage />} />

                {/* Arabic Legacy Redirects */}
                <Route path="/ar/work" element={<Navigate to="/ar/applications" replace />} />
                <Route path="/ar/work/index" element={<Navigate to="/ar/catalogue" replace />} />
                <Route path="/ar/catalogues" element={<Navigate to="/ar/catalogue" replace />} />
                <Route path="/ar/work/:slug" element={<Navigate to="/ar/applications" replace />} />
                <Route path="/ar/privacy" element={<Navigate to="/ar/pp" replace />} />

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
