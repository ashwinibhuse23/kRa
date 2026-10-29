import { useState } from 'react';
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

function App() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <>
      <Navbar />

      <main>
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
      </main>

      <Footer />
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
