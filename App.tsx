
import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation, Navigate, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Investment from './pages/Investment';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import EventsNews from './pages/EventsNews';
import Contact from './pages/Contact';
import Admin from './pages/Admin';

// Specific Project Pages
import BoleRefenti from './pages/BoleRefenti';
import KazanchesExecutive from './pages/KazanchesExecutive';
import BulbulaResidential from './pages/BulbulaResidential';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const useReveal = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { 
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
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
    <HashRouter>
      <ScrollToTop />
      <AppContent />
    </HashRouter>
  );
};

const AppContent: React.FC = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen bg-refenti-offwhite text-refenti-charcoal font-sans selection:bg-refenti-gold selection:text-white">
      {!isAdmin && <Navbar />}
      <main>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/investment" element={<Investment />} />
            <Route path="/projects" element={<Projects />} />
            
            <Route path="/projects/bole" element={<BoleRefenti />} />
            <Route path="/projects/kasanches" element={<KazanchesExecutive />} />
            <Route path="/projects/bulbula" element={<BulbulaResidential />} />
            
            <Route path="/projects/:id" element={<ProjectDetail />} />
            
            <Route path="/events-news" element={<EventsNews />} />
            <Route path="/contact" element={<Contact />} />
            
            <Route path="/admin/*" element={<Admin />} />
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </main>
      
      {!isAdmin && (
        <>
          <a 
            href="https://wa.me/251986198686" 
            target="_blank" 
            rel="noopener noreferrer"
            className="fixed bottom-8 right-8 z-50 bg-green-600/90 backdrop-blur-sm text-white p-3.5 rounded-2xl shadow-lg hover:scale-105 transition-all flex items-center justify-center"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.27 9.27 0 01-4.487-1.159l-.323-.191-3.333.874.89-3.247-.21-.334a9.243 9.243 0 01-1.416-4.93c0-5.11 4.155-9.265 9.268-9.265a9.213 9.213 0 016.551 2.716 9.22 9.22 0 012.716 6.556c0 5.11-4.156 9.266-9.269 9.266m8.904-16.168A10.858 10.858 0 0012.063 2.5a10.908 10.908 0 00-10.903 10.9c0 3.489.914 6.896 2.646 9.897l-2.806 10.244 10.477-2.748a10.884 10.884 0 005.114 1.282h.005c5.992 0 10.87-4.878 10.873-10.878a10.831 10.831 0 00-3.189-7.697" />
            </svg>
          </a>

          <footer className="bg-white border-t border-gray-100 py-16 px-8 reveal">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
              <div className="space-y-4 max-w-sm">
                <h2 className="font-display text-2xl font-light text-refenti-gold tracking-tight">Refenti Realty Group</h2>
                <p className="text-gray-700 font-light leading-relaxed text-[13px]">
                  Real estate investment and development platform operating under Solstice Ventures Holding (SVH). Curating environments that define the future of urban excellence.
                </p>
                <Link 
                  to="/admin" 
                  className="inline-block text-[8px] font-bold uppercase tracking-ultra text-gray-600 hover:text-refenti-gold transition-colors pt-4"
                >
                  Admin Access
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-10 w-full md:w-auto">
                <div className="space-y-4">
                  <h4 className="font-sans font-bold text-[8px] tracking-ultra uppercase text-gray-500">Site</h4>
                  <ul className="space-y-2 text-refenti-charcoal font-light text-[12px]">
                    <li><Link to="/" className="hover:text-refenti-gold transition-colors">Home</Link></li>
                    <li><Link to="/about" className="hover:text-refenti-gold transition-colors">About</Link></li>
                    <li><Link to="/investment" className="hover:text-refenti-gold transition-colors">Investment</Link></li>
                    <li><Link to="/projects" className="hover:text-refenti-gold transition-colors">Portfolio</Link></li>
                    <li><Link to="/events-news" className="hover:text-refenti-gold transition-colors">Events & News</Link></li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="font-sans font-bold text-[8px] tracking-ultra uppercase text-gray-500">Legal</h4>
                  <ul className="space-y-2 text-refenti-charcoal font-light text-[12px]">
                    <li>Investor Relations</li>
                    <li>Privacy</li>
                  </ul>
                </div>
                <div className="space-y-4 col-span-2 md:col-span-1">
                  <h4 className="font-sans font-bold text-[8px] tracking-ultra uppercase text-gray-500">Contact</h4>
                  <ul className="space-y-2 text-refenti-charcoal font-light text-[12px]">
                    <li>info@refenti.com</li>
                    <li>+251 986 1986 86</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-100 flex justify-between items-center text-[8px] text-gray-600 tracking-ultra uppercase">
              <span>© 2024 Refenti Group</span>
              <span>Made by <a href="https://briggsdavis.com" target="_blank" rel="noopener noreferrer" className="hover:text-refenti-gold transition-colors">BriggsDavis</a></span>
            </div>
          </footer>
        </>
      )}
    </div>
  );
};

export default App;
