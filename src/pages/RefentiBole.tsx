import React from "react"
import { getProjects } from "../constants"

const RefentiBole: React.FC = () => {
  const property = getProjects()[0] // Base image/location info

  const keyFeatures = [
    "Boutique Luxury Apartments",
    "5,000 Built-Up Area",
    "500 Plot Size",
    "Secure Basement Parking",
    "Private Reservoir Infrastructure",
    "Exclusive Lifestyle Lounge",
    "Concierge-Style Arrival Zone",
    "Single-Unit Luxury Floors",
  ]

  const detailFeatures = [
    {
      title: "Boutique Operational Management",
      text: "The ground floor serves as the operational hub for the building concierge services. This area incorporates a professional reception and structured parking management. This infrastructure is designed to provide a high-security, service-oriented arrival experience for residents. The management model mirrors luxury hospitality standards to maintain the premium market positioning of the asset.",
    },
    {
      title: "Low-Density Residential Configuration",
      text: "The residential stack is engineered for maximum privacy. It features a unique single-unit per floor configuration on the third through seventh levels. The second floor contains two units, while higher levels transition to total floor exclusivity. This architectural choice targets a niche market segment seeking high-privacy urban residences with 360-degree exterior views.",
    },
    {
      title: "Penthouse and Private Amenities",
      text: "The property is capped by a high-value duplex penthouse occupying the eighth and ninth floors. A distinguishing technical feature of this unit is the inclusion of a private swimming pool. Dedicated lifestyle spaces, including a resident-only lounge, further enhance the competitive standing of the building as a top-tier luxury asset.",
    },
  ]

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="reveal relative h-[70vh] w-full overflow-hidden bg-white">
        <img
          src={property.image}
          className="h-full w-full object-cover opacity-90"
          alt="Refenti Bole"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
      </section>

      {/* Narrative & Title Section */}
      <section className="reveal bg-white px-8 py-24">
        <div className="mx-auto max-w-6xl space-y-16 text-center">
          <div className="space-y-4">
            <p className="font-sans text-[10px] font-bold tracking-[0.5em] text-refenti-gold uppercase">
              Boutique Collection
            </p>
            <h1 className="font-display text-7xl leading-none font-light tracking-tight text-refenti-charcoal uppercase md:text-9xl">
              Refenti Bole
            </h1>
          </div>
          <p className="mx-auto max-w-4xl font-display text-3xl leading-tight font-light text-refenti-charcoal md:text-4xl">
            Refenti Bole is a boutique residential development focused on
            high-end, low-density living. The project utilizes a concierge-style
            service model. The asset is structured to prioritize{" "}
            <span className="text-refenti-gold italic">resident privacy</span>{" "}
            and exclusive site access within a modern architectural frame.
          </p>

          <div className="mx-auto grid max-w-4xl grid-cols-2 gap-8 pt-12 md:grid-cols-4">
            {[
              { val: "Concierge", label: "Service Model" },
              { val: "Low Density", label: "Privacy Focus" },
              { val: "Modern", label: "Architecture" },
              { val: "Exclusive", label: "Site Access" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-display text-2xl text-refenti-gold md:text-3xl">
                  {stat.val}
                </p>
                <p className="mt-2 text-[9px] font-bold tracking-[0.3em] text-gray-400 uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features Grid */}
      <section className="reveal bg-refenti-offwhite px-8 py-20">
        <div className="mx-auto max-w-7xl space-y-12">
          <div className="flex items-center gap-6">
            <h2 className="font-display text-4xl font-light text-refenti-charcoal uppercase md:text-5xl">
              Key <span className="text-refenti-gold italic">Features</span>
            </h2>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {keyFeatures.map((feature, idx) => (
              <div
                key={idx}
                className="group reveal flex items-center justify-center rounded-[2rem] border border-gray-100 bg-white px-8 py-6 text-center shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-md"
                style={{ transitionDelay: `${idx * 50}ms` }}
              >
                <span className="text-[10px] font-bold tracking-widest text-refenti-charcoal uppercase transition-colors group-hover:text-refenti-gold">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Features */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-7xl space-y-32">
          {detailFeatures.map((feature, idx) => (
            <div
              key={idx}
              className={`reveal flex flex-col items-center gap-16 md:flex-row ${idx % 2 === 1 ? "md:flex-row-reverse" : ""}`}
            >
              <div className="w-full overflow-hidden rounded-[3rem] border border-gray-50 bg-white shadow-xl md:w-3/5">
                <div className="h-full w-full">
                  <img
                    src={`https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1200&sig=${idx + 42}`}
                    className="aspect-[16/10] h-full w-full object-cover"
                    alt={feature.title}
                  />
                </div>
              </div>
              <div className="w-full space-y-6 md:w-2/5">
                <span className="font-display text-6xl leading-none font-light text-refenti-gold opacity-20">
                  0{idx + 1}
                </span>
                <h3 className="font-display text-4xl leading-tight font-light tracking-tight text-refenti-charcoal uppercase">
                  {feature.title}
                </h3>
                <div className="space-y-4">
                  <p className="text-lg leading-relaxed font-light text-gray-600">
                    {feature.text}
                  </p>
                </div>
                <div className="h-[1px] w-24 bg-refenti-gold" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="reveal bg-white px-8 py-40 text-center">
        <div className="mx-auto max-w-4xl space-y-16">
          <div className="space-y-4">
            <h2 className="font-display text-6xl leading-none font-light tracking-tight text-refenti-charcoal uppercase md:text-8xl">
              Elevate Your <br />
              <span className="text-refenti-gold italic">Standard</span>
            </h2>
            <p className="text-xl font-light text-gray-400">
              Private viewings and boutique dossiers are available upon request
              for verified inquiries.
            </p>
          </div>
          <div className="flex flex-col justify-center gap-8 md:flex-row">
            <button className="rounded-xl bg-refenti-charcoal px-14 py-5 font-sans text-[11px] font-bold tracking-[0.2em] text-white uppercase shadow-xl transition-all hover:bg-refenti-gold active:scale-95">
              Request Dossier
            </button>
            <a
              href="https://wa.me/251986198686"
              className="rounded-xl border border-gray-200 px-14 py-5 text-center font-sans text-[11px] font-bold tracking-[0.2em] text-refenti-charcoal uppercase transition-all hover:bg-refenti-offwhite"
            >
              WhatsApp Advisor
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default RefentiBole
