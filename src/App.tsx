import { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StatsSection from './components/StatsSection';
import OperationalExcellence from './components/OperationalExcellence';
import AboutUs from './components/AboutUs';
import Services from './components/Services';
import WhyKra from './components/WhyKra';
import Expertise from './components/Expertise';
import Leadership from './components/Leadership';
import Contact from './components/Contact';
import FAQ from './components/FAQ';
import ContactModal from './components/ContactModal';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import WhatsAppButton from './components/WhatsAppButton';
import TrainingDevelopment from './components/TrainingDevelopment';

type RoutePath = 'home' | 'training-development';

function getInitialRoute(): RoutePath {
  if (typeof window !== 'undefined') {
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    if (path.includes('training') || hash.includes('training')) {
      return 'training-development';
    }
  }
  return 'home';
}

function App() {
  const [currentPath, setCurrentPath] = useState<RoutePath>(getInitialRoute);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const navigateTo = (path: RoutePath, hash?: string) => {
    setCurrentPath(path);

    const targetUrl =
      path === 'training-development'
        ? '/training-development'
        : hash
        ? `/${hash}`
        : '/';

    if (window.location.pathname !== targetUrl) {
      window.history.pushState({ path, hash }, '', targetUrl);
    }

    if (path === 'training-development') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 60);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      const nextRoute = getInitialRoute();
      setCurrentPath(nextRoute);
      if (nextRoute === 'home' && window.location.hash) {
        setTimeout(() => {
          const el = document.querySelector(window.location.hash);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 60);
      }
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  return (
    <>
      {currentPath !== 'training-development' && (
        <Navbar currentPath={currentPath} onNavigate={navigateTo} />
      )}

      <main>
        {currentPath === 'training-development' ? (
          <TrainingDevelopment
            onOpenContactModal={() => setIsContactModalOpen(true)}
            onNavigateHome={(hash) => navigateTo('home', hash)}
          />
        ) : (
          <>
            <Hero onOpenContactModal={() => setIsContactModalOpen(true)} />
            <StatsSection />
            <OperationalExcellence />
            <AboutUs />
            <Expertise />
            <Services />
            <Leadership />
            <WhyKra />
            <Contact />
            <FAQ onOpenContactModal={() => setIsContactModalOpen(true)} />
          </>
        )}
      </main>

      <Footer onNavigate={navigateTo} />
      <WhatsAppButton />
      <ScrollToTop />

      {/* Popup Form Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </>
  );
}

export default App;
