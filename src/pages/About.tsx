import { useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"
import FadeIn from "../components/FadeIn"
import LazyImage from "../components/LazyImage"

function About() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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
        <div className="relative z-10 mx-auto max-w-6xl space-y-6 px-4 text-center md:space-y-8">
          <FadeIn direction="none" duration={1000}>
            <div className="space-y-3 md:space-y-6">
              <h1 className="font-display text-6xl leading-none font-light text-refenti-charcoal uppercase md:text-9xl">
                About
              </h1>
              <p className="font-sans text-xs font-bold text-refenti-gold uppercase">
                Institutional Real Estate Platform
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Section 1: Mission, Vision, Values */}
      <section className="px-4 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 gap-16 md:gap-20">
            {/* Mission */}
            <FadeIn direction="up" duration={800}>
              <div className="space-y-6">
                <h2 className="font-display text-2xl leading-tight font-light text-refenti-gold uppercase tracking-wide md:text-3xl">
                  Mission
                </h2>
                <p className="leading-relaxed font-light text-refenti-charcoal italic md:text-lg">
                  "To develop and steward real estate assets with a primary
                  focus on long-term capital appreciation, applying
                  institutional standards of governance, quality, and discipline
                  in structurally undersupplied markets."
                </p>
              </div>
            </FadeIn>

            {/* Vision */}
            <FadeIn direction="up" duration={800} delay={100}>
              <div className="space-y-6">
                <h2 className="font-display text-2xl leading-tight font-light text-refenti-gold uppercase tracking-wide md:text-3xl">
                  Vision
                </h2>
                <p className="leading-relaxed font-light text-refenti-charcoal italic md:text-lg">
                  "To operate as a disciplined, scalable real estate investment
                  and development platform aligned with long-term capital and
                  institutional stakeholders."
                </p>
              </div>
            </FadeIn>

            {/* Values */}
            <FadeIn direction="up" duration={800} delay={200}>
              <div className="space-y-8">
                <h2 className="font-display text-2xl leading-tight font-light text-refenti-gold uppercase tracking-wide md:text-3xl">
                  Values
                </h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {[
                    "Governance discipline",
                    "Execution certainty",
                    "Structured risk management",
                    "Long-term orientation",
                  ].map((value, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl border border-gray-200 bg-white px-6 py-5 shadow-sm transition-shadow hover:shadow-md"
                    >
                      <p className="font-light text-refenti-charcoal md:text-lg">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Section 2: Origin & Platform Philosophy */}
      <section className="px-4 py-16 md:px-12 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
            <FadeIn direction="up" duration={800}>
              <div className="group overflow-hidden rounded-[2rem]">
                <LazyImage
                  src="/about/about-decor-1.webp"
                  alt="Real estate development"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </FadeIn>
            <FadeIn direction="up" duration={800} delay={100}>
              <div className="space-y-8">
                <h2 className="font-display text-4xl leading-tight font-light text-refenti-charcoal uppercase md:text-6xl">
                  Origin &{" "}
                  <span className="text-refenti-gold italic">Philosophy</span>
                </h2>
                <div className="space-y-6 leading-relaxed font-light text-refenti-charcoal md:text-lg">
                  <p>
                    Refenti Realty Group was established as a platform-led real
                    estate investment and development entity, intentionally
                    structured to support long-term capital appreciation.
                  </p>
                  <p>
                    The platform prioritizes governance discipline,
                    repeatability, and institutional alignment over
                    opportunistic or project-led development. Projects are
                    originated and developed within a consistent framework
                    designed to support scalability, execution certainty, and
                    long-term stewardship across diverse assets and market
                    cycles.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Section 3: Governance & Alignment with SVH */}
      <section className="px-4 py-20 md:px-12 md:py-32">
        <div className="mx-auto max-w-6xl">
          <FadeIn direction="none" duration={1000}>
            <div className="space-y-8 rounded-[2rem] border border-gray-100 bg-white px-8 py-12 shadow-lg md:px-16 md:py-20">
              <p className="text-xs font-bold tracking-wider text-refenti-gold uppercase">
                GOVERNANCE
              </p>
              <h2 className="font-display text-3xl leading-tight font-light text-refenti-charcoal uppercase md:text-5xl">
                Governance & Alignment with{" "}
                <span className="text-refenti-gold italic">
                  Solstice Ventures Holding
                </span>
              </h2>
              <div className="space-y-6 leading-relaxed font-light text-refenti-charcoal md:text-lg">
                <p>
                  Refenti Realty Group operates under Solstice Ventures Holding
                  (SVH).
                </p>
                <p>
                  The platform aligns with group-level governance standards,
                  oversight mechanisms, and institutional controls established
                  by SVH. This alignment supports accountability, consistency,
                  and disciplined capital deployment across the platform.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <section className="px-4 pt-8 pb-12 md:px-12">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-sm font-light text-refenti-charcoal">
            Refenti Realty Group is a real estate investment and development
            platform operating under{" "}
            <a
              href="https://solsticeventures.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-refenti-gold italic transition-opacity hover:opacity-70"
            >
              Solstice Ventures Holding
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  )
}

export default About
