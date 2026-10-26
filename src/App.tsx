import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StatsSection from './components/StatsSection';
import OperationalExcellence from './components/OperationalExcellence';
import AboutUs from './components/AboutUs';
import Services from './components/Services';
import WhyKra from './components/WhyKra';
import Expertise from './components/Expertise';
import PastExperience from './components/PastExperience';
import Leadership from './components/Leadership';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import WhatsAppButton from './components/WhatsAppButton';

function App() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <StatsSection />
        <OperationalExcellence />
        <AboutUs />
        <Services />
        <WhyKra />
        <Expertise />
        <PastExperience />
        <Leadership />
        <Contact />
      </main>

      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
    </>
  );
}

export default App;
