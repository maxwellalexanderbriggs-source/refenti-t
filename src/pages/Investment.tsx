import { useEffect, useRef, useState } from "react"

const SECTIONS = [
  { id: "about", label: "Who We Are" },
  { id: "mandate", label: "Our Outlook" },
  { id: "activities", label: "Core Expertise" },
  { id: "model", label: "The Approach" },
  { id: "reach", label: "Presence" },
]

function Investment() {
  const [scrollY, setScrollY] = useState(0)
  const [activeSection, setActiveSection] = useState(SECTIONS[0].id)
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({})

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      let current = SECTIONS[0].id
      for (const section of SECTIONS) {
        const element = sectionRefs.current[section.id]
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 300) current = section.id
        }
      }
      setActiveSection(current)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = sectionRefs.current[id]
    if (element) {
      window.scrollTo({
        top: element.getBoundingClientRect().top + window.pageYOffset - 120,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="min-h-screen bg-refenti-offwhite">
      {/* Hero Section */}
      <section className="relative flex min-h-[70vh] w-full items-end justify-center overflow-hidden bg-refenti-offwhite pb-16 md:min-h-[90vh] md:pb-32">
        <div
          className="absolute inset-[-5%]"
          style={{
            backgroundImage: `url('/investment/investment-hero.webp')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: `translateY(${-scrollY * 0.12}px)`,
            willChange: "transform",
          }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-refenti-offwhite via-refenti-offwhite/80 to-transparent" />
        <div className="relative z-10 mx-auto max-w-6xl space-y-6 px-4 text-center md:space-y-14">
          <div className="space-y-3 md:space-y-6">
            <h1 className="font-display text-6xl leading-none font-light tracking-tighter text-refenti-charcoal uppercase md:text-[10rem]">
              Investment
            </h1>
            <p className="font-sans text-[9px] font-bold tracking-[0.4em] text-refenti-gold uppercase md:text-xs md:tracking-[0.6em]">
              Precision in Real Estate
            </p>
          </div>
        </div>
      </section>

      <div className="relative mx-auto flex max-w-7xl flex-col gap-12 px-4 sm:px-6 md:flex-row md:px-12 lg:gap-24">
        {/* Navigation Sidebar - Hidden on mobile/tablet for better UX */}
        <aside className="sticky top-48 z-20 hidden h-fit w-64 lg:block xl:w-72">
          <div className="space-y-8">
            <p className="border-b border-gray-100 pb-4 font-sans text-[10px] font-bold tracking-[0.4em] text-refenti-gold uppercase">
              Strategy
            </p>
            <nav className="flex flex-col gap-6">
              {SECTIONS.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`group flex items-center gap-6 text-left text-[11px] font-bold tracking-widest uppercase transition-all duration-700 ${activeSection === section.id ? "text-refenti-gold" : "text-gray-400 hover:text-refenti-charcoal"} `}
                >
                  <span
                    className={`h-px bg-current transition-all duration-700 ${activeSection === section.id ? "w-12" : "w-6 group-hover:w-12"}`}
                  />
                  {section.label}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        <div className="flex-1 space-y-24 pb-32 md:space-y-48 md:pb-64 lg:space-y-72">
          {/* Section: Who We Are */}
          <section
            id="about"
            ref={(el) => {
              sectionRefs.current["about"] = el
            }}
            className="space-y-12 pt-12 md:space-y-16 md:pt-40"
          >
            <div className="space-y-4 md:space-y-6">
              <p className="font-sans text-[9px] font-bold tracking-ultra text-refenti-gold uppercase md:text-[10px]">
                A Foundation of Trust
              </p>
              <h2 className="font-display text-4xl leading-none font-light text-refenti-charcoal uppercase sm:text-6xl md:text-8xl">
                The <span className="text-refenti-gold italic">Group</span>
              </h2>
            </div>
            <div className="grid gap-10 text-lg leading-relaxed font-light text-gray-700 md:grid-cols-2 md:gap-16 md:text-xl">
              <div className="space-y-6 md:space-y-8">
                <p className="text-justify">
                  Refenti Realty Group identifies and realizes the potential of
                  urban landscapes. We build with a long-term mindset that
                  values execution above all.
                </p>
                <div className="aspect-square overflow-hidden rounded-[2rem] shadow-2xl md:rounded-[3rem]">
                  <img
                    src="/investment/investment-decor-1.webp"
                    className="h-full w-full object-cover"
                    alt="High-Rise Vision"
                  />
                </div>
              </div>
              <div className="space-y-6 md:space-y-8 md:pt-24">
                <div className="mb-6 aspect-[4/5] overflow-hidden rounded-[2rem] shadow-2xl md:mb-8 md:rounded-[3rem]">
                  <img
                    src="/investment/investment-decor-2.webp"
                    className="h-full w-full object-cover"
                    alt="Urban Landscape"
                  />
                </div>
                <p className="text-justify">
                  We focus on high-quality assets in markets primed for growth,
                  ensuring every project is an engine for long-term performance.
                </p>
              </div>
            </div>
          </section>

          {/* Section: Our Outlook */}
          <section
            id="mandate"
            ref={(el) => {
              sectionRefs.current["mandate"] = el
            }}
            className=""
          >
            <div className="relative overflow-hidden rounded-[2.5rem] bg-refenti-charcoal p-8 text-white shadow-2xl md:rounded-[4rem] md:p-16 lg:p-24">
              <div className="relative z-10 space-y-12 md:space-y-16">
                <div className="space-y-4 md:space-y-6">
                  <p className="font-sans text-[9px] font-bold tracking-ultra text-refenti-gold uppercase md:text-[10px]">
                    Strategic Horizon
                  </p>
                  <h2 className="font-display text-4xl leading-none font-light uppercase sm:text-5xl md:text-7xl">
                    A Clear{" "}
                    <span className="text-refenti-gold italic">Outlook</span>
                  </h2>
                </div>
                <div className="grid items-center gap-10">
                  <p className="text-justify text-xl leading-tight font-light text-gray-300 md:text-3xl lg:text-4xl">
                    We create developments that stand as benchmarks for quality,
                    offering immediate impact and enduring value.
                  </p>
                  <div className="aspect-video overflow-hidden rounded-[1.5rem] border border-white/10 shadow-xl md:rounded-[2.5rem]">
                    <img
                      src="/investment/clear-outlook.webp"
                      className="h-full w-full object-cover opacity-80"
                      alt="Building Structure"
                    />
                  </div>
                </div>
                <div className="grid gap-10 border-t border-white/10 pt-10 sm:grid-cols-2 md:pt-16 lg:grid-cols-3 lg:gap-16">
                  {[
                    {
                      title: "Direct Capital",
                      desc: "Collaborating with partners who share our commitment to long-term quality.",
                    },
                    {
                      title: "Design Partners",
                      desc: "Working with the best architectural and technical minds in the industry.",
                    },
                    {
                      title: "Verified Assets",
                      desc: "Every project is developed with a focus on high-demand urban classes.",
                    },
                  ].map((s, i) => (
                    <div key={i} className="space-y-4 md:space-y-6">
                      <p className="font-sans text-[9px] font-bold tracking-widest text-refenti-gold uppercase md:text-[10px]">
                        {s.title}
                      </p>
                      <p className="text-justify text-sm leading-relaxed font-light text-white/60">
                        {s.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Section: Core Expertise */}
          <section
            id="activities"
            ref={(el) => {
              sectionRefs.current["activities"] = el
            }}
            className="space-y-12 md:space-y-24"
          >
            <div className="space-y-4 text-center md:space-y-6">
              <p className="font-sans text-[9px] font-bold tracking-ultra text-refenti-gold uppercase md:text-[10px]">
                Expertise
              </p>
              <h2 className="font-display text-4xl leading-none font-light text-refenti-charcoal uppercase sm:text-6xl md:text-8xl">
                Our <span className="text-refenti-gold italic">Craft</span>
              </h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 md:gap-10">
              {[
                {
                  title: "Development",
                  image: "/investment/development.webp",
                  desc: "Developing landmarks that integrate perfectly with their urban surroundings.",
                },
                {
                  title: "Management",
                  image: "/investment/management.webp",
                  desc: "Ensuring that every project we deliver remains a top-tier asset for years to come.",
                },
                {
                  title: "Vision",
                  image: "/investment/vision.webp",
                  desc: "Identifying the next great urban node and building its infrastructure.",
                },
              ].map((act, i) => (
                <div
                  key={i}
                  className="group overflow-hidden rounded-[2rem] border border-gray-100 bg-white shadow-sm transition-all duration-1000 hover:shadow-2xl md:rounded-[3rem]"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={act.image}
                      className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      alt={act.title}
                    />
                  </div>
                  <div className="space-y-4 p-8 md:space-y-6 md:p-10">
                    <h3 className="font-display text-2xl leading-none font-light text-refenti-charcoal md:text-3xl">
                      {act.title}
                    </h3>
                    <p className="text-justify text-sm leading-relaxed font-light text-gray-500 md:text-base">
                      {act.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section: The Approach */}
          <section
            id="model"
            ref={(el) => {
              sectionRefs.current["model"] = el
            }}
            className="space-y-16 md:space-y-32"
          >
            <div className="space-y-8 md:space-y-12">
              <div className="space-y-4 md:space-y-6">
                <p className="font-sans text-[9px] font-bold tracking-ultra text-refenti-gold uppercase md:text-[10px]">
                  Execution
                </p>
                <h2 className="font-display text-4xl leading-none font-light text-refenti-charcoal uppercase sm:text-6xl md:text-8xl">
                  The <span className="text-refenti-gold italic">Approach</span>
                </h2>
              </div>
              <div className="grid items-start gap-12 md:grid-cols-2 md:gap-24">
                <div className="space-y-6 text-lg leading-relaxed font-light text-gray-700 md:space-y-8 md:text-xl">
                  <p className="text-justify">
                    We operate with control over the vision and strategy of
                    every project. By leading the coordination in-house, we
                    ensure quality is never lost in translation.
                  </p>
                  <div className="h-px w-16 bg-refenti-gold/40 md:w-24" />
                  <p className="font-display text-xl font-medium text-refenti-charcoal italic md:text-2xl">
                    "Precision is non-negotiable. We build for performance."
                  </p>
                </div>
                <div className="relative">
                  <div className="relative z-10 aspect-[4/5] overflow-hidden rounded-[2.5rem] shadow-2xl md:rounded-[4rem]">
                    <img
                      src="/investment/investment-decor-3.webp"
                      className="h-full w-full object-cover"
                      alt="Focused Design"
                    />
                  </div>
                  <div className="absolute -right-10 -bottom-10 -z-10 hidden h-full w-full rounded-[4rem] border-2 border-refenti-gold/20 md:block" />
                </div>
              </div>
            </div>
          </section>

          {/* Section: Presence */}
          <section
            id="reach"
            ref={(el) => {
              sectionRefs.current["reach"] = el
            }}
            className="space-y-16 pb-24 md:space-y-32"
          >
            <div className="grid gap-12 md:grid-cols-2 md:gap-24">
              <div className="space-y-8 md:space-y-12">
                <div className="space-y-4 md:space-y-6">
                  <p className="font-sans text-[9px] font-bold tracking-ultra text-refenti-gold uppercase md:text-[10px]">
                    Footprint
                  </p>
                  <h2 className="font-display text-4xl leading-none font-light text-refenti-charcoal uppercase sm:text-6xl md:text-8xl">
                    Global{" "}
                    <span className="text-refenti-gold italic">Reach</span>
                  </h2>
                </div>
                <div className="grid grid-cols-2 gap-8 md:gap-12">
                  <div className="space-y-6 md:space-y-8">
                    <p className="border-b border-gray-100 pb-2 text-[10px] font-bold tracking-widest text-gray-400 uppercase md:text-[11px]">
                      Portfolio
                    </p>
                    <ul className="space-y-3 text-base font-light text-gray-700 md:space-y-4 md:text-lg">
                      <li>Boutique Living</li>
                      <li>Mixed-Use Hubs</li>
                      <li>Workspaces</li>
                      <li>Hotel Suites</li>
                    </ul>
                  </div>
                  <div className="space-y-6 md:space-y-8">
                    <p className="border-b border-refenti-gold/20 pb-2 text-[10px] font-bold tracking-widest text-refenti-gold uppercase md:text-[11px]">
                      Focus
                    </p>
                    <ul className="space-y-3 text-base font-bold text-refenti-charcoal md:space-y-4 md:text-lg">
                      <li>Urban Nodes</li>
                      <li>Modern Living</li>
                      <li>Landmark Assets</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="space-y-12 md:space-y-16">
                <div className="space-y-6 md:space-y-8">
                  <div className="group">
                    <p className="font-display text-3xl text-refenti-charcoal transition-colors duration-500 group-hover:text-refenti-gold md:text-4xl">
                      Ethiopia
                    </p>
                    <p className="mt-2 text-[10px] font-bold tracking-widest text-gray-400 uppercase md:text-xs">
                      Core Hub
                    </p>
                  </div>
                  <div className="group">
                    <p className="font-display text-3xl text-refenti-charcoal transition-colors duration-500 group-hover:text-refenti-gold md:text-4xl">
                      Dubai, UAE
                    </p>
                    <p className="mt-2 text-[10px] font-bold tracking-widest text-gray-400 uppercase md:text-xs">
                      Expansion & Connection
                    </p>
                  </div>
                </div>
                <div className="aspect-[2/3] overflow-hidden rounded-[2rem] shadow-xl md:rounded-[3rem]">
                  <img
                    src="/investment/regional-presence.webp"
                    className="h-full w-full object-cover"
                    alt="Regional Presence"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Investment
