
import React, { useState, useEffect, useRef } from 'react';

const SECTIONS = [
  { id: 'about', label: 'About Refenti' },
  { id: 'mandate', label: 'Investment Mandate' },
  { id: 'activities', label: 'Core Activities' },
  { id: 'model', label: 'Development Model' },
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
          if (rect.top <= 250) current = section.id;
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
      window.scrollTo({
        top: element.getBoundingClientRect().top + window.pageYOffset - 120,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="bg-refenti-offwhite min-h-screen">
      {/* Hero */}
      <section className="relative h-[80vh] w-full flex items-end justify-center bg-refenti-offwhite overflow-hidden pb-16 md:pb-32">
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
        <div className="absolute inset-0 bg-gradient-to-t from-refenti-offwhite via-refenti-offwhite/80 to-transparent pointer-events-none" />
        <div className="relative z-10 text-center space-y-6 px-4 max-w-6xl mx-auto reveal active">
          <p className="text-refenti-gold font-sans font-bold uppercase tracking-[0.5em] text-[10px]">Institutional Strategy</p>
          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-light text-refenti-charcoal tracking-tighter leading-none uppercase">Investment</h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-12 relative">
        <aside className="hidden md:block w-64 h-fit sticky top-40 z-20 reveal active">
          <div className="space-y-6">
            <p className="text-refenti-gold font-sans font-bold uppercase tracking-[0.3em] text-[9px] mb-8">Framework</p>
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
          </div>
        </aside>

        <div className="flex-1 space-y-40 md:space-y-64 pb-40">
          {/* About Refenti */}
          <section id="about" ref={el => sectionRefs.current['about'] = el} className="pt-20 space-y-12 reveal">
            <div className="space-y-4">
              <p className="text-refenti-gold font-sans font-bold uppercase tracking-ultra text-[9px]">Identity</p>
              <h2 className="font-display text-5xl md:text-7xl font-light text-refenti-charcoal uppercase leading-tight">About <span className="text-refenti-gold italic">Refenti</span></h2>
            </div>
            <div className="grid md:grid-cols-2 gap-16 text-lg font-light leading-relaxed text-gray-700">
              <p>
                Refenti Realty Group is a real estate investment and development platform focused on the creation of high-quality, income-generating and capital-appreciating assets in select growth markets.
              </p>
              <p>
                We operate with a long-term orientation, disciplined capital deployment, and an integrated delivery approach that prioritizes asset performance, governance, and execution certainty.
              </p>
            </div>
          </section>

          {/* Mandate */}
          <section id="mandate" ref={el => sectionRefs.current['mandate'] = el} className="reveal">
            <div className="bg-refenti-charcoal p-12 md:p-24 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
              <div className="relative z-10 space-y-12">
                <div className="space-y-4">
                  <p className="text-refenti-gold font-sans font-bold uppercase tracking-ultra text-[9px]">The Directive</p>
                  <h2 className="font-display text-4xl md:text-6xl font-light uppercase leading-none">Investment & <span className="text-refenti-gold italic">Development Mandate</span></h2>
                </div>
                <p className="text-xl md:text-2xl font-light text-gray-300 leading-relaxed max-w-4xl">
                  Refenti’s mandate is to originate, develop, and manage real estate assets that meet institutional standards of quality, risk management, and long-term value creation.
                </p>
                <div className="grid sm:grid-cols-3 gap-12 pt-8 border-t border-white/10">
                  {[
                    { title: "Institutional", desc: "Institutional investors, lenders, and strategic capital partners." },
                    { title: "Corporate", desc: "Corporate and institutional operators and counterparties." },
                    { title: "Global Buyers", desc: "Local and international end-buyers for select assets." }
                  ].map((s, i) => (
                    <div key={i} className="space-y-3">
                      <p className="text-refenti-gold font-sans font-bold uppercase tracking-widest text-[9px]">{s.title}</p>
                      <p className="text-white/60 text-xs font-light leading-relaxed">{s.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Activities */}
          <section id="activities" ref={el => sectionRefs.current['activities'] = el} className="reveal space-y-16">
            <div className="text-center space-y-4">
              <p className="text-refenti-gold font-sans font-bold uppercase tracking-ultra text-[9px]">Scope of Operations</p>
              <h2 className="font-display text-5xl md:text-7xl font-light text-refenti-charcoal uppercase leading-tight">Core <span className="text-refenti-gold italic">Activities</span></h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: 'Development & Co-Development', desc: 'Selective development and joint ventures across prioritized asset classes and locations.' },
                { title: 'Asset Management & Operations', desc: 'Oversight of income-producing assets, including long-stay, mixed-use, and operating real estate.' },
                { title: 'Investment Structuring', desc: 'Structuring of development and investment vehicles aligned with long-term capital partners and lenders.' }
              ].map((act, i) => (
                <div key={i} className="bg-white p-12 rounded-[3.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-700 flex flex-col space-y-6">
                  <div className="w-10 h-10 rounded-full bg-refenti-gold/10 flex items-center justify-center text-refenti-gold font-display text-xl">0{i+1}</div>
                  <h3 className="font-display text-2xl font-light text-refenti-charcoal leading-snug">{act.title}</h3>
                  <p className="text-gray-600 text-sm font-light leading-relaxed">{act.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Model */}
          <section id="model" ref={el => sectionRefs.current['model'] = el} className="space-y-32 reveal">
            <div className="grid md:grid-cols-2 gap-16 items-start">
              <div className="space-y-12">
                <div className="space-y-4">
                  <p className="text-refenti-gold font-sans font-bold uppercase tracking-ultra text-[9px]">Execution</p>
                  <h2 className="font-display text-5xl md:text-7xl font-light text-refenti-charcoal uppercase leading-none">Development <span className="text-refenti-gold italic">Model</span></h2>
                </div>
                <div className="space-y-6 text-gray-700 font-light leading-relaxed">
                  <p>
                    Refenti operates as an integrated development platform, retaining strategic control over concept, structuring, and delivery while selectively outsourcing specialist execution.
                  </p>
                  <p>
                    Core development leadership, design coordination, financial structuring, and asset strategy are managed in-house. Construction execution and specialized services are delivered through vetted engineering, construction, and operating partners under defined performance and risk frameworks.
                  </p>
                  <p className="text-refenti-charcoal font-medium italic">
                    Our delivery model emphasizes phased execution, conservative assumptions, and assets designed for long-term operational resilience.
                  </p>
                </div>
              </div>
              <div className="bg-white p-12 rounded-[4rem] shadow-sm border border-gray-100 space-y-10">
                <h4 className="font-display text-2xl font-light uppercase text-refenti-gold italic">Key Risks Managed</h4>
                <ul className="space-y-8">
                  {[
                    { l: 'Execution Risk', d: 'Managed through integrated engineering oversight, experienced delivery partners, and phased construction controls.' },
                    { l: 'Financing Risk', d: 'Mitigated through conservative structuring, diversified funding sources, and alignment between capital and delivery timelines.' },
                    { l: 'Market Absorption', d: 'Addressed through disciplined product positioning, phased release strategies, and focus on demand-driven asset classes.' }
                  ].map(r => (
                    <li key={r.l} className="space-y-1">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-refenti-charcoal">{r.l}</p>
                      <p className="text-xs text-gray-500 leading-relaxed">{r.d}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-white p-12 md:p-24 rounded-[4rem] border border-gray-100 shadow-sm space-y-16">
              <div className="text-center space-y-2">
                <h3 className="font-display text-4xl font-light text-refenti-charcoal uppercase">Quality & <span className="text-refenti-gold italic">Delivery Commitments</span></h3>
                <div className="w-24 h-px bg-refenti-gold mx-auto mt-6" />
              </div>
              <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
                {[
                  'Institutional-grade governance and transparency',
                  'Disciplined capital and cost management',
                  'High design and construction standards',
                  'Reliable delivery timelines supported by phased execution',
                  'Assets designed for long-term operational performance'
                ].map((c, i) => (
                  <div key={i} className="flex gap-4 items-start group">
                    <span className="text-refenti-gold font-display text-2xl">✓</span>
                    <p className="text-gray-700 text-base font-light">{c}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Reach */}
          <section id="reach" ref={el => sectionRefs.current['reach'] = el} className="space-y-24 reveal">
            <div className="grid md:grid-cols-2 gap-16">
              <div className="space-y-12">
                <div className="space-y-4">
                  <p className="text-refenti-gold font-sans font-bold uppercase tracking-ultra text-[9px]">Asset Selection</p>
                  <h2 className="font-display text-5xl md:text-7xl font-light text-refenti-charcoal uppercase leading-none">Asset <span className="text-refenti-gold italic">Classes</span></h2>
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">In Scope</p>
                    <ul className="text-sm space-y-3 font-light text-gray-700">
                      <li>Residential</li>
                      <li>Serviced Apartments</li>
                      <li>Mixed-use</li>
                      <li>Commercial</li>
                      <li>Hospitality (Selective)</li>
                    </ul>
                  </div>
                  <div className="space-y-6">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-refenti-gold">Priority Focus</p>
                    <ul className="text-sm space-y-3 font-bold text-refenti-charcoal">
                      <li>Mixed-use Developments</li>
                      <li>Serviced Apartments</li>
                      <li>Prime Residential</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="space-y-12">
                <div className="space-y-4">
                  <p className="text-refenti-gold font-sans font-bold uppercase tracking-ultra text-[9px]">Geographic Focus</p>
                  <h2 className="font-display text-5xl md:text-7xl font-light text-refenti-charcoal uppercase leading-none">Global <span className="text-refenti-gold italic">Reach</span></h2>
                </div>
                <div className="space-y-8">
                  <div className="group">
                    <p className="font-display text-3xl text-refenti-charcoal group-hover:text-refenti-gold transition-colors">Ethiopia</p>
                    <p className="text-xs font-light text-gray-500 uppercase tracking-widest">Core and immediate market</p>
                  </div>
                  <div className="group">
                    <p className="font-display text-3xl text-refenti-charcoal group-hover:text-refenti-gold transition-colors">UAE (Dubai)</p>
                    <p className="text-xs font-light text-gray-500 uppercase tracking-widest">Near-term expansion, capital linkage, and platform development</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-refenti-offwhite p-12 md:p-20 rounded-[4rem] border border-gray-200 reveal space-y-12">
              <h3 className="font-display text-3xl font-light uppercase text-center">Deal <span className="text-refenti-gold italic">Structures</span></h3>
              <div className="grid md:grid-cols-3 gap-12">
                {[
                  { t: 'Joint Ventures', d: 'Joint ventures and co-development partnerships tailored to project context.' },
                  { t: 'Balance Sheet', d: 'Own-balance-sheet development aligned with long-term oriented capital.' },
                  { t: 'EPC+F Models', d: 'Structured delivery models with aligned contractors and financiers.' }
                ].map(ds => (
                  <div key={ds.t} className="space-y-3">
                    <p className="text-[9px] font-bold uppercase tracking-widest text-refenti-gold">{ds.t}</p>
                    <p className="text-xs font-light leading-relaxed text-gray-600">{ds.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Investment;
