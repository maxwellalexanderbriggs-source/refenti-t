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
    <div className="min-h-screen">
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
      <section className="relative flex min-h-[56vh] w-full items-end justify-center overflow-hidden pb-16 md:min-h-[72vh] md:pb-32">
        <img
          src="/about-hero.jpg"
          alt="About Hero"
          fetchPriority="high"
          className="absolute top-[-5%] left-0 h-[110%] w-full animate-fade-in object-cover"
          style={{
            transform: `translateY(${-scrollY * 0.12}px)`,
            willChange: "transform",
            animationDuration: "1200ms",
          }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-refenti-offwhite via-refenti-offwhite/70 to-transparent" />
        <div className="relative z-10 mx-auto max-w-6xl space-y-6 px-4 text-center md:space-y-8">
          <div className="space-y-3 md:space-y-6">
            <FadeIn direction="none" duration={1000} delay={1000}>
              <h1 className="font-display text-6xl leading-none font-light text-refenti-charcoal uppercase md:text-9xl">
                About
              </h1>
            </FadeIn>
            <FadeIn direction="none" duration={1000} delay={1300}>
              <p className="font-sans text-xs font-bold text-refenti-gold uppercase">
                Institutional Real Estate Platform
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Section 1: Mission, Vision, Values */}
      <section className="overflow-hidden px-4 py-16 md:px-12 md:py-20">
        <div className="mx-auto max-w-7xl">
          {/* Vision - Left aligned, rounded right */}
          <FadeIn direction="up" duration={800}>
            <div className="flex justify-start">
              <div className="w-full max-w-xl rounded-l-none rounded-r-full bg-white px-8 py-8 text-center shadow-2xl md:px-12 md:py-10">
                <div className="mx-auto flex flex-col items-center space-y-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-refenti-gold opacity-40 shadow-lg md:h-12 md:w-12">
                    <svg
                      className="h-5 w-5 text-white md:h-6 md:w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </div>
                  <h2 className="font-display text-2xl font-light text-refenti-charcoal uppercase md:text-3xl">
                    Vision
                  </h2>
                  <p className="max-w-md text-sm leading-relaxed font-light text-refenti-charcoal/80 ">
                    "To operate as a disciplined, scalable real estate
                    investment and development platform aligned with long-term
                    capital and institutional stakeholders."
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Mission - Right aligned, rounded left */}
          <FadeIn direction="up" duration={800} delay={100}>
            <div className="flex justify-end">
              <div className="w-full max-w-xl rounded-l-full rounded-r-none bg-white px-8 py-8 text-center shadow-2xl md:px-12 md:py-10">
                <div className="mx-auto flex flex-col items-center space-y-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-refenti-gold opacity-40 shadow-lg md:h-12 md:w-12">
                    <svg
                      className="h-5 w-5 text-white md:h-6 md:w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                  </div>
                  <h2 className="font-display text-2xl font-light text-refenti-charcoal uppercase md:text-3xl">
                    Mission
                  </h2>
                  <p className="max-w-md text-sm leading-relaxed font-light text-refenti-charcoal/80 ">
                    "To develop and steward real estate assets with a primary
                    focus on long-term capital appreciation, applying
                    institutional standards of governance, quality, and
                    discipline in structurally undersupplied markets."
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Values */}
          <FadeIn direction="up" duration={800} delay={200}>
            <div className="space-y-8 pt-16">
              <h2 className="text-center font-display text-3xl leading-tight font-light tracking-wide text-refenti-gold uppercase md:text-4xl">
                Values
              </h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                {[
                  {
                    value: "Governance discipline",
                    description: "Institutional standards and oversight frameworks",
                  },
                  {
                    value: "Execution certainty",
                    description: "Reliable delivery on commitments and timelines",
                  },
                  {
                    value: "Structured risk management",
                    description: "Systematic approach to identifying and mitigating risk",
                  },
                  {
                    value: "Long-term orientation",
                    description: "Focus on sustained capital appreciation",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl bg-white px-8 py-8 text-center shadow-md transition-shadow hover:shadow-lg"
                  >
                    <p className="mb-3 text-lg font-light text-refenti-charcoal md:text-xl">
                      {item.value}
                    </p>
                    <p className="text-xs leading-relaxed text-refenti-charcoal/60 md:text-sm">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Section 2: Origin & Platform Philosophy */}
      <section className="px-4 py-16 md:px-12 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
            <FadeIn direction="up" duration={800}>
              <div className="group overflow-hidden rounded-[2rem]">
                <LazyImage
                  src="/drone.jpg"
                  alt="Aerial view of real estate development"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </FadeIn>
            <FadeIn direction="up" duration={800} delay={100}>
              <div className="space-y-8">
                <h2 className="font-display text-4xl leading-tight font-light text-refenti-charcoal uppercase md:text-6xl">
                  Origin &{" "}
                  <span className="text-refenti-gold ">Philosophy</span>
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
                <span className="text-refenti-gold ">
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

    </div>
  )
}

export default About
