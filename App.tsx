
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
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.27 9.27 0 01-4.487-1.159l-.323-.191-3.333.874.89-3.247-.21-.334a9.243 9.243 0 01-1.416-4.93c0-5.11 4.155-9.265 9.268-9.265a9.213 9.213 0 016.551 2.716 9.22 9.22 0 012.716 6.556c0 5.11-4.156 9.266-9.269 9.266m8.904-16.168A10.858 10.858 0 0012.063 2.5a10.908 10.908 0 00-10.903 10.9c0 3.489.914 6.896 2.646 9.897l-2.806 10.244 10.477-2.748a10.884 10.884 0 005.114 1.282h.005c5.992 0 10.87-4.878 10.873-10.878a10.831 10.831 0 00-3.189-7.697" />
          </svg>
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
