import React from "react"
// Use getProjects() instead of the missing PROJECTS export
import { getProjects } from "../constants"

const BoleProperty: React.FC = () => {
  const property = getProjects()[0]

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative h-[85vh] w-full overflow-hidden bg-white">
        <img
          src={property.image}
          className="h-full w-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
        <div className="absolute bottom-24 left-8 max-w-4xl space-y-6 md:left-24">
          <p className="font-sans text-[10px] font-bold tracking-[0.5em] text-refenti-gold uppercase">
            Exclusively Listed
          </p>
          <h1 className="font-display text-7xl leading-none font-light tracking-tight text-refenti-charcoal md:text-9xl">
            {property.name}
          </h1>
        </div>
      </section>

      {/* Narrative */}
      <section className="bg-white px-8 py-40">
        <div className="mx-auto max-w-4xl space-y-16 text-center">
          <p className="font-display text-3xl leading-tight font-light text-refenti-charcoal md:text-5xl">
            {property.description} A definitive{" "}
            <span className="text-refenti-gold italic">
              statement of intent
            </span>{" "}
            within Addis Ababa’s golden mile.
          </p>
          <div className="flex flex-wrap justify-center gap-16 pt-12">
            {[
              { val: "2025", label: "Completion" },
              { val: "Concierge", label: "Service" },
              { val: "LEED", label: "Standards" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-display text-4xl text-refenti-gold">
                  {stat.val}
                </p>
                <p className="mt-3 text-[10px] font-bold tracking-[0.3em] text-gray-400 uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-4 rounded-[6rem] border border-gray-100 bg-refenti-offwhite px-8 py-40">
        <div className="mx-auto max-w-7xl space-y-60">
          {/* Fix: Using projectFeatures instead of features to match type definition */}
          {property.projectFeatures?.map((feature, idx) => (
            <div
              key={feature}
              className={`flex flex-col items-center gap-24 md:flex-row ${idx % 2 === 1 ? "md:flex-row-reverse" : ""}`}
            >
              <div className="w-full overflow-hidden rounded-[3rem] border border-gray-50 bg-white p-4 shadow-2xl md:w-3/5">
                <img
                  src={`https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=1200&sig=${idx}`}
                  className="h-full w-full rounded-[2.5rem] object-cover"
                  alt={feature}
                />
              </div>
              <div className="w-full space-y-8 md:w-2/5">
                <span className="font-display text-8xl leading-none font-light text-refenti-gold opacity-10">
                  0{idx + 1}
                </span>
                <h3 className="font-display text-5xl font-light tracking-tight text-refenti-charcoal">
                  {feature}
                </h3>
                <p className="text-lg leading-loose font-light text-gray-500">
                  Designed for the discerning resident. Every architectural
                  element in the {property.name} represents a fusion of utility
                  and aesthetic purity.
                </p>
                <div className="h-[1px] w-24 bg-refenti-gold" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white px-8 py-40 text-center">
        <div className="mx-auto max-w-4xl space-y-16">
          <div className="space-y-4">
            <h2 className="font-display text-6xl font-light tracking-tight text-refenti-charcoal uppercase md:text-8xl">
              Elevate Your <br />
              <span className="text-refenti-gold italic">Standard</span>
            </h2>
            <p className="text-xl font-light text-gray-400">
              Private tours and investment dossiers are available upon request
              for verified inquiries.
            </p>
          </div>
          <div className="flex flex-col justify-center gap-8 md:flex-row">
            <button className="rounded-xl bg-refenti-charcoal px-14 py-5 font-sans text-[11px] font-bold tracking-[0.2em] text-white uppercase shadow-xl transition-all hover:bg-refenti-gold">
              Request Dossier
            </button>
            <a
              href="https://wa.me/251986198686"
              className="rounded-xl border border-gray-200 px-14 py-5 font-sans text-[11px] font-bold tracking-[0.2em] text-refenti-charcoal uppercase transition-all hover:bg-refenti-offwhite"
            >
              WhatsApp Advisor
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default BoleProperty
