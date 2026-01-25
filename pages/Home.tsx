
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { getProjects, getEvents } from '../constants';
import { EventItem } from '../types';

const EventCard: React.FC<{ event: EventItem; index: number }> = ({ event, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className="group bg-white p-6 rounded-[2rem] shadow-[0_15px_50px_-15px_rgba(0,0,0,0.05)] transition-all duration-1000 border border-gray-100 reveal"
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="overflow-hidden aspect-[4/5] rounded-[1.5rem] relative mb-6">
        <img 
          src={event.image} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
          alt={event.title}
        />
      </div>
      <div className="px-2 pb-2">
        <p className="text-refenti-gold text-[8px] font-bold tracking-ultra uppercase mb-2">{event.date}</p>
        <h3 className="font-display text-xl font-light text-refenti-charcoal mb-1">{event.title}</h3>
        <p className="text-gray-500 text-[8px] font-bold uppercase tracking-extrawide mb-4">{event.location}</p>
        
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 text-refenti-gold text-[8px] font-bold uppercase tracking-ultra opacity-80 hover:opacity-100 transition-opacity"
        >
          {isOpen ? 'Close' : 'View Details'}
        </button>

        <div className={`overflow-hidden transition-all duration-700 ease-in-out ${isOpen ? 'max-h-40 opacity-100 mt-4 pt-4 border-t border-gray-100' : 'max-h-0 opacity-0'}`}>
          <p className="text-gray-600 text-[13px] font-light leading-relaxed">
            {event.details}
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
      let p = (windowHeight - rect.top) / (windowHeight * 0.8);
      setProgress(Math.min(Math.max(p, 0), 1));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const archRadiusY = isMobile ? (150 - (progress * 100)) : (250 - (progress * 200));
  const baseRadius = isMobile ? '2.5rem' : '4rem';

  return (
    <section ref={sectionRef} className="py-24 md:py-40 px-4 md:px-8 bg-refenti-offwhite flex items-center justify-center">
      <div 
        className="max-w-6xl w-full bg-white p-10 md:p-20 shadow-sm border border-gray-100 relative overflow-hidden transition-all duration-700 ease-out reveal"
        style={{ 
          borderTopLeftRadius: progress >= 0.95 ? baseRadius : `${50}% ${archRadiusY}px`,
          borderTopRightRadius: progress >= 0.95 ? baseRadius : `${50}% ${archRadiusY}px`,
          borderRadius: baseRadius
        }}
      >
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 md:space-y-12 reveal">
            <h2 className="font-display text-3xl sm:text-4xl md:text-6xl font-light text-refenti-charcoal leading-[1.1] tracking-tight">
              Active <span className="text-refenti-gold italic">Asset</span> <br/> Management.
            </h2>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base font-light max-w-sm">
              Operating under Solstice Ventures Holding, Refenti goes beyond construction to manage living ecosystems through disciplined governance and premium delivery.
            </p>
            <div className="flex gap-8 items-center">
              <Link to="/about" className="text-refenti-gold font-sans font-bold uppercase tracking-ultra text-[8px] border-b border-refenti-gold pb-1">
                Overview
              </Link>
              <Link to="/investment" className="bg-refenti-charcoal text-white px-8 py-4 rounded-xl text-[9px] font-bold uppercase tracking-ultra hover:bg-refenti-gold transition-all shadow-sm">
                Strategy
              </Link>
            </div>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] md:rounded-[3rem] shadow-sm border border-gray-50 reveal">
             <img src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover opacity-90" alt="Interior" />
          </div>
        </div>
      </div>
    </section>
  );
};

