
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { PROJECTS, EVENTS } from '../constants';
import { EventItem } from '../types';

const EventCard: React.FC<{ event: EventItem; index: number }> = ({ event, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className={`
        group bg-white p-6 rounded-[2.5rem] shadow-2xl transition-all duration-700 border border-gray-50 reveal
      `}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="overflow-hidden aspect-[4/5] rounded-[2rem] relative mb-8">
        <img 
          src={event.image} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
          alt={event.title}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
      </div>
      <div className="px-4 pb-4">
        <p className="text-refenti-gold text-[10px] font-bold tracking-[0.2em] uppercase mb-2">{event.date}</p>
        <h3 className="font-display text-2xl font-medium text-refenti-charcoal mb-2">{event.title}</h3>
        <p className="text-gray-400 text-xs font-light uppercase tracking-widest mb-6">{event.location}</p>
        
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-3 text-refenti-gold text-[10px] font-bold uppercase tracking-[0.2em] group/btn"
        >
          {isOpen ? 'Close Details' : 'View Details'}
          <svg 
            className={`w-3 h-3 transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`} 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="3"
          >
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <div 
          className={`
            overflow-hidden transition-all duration-700 ease-in-out
            ${isOpen ? 'max-h-[300px] opacity-100 pt-6 mt-4 border-t border-gray-50' : 'max-h-0 opacity-0'}
          `}
        >
          <p className="text-gray-500 text-sm font-light leading-relaxed">
            {event.details || "Details for this exclusive preview are currently restricted. Please contact our concierge for further information regarding this upcoming engagement."}
          </p>
        </div>
      </div>
    </div>
  );
};

