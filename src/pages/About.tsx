import { useEffect, useRef, useState } from "react"

const SECTIONS = [
  { id: "about-refenti", label: "Our Philosophy" },
  { id: "stand-for", label: "The Foundation" },
  { id: "governance", label: "Future Vision" },
]

function About() {
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
      const offset = 120
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = element.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset
      window.scrollTo({ top: offsetPosition, behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-refenti-offwhite">
      {/* Hero Section */}
      <section className="relative flex min-h-[70vh] w-full items-end justify-center overflow-hidden bg-refenti-offwhite pb-16 md:min-h-[90vh] md:pb-32">
        <div
          className="absolute inset-[-5%]"
          style={{
            backgroundImage: `url('/about/about-hero.webp')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: `translateY(${-scrollY * 0.12}px)`,
            willChange: "transform",
          }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-refenti-offwhite via-refenti-offwhite/70 to-transparent" />
        <div className="relative z-10 mx-auto max-w-6xl space-y-6 px-4 text-center md:space-y-14">
          <div className="space-y-3 md:space-y-6">
            <h1 className="font-display text-6xl leading-none font-light tracking-tighter text-refenti-charcoal uppercase md:text-[10rem]">
              About
            </h1>
            <p className="font-sans text-[9px] font-bold tracking-[0.4em] text-refenti-gold uppercase md:text-xs md:tracking-[0.6em]">
              Crafting a Legacy
            </p>
          </div>
        </div>
      </section>

      <div className="relative mx-auto flex max-w-7xl flex-col gap-12 px-4 sm:px-6 md:flex-row md:px-12 lg:gap-24">
        {/* Sticky Sidebar Navigation - Hidden on mobile/tablet for better UX */}
        <aside className="sticky top-48 z-20 hidden h-fit w-64 lg:block xl:w-72">
          <div className="space-y-8">
            <p className="border-b border-gray-100 pb-4 font-sans text-[10px] font-bold tracking-[0.4em] text-refenti-gold uppercase">
              Perspective
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
          {/* Section: Our Philosophy */}
          <section
            id="about-refenti"
            ref={(el) => {
              sectionRefs.current["about-refenti"] = el
            }}
            className="pt-12 md:pt-40"
          >
            <div className="space-y-12 md:space-y-16">
              <div className="space-y-4">
                <h2 className="font-display text-4xl leading-none font-light text-refenti-charcoal uppercase sm:text-6xl md:text-8xl">
                  Building <br /> for the{" "}
                  <span className="text-refenti-gold italic">Future</span>
                </h2>
                <div className="h-px w-24 bg-refenti-gold/40 md:w-32" />
              </div>

              <div className="grid items-center gap-8 md:grid-cols-2 md:gap-16">
                <div className="space-y-6 text-lg leading-relaxed font-light text-gray-700 md:space-y-10 md:text-2xl">
                  <p className="text-justify">
                    Refenti Realty Group transforms how we perceive urban space.
                    Part of Solstice Ventures Holding, we create environments
                    that feel deliberate, permanent, and deeply connected to the
                    city's identity.
                  </p>
                  <div className="relative aspect-video overflow-hidden rounded-[2rem] shadow-lg md:rounded-[2.5rem]">
                    <img
                      src="/about/about-decor-1.webp"
                      className="h-full w-full object-cover"
                      alt="Architectural Detail"
                    />
                  </div>
                  <p className="text-justify text-base leading-relaxed text-gray-500 md:text-lg">
                    Our vision is built on architectural intent. Every decision
                    is weighed against a standard of lasting quality and
                    aesthetic purity.
                  </p>
                </div>
                <div className="aspect-[4/5] overflow-hidden rounded-[2.5rem] shadow-2xl md:rounded-[4rem]">
                  <img
                    src="/about/about-decor-2.webp"
                    className="h-full w-full object-cover"
                    alt="Interior Luxury"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Decorative Wide Image */}
          <section className="">
            <div className="aspect-[21/9] w-full overflow-hidden rounded-[2rem] border border-gray-100 shadow-sm md:rounded-[4rem]">
              <img
                src="/about/about-decor-3.webp"
                className="h-full w-full object-cover opacity-90 grayscale-[0.2]"
                alt="Building Atmosphere"
              />
            </div>
          </section>

          {/* Section: The Foundation */}
          <section
            id="stand-for"
            ref={(el) => {
              sectionRefs.current["stand-for"] = el
            }}
          >
            <div className="space-y-12 md:space-y-24">
              <div className="max-w-3xl space-y-4 md:space-y-6">
                <p className="font-sans text-[9px] font-bold tracking-ultra text-refenti-gold uppercase md:text-[10px]">
                  What Guides Us
                </p>
                <h2 className="font-display text-4xl leading-tight font-light text-refenti-charcoal uppercase sm:text-5xl md:text-7xl">
                  Our{" "}
                  <span className="text-refenti-gold italic">Foundation</span>
                </h2>
              </div>

              <div className="grid gap-10 md:grid-cols-2 lg:gap-24">
                <div className="space-y-6 md:space-y-8">
                  <div className="mb-6 aspect-video overflow-hidden rounded-[2rem] shadow-xl md:mb-10 md:rounded-[3rem]">
                    <img
                      src="/about/about-decor-4.webp"
                      className="h-full w-full object-cover"
                      alt="Office Space"
                    />
                  </div>
                  <h3 className="font-display text-3xl font-light text-refenti-charcoal uppercase italic md:text-4xl">
                    A Sense of Place
                  </h3>
                  <p className="text-justify text-base leading-relaxed font-light text-gray-700 md:text-lg">
                    Every building should have a soul. By focusing on
                    low-density designs and high-privacy layouts, we create
                    sanctuaries that offer a retreat from the urban bustle.
                  </p>
                </div>
                <div className="space-y-6 md:space-y-8 md:pt-24 lg:pt-32">
                  <div className="mb-6 aspect-video overflow-hidden rounded-[2rem] shadow-xl md:mb-10 md:rounded-[3rem]">
                    <img
                      src="/about/about-decor-5.webp"
                      className="h-full w-full object-cover"
                      alt="Residential Excellence"
                    />
                  </div>
                  <h3 className="font-display text-3xl font-light text-refenti-charcoal uppercase italic md:text-4xl">
                    Proven Quality
                  </h3>
                  <p className="text-justify text-base leading-relaxed font-light text-gray-700 md:text-lg">
                    Excellence is a choice. We prioritize the integrity of the
                    asset, ensuring that what we build today remains a landmark
                    for generations.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section: Future Vision */}
          <section
            id="governance"
            ref={(el) => {
              sectionRefs.current["governance"] = el
            }}
          >
            <div className="relative flex flex-col items-center gap-10 overflow-hidden rounded-[2.5rem] bg-refenti-charcoal p-8 text-white shadow-2xl md:rounded-[4rem] md:p-16 lg:flex-row lg:gap-16 lg:p-24">
              <div className="pointer-events-none absolute inset-0 opacity-10">
                <img
                  src="/about/about-decor-6.webp"
                  className="h-full w-full object-cover"
                  alt=""
                />
              </div>
              <div className="relative z-10 space-y-6 md:space-y-10 lg:w-3/5">
                <div className="space-y-3 md:space-y-4">
                  <p className="font-sans text-[9px] font-bold tracking-ultra text-refenti-gold uppercase md:text-[10px]">
                    A Clear Horizon
                  </p>
                  <h3 className="font-display text-4xl leading-tight font-light uppercase sm:text-5xl md:text-7xl">
                    The Path{" "}
                    <span className="text-refenti-gold italic">Forward</span>
                  </h3>
                </div>
                <p className="text-justify text-lg leading-relaxed font-light text-gray-300 md:text-2xl">
                  We look at real estate through a long-term lens. By
                  maintaining control over every phase of our projects, we
                  ensure that our developments are not just sustainable, but
                  truly exceptional.
                </p>
                <div className="pt-4 md:pt-8">
                  <div className="mb-4 h-px w-16 bg-refenti-gold md:mb-6 md:w-24" />
                  <p className="text-[9px] font-bold tracking-widest text-refenti-gold uppercase md:text-[10px]">
                    Aligned with Modern Living
                  </p>
                </div>
              </div>
              <div className="relative z-10 aspect-square w-full overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl md:rounded-[3rem] lg:w-2/5">
                <img
                  src="/about/about-decor-3.webp"
                  className="h-full w-full object-cover"
                  alt="Future Development"
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default About
