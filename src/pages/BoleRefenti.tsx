import React, { useEffect, useState } from "react"

const BoleRefenti: React.FC = () => {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const keyFeatures = [
    "Boutique Luxury Apartments",
    "5,000 Built-Up Area",
    "500 Plot Size",
    "Secure Basement Parking",
    "Private Reservoir Infrastructure",
    "Exclusive Lifestyle Lounge",
    "Service-Oriented Arrival Zone",
    "Single-Unit Luxury Floors",
  ]

  const detailSections = [
    {
      title: "Boutique Quality Management",
      subtitle: "Service Excellence",
      text: "The ground floor serves as the heart for the building services. This area incorporates a professional reception and structured parking management. This infrastructure is designed to provide a high-security, service-oriented arrival experience for residents. The management model mirrors luxury standards to maintain the premium market positioning of the asset.",
      image:
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=1200",
    },
    {
      title: "Low-Density Residential Layout",
      subtitle: "Absolute Privacy",
      text: "The residential stack is engineered for maximum privacy. It features a unique single-unit per floor configuration on the third through seventh levels. The second floor contains two units, while higher levels transition to total floor exclusivity. This architectural choice targets those seeking high-privacy urban residences with 360-degree exterior views.",
      image:
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1200",
    },
    {
      title: "Penthouse and Private Amenities",
      subtitle: "The Signature Asset",
      text: "The property is capped by a high-value duplex penthouse occupying the eighth and ninth floors. A distinguishing feature of this unit is the inclusion of a private swimming pool. Dedicated lifestyle spaces, including a resident-only lounge, further enhance the standing of the building as a top-tier luxury residence.",
      image:
        "https://images.unsplash.com/photo-1512918766775-256e15637686?auto=format&fit=crop&q=80&w=1200",
    },
  ]

  return (
    <div className="min-h-screen bg-refenti-offwhite">
      {/* Hero Section */}
      <section className="relative flex h-[85vh] w-full items-end justify-center overflow-hidden pb-24">
        <div
          className="absolute inset-[-5%]"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: `translateY(${-scrollY * 0.12}px)`,
            willChange: "transform",
          }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-refenti-offwhite via-refenti-offwhite/40 to-transparent" />

        <div className="reveal active relative z-10 mx-auto max-w-6xl space-y-4 px-6 text-center">
          <h1 className="font-display text-7xl leading-none font-light tracking-tighter text-refenti-charcoal uppercase md:text-[11rem]">
            Refenti Bole
          </h1>
          <p className="font-sans text-[10px] font-bold tracking-[0.6em] text-refenti-gold uppercase md:text-xs">
            Boutique Residential Collection
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
                Project <span className="text-refenti-gold italic">Vision</span>
              </h2>
            </div>
            <p className="max-w-lg text-justify text-sm leading-relaxed font-light text-gray-700 md:text-base">
              Refenti Bole is a boutique residential development focused on
              high-end, low-density living. The project utilizes a
              service-oriented model structured to prioritize privacy and
              exclusive site access. Every architectural choice has been made to
              target a niche market seeking total floor exclusivity and
              360-degree views.
            </p>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-[2.5rem] shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200"
              className="h-full w-full object-cover"
              alt="Bole Perspective"
            />
          </div>
        </div>
      </section>

      {/* Project Features Section */}
      <section className="reveal border-t border-gray-100 bg-refenti-offwhite px-8 py-24">
        <div className="mx-auto max-w-7xl space-y-16">
          <div className="space-y-3">
            <p className="font-sans text-[9px] font-bold tracking-ultra text-refenti-gold uppercase">
              Scope of Attributes
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
      <section className="bg-white py-32">
        <div className="mx-auto mb-16 max-w-7xl px-8 md:px-12">
          <div className="space-y-3">
            <p className="font-sans text-[9px] font-bold tracking-ultra text-refenti-gold uppercase">
              Technical Depth
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

export default BoleRefenti
