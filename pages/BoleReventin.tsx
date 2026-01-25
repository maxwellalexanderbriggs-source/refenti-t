
import React, { useState, useEffect, useRef } from 'react';
// Use getProjects() instead of the missing PROJECTS export
import { getProjects } from '../constants';

// Explicitly define as React.FC to include standard props like 'key' in the type check
const FeatureSection: React.FC<{ feature: string; index: number }> = ({ feature, index }) => {
  const [progress, setProgress] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate progress: 0 when top enters bottom, 1 when centered or fully in
      const start = windowHeight;
      const end = windowHeight * 0.2;
      const current = rect.top;
      
      let p = (start - current) / (start - end);
      p = Math.min(Math.max(p, 0), 1);
      setProgress(p);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isLeft = index % 2 === 0;

  return (
    <div 
      ref={sectionRef}
      className={`flex flex-col md:flex-row items-center gap-16 md:gap-24 py-12 ${!isLeft ? 'md:flex-row-reverse' : ''}`}
    >
      {/* Image Container with Scroll Expansion */}
      <div className="w-full md:w-1/2 h-[50vh] md:h-[70vh] relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-gray-100 overflow-hidden"
          style={{
            transform: `scaleX(${progress})`,
            transformOrigin: isLeft ? 'right' : 'left',
            transition: 'transform 0.1s ease-out'
          }}
        >
          <img 
            src={`https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=1200&sig=${index + 50}`} 
            className="w-full h-full object-cover"
            alt={feature}
          />
        </div>
      </div>

      {/* Text Container */}
      <div className="w-full md:w-1/2 px-8 md:px-0 space-y-8 reveal">
        <span className="text-refenti-gold font-display text-8xl font-light opacity-10 leading-none">
          0{index + 1}
        </span>
        <h3 className="font-display text-5xl font-light tracking-tight text-refenti-charcoal">
          {feature}
        </h3>
        <div className="space-y-6 max-w-lg">
          <p className="text-gray-500 font-light leading-relaxed text-lg">
            The {feature.toLowerCase()} at Bole Reventin is a masterpiece of functional luxury. Every square inch has been designed to provide an experience that is both visually stunning and profoundly comfortable.
          </p>
          <p className="text-gray-500 font-light leading-relaxed text-lg italic">
            "Architectural perfection is not just what you see, but how it makes you feel."
          </p>
        </div>
        <div className="w-24 h-[1px] bg-refenti-gold" />
      </div>
    </div>
  );
};

const BoleReventin: React.FC = () => {
  const property = getProjects()[0]; // Bole High-rise

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Image Only */}
      <section className="relative h-[70vh] w-full bg-white overflow-hidden">
        <img 
          src={property.image} 
          className="w-full h-full object-cover opacity-95" 
          alt="Bole Reventin Flagship"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
      </section>

      {/* Page Title & Narrative on White */}
      <section className="py-24 px-8 bg-white reveal">
        <div className="max-w-6xl mx-auto text-center space-y-16">
          <div className="space-y-4">
            <p className="text-refenti-gold font-sans font-bold uppercase tracking-[0.5em] text-[10px]">Flagship Project</p>
            <h1 className="font-display text-7xl md:text-[10rem] font-light text-refenti-charcoal tracking-tighter leading-none uppercase">Bole Reventin</h1>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-12">
            <p className="text-3xl md:text-5xl font-display font-light leading-tight text-refenti-charcoal">
              A high-rise sanctuary that redefines the skyline. {property.description} Experience the pinnacle of Refenti's architectural vision.
            </p>
            
            <div className="flex flex-wrap justify-center gap-16 pt-12">
              {[
                { val: '32', label: 'Floors' },
                { val: '24/7', label: 'Concierge' },
                { val: '180°', label: 'Panoramic' }
              ].map(stat => (
                <div key={stat.label} className="text-center">
                  <p className="text-refenti-gold text-5xl font-display">{stat.val}</p>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-bold mt-3">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features with Scroll Expansion */}
      <section className="bg-white">
        <div className="max-w-[100vw] overflow-x-hidden">
          {/* Fix: Using projectFeatures instead of features to match type definition */}
          {property.projectFeatures?.map((feature, idx) => (
            <FeatureSection key={feature} feature={feature} index={idx} />
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-40 px-8 bg-refenti-offwhite text-center reveal mt-24">
        <div className="max-w-4xl mx-auto space-y-12">
          <h2 className="font-display text-6xl md:text-8xl font-light text-refenti-charcoal uppercase leading-none">
            Secure Your <br/> <span className="text-refenti-gold italic">Legacy</span>
          </h2>
          <p className="text-gray-400 text-xl font-light tracking-wide">
            Units at Bole Reventin are strictly limited to ensure exclusivity and long-term value appreciation.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-8 pt-8">
            <button className="bg-refenti-charcoal text-white px-16 py-6 rounded-2xl font-sans font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-refenti-gold transition-all shadow-2xl">
              Download Dossier
            </button>
            <button className="border border-gray-200 text-refenti-charcoal px-16 py-6 rounded-2xl font-sans font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-white transition-all">
              Book Private Tour
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BoleReventin;
