
import React, { useState, useEffect, useRef } from 'react';

const SECTIONS = [
  { id: 'about-refenti', label: 'Overview' },
  { id: 'stand-for', label: 'What We Stand For' },
  { id: 'governance', label: 'Governance & SVH' },
];

const About: React.FC = () => {
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
          if (rect.top <= 200) {
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
      const offset = 100;
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
      {/* Hero Section */}
      <section className="relative h-[80vh] w-full flex items-end justify-center bg-refenti-offwhite overflow-hidden pb-16 md:pb-32">
        <div 
          className="absolute inset-[-5%]"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: `translateY(${-scrollY * 0.1}px)`,
            willChange: 'transform'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-refenti-offwhite via-refenti-offwhite/80 to-transparent pointer-events-none" />
        
        <div className="relative z-10 text-center space-y-8 md:space-y-12 px-4 max-w-6xl mx-auto reveal active">
          <div className="space-y-4 md:space-y-6">
            <p className="text-refenti-gold font-sans font-bold uppercase tracking-[0.5em] md:tracking-[0.7em] text-[10px] md:text-xs">Refenti Heritage</p>
            <h1 className="font-display text-6xl md:text-8xl lg:text-[9rem] font-light text-refenti-charcoal tracking-tighter leading-none uppercase">Identity</h1>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-12 relative">
        
        {/* Sticky Side Bar */}
        <aside className="hidden md:block w-64 h-fit sticky top-40 z-20 reveal active">
          <div className="space-y-6">
            <p className="text-refenti-gold font-sans font-bold uppercase tracking-[0.3em] text-[9px] mb-8">Navigation</p>
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

        {/* Content Sections */}
        <div className="flex-1 space-y-40 md:space-y-64 pb-40">
          
          {/* Section 1: Overview */}
          <section 
            id="about-refenti"
            ref={el => sectionRefs.current['about-refenti'] = el}
            className="pt-20"
          >
            <div className="grid md:grid-cols-12 gap-12 items-start">
              <div className="md:col-span-7 space-y-12 reveal">
                <div className="space-y-4">
                   <h2 className="font-display text-5xl md:text-7xl font-light text-refenti-charcoal leading-none uppercase">Platform <br/> <span className="text-refenti-gold italic">Overview</span></h2>
                   <div className="w-24 h-px bg-refenti-gold" />
                </div>
                <div className="space-y-8 text-lg md:text-xl font-light leading-relaxed text-gray-700 max-w-2xl">
                  <p className="reveal">
                    Refenti Realty Group (RRG) is a real estate investment and development platform operating under Solstice Ventures Holding (SVH). Established to redefine luxury living and institutional-quality real estate delivery in Addis Ababa, Refenti has earned a reputation for quality execution, reliable delivery, and premium asset standards.
                  </p>
                  <p className="font-display italic text-refenti-charcoal text-2xl md:text-3xl leading-snug reveal">
                    "We develop and operate real estate with a focus on long-term value, combining strong project execution with high standards in post-handover operations."
                  </p>
                  <p className="reveal">
                    Our work spans development, real estate asset management, commercial leasing, tenant experience, and ongoing property performance improvement. We ensure our assets perform as living ecosystems rather than static buildings.
                  </p>
                </div>
              </div>
              <div className="md:col-span-5 md:mt-24 reveal">
                <div className="aspect-[3/4] rounded-[3rem] overflow-hidden shadow-2xl relative border border-gray-100">
                  <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover" alt="Architecture" />
                  <div className="absolute inset-0 bg-refenti-gold/10 mix-blend-multiply" />
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: What We Stand For */}
          <section 
            id="stand-for"
            ref={el => sectionRefs.current['stand-for'] = el}
          >
             <div className="space-y-16">
                <div className="text-center space-y-4">
                  <p className="text-refenti-gold font-sans font-bold uppercase tracking-ultra text-[9px]">Values</p>
                  <h2 className="font-display text-5xl md:text-7xl font-light text-refenti-charcoal uppercase leading-tight">What We <span className="text-refenti-gold italic">Stand For</span></h2>
                </div>
                
                <div className="grid md:grid-cols-2 gap-16">
                  <div className="space-y-6 reveal">
                    <h3 className="font-display text-3xl font-light text-refenti-charcoal uppercase italic">Living Ecosystems</h3>
                    <p className="text-gray-700 font-light leading-relaxed">
                      What sets Refenti apart is our ability to operate beyond construction. We actively manage tenant mix, customer experience, and revenue performance, using modern reporting discipline and partnership-based revenue models to ensure our assets perform as resilient, living ecosystems.
                    </p>
                  </div>
                  <div className="space-y-6 reveal">
                    <h3 className="font-display text-3xl font-light text-refenti-charcoal uppercase italic">Performance Optimization</h3>
                    <p className="text-gray-700 font-light leading-relaxed">
                      We focus on mixed-use, residential, serviced/long-stay assets, and select hospitality-linked real estate. We combine disciplined project governance with design-led quality, prioritizing assets that deliver operational resilience and strong customer experience.
                    </p>
                  </div>
                </div>

                {/* Our Approach Pillar Section */}
                <div className="bg-white p-12 md:p-20 rounded-[4rem] border border-gray-100 shadow-sm reveal">
                  <h3 className="font-display text-3xl font-light text-refenti-charcoal uppercase italic mb-12 text-center">Our <span className="text-refenti-gold">Approach</span></h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-8">
                    {[
                      { title: 'Institutional Discipline', text: 'Institutional-grade delivery discipline and clear governance.' },
                      { title: 'Design-Led Quality', text: 'Premium positioning through superior architectural standards.' },
                      { title: 'Active Operations', text: 'Active leasing, tenant strategy, and customer experience management.' },
                      { title: 'Resilient Assets', text: 'Focus on mixed-use and long-stay assets with strong long-term demand.' },
                      { title: 'Value Creation', text: 'Long-term value through well-managed, operational real estate.' },
                      { title: 'Transparent Performance', text: 'Clear performance tracking and revenue optimization.' }
                    ].map((pillar, i) => (
                      <div key={i} className="space-y-2 group">
                        <p className="text-refenti-gold font-sans font-bold uppercase tracking-widest text-[9px] group-hover:translate-x-1 transition-transform duration-500">{pillar.title}</p>
                        <p className="text-gray-600 text-xs font-light leading-relaxed">{pillar.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
             </div>
          </section>

          {/* Section 3: Governance & SVH */}
          <section 
            id="governance"
            ref={el => sectionRefs.current['governance'] = el}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <div className="lg:col-span-6 order-2 lg:order-1 reveal">
                 <div className="bg-refenti-charcoal p-10 md:p-16 lg:p-20 rounded-[4rem] text-white shadow-2xl relative overflow-hidden h-full min-h-[450px] flex flex-col justify-center">
                    <div className="relative z-10 space-y-10">
                      <div className="space-y-4">
                        <h3 className="font-display text-3xl md:text-4xl lg:text-5xl font-light uppercase leading-tight">
                          Strategic <span className="text-refenti-gold italic">Role</span>
                        </h3>
                        <p className="text-gray-300 font-light leading-relaxed text-base md:text-lg">
                          As part of Solstice Ventures Holding, Refenti operates with disciplined governance and a long-term investment mindset. We structure projects to be sustainable, scalable, and aligned with market demand while protecting brand standards and customer trust.
                        </p>
                      </div>
                      
                      <div className="space-y-6 pt-6 border-t border-white/10">
                         <div className="flex items-center gap-4 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">
                            <span className="w-8 h-px bg-white/40" />
                            Solstice Pillars
                         </div>
                         <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.15em] text-refenti-gold">
                            <li className="flex items-center gap-2"><span className="w-1 h-1 bg-refenti-gold rounded-full" /> Long-term Mindset</li>
                            <li className="flex items-center gap-2"><span className="w-1 h-1 bg-refenti-gold rounded-full" /> Asset Value Protection</li>
                            <li className="flex items-center gap-2"><span className="w-1 h-1 bg-refenti-gold rounded-full" /> Scalable Infrastructure</li>
                            <li className="flex items-center gap-2"><span className="w-1 h-1 bg-refenti-gold rounded-full" /> Holding Governance</li>
                         </ul>
                      </div>
                    </div>
                    <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/5 rounded-full blur-[100px] pointer-events-none" />
                 </div>
              </div>
              <div className="lg:col-span-6 space-y-12 order-1 lg:order-2 reveal">
                <div className="space-y-4">
                  <p className="text-refenti-gold font-sans font-bold uppercase tracking-ultra text-[9px]">Solstice Alignment</p>
                  <h2 className="font-display text-4xl md:text-5xl lg:text-7xl font-light text-refenti-charcoal uppercase leading-[1.1]">Institutional <br/> & <span className="text-refenti-gold italic">Governance</span></h2>
                </div>
                <div className="space-y-8 text-lg md:text-xl font-light leading-relaxed text-gray-700">
                  <p className="reveal">
                    Our governance model is designed to protect stakeholder interests, ensuring that Refenti remains a name synonymous with reliability across the African urban context.
                  </p>
                  <p className="reveal">
                    By operating under the SVH banner, we leverage a framework that prioritizes sustainability and scalability, ensuring every square meter we manage contributes to a higher standard of urban performance.
                  </p>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default About;
