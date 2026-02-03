import { useEffect, useRef, useState } from "react"
import { Helmet } from "react-helmet-async"
import FadeIn from "../components/FadeIn"

const SECTIONS = [
  { id: "about-refenti", label: "Who We Are" },
  { id: "stand-for", label: "Our Philosophy" },
  { id: "governance", label: "Governance & SVH" },
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
      <Helmet>
        <title>
          About Refenti Realty Group - Institutional Real Estate Platform
        </title>
        <meta
          name="description"
          content="Refenti Realty Group is an institutional real estate platform operating under Solstice Ventures Holding, focused on development, investment, and management of urban real estate assets."
        />
      </Helmet>
      {/* Hero Section */}
      <section className="relative flex min-h-[70vh] w-full items-end justify-center overflow-hidden bg-refenti-offwhite pb-16 md:min-h-[90vh] md:pb-32">
        <img
          src="/about/about-hero.webp"
          alt="About Hero"
          fetchPriority="high"
          className="absolute top-[-5%] left-0 h-[110%] w-full object-cover"
          style={{
            transform: `translateY(${-scrollY * 0.12}px)`,
            willChange: "transform",
          }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-refenti-offwhite via-refenti-offwhite/70 to-transparent" />
        <div className="relative z-10 mx-auto max-w-6xl space-y-4 px-4 text-center md:space-y-8">
          <FadeIn direction="none" duration={1000}>
            <div className="space-y-3 md:space-y-6">
              <h1 className="font-display text-6xl leading-none font-light tracking-tighter text-refenti-charcoal uppercase md:text-[10rem]">
                About
              </h1>
              <p className="font-sans text-[9px] font-bold tracking-[0.4em] text-refenti-gold uppercase md:text-xs md:tracking-[0.6em]">
                Institutional Real Estate Platform
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="relative mx-auto flex max-w-7xl flex-col gap-12 px-4 sm:px-6 md:flex-row md:px-12 lg:gap-24">
        {/* Sticky Sidebar Navigation - Hidden on mobile/tablet for better UX */}
        <aside className="sticky top-48 z-20 hidden h-fit w-52 lg:block">
          <FadeIn delay={200} direction="left">
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
          </FadeIn>
        </aside>

        <div className="flex-1 space-y-16 pb-20 md:space-y-32 md:pb-40 lg:space-y-48">
          {/* Section: Our Philosophy */}
          <section
            id="about-refenti"
            ref={(el) => {
              sectionRefs.current["about-refenti"] = el
            }}
            className="pt-12 md:pt-40"
          >
            <div className="space-y-8 md:space-y-10">
              <FadeIn>
                <div className="space-y-4">
                  <h2 className="font-display text-4xl leading-none font-light text-refenti-charcoal uppercase sm:text-6xl md:text-8xl">
                    Who We <span className="text-refenti-gold italic">Are</span>
                  </h2>
                  <div className="h-px w-24 bg-refenti-gold/40 md:w-32" />
                </div>
              </FadeIn>

              <div className="grid items-start gap-8 md:grid-cols-2 md:gap-16">
                <div className="flex h-full flex-col justify-between space-y-4 text-base leading-relaxed font-light text-gray-700 md:space-y-6 md:text-lg">
                  <FadeIn delay={100}>
                    <p className="text-justify">
                      Refenti Realty Group is an institutional real estate
                      platform focused on the development, investment, and
                      management of urban real estate assets. The platform
                      operates with a long-term horizon, combining capital
                      discipline with direct involvement in development and asset
                      delivery.
                    </p>
                  </FadeIn>

                  <FadeIn delay={200}>
                    <div className="relative aspect-video overflow-hidden rounded-[2rem] shadow-lg md:rounded-[2.5rem]">
                      <img
                        src="/about/about-decor-1.webp"
                        className="h-full w-full object-cover"
                        alt="Urban Development"
                      />
                    </div>
                  </FadeIn>
                </div>

                <FadeIn delay={300} direction="right">
                  <div className="aspect-[4/5] overflow-hidden rounded-[2.5rem] shadow-2xl md:rounded-[4rem]">
                    <img
                      src="/about/about-decor-3.webp"
                      className="h-full w-full object-cover"
                      alt="Real Estate Asset"
                    />
                  </div>
                </FadeIn>
              </div>
            </div>
          </section>

          {/* Section: The Foundation */}
          <section
            id="stand-for"
            ref={(el) => {
              sectionRefs.current["stand-for"] = el
            }}
          >
            <div className="space-y-8 md:space-y-16">
              <FadeIn>
                <div className="max-w-3xl space-y-4 md:space-y-6">
                  <p className="font-sans text-[9px] font-bold tracking-ultra text-refenti-gold uppercase md:text-[10px]">
                    Our Approach
                  </p>
                  <h2 className="font-display text-4xl leading-tight font-light text-refenti-charcoal uppercase sm:text-5xl md:text-7xl">
                    Our{" "}
                    <span className="text-refenti-gold italic">Philosophy</span>
                  </h2>
                </div>
              </FadeIn>

              <div className="space-y-10 md:space-y-16">
                <FadeIn delay={100}>
                  <p className="max-w-3xl text-justify text-lg leading-relaxed font-light text-gray-700 md:text-xl">
                    We believe real estate assets should be conceived with
                    durability, governed with rigor, and executed with technical
                    depth. Refenti is built to create assets that perform over
                    time, supported by disciplined decision-making and consistent
                    execution standards.
                  </p>
                </FadeIn>

                <div className="grid gap-10 md:grid-cols-2 lg:gap-24">
                  <FadeIn delay={200} direction="left">
                    <div className="aspect-video overflow-hidden rounded-[2rem] shadow-xl md:rounded-[3rem]">
                      <img
                        src="/about/about-decor-4.webp"
                        className="h-full w-full object-cover"
                        alt="Development Process"
                      />
                    </div>
                  </FadeIn>
                  <FadeIn delay={300} direction="right">
                    <div className="aspect-video overflow-hidden rounded-[2rem] shadow-xl md:rounded-[3rem]">
                      <img
                        src="/about/about-decor-5.webp"
                        className="h-full w-full object-cover"
                        alt="Asset Development"
                      />
                    </div>
                  </FadeIn>
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
            <FadeIn>
              <div className="relative flex flex-col items-center gap-10 overflow-hidden rounded-[2.5rem] bg-refenti-charcoal p-6 text-white shadow-2xl md:rounded-[4rem] md:p-10 lg:flex-row lg:gap-16 lg:p-16">
                <div className="pointer-events-none absolute inset-0 opacity-10">
                  <img
                    src="/about/about-decor-6.webp"
                    className="h-full w-full object-cover"
                    alt=""
                  />
                </div>
                <div className="relative z-10 space-y-6 md:space-y-8 lg:w-3/5">
                  <FadeIn delay={100}>
                    <div className="space-y-3 md:space-y-4">
                      <p className="font-sans text-[9px] font-bold tracking-ultra text-refenti-gold uppercase md:text-[10px]">
                        Institutional Alignment
                      </p>
                      <h3 className="font-display text-4xl leading-tight font-light uppercase sm:text-5xl md:text-6xl">
                        Governance &{" "}
                        <span className="text-refenti-gold italic">
                          SVH Alignment
                        </span>
                      </h3>
                    </div>
                  </FadeIn>
                  <FadeIn delay={200}>
                    <p className="text-justify text-sm leading-relaxed font-light text-gray-300 md:text-base">
                      Refenti Realty Group operates under the governance framework
                      of Solstice Ventures Holding (SVH). This alignment provides
                      group-level oversight across investment discipline, risk
                      management, and institutional standards.
                    </p>
                  </FadeIn>
                  <FadeIn delay={300}>
                    <div className="space-y-4 border-l-2 border-refenti-gold/30 pl-6 md:space-y-5">
                      <p className="text-sm leading-relaxed font-light text-gray-300 md:text-base">
                        Through SVH, Refenti benefits from:
                      </p>
                      <ul className="space-y-3 text-sm leading-relaxed font-light text-gray-300 md:text-base">
                        <li>
                          • Clear separation of capital allocation and execution
                        </li>
                        <li>• Strong governance and compliance structures</li>
                        <li>
                          • Long-term platform continuity beyond individual projects
                        </li>
                      </ul>
                    </div>
                  </FadeIn>
                  <FadeIn delay={400}>
                    <div className="pt-4 md:pt-6">
                      <a
                        href="https://solstice-ventures-beta.webflow.io/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[9px] font-bold tracking-widest text-refenti-gold uppercase transition-colors hover:text-white md:text-[10px]"
                      >
                        Learn More About SVH
                        <svg
                          className="h-3 w-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </a>
                    </div>
                  </FadeIn>
                </div>
                <FadeIn delay={200} direction="right">
                  <div className="relative z-10 aspect-square w-full overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl md:rounded-[3rem] lg:w-2/5">
                    <img
                      src="/about/about-decor-3.webp"
                      className="h-full w-full object-cover"
                      alt="Institutional Governance"
                    />
                  </div>
                </FadeIn>
              </div>
            </FadeIn>
          </section>
        </div>
      </div>
    </div>
  )
}

export default About
