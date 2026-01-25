
import React from 'react';
// Use getProjects() instead of the missing PROJECTS export
import { getProjects } from '../constants';

const BoleProperty: React.FC = () => {
  const property = getProjects()[0];

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative h-[85vh] w-full bg-white overflow-hidden">
        <img src={property.image} className="w-full h-full object-cover opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
        <div className="absolute bottom-24 left-8 md:left-24 max-w-4xl space-y-6">
          <p className="text-refenti-gold font-sans font-bold uppercase tracking-[0.5em] text-[10px]">Exclusively Listed</p>
          <h1 className="font-display text-7xl md:text-9xl font-light text-refenti-charcoal tracking-tight leading-none">{property.name}</h1>
        </div>
      </section>

      {/* Narrative */}
      <section className="py-40 px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center space-y-16">
          <p className="text-3xl md:text-5xl font-display font-light leading-tight text-refenti-charcoal">
            {property.description} A definitive <span className="text-refenti-gold italic">statement of intent</span> within Addis Ababa’s golden mile.
          </p>
          <div className="flex flex-wrap justify-center gap-16 pt-12">
            {[
              { val: '2025', label: 'Completion' },
              { val: 'Concierge', label: 'Service' },
              { val: 'LEED', label: 'Standards' }
            ].map(stat => (
              <div key={stat.label} className="text-center">
                <p className="text-refenti-gold text-4xl font-display">{stat.val}</p>
                <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-bold mt-3">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-40 px-8 bg-refenti-offwhite rounded-[6rem] mx-4 border border-gray-100">
        <div className="max-w-7xl mx-auto space-y-60">
          {/* Fix: Using projectFeatures instead of features to match type definition */}
          {property.projectFeatures?.map((feature, idx) => (
            <div 
              key={feature}
              className={`flex flex-col md:flex-row items-center gap-24 ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
            >
              <div className="w-full md:w-3/5 overflow-hidden rounded-[3rem] shadow-2xl bg-white p-4 border border-gray-50">
                <img 
                  src={`https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=1200&sig=${idx}`} 
                  className="w-full h-full object-cover rounded-[2.5rem]" 
                  alt={feature}
                />
              </div>
              <div className="w-full md:w-2/5 space-y-8">
                <span className="text-refenti-gold font-display text-8xl font-light opacity-10 leading-none">0{idx + 1}</span>
                <h3 className="font-display text-5xl font-light tracking-tight text-refenti-charcoal">{feature}</h3>
                <p className="text-gray-500 font-light leading-loose text-lg">
                  Designed for the discerning resident. Every architectural element in the {property.name} represents a fusion of utility and aesthetic purity.
                </p>
                <div className="w-24 h-[1px] bg-refenti-gold" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40 px-8 bg-white text-center">
        <div className="max-w-4xl mx-auto space-y-16">
          <div className="space-y-4">
            <h2 className="font-display text-6xl md:text-8xl font-light tracking-tight text-refenti-charcoal uppercase">Elevate Your <br/><span className="text-refenti-gold italic">Standard</span></h2>
            <p className="text-gray-400 font-light text-xl">
              Private tours and investment dossiers are available upon request for verified inquiries.
            </p>
          </div>
          <div className="flex flex-col md:flex-row justify-center gap-8">
            <button className="bg-refenti-charcoal text-white px-14 py-5 rounded-xl font-sans font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-refenti-gold transition-all shadow-xl">
              Request Dossier
            </button>
            <a 
              href="https://wa.me/251986198686"
              className="border border-gray-200 text-refenti-charcoal rounded-xl px-14 py-5 font-sans font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-refenti-offwhite transition-all"
            >
              WhatsApp Advisor
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BoleProperty;
