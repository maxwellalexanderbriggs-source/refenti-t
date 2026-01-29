import React from "react"
// Use getProjects() instead of the missing PROJECTS export
import { getProjects } from "../constants"

const RefencyBole: React.FC = () => {
  const property = getProjects()[0]

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="reveal relative h-[85vh] w-full overflow-hidden bg-white">
        <img
          src={property.image}
          className="h-full w-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
        <div className="absolute bottom-24 left-8 max-w-4xl space-y-6 md:left-24">
          <p className="font-sans text-[10px] font-bold tracking-[0.5em] text-refenti-gold uppercase">
            Exclusively Listed
          </p>
          <h1 className="font-display text-7xl leading-none font-light tracking-tight text-refenti-charcoal uppercase md:text-9xl">
            Refency Bolle
          </h1>
        </div>
      </section>

      {/* Narrative */}
      <section className="reveal bg-white px-8 py-32">
        <div className="mx-auto max-w-4xl space-y-16 text-center">
          <p className="font-display text-3xl leading-tight font-light text-refenti-charcoal md:text-5xl">
            {property.description} This development stands as a definitive{" "}
            <span className="text-refenti-gold italic">
              statement of intent
            </span>{" "}
            within Addis Ababa’s golden mile, offering unprecedented living
            standards.
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

      {/* Features - Compact Spacing with Horizontal Expansion */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-7xl space-y-24">
          {/* Fix: Using projectFeatures instead of features to match type definition */}
          {property.projectFeatures?.map((feature, idx) => (
            <div
              key={feature}
              className={`reveal flex flex-col items-center gap-16 md:flex-row ${idx % 2 === 1 ? "md:flex-row-reverse" : ""}`}
            >
              <div className="w-full overflow-hidden rounded-3xl border border-gray-50 bg-white shadow-xl md:w-3/5">
                <div className="expand-x h-full w-full origin-center">
                  <img
                    src={`https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=1200&sig=${idx + 10}`}
                    className="h-full w-full object-cover"
                    alt={feature}
                  />
                </div>
              </div>
              <div className="w-full space-y-6 md:w-2/5">
                <span className="font-display text-6xl leading-none font-light text-refenti-gold opacity-20">
                  0{idx + 1}
                </span>
                <h3 className="font-display text-4xl font-light tracking-tight text-refenti-charcoal">
                  {feature}
                </h3>
                <div className="space-y-4">
                  <p className="text-lg leading-relaxed font-light text-gray-500">
                    The {feature.toLowerCase()} at Refency Bolle is designed for
                    the discerning global citizen. Every detail has been
                    meticulously scrutinized to ensure a seamless fusion of
                    high-fashion utility and aesthetic purity.
                  </p>
                  <p className="text-lg leading-relaxed font-light text-gray-500">
                    We leverage advanced structural engineering and premium
                    materials to deliver an experience that transcends
                    traditional real estate. From the initial conceptual drawing
                    to the final finish, quality is our singular focus.
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
            <h2 className="font-display text-6xl font-light tracking-tight text-refenti-charcoal uppercase md:text-8xl">
              Elevate Your <br />
              <span className="text-shadow-hero text-refenti-gold italic">
                Standard
              </span>
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

export default RefencyBole