const PhilosophySection: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate progress based on position in viewport
      // 0 = bottom of screen, 1 = centered or above
      const start = windowHeight;
      const end = windowHeight * 0.2;
      let p = (start - rect.top) / (start - end);
      p = Math.min(Math.max(p, 0), 1);
      
      setProgress(p);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Interpolate the dome radius. 
  // At p=0, it's a deep arch (50% width, large fixed height)
  // At p=1, it's a standard rectangle (4rem)
  const archRadiusX = 50 - (progress * 50); // From 50% to 0% (relative to standard radius)
  const archRadiusY = 300 - (progress * 236); // From 300px to 64px (4rem)

  return (
    <section ref={sectionRef} className="py-24 px-8 bg-refenti-offwhite min-h-[90vh] flex items-center justify-center">
      <div 
        className="max-w-6xl w-full bg-white p-12 md:p-24 shadow-2xl border border-gray-50 relative overflow-hidden transition-all duration-200 ease-out"
        style={{ 
          borderTopLeftRadius: progress >= 1 ? '4rem' : `${50}% ${archRadiusY}px`,
          borderTopRightRadius: progress >= 1 ? '4rem' : `${50}% ${archRadiusY}px`,
          borderBottomLeftRadius: '4rem',
          borderBottomRightRadius: '4rem',
          transform: `translateY(${(1 - progress) * 50}px)`
        }}
      >
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className={`space-y-10 transition-all duration-1000 ${progress > 0.3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="font-display text-5xl md:text-7xl font-light text-refenti-charcoal leading-[1.1]">
              Where <span className="text-refenti-gold italic">Vision</span> <br/> Meets Structure.
            </h2>
            <p className="text-gray-500 leading-loose text-lg font-light max-w-md">
              Refenti operates at the intersection of architectural precision and digital innovation. We are the flagship boutique agency for Pan Africa Real Estate Plc.
            </p>
            <div className="flex flex-col gap-6 items-start">
              <Link to="/about" className="inline-block border-b-2 border-refenti-gold pb-2 text-refenti-gold font-sans font-bold uppercase tracking-widest text-[10px] hover:tracking-[0.3em] transition-all">
                The Heritage
              </Link>
              <Link to="/projects/bole" className="bg-refenti-charcoal text-white px-8 py-4 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] shadow-2xl hover:bg-refenti-gold transition-all">
                Explore Refenti Bole
              </Link>
            </div>
          </div>
          
          <div className={`relative aspect-[3/4] overflow-hidden rounded-[2.5rem] shadow-xl transition-all duration-1000 delay-200 ${progress > 0.4 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
             <img 
               src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1000" 
               className="w-full h-full object-cover"
               alt="Luxury Interior"
             />
          </div>
        </div>
      </div>
    </section>
  );
};

const Home: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="overflow-hidden bg-refenti-offwhite">
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-end justify-center bg-refenti-offwhite overflow-hidden pb-32">
        <div 
          className="absolute inset-0 transition-transform duration-1000 ease-out"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: `scale(${1 + scrollY * 0.0001}) translateY(${scrollY * 0.1}px)`,
          }}
        />
        {/* Deeper gradient for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-refenti-offwhite via-refenti-offwhite/60 to-transparent" />
        
        <div className="relative z-10 text-center space-y-12 px-4 max-w-5xl mx-auto reveal">
          <div className="space-y-4">
            <p className="text-refenti-gold font-sans font-bold tracking-[0.5em] uppercase text-[10px] md:text-xs">
              Curating Modern Horizons
            </p>
            <h1 className="font-display text-7xl md:text-[10rem] font-light text-refenti-charcoal tracking-tight leading-none">
              Refenti <br/> Realty Group
            </h1>
          </div>
          <div className="pt-8 flex flex-col items-center gap-6">
            <Link 
              to="/contact" 
              className="group relative inline-flex items-center gap-6 text-refenti-charcoal font-sans font-bold tracking-[0.2em] uppercase text-xs"
            >
              <span className="relative z-10 py-5 px-12 bg-refenti-charcoal text-white rounded-xl shadow-2xl group-hover:bg-refenti-gold transition-all duration-500">
                Inquire Directly
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Philosophy Section - Animated Arch to Card */}
      <PhilosophySection />

      {/* Portfolio Showcase */}
      <section className="py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 flex flex-col md:flex-row justify-between items-end gap-12 reveal">
            <h2 className="font-display text-8xl md:text-[8rem] font-light text-refenti-charcoal tracking-tighter uppercase leading-none">
              Portfolio
            </h2>
            <Link to="/projects" className="text-refenti-gold font-sans font-bold uppercase tracking-[0.2em] text-xs flex items-center gap-6 group mb-4">
              Explore All Works <span className="w-12 h-[1px] bg-refenti-gold group-hover:w-20 transition-all" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-7 group relative reveal">
               <div className="overflow-hidden aspect-video rounded-[3rem] shadow-2xl border border-gray-100 bg-white">
                 <img src={PROJECTS[0].image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
               </div>
               <div className="mt-8 space-y-4 px-4">
                 <p className="text-[10px] font-bold text-refenti-gold tracking-[0.3em] uppercase">{PROJECTS[0].type} Exclusive</p>
                 <h3 className="font-display text-4xl font-light">{PROJECTS[0].name}</h3>
                 <p className="text-gray-400 font-light text-lg max-w-xl">{PROJECTS[0].description}</p>
                 <Link to={`/projects/bole`} className="inline-block bg-refenti-charcoal text-white px-10 py-4 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-refenti-gold transition-colors mt-4 shadow-2xl">
                   Explore Space
                 </Link>
               </div>
            </div>

            <div className="md:col-span-5 md:mt-24 group reveal">
               <div className="overflow-hidden aspect-[4/5] rounded-[3rem] shadow-2xl border border-gray-100 bg-white">
                 <img src={PROJECTS[1].image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
               </div>
               <div className="mt-6 px-4">
                 <h3 className="font-display text-4xl font-light mb-2">{PROJECTS[1].name}</h3>
                 <p className="text-[10px] font-bold text-refenti-gold tracking-widest uppercase">{PROJECTS[1].type}</p>
                 <Link to="/projects/kasanches" className="mt-4 inline-block text-[10px] font-bold text-refenti-charcoal border-b border-gray-200 uppercase tracking-widest hover:text-refenti-gold hover:border-refenti-gold transition-all">
                   View Project
                 </Link>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events */}
      <section className="py-20 px-8 bg-white/50 rounded-[5rem] mx-4 mb-8 border border-gray-100 reveal">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="font-display text-6xl md:text-7xl font-light text-refenti-charcoal">Events</h2>
            <p className="text-gray-400 font-sans font-bold tracking-[0.4em] uppercase text-[10px]">Upcoming Architectural Previews</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {EVENTS.map((event, idx) => (
              <EventCard key={event.id} event={event} index={idx} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
