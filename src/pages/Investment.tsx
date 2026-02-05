import { useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"
import FadeIn from "../components/FadeIn"
import LazyImage from "../components/LazyImage"

function Investment() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const assetClasses = [
    {
      title: "Residential",
      image: "/investment/investment-decor-1.webp",
      alt: "Residential development",
    },
    {
      title: "Mixed-Use",
      image: "/investment/investment-decor-2.webp",
      alt: "Mixed-use development",
    },
    {
      title: "Commercial & Serviced",
      image: "/investment/investment-decor-3.webp",
      alt: "Commercial development",
    },
    {
      title: "Serviced Apartments",
      image: "/investment/investment-decor-4.webp",
      alt: "Serviced apartments",
    },
    {
      title: "Hospitality",
      image: "/investment/investment-decor-5.webp",
      alt: "Hospitality assets",
    },
  ]

  return (
    <div className="min-h-screen bg-refenti-offwhite">
      <Helmet>
        <title>Investment Approach - Refenti Realty Group</title>
        <meta
          name="description"
          content="Institutional real estate investment platform. RRG's disciplined approach to development, risk management, and governance across residential, commercial, and mixed-use assets."
        />
      </Helmet>

      {/* Hero Section */}
      <section className="relative flex min-h-[70vh] w-full items-end justify-center overflow-hidden bg-refenti-offwhite pb-16 md:min-h-[90vh] md:pb-32">
        <img
          src="/investment/investment-hero.webp"
          alt="Investment Hero"
          fetchPriority="high"
          className="absolute top-[-5%] left-0 h-[110%] w-full animate-fade-in object-cover"
          style={{
            transform: `translateY(${-scrollY * 0.12}px)`,
            willChange: "transform",
            animationDuration: "1200ms",
          }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-refenti-offwhite via-refenti-offwhite/80 to-transparent" />
        <div className="relative z-10 mx-auto max-w-6xl space-y-6 px-4 text-center md:space-y-8">
          <div className="space-y-3 md:space-y-6">
            <FadeIn direction="none" duration={1000} delay={1000}>
              <h1 className="font-display text-6xl leading-none font-light text-refenti-charcoal uppercase md:text-9xl">
                Investment
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

      {/* Investment Approach */}
      <section className="px-4 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-6xl space-y-12">
          <FadeIn direction="up" duration={800}>
            <p className="text-xs font-bold tracking-wider text-refenti-gold uppercase">
              INVESTMENT APPROACH
            </p>
          </FadeIn>
          <FadeIn direction="up" duration={800} delay={100}>
            <h2 className="font-display text-4xl leading-tight font-light text-refenti-charcoal uppercase md:text-6xl">
              Institutional-Grade{" "}
              <span className="text-refenti-gold italic">Real Estate</span>
            </h2>
          </FadeIn>
          <FadeIn direction="up" duration={800} delay={200}>
            <div className="space-y-6 leading-relaxed font-light text-refenti-charcoal md:text-lg">
              <p>
                RRG originates, develops, and manages real estate assets that
                meet institutional standards of quality, risk management, and
                long-term value creation. The platform focuses on assets with
                durable demand, clear governance, and long-term income
                stability.
              </p>
              <p>
                Investment decisions are made with a long-term perspective,
                emphasizing disciplined governance, execution certainty,
                conservative underwriting, and resilience across market cycles.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* How We Develop */}
      <section className="px-4 py-16 md:px-12 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
            <FadeIn direction="up" duration={800}>
              <div className="group overflow-hidden rounded-[2rem]">
                <LazyImage
                  src="/investment/development.webp"
                  alt="Development process"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </FadeIn>
            <FadeIn direction="up" duration={800} delay={100}>
              <div className="space-y-8">
                <h2 className="font-display text-4xl leading-tight font-light text-refenti-charcoal uppercase md:text-6xl">
                  How We <span className="text-refenti-gold italic">Develop</span>
                </h2>
                <div className="space-y-6 leading-relaxed font-light text-refenti-charcoal md:text-lg">
                  <p>
                    RRG operates as an integrated development platform,
                    retaining strategic control over concept definition, asset
                    strategy, structuring, and delivery oversight.
                  </p>
                  <ul className="space-y-4">
                    <li>
                      • Core development leadership, design coordination, asset
                      stewardship, and investment structuring are managed
                      in-house.
                    </li>
                    <li>
                      • Construction and specialized services are delivered
                      through vetted partners under defined performance and risk
                      frameworks.
                    </li>
                    <li>
                      • Delivery follows phased execution, disciplined cost
                      control, and conservative assumptions.
                    </li>
                  </ul>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Managing Risk */}
      <section className="px-4 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-6xl">
          <FadeIn direction="none" duration={1000}>
            <div className="space-y-12 rounded-[2rem] border border-gray-100 bg-white px-8 py-12 shadow-lg md:px-16 md:py-20">
              <div className="space-y-4">
                <p className="text-xs font-bold tracking-wider text-refenti-gold uppercase">
                  RISK MANAGEMENT
                </p>
                <h2 className="font-display text-3xl leading-tight font-light text-refenti-charcoal uppercase md:text-5xl">
                  Disciplined{" "}
                  <span className="text-refenti-gold italic">Risk Framework</span>
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="space-y-3">
                  <h3 className="font-display text-xl font-bold text-refenti-charcoal uppercase">
                    Execution
                  </h3>
                  <p className="leading-relaxed font-light text-refenti-charcoal">
                    Integrated oversight, experienced partners, phased
                    construction
                  </p>
                </div>
                <div className="space-y-3">
                  <h3 className="font-display text-xl font-bold text-refenti-charcoal uppercase">
                    Financing
                  </h3>
                  <p className="leading-relaxed font-light text-refenti-charcoal">
                    Conservative structuring, diversified funding, aligned
                    timelines
                  </p>
                </div>
                <div className="space-y-3">
                  <h3 className="font-display text-xl font-bold text-refenti-charcoal uppercase">
                    Market
                  </h3>
                  <p className="leading-relaxed font-light text-refenti-charcoal">
                    Demand-driven asset selection, disciplined positioning,
                    phased releases
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Quality & Governance */}
      <section className="px-4 py-16 md:px-12 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
            <FadeIn direction="up" duration={800}>
              <div className="space-y-8">
                <h2 className="font-display text-4xl leading-tight font-light text-refenti-charcoal uppercase md:text-6xl">
                  Quality &{" "}
                  <span className="text-refenti-gold italic">Governance</span>
                </h2>
                <div className="space-y-6 leading-relaxed font-light text-refenti-charcoal md:text-lg">
                  <p>
                    RRG operates to institutional-grade standards across
                    governance, delivery, and asset quality:
                  </p>
                  <ul className="space-y-4">
                    <li>
                      • Strong governance, transparency, and reporting
                      discipline
                    </li>
                    <li>• Disciplined capital and cost management</li>
                    <li>
                      • High design, engineering, and construction standards
                    </li>
                    <li>• Reliable delivery through phased execution</li>
                    <li>
                      • Assets designed for long-term operational performance
                    </li>
                  </ul>
                </div>
              </div>
            </FadeIn>
            <FadeIn direction="up" duration={800} delay={100}>
              <div className="group overflow-hidden rounded-[2rem]">
                <LazyImage
                  src="/investment/vision.webp"
                  alt="Quality and governance"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Assets & Structures */}
      <section className="px-4 py-20 md:px-12 md:py-32">
        <div className="mx-auto max-w-7xl space-y-16">
          {/* Asset Classes */}
          <div className="space-y-12">
            <FadeIn direction="up" duration={800}>
              <h2 className="font-display text-4xl leading-tight font-light text-refenti-charcoal uppercase md:text-6xl">
                Asset <span className="text-refenti-gold italic">Classes</span>
              </h2>
            </FadeIn>
            <FadeIn direction="up" duration={800} delay={100}>
              <p className="leading-relaxed font-light text-refenti-charcoal md:text-lg">
                RRG focuses on asset classes with resilient demand and long-term
                income potential:
              </p>
            </FadeIn>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {assetClasses.map((asset, idx) => (
                <FadeIn
                  key={idx}
                  direction="up"
                  duration={800}
                  delay={idx * 100}
                >
                  <div className="group overflow-hidden rounded-[2rem] border border-gray-100 bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg">
                    <div className="aspect-[4/3] overflow-hidden">
                      <LazyImage
                        src={asset.image}
                        alt={asset.alt}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-display text-xl font-light text-refenti-charcoal uppercase md:text-2xl">
                        {asset.title}
                      </h3>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          {/* Investment Structures */}
          <div className="space-y-8">
            <FadeIn direction="up" duration={800}>
              <h2 className="font-display text-4xl leading-tight font-light text-refenti-charcoal uppercase md:text-6xl">
                Investment{" "}
                <span className="text-refenti-gold italic">Structures</span>
              </h2>
            </FadeIn>
            <FadeIn direction="up" duration={800} delay={100}>
              <div className="space-y-6 rounded-[2rem] border border-gray-100 bg-white px-8 py-10 shadow-sm md:px-12">
                <p className="leading-relaxed font-light text-refenti-charcoal md:text-lg">
                  Investment structures are tailored to project context and
                  partner alignment, including:
                </p>
                <ul className="space-y-4 leading-relaxed font-light text-refenti-charcoal md:text-lg">
                  <li>• Joint ventures and co-development</li>
                  <li>• Own-balance-sheet development</li>
                  <li>• EPC+F or other structured delivery models</li>
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="px-4 pt-4 pb-20 md:px-12 md:pt-6 md:pb-26">
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

export default Investment
