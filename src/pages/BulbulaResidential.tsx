import React, { useEffect, useState } from "react"

const BulbulaResidential: React.FC = () => {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const keyFeatures = [
    "Mixed-Use Commercial and Hotel",
    "30,000 Built-Up Area",
    "4,622 Plot Size",
    "Premium Hotel Floors 5 to 10",
    "7,000 Daily Footfall Baseline",
    "Two-Level Basement Parking",
    "800 Ground Terrace",
    "Refenti Role: Developer and Operator",
  ]

  const detailSections = [
    {
      title: "Commercial Asset Specification",
      subtitle: "Professional Retail & Office",
      text: "The asset features high-capacity commercial and retail zones designed for professional tenant operations and high-volume pedestrian traffic. The floor plate incorporates wide circulation areas to ensure smooth traffic flow across the ground, first, and second levels. Professional office spaces occupy the third floor, providing a stabilized daytime occupancy base for the complex.",
      image:
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=1200",
    },
    {
      title: "Leisure and Lifestyle Infrastructure",
      subtitle: "Destination Social Hub",
      text: "The development includes specialized open-air hospitality zones, notably a signature ground-floor terrace and a garden-style restaurant facility. The top floor is designated for a premium restaurant and swimming pool concept, serving as the building's primary leisure anchor. These features are positioned to maximize the property value as a regional dining and social destination.",
      image:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1200",
    },
    {
      title: "Hospitality and Amenity Integration",
      subtitle: "The Hotel Ecosystem",
      text: "The hotel component consists of planned rooms and suites integrated with a comprehensive amenity floor on the fourth level. This level includes a gym, spa, and reception. This structural layout ensures hotel guests have direct internal access to the retail and dining ecosystem. The operational launch of these floors is intended to diversify the asset revenue streams and increase total property valuation.",
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1200",
    },
  ]

  return (
    <div className="min-h-screen bg-refenti-offwhite">
      {/* Hero Section */}
      <section className="relative flex h-[85vh] w-full items-end justify-center overflow-hidden pb-24">
        <div
          className="absolute inset-[-5%]"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1449156001437-37c645d9bc01?auto=format&fit=crop&q=80&w=2000')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: `translateY(${-scrollY * 0.12}px)`,
            willChange: "transform",
          }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-refenti-offwhite via-refenti-offwhite/40 to-transparent" />

        <div className="reveal active relative z-10 mx-auto max-w-6xl space-y-4 px-6 text-center">
          <h1 className="font-display text-7xl leading-none font-light tracking-tighter text-refenti-charcoal uppercase md:text-[11rem]">
            Refenti Bulbula
          </h1>
          <p className="font-sans text-[10px] font-bold tracking-[0.6em] text-refenti-gold uppercase md:text-xs">
            Mixed-Use Asset Collection
          </p>
        </div>
      </section>

      {/* Asset Narrative Section */}
      <section className="reveal bg-white px-8 py-32 md:px-12">
        <div className="mx-auto grid max-w-7xl items-center gap-16 md:grid-cols-2">
          <div className="space-y-8">
            <div className="space-y-3">
              <p className="font-sans text-[9px] font-bold tracking-ultra text-refenti-gold uppercase">
                Asset Narrative
              </p>
              <h2 className="font-display text-4xl leading-tight font-light text-refenti-charcoal uppercase md:text-6xl">
                Project{" "}
                <span className="text-refenti-gold italic">Convergence</span>
              </h2>
            </div>
            <p className="max-w-lg text-justify text-sm leading-relaxed font-light text-gray-700 md:text-base">
              Refenti Bulbula is a flagship mixed-use asset in the Bole Bulbula
              district. This project integrates premium commercial space with a
              high-capacity hotel component designed to operate as a
              self-sustaining urban destination. With a plot size of 4,622 sqm
              and an estimated daily footfall of 7,000, it represents a core
              node for commercial activity and leisure.
            </p>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-[2.5rem] shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200"
              className="h-full w-full object-cover"
              alt="Bulbula Commercial Hub"
            />
          </div>
        </div>
      </section>

      {/* Project Features Section */}
      <section className="reveal border-t border-gray-100 bg-refenti-offwhite px-8 py-24">
        <div className="mx-auto max-w-7xl space-y-16">
          <div className="space-y-3">
            <p className="font-sans text-[9px] font-bold tracking-ultra text-refenti-gold uppercase">
              Operational Data
            </p>
            <h2 className="font-display text-4xl font-light text-refenti-charcoal uppercase md:text-5xl">
              Project <span className="text-refenti-gold italic">Features</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[3rem] border border-gray-200 bg-gray-200 shadow-sm md:grid-cols-4">
            {keyFeatures.map((feature, idx) => (
              <div
                key={idx}
                className="group flex flex-col items-center justify-center bg-white p-10 text-center transition-colors duration-500 hover:bg-refenti-offwhite md:p-14"
              >
                <span className="mb-4 text-[10px] font-bold tracking-widest text-gray-400 uppercase group-hover:text-refenti-gold">
                  Attribute 0{idx + 1}
                </span>
                <p className="font-display text-xl leading-tight text-refenti-charcoal md:text-2xl">
                  {feature}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Attributes Section */}
      <section className="bg-white pb-32">
        <div className="mx-auto max-w-7xl px-8 py-24 md:px-12">
          <div className="space-y-3">
            <p className="font-sans text-[9px] font-bold tracking-ultra text-refenti-gold uppercase">
              Technical Specs
            </p>
            <h2 className="font-display text-4xl font-light text-refenti-charcoal uppercase md:text-6xl">
              Main <span className="text-refenti-gold italic">Attributes</span>
            </h2>
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-8 md:px-12">
          {detailSections.map((section, idx) => (
            <div
              key={idx}
              className={`reveal flex flex-col items-center gap-16 border-b border-gray-50 py-24 last:border-0 md:flex-row md:gap-32 md:py-40 ${idx % 2 === 1 ? "md:flex-row-reverse" : ""}`}
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[4rem] shadow-2xl md:w-1/2">
                <img
                  src={section.image}
                  className="h-full w-full object-cover"
                  alt={section.title}
                />
                <div className="pointer-events-none absolute inset-0 bg-refenti-charcoal/5" />
              </div>

              <div className="w-full space-y-8 md:w-1/2">
                <div className="space-y-3">
                  <p className="font-sans text-[10px] font-bold tracking-widest text-refenti-gold uppercase">
                    {section.subtitle}
                  </p>
                  <h3 className="font-display text-5xl leading-none font-light text-refenti-charcoal uppercase md:text-7xl">
                    {section.title.split(" ").slice(0, -1).join(" ")} <br />
                    <span className="text-refenti-gold italic">
                      {section.title.split(" ").slice(-1)}
                    </span>
                  </h3>
                </div>
                <div className="h-px w-20 bg-refenti-gold" />
                <p className="max-w-lg text-justify text-sm leading-relaxed font-light text-gray-700">
                  {section.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default BulbulaResidential
