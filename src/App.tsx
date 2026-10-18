import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
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

function App() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
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
      <ScrollToTop />
    </>
  );
}

export default App;
