
import React, { useEffect } from 'react';
// Added Link to the imports from react-router-dom
import { BrowserRouter, Routes, Route, useLocation, Navigate, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import BoleRefenti from './pages/BoleRefenti';
import KazanchesExecutive from './pages/KazanchesExecutive';
import BulbulaResidential from './pages/BulbulaResidential';
import Contact from './pages/Contact';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Global reveal script to handle fade-ins repeatedly
const useReveal = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        } else {
          entry.target.classList.remove('active');
        }
      });
    }, { 
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    });

    reveals.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useReveal();
  return <div className="animate-in fade-in duration-1000">{children}</div>;
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-refenti-offwhite text-refenti-charcoal font-sans selection:bg-refenti-gold selection:text-white">
        <Navbar />
        <main>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/bole" element={<BoleRefenti />} />
              <Route path="/projects/kasanches" element={<KazanchesExecutive />} />
              <Route path="/projects/bulbula" element={<BulbulaResidential />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
        </main>
        
        <a
          href="https://wa.me/251986198686"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-8 right-8 z-50 bg-green-500 text-white p-4 rounded-2xl shadow-2xl hover:scale-110 transition-transform flex items-center justify-center"
        >
          <img src="/whatsapp.svg" alt="WhatsApp" className="w-6 h-6" />
        </a>

        <footer className="bg-white border-t border-gray-100 py-16 px-8 reveal">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
            <div className="space-y-6 max-w-sm">
              <h2 className="font-display text-4xl font-medium text-refenti-gold tracking-tighter">Refenti Realty Group</h2>
              <p className="text-gray-500 font-light leading-relaxed text-sm">
                Architectural excellence meets premium digital real estate. A flagship of Pan Africa Real Estate Plc.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-12 w-full md:w-auto">
              <div className="space-y-6">
                <h4 className="font-sans font-bold text-[10px] tracking-[0.2em] uppercase text-gray-400">Navigation</h4>
                <ul className="space-y-3 text-refenti-charcoal font-light text-sm">
                  <li><Link to="/" className="hover:text-refenti-gold transition-colors">Home</Link></li>
                  <li><Link to="/about" className="hover:text-refenti-gold transition-colors">About</Link></li>
                  <li><Link to="/projects" className="hover:text-refenti-gold transition-colors">Portfolio</Link></li>
                </ul>
              </div>
              <div className="space-y-6">
                <h4 className="font-sans font-bold text-[10px] tracking-[0.2em] uppercase text-gray-400">Governance</h4>
                <ul className="space-y-3 text-refenti-charcoal font-light text-sm">
                  <li>Investor Relations</li>
                  <li>Privacy Policy</li>
                </ul>
              </div>
              <div className="space-y-6 col-span-2 md:col-span-1">
                <h4 className="font-sans font-bold text-[10px] tracking-[0.2em] uppercase text-gray-400">Contact</h4>
                <ul className="space-y-3 text-refenti-charcoal font-light text-sm">
                  <li>info@refenti.com</li>
                  <li>+251 986 1986 86</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-50 flex justify-between items-center text-[10px] text-gray-400 tracking-[0.3em] uppercase">
            <span>© 2026 Refenti Group</span>
            <span>Made by <a href="https://briggsdavis.com" target="_blank" rel="noopener noreferrer" className="hover:text-refenti-gold transition-colors">BriggsDavis</a></span>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
};

export default App;
