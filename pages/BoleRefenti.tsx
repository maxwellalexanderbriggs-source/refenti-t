
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const FeatureSection: React.FC<{ feature: string; index: number }> = ({ feature, index }) => {
  const [targetProgress, setTargetProgress] = useState(0);
  const [smoothedProgress, setSmoothedProgress] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const start = windowHeight;
      const end = windowHeight * 0.15;
      const current = rect.top;
      
      let p = (start - current) / (start - end);
      p = Math.min(Math.max(p, 0), 1);
      setTargetProgress(p);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const animate = () => {
      setSmoothedProgress((prev) => {
        const diff = targetProgress - prev;
        const next = prev + diff * 0.025;
        if (Math.abs(diff) < 0.0001) return targetProgress;
        return next;
      });
      requestRef.current = requestAnimationFrame(animate);
    };
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [targetProgress]);

  const isLeft = index % 2 === 0;
  const widthPercentage = 40 + (smoothedProgress * 60);

  return (
    <div 
      ref={sectionRef}
      className={`max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-24 py-16 px-8 md:px-12 ${!isLeft ? 'md:flex-row-reverse' : ''}`}
    >
      <div className={`w-full md:w-1/2 h-[50vh] md:h-[60vh] flex ${isLeft ? 'justify-end' : 'justify-start'}`}>
        <div 
          className="h-full overflow-hidden rounded-[3.5rem] shadow-2xl relative"
          style={{ 
            width: `${widthPercentage}%`,
            transition: 'none' 
          }}
        >
          <div 
            className="absolute h-full"
            style={{ 
              width: '50vw',
              right: isLeft ? 0 : 'auto',
              left: !isLeft ? 0 : 'auto'
            }}
          >
            <img 
              src={`https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=1200&sig=${index + 105}`} 
              className="w-full h-full object-cover"
              alt={feature}
            />
          </div>
        </div>
      </div>

      <div className={`w-full md:w-1/2 space-y-6 reveal px-4 md:px-12`}>
        <div className="space-y-2">
          <span className="text-refenti-gold font-display text-7xl font-light opacity-10 leading-none select-none">
            0{index + 1}
          </span>
          <h3 className="font-display text-4xl md:text-5xl font-light tracking-tight text-refenti-charcoal leading-[1.1]">
            {feature}
          </h3>
        </div>
        <div className="space-y-4 max-w-lg">
          <p className="text-gray-700 font-light leading-relaxed text-lg">
            At Bole High-Rise, {feature.toLowerCase()} is more than an amenity: it is a cornerstone of the resident experience. Every detail reflects our commitment to structural integrity and aesthetic purity.
          </p>
          <div className="flex items-center gap-6">
            <div className="w-12 h-[1px] bg-refenti-gold" />
            <p className="text-refenti-gold font-sans font-bold uppercase tracking-[0.3em] text-[10px]">Standard of Excellence</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const BoleRefenti: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const projectFeatures = [
    "Commercial Space",
    "Premium Hotel",
    "Luxury Apartments",
    "Infinity Pool",
    "32 Stories",
    "Bole Central District",
    "Two-Floor Amenity Deck"
  ];

  return (
    <div className="bg-refenti-offwhite min-h-screen">
      {/* Hero Banner */}
      <section className="relative h-screen w-full flex items-end justify-center bg-refenti-offwhite overflow-hidden pb-32">
        <div 
          className="absolute inset-[-5%]"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1200')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: `translateY(${-scrollY * 0.1}px)`,
            willChange: 'transform'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-refenti-offwhite via-refenti-offwhite/80 to-transparent pointer-events-none" />
        
        <div className="relative z-10 text-center space-y-12 px-4 max-w-6xl mx-auto reveal active">
          <div className="space-y-6">
            <p className="text-refenti-gold font-sans font-bold uppercase tracking-[0.7em] text-[10px] md:text-xs">The Signature Collection</p>
            <h1 className="font-display text-7xl md:text-[10rem] font-light text-refenti-charcoal tracking-tighter leading-none uppercase">Bole High-Rise</h1>
          </div>
        </div>
      </section>

      {/* Action Bar */}
      <section className="relative bg-refenti-offwhite border-b border-gray-200 reveal active">
        <div className="max-w-7xl mx-auto px-8 py-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start reveal">
             <p className="text-refenti-charcoal font-sans font-bold uppercase tracking-[0.2em] text-[10px] opacity-60">Project Inquiry Portal</p>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-2 reveal">
            <button className="bg-refenti-charcoal text-white px-12 py-4 rounded-full font-sans font-bold uppercase tracking-widest text-[10px] hover:bg-refenti-gold transition-all shadow-xl active:scale-95">
              Download Brochure
            </button>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-refenti-gold animate-pulse" />
              <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-refenti-gold">Under Construction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Introductory Section */}
      <section className="pt-24 md:pt-40 pb-16 px-8 md:px-12 bg-refenti-offwhite reveal">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-12 reveal">
            <div className="space-y-8">
              <h2 className="font-display text-4xl md:text-6xl font-light text-refenti-charcoal leading-tight uppercase">
                A Vision of <br/><span className="text-refenti-gold italic">Vertical Luxury</span>
              </h2>
              <p className="text-xl text-gray-800 font-light leading-relaxed max-w-xl">
                Bole High-Rise is a visionary development that seamlessly integrates ultra-luxury residential living with premium commercial facilities. Situated at the apex of the financial district in Addis Ababa, this architectural landmark offers a bespoke lifestyle defined by structural elegance and unparalleled convenience.
              </p>
            </div>
          </div>

          <div className="relative aspect-[4/5] md:aspect-[16/10] overflow-hidden rounded-[4rem] shadow-2xl reveal">
             <img 
               src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200" 
               className="w-full h-full object-cover" 
               alt="Bole High-Rise Architecture" 
             />
             <div className="absolute inset-0 bg-gradient-to-t from-refenti-charcoal/20 to-transparent" />
          </div>
        </div>
      </section>

      {/* Project Features Section */}
      <section className="py-20 px-8 md:px-12 bg-refenti-offwhite reveal">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex items-center gap-6">
            <h2 className="font-display text-4xl md:text-5xl font-light text-refenti-charcoal uppercase">
              Project <span className="text-refenti-gold italic">Features</span>
            </h2>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
          
          <div className="flex flex-wrap gap-4">
            {projectFeatures.map((feature, idx) => (
              <div 
                key={idx} 
                className="bg-white px-10 py-5 rounded-full shadow-sm border border-gray-200 flex items-center justify-center group hover:shadow-md hover:-translate-y-1 transition-all duration-500 cursor-default reveal"
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <span className="text-[11px] font-bold uppercase tracking-widest text-refenti-charcoal group-hover:text-refenti-gold transition-colors">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Features Scroll Section */}
      <section className="bg-refenti-offwhite pb-32">
        <div className="w-full">
          {projectFeatures.map((feature, idx) => (
            <FeatureSection key={feature} feature={feature} index={idx} />
          ))}
        </div>
      </section>

      {/* Discreet Closing Section */}
      <footer className="py-24 px-8 bg-white text-center reveal border-t border-gray-200">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="font-display text-4xl font-light text-refenti-charcoal uppercase leading-none">
            Define Your <span className="text-refenti-gold italic">Legacy</span>
          </h2>
          <p className="text-gray-700 text-base font-light tracking-wide leading-relaxed">
            Limited residential units remaining. Discover a level of exclusivity reserved for the most discerning investors.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default BoleRefenti;