const Home: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [projects, setProjects] = useState(getProjects());
  const [featuredEvents, setFeaturedEvents] = useState(getEvents().filter(e => e.isFeatured));

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    setProjects(getProjects());
    setFeaturedEvents(getEvents().filter(e => e.isFeatured));

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="overflow-hidden bg-refenti-offwhite">
      <section className="relative h-[95vh] w-full flex items-end justify-center bg-refenti-offwhite pb-12 md:pb-20 overflow-hidden">
        {/* Parallax Image Layer */}
        <div 
          className="absolute inset-[-5%]"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: `translateY(${-scrollY * 0.1}px)`,
            willChange: 'transform'
          }}
        />
        
        {/* Static Gradient Overlay Layer */}
        <div className="absolute inset-0 bg-gradient-to-t from-refenti-offwhite via-refenti-offwhite/40 to-transparent pointer-events-none" />
        
        <div className="relative z-10 text-center space-y-8 md:space-y-12 px-6 max-w-6xl mx-auto reveal active">
          <div className="space-y-4 md:space-y-6">
            <p className="text-refenti-gold font-sans font-bold tracking-ultra uppercase text-[7px] md:text-[9px] opacity-90">
              Institutional Investment & Development
            </p>
            <h1 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-light text-refenti-charcoal tracking-tighter leading-none">
              Refenti <br className="sm:hidden" /> Realty <br className="hidden sm:block" /> Group
            </h1>
          </div>
          <Link to="/contact" className="inline-block py-4.5 px-13 md:py-5.5 md:px-18 bg-refenti-charcoal text-white rounded-2xl text-[9px] md:text-[10px] font-bold uppercase tracking-ultra shadow-lg hover:bg-refenti-gold transition-all duration-500">
            Inquire
          </Link>
        </div>
      </section>

      <PhilosophySection />

      <section className="py-24 md:py-48 px-6 md:px-12 bg-white rounded-[3rem] md:rounded-[6rem] shadow-sm relative z-10 -mt-12 md:-mt-24 border-t border-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 md:mb-24 flex flex-col md:flex-row justify-between items-start md:items-end reveal">
            <div className="space-y-2">
              <p className="text-refenti-gold font-sans font-bold uppercase tracking-ultra text-[8px]">The Collections</p>
              <h2 className="font-display text-6xl md:text-9xl font-light text-black tracking-tighter uppercase leading-none select-none">
                Portfolio
              </h2>
            </div>
            <Link to="/projects" className="text-refenti-gold font-sans font-bold uppercase tracking-ultra text-[9px] flex items-center gap-6 group mb-2">
              View All <span className="w-12 h-px bg-refenti-gold group-hover:w-20 transition-all duration-700" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24">
            {projects.length > 0 && (
              <div className="md:col-span-7 group relative reveal">
                <div className="overflow-hidden aspect-video rounded-[2.5rem] shadow-lg border border-gray-100 bg-white">
                  <img src={projects[0].image} className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-1000" alt={projects[0].name} />
                </div>
                <div className="mt-10 space-y-4 px-4">
                  <p className="text-[8px] font-bold text-refenti-gold tracking-ultra uppercase opacity-80">{projects[0].type}</p>
                  <h3 className="font-display text-3xl md:text-4xl font-light text-refenti-charcoal leading-none">{projects[0].name}</h3>
                  <p className="text-gray-600 font-light text-sm max-w-md leading-relaxed">{projects[0].description}</p>
                  <Link to={`/projects/${projects[0].id}`} className="mt-4 inline-block bg-refenti-charcoal text-white px-10 py-4 rounded-xl text-[9px] font-bold uppercase tracking-ultra hover:bg-refenti-gold transition-all">
                    Details
                  </Link>
                </div>
              </div>
            )}

            {projects.length > 1 && (
              <div className="md:col-span-5 md:mt-32 group reveal">
                <div className="overflow-hidden aspect-[4/5] rounded-[2rem] shadow-lg border border-gray-100 bg-white">
                  <img src={projects[1].image} className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-1000" alt={projects[1].name} />
                </div>
                <div className="mt-8 px-4">
                  <h3 className="font-display text-3xl font-light text-refenti-charcoal mb-2">{projects[1].name}</h3>
                  <p className="text-[8px] font-bold text-refenti-gold tracking-ultra uppercase opacity-80">{projects[1].type}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-40 px-6 bg-refenti-offwhite reveal">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-3">
            <p className="text-refenti-gold font-sans font-bold tracking-ultra uppercase text-[9px] opacity-80">Exclusivity</p>
            <h2 className="font-display text-4xl md:text-6xl font-light text-refenti-charcoal">Featured Engagements</h2>
          </div>
          
          {featuredEvents.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
              {featuredEvents.map((event, idx) => (
                <EventCard key={event.id} event={event} index={idx} />
              ))}
            </div>
          ) : (
             <div className="text-center text-gray-500 font-display italic text-xl">
               No upcoming featured events at this moment.
             </div>
          )}

          <div className="mt-20 text-center">
            <Link 
              to="/events-news" 
              className="inline-block border border-refenti-gold text-refenti-gold px-12 py-5 rounded-2xl text-[10px] font-bold uppercase tracking-ultra hover:bg-refenti-gold hover:text-white transition-all duration-500 shadow-sm"
            >
              View All Events & News
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
