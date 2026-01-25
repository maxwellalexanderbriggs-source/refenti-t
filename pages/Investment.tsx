
import React, { useState, useEffect, useRef } from 'react';

const SECTIONS = [
  { id: 'overview', label: 'Platform Overview' },
  { id: 'activities', label: 'Core Activities' },
  { id: 'model', label: 'Development Model' },
  { id: 'assets', label: 'Asset Classes' },
  { id: 'reach', label: 'Reach & Structures' },
];

const Investment: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState(SECTIONS[0].id);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      let current = SECTIONS[0].id;
      for (const section of SECTIONS) {
        const element = sectionRefs.current[section.id];
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 250) {
            current = section.id;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = sectionRefs.current[id];
    if (element) {
      const offset = 120;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="bg-refenti-offwhite min-h-screen">
      {/* Hero Banner Section */}
      <section className="relative h-[85vh] w-full flex items-end justify-center bg-refenti-offwhite overflow-hidden pb-16 md:pb-32">
        <div 
          className="absolute inset-[-5%]"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1449156001437-37c645d9bc01?auto=format&fit=crop&q=80&w=2000')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: `translateY(${-scrollY * 0.1}px)`,
            willChange: 'transform'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-refenti-offwhite via-refenti-offwhite/70 to-transparent pointer-events-none" />
        
        <div className="relative z-10 text-center space-y-8 md:space-y-12 px-4 max-w-6xl mx-auto reveal active">
          <div className="space-y-4 md:space-y-6">
            <p className="text-refenti-gold font-sans font-bold uppercase tracking-[0.5em] md:tracking-[0.7em] text-[10px] md:text-xs">Institutional Real Estate Platform</p>
            <h1 className="font-display text-6xl md:text-8xl lg:text-[9rem] font-light text-refenti-charcoal tracking-tighter leading-none uppercase">Investment</h1>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-12 relative">
        
        {/* Sticky Side Bar */}
        <aside className="hidden md:block w-64 h-fit sticky top-40 z-20 reveal active">
          <div className="space-y-6">
            <p className="text-refenti-gold font-sans font-bold uppercase tracking-[0.3em] text-[9px] mb-8">Mandate</p>
            <nav className="flex flex-col gap-4">
              {SECTIONS.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`
                    text-left text-[10px] font-bold uppercase tracking-widest transition-all duration-500 flex items-center gap-4 group
                    ${activeSection === section.id ? 'text-refenti-gold' : 'text-gray-500 hover:text-refenti-charcoal'}
                  `}
                >
                  <span className={`h-px bg-current transition-all duration-500 ${activeSection === section.id ? 'w-8' : 'w-4 group-hover:w-8'}`} />
                  {section.label}
                </button>
              ))}
            </nav>
            <div className="pt-12">
               <div className="w-px h-32 bg-gray-200 mx-1" />
            </div>
          </div>
        </aside>

        {/* Content Sections Overhaul */}
        <div className="flex-1 space-y-40 md:space-y-64 pb-40">
          
          {/* Section: Platform Overview & Mandate */}
          <section 
            id="overview"
            ref={el => sectionRefs.current['overview'] = el}
            className="pt-20 space-y-24"
          >
            <div className="space-y-12 reveal">
              <div className="space-y-4">
                <p className="text-refenti-gold font-sans font-bold uppercase tracking-ultra text-[9px]">Platform Identity</p>
                <h2 className="font-display text-5xl md:text-7xl font-light text-refenti-charcoal uppercase leading-tight">About <span className="text-refenti-gold italic">Refenti</span></h2>
              </div>
              <div className="grid md:grid-cols-2 gap-16">
                <div className="space-y-8 text-lg font-light leading-relaxed text-gray-700">
                  <p>
                    Refenti Realty Group is a real estate investment and development platform focused on the creation of high-quality, income-generating and capital-appreciating assets in select growth markets.
                  </p>
                  <p>
                    We operate with a long-term orientation, disciplined capital deployment, and an integrated delivery approach that prioritizes asset performance, governance, and execution certainty.
                  </p>
                </div>
                <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm flex flex-col justify-center space-y-6">
                  <h3 className="font-display text-2xl font-light text-refenti-charcoal uppercase italic">Investment Mandate</h3>
                  <p className="text-gray-600 text-sm font-light leading-relaxed">
                    Refenti’s mandate is to originate, develop, and manage real estate assets that meet institutional standards of quality, risk management, and long-term value creation.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-16 reveal">
              <div className="flex items-center gap-6">
                <h3 className="font-display text-3xl font-light text-refenti-charcoal uppercase">Target <span className="text-refenti-gold italic">Stakeholders</span></h3>
                <div className="flex-1 h-px bg-gray-200" />
              </div>
              <div className="grid sm:grid-cols-3 gap-8">
                {[
                  { title: "Institutional", desc: "Investors, lenders, and strategic capital partners looking for risk-adjusted returns." },
                  { title: "Corporate", desc: "Institutional operators and counterparties requiring premium urban environments." },
                  { title: "Buyers", desc: "Local and international end-buyers seeking high-standard residential and commercial assets." }
                ].map((s, i) => (
                  <div key={i} className="space-y-3">
                    <p className="text-refenti-gold font-sans font-bold uppercase tracking-widest text-[9px]">{s.title}</p>
                    <p className="text-gray-600 text-xs font-light leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Section: Core Activities */}
          <section 
            id="activities"
            ref={el => sectionRefs.current['activities'] = el}
            className="reveal"
          >
            <div className="space-y-16">
              <div className="text-center space-y-4">
                <p className="text-refenti-gold font-sans font-bold uppercase tracking-ultra text-[9px]">Capability</p>
                <h2 className="font-display text-5xl md:text-7xl font-light text-refenti-charcoal uppercase leading-tight">Core <span className="text-refenti-gold italic">Activities</span></h2>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { 
                    title: 'Development & Co-Development', 
                    desc: 'Selective development and joint ventures across prioritized asset classes and locations.',
                    tags: ['Integrated Concept', 'Structuring', 'Execution Certainty']
                  },
                  { 
                    title: 'Asset Management & Operations', 
                    desc: 'Oversight of income-producing assets, including long-stay, mixed-use, and operating real estate.',
                    tags: ['Performance Oversight', 'Active Operations', 'Yield Protection']
                  },
                  { 
                    title: 'Investment Structuring & Capital', 
                    desc: 'Structuring of development and investment vehicles aligned with long-term capital partners and lenders.',
                    tags: ['Governance', 'Capital Partnerships', 'Vehicle Management']
                  }
                ].map((act, i) => (
                  <div key={i} className="bg-white p-12 rounded-[3.5rem] border border-gray-100 shadow-sm flex flex-col space-y-8 hover:shadow-xl transition-all duration-700">
                    <h3 className="font-display text-2xl font-light text-refenti-charcoal leading-none">{act.title}</h3>
                    <p className="text-gray-600 text-sm font-light leading-relaxed flex-1">{act.desc}</p>
                    <div className="flex flex-wrap gap-2">
                       {act.tags.map(t => <span key={t} className="px-3 py-1 bg-refenti-offwhite text-[7px] font-bold uppercase tracking-widest text-refenti-gold rounded-full">{t}</span>)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Section: Development Model */}
          <section 
            id="model"
            ref={el => sectionRefs.current['model'] = el}
            className="space-y-32 reveal"
          >
            <div className="grid md:grid-cols-12 gap-16 items-start">
              <div className="md:col-span-7 space-y-12">
                <div className="space-y-4">
                  <p className="text-refenti-gold font-sans font-bold uppercase tracking-ultra text-[9px]">Operational Framework</p>
                  <h2 className="font-display text-5xl md:text-7xl font-light text-refenti-charcoal uppercase">Integrated <span className="text-refenti-gold italic">Model</span></h2>
                </div>
                <div className="space-y-8 text-lg font-light leading-relaxed text-gray-700">
                  <p>
                    Refenti operates as an integrated development platform, retaining strategic control over concept, structuring, and delivery while selectively outsourcing specialist execution.
                  </p>
                  <p>
                    Core development leadership, design coordination, financial structuring, and asset strategy are managed in-house. Construction execution and specialized services are delivered through vetted engineering, construction, and operating partners under defined performance and risk frameworks.
                  </p>
                  <p className="italic font-display text-xl text-refenti-charcoal">
                    Our delivery model emphasizes phased execution, conservative assumptions, and assets designed for long-term operational resilience.
                  </p>
                </div>
              </div>
              <div className="md:col-span-5 space-y-8 pt-20">
                <div className="bg-refenti-charcoal p-12 rounded-[3rem] text-white space-y-10 shadow-2xl">
                  <h4 className="font-display text-2xl font-light uppercase text-refenti-gold italic">Key Risks Managed</h4>
                  <ul className="space-y-8">
                    {[
                      { label: 'Execution Risk', desc: 'Integrated engineering oversight and phased construction controls.' },
                      { label: 'Financing Risk', desc: 'Conservative structuring and diversified funding sources.' },
                      { label: 'Market Absorption', desc: 'Disciplined positioning and phased release strategies.' }
                    ].map(r => (
                      <li key={r.label} className="space-y-1">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-white">{r.label}</p>
                        <p className="text-[11px] text-white/60 font-light leading-relaxed">{r.desc}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white p-12 md:p-24 rounded-[4rem] border border-gray-100 shadow-sm space-y-16">
              <div className="text-center space-y-4">
                <h3 className="font-display text-4xl font-light text-refenti-charcoal uppercase italic">Quality & <span className="text-refenti-gold">Delivery Commitments</span></h3>
                <p className="text-gray-400 text-sm font-light uppercase tracking-widest">Public Standards of Practice</p>
              </div>
              <div className="grid md:grid-cols-2 gap-x-20 gap-y-10">
                 {[
                   'Institutional-grade governance and transparency',
                   'Disciplined capital and cost management',
                   'High design and construction standards',
                   'Reliable delivery timelines supported by phased execution',
                   'Assets designed for long-term operational performance'
                 ].map((c, i) => (
                   <div key={i} className="flex gap-6 items-start">
                     <span className="text-refenti-gold font-display text-4xl leading-none">0{i+1}</span>
                     <p className="text-refenti-charcoal text-base md:text-lg font-light leading-tight">{c}</p>
                   </div>
                 ))}
              </div>
            </div>
          </section>

          {/* Section: Asset Classes */}
          <section 
            id="assets"
            ref={el => sectionRefs.current['assets'] = el}
            className="space-y-24 reveal"
          >
            <div className="flex flex-col md:flex-row justify-between items-end gap-8 border-b border-gray-100 pb-12">
              <div className="space-y-4">
                <p className="text-refenti-gold font-sans font-bold uppercase tracking-ultra text-[9px]">Investment Universe</p>
                <h2 className="font-display text-5xl md:text-7xl font-light text-refenti-charcoal uppercase">Asset <span className="text-refenti-gold italic">Classes</span></h2>
              </div>
              <div className="max-w-md text-gray-800 font-light text-base leading-relaxed text-right">
                Focusing on real estate asset classes with durable demand fundamentals and long-term income potential.
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-16">
               <div className="space-y-10">
                  <div className="flex items-center gap-4">
                    <span className="w-12 h-px bg-gray-200" />
                    <h3 className="font-sans font-bold text-[10px] uppercase tracking-ultra text-gray-400">In Scope</h3>
                  </div>
                  <ul className="grid grid-cols-1 gap-6">
                    {['Residential', 'Serviced apartments and long-stay assets', 'Mixed-use developments', 'Commercial assets', 'Hospitality-linked real estate (selective)'].map(item => (
                      <li key={item} className="flex items-center gap-4 group">
                        <div className="w-1.5 h-1.5 rounded-full bg-refenti-gold group-hover:scale-150 transition-transform duration-500" />
                        <span className="text-lg md:text-xl font-light text-refenti-charcoal">{item}</span>
                      </li>
                    ))}
                  </ul>
               </div>
               
               <div className="bg-white p-12 rounded-[4rem] border border-refenti-gold/20 shadow-xl space-y-10 relative overflow-hidden">
                  <div className="relative z-10 space-y-10">
                    <div className="flex items-center gap-4">
                      <span className="w-12 h-px bg-refenti-gold/40" />
                      <h3 className="font-sans font-bold text-[10px] uppercase tracking-ultra text-refenti-gold">Priority Focus</h3>
                    </div>
                    <div className="space-y-8">
                       {[
                         { title: 'Mixed-use', desc: 'Integrated lifestyle and commerce hubs.' },
                         { title: 'Serviced Apartments', desc: 'Managed long-stay residential solutions.' },
                         { title: 'Prime Residential', desc: 'Premium assets for global citizens.' }
                       ].map(p => (
                         <div key={p.title} className="space-y-1">
                           <h4 className="font-display text-4xl font-light text-refenti-charcoal">{p.title}</h4>
                           <p className="text-gray-500 text-xs font-light uppercase tracking-widest">{p.desc}</p>
                         </div>
                       ))}
                    </div>
                  </div>
                  <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-refenti-gold/5 rounded-full blur-[100px] pointer-events-none" />
               </div>
            </div>
          </section>

          {/* Section: Reach & Structures */}
          <section 
            id="reach"
            ref={el => sectionRefs.current['reach'] = el}
            className="space-y-24 reveal"
          >
            <div className="grid md:grid-cols-2 gap-16 items-start">
               <div className="space-y-12">
                  <div className="space-y-4">
                    <p className="text-refenti-gold font-sans font-bold uppercase tracking-ultra text-[9px]">Platform Presence</p>
                    <h2 className="font-display text-5xl md:text-7xl font-light text-refenti-charcoal uppercase leading-none">Geographic <br/> <span className="text-refenti-gold italic">Focus</span></h2>
                  </div>
                  <div className="space-y-10">
                     <div className="space-y-3 group">
                        <h4 className="font-display text-3xl font-light text-refenti-charcoal flex items-center gap-4">
                           Ethiopia <span className="h-px bg-refenti-gold w-12 group-hover:w-20 transition-all duration-700" />
                        </h4>
                        <p className="text-gray-600 text-sm font-light uppercase tracking-widest">Core and immediate market</p>
                     </div>
                     <div className="space-y-3 group">
                        <h4 className="font-display text-3xl font-light text-refenti-charcoal flex items-center gap-4">
                           UAE (Dubai) <span className="h-px bg-refenti-gold w-12 group-hover:w-20 transition-all duration-700" />
                        </h4>
                        <p className="text-gray-600 text-sm font-light uppercase tracking-widest">Near-term expansion, capital linkage, and platform development</p>
                     </div>
                  </div>
               </div>

               <div className="bg-refenti-charcoal p-12 md:p-20 rounded-[4rem] text-white space-y-12 shadow-2xl">
                  <h3 className="font-display text-3xl font-light uppercase italic text-refenti-gold">Deal Structures</h3>
                  <div className="space-y-10">
                     {[
                       { title: 'Joint Ventures', desc: 'Co-development partnerships with aligned strategic interests.' },
                       { title: 'Own-Balance-Sheet', desc: 'Proprietary development projects fully managed by the platform.' },
                       { title: 'EPC+F Models', desc: 'Structured delivery models with aligned contractors and financiers.' }
                     ].map(ds => (
                       <div key={ds.title} className="space-y-2">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-white">{ds.title}</p>
                          <p className="text-white/60 font-light leading-relaxed text-xs">{ds.desc}</p>
                       </div>
                     ))}
                  </div>
                  <div className="pt-8 border-t border-white/10">
                     <p className="text-[9px] font-bold uppercase tracking-ultra text-white/40">Structured for Resilience</p>
                  </div>
               </div>
            </div>

            <div className="text-center py-20 reveal">
               <div className="max-w-2xl mx-auto space-y-8">
                  <h3 className="font-display text-4xl font-light text-refenti-charcoal uppercase leading-tight">Engage with <span className="text-refenti-gold italic">Refenti Capital</span></h3>
                  <p className="text-gray-600 font-light leading-relaxed">
                     For institutional investment inquiries and partnership dossiers, please contact our strategic capital team.
                  </p>
                  <div className="flex justify-center">
                    <button className="bg-refenti-charcoal text-white px-16 py-6 rounded-2xl font-sans font-bold uppercase tracking-ultra text-[11px] hover:bg-refenti-gold transition-all shadow-2xl active:scale-95">
                       Request Investor Dossier
                    </button>
                  </div>
               </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default Investment;
