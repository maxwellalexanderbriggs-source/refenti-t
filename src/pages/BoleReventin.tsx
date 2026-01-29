import React, { useEffect, useRef, useState } from "react"
// Use getProjects() instead of the missing PROJECTS export
import { getProjects } from "../constants"

// Explicitly define as React.FC to include standard props like 'key' in the type check
const FeatureSection: React.FC<{ feature: string; index: number }> = ({
  feature,
  index,
}) => {
  const [progress, setProgress] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight

      // Calculate progress: 0 when top enters bottom, 1 when centered or fully in
      const start = windowHeight
      const end = windowHeight * 0.2
      const current = rect.top

      let p = (start - current) / (start - end)
      p = Math.min(Math.max(p, 0), 1)
      setProgress(p)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Initial check
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isLeft = index % 2 === 0

  return (
    <div
      ref={sectionRef}
      className={`flex flex-col items-center gap-16 py-12 md:flex-row md:gap-24 ${!isLeft ? "md:flex-row-reverse" : ""}`}
    >
      {/* Image Container with Scroll Expansion */}
      <div className="relative h-[50vh] w-full overflow-hidden md:h-[70vh] md:w-1/2">
        <div
          className="absolute inset-0 overflow-hidden bg-gray-100"
          style={{
            transform: `scaleX(${progress})`,
            transformOrigin: isLeft ? "right" : "left",
            transition: "transform 0.1s ease-out",
          }}
        >
          <img
            src={`https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=1200&sig=${index + 50}`}
            className="h-full w-full object-cover"
            alt={feature}
          />
        </div>
      </div>

      {/* Text Container */}
      <div className="reveal w-full space-y-8 px-8 md:w-1/2 md:px-0">
        <span className="font-display text-8xl leading-none font-light text-refenti-gold opacity-10">
          0{index + 1}
        </span>
        <h3 className="font-display text-5xl font-light tracking-tight text-refenti-charcoal">
          {feature}
        </h3>
        <div className="max-w-lg space-y-6">
          <p className="text-lg leading-relaxed font-light text-gray-500">
            The {feature.toLowerCase()} at Bole Reventin is a masterpiece of
            functional luxury. Every square inch has been designed to provide an
            experience that is both visually stunning and profoundly
            comfortable.
          </p>
          <p className="text-lg leading-relaxed font-light text-gray-500 italic">
            "Architectural perfection is not just what you see, but how it makes
            you feel."
          </p>
        </div>
        <div className="h-[1px] w-24 bg-refenti-gold" />
      </div>
    </div>
  )
}

const BoleReventin: React.FC = () => {
  const property = getProjects()[0] // Bole High-rise

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Image Only */}
      <section className="relative h-[70vh] w-full overflow-hidden bg-white">
        <img
          src={property.image}
          className="h-full w-full object-cover opacity-95"
          alt="Bole Reventin Flagship"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
      </section>

      {/* Page Title & Narrative on White */}
      <section className="reveal bg-white px-8 py-24">
        <div className="mx-auto max-w-6xl space-y-16 text-center">
          <div className="space-y-4">
            <p className="font-sans text-[10px] font-bold tracking-[0.5em] text-refenti-gold uppercase">
              Flagship Project
            </p>
            <h1 className="font-display text-7xl leading-none font-light tracking-tighter text-refenti-charcoal uppercase md:text-[10rem]">
              Bole Reventin
            </h1>
          </div>

          <div className="mx-auto max-w-4xl space-y-12">
            <p className="font-display text-3xl leading-tight font-light text-refenti-charcoal md:text-5xl">
              A high-rise sanctuary that redefines the skyline.{" "}
              {property.description} Experience the pinnacle of Refenti's
              architectural vision.
            </p>

            <div className="flex flex-wrap justify-center gap-16 pt-12">
              {[
                { val: "32", label: "Floors" },
                { val: "24/7", label: "Concierge" },
                { val: "180°", label: "Panoramic" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-display text-5xl text-refenti-gold">
                    {stat.val}
                  </p>
                  <p className="mt-3 text-[10px] font-bold tracking-[0.3em] text-gray-400 uppercase">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features with Scroll Expansion */}
      <section className="bg-white">
        <div className="max-w-[100vw] overflow-x-hidden">
          {/* Fix: Using projectFeatures instead of features to match type definition */}
          {property.projectFeatures?.map((feature, idx) => (
            <FeatureSection key={feature} feature={feature} index={idx} />
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="reveal mt-24 bg-refenti-offwhite px-8 py-40 text-center">
        <div className="mx-auto max-w-4xl space-y-12">
          <h2 className="font-display text-6xl leading-none font-light text-refenti-charcoal uppercase md:text-8xl">
            Secure Your <br />{" "}
            <span className="text-refenti-gold italic">Legacy</span>
          </h2>
          <p className="text-xl font-light tracking-wide text-gray-400">
            Units at Bole Reventin are strictly limited to ensure exclusivity
            and long-term value appreciation.
          </p>
          <div className="flex flex-col justify-center gap-8 pt-8 md:flex-row">
            <button className="rounded-2xl bg-refenti-charcoal px-16 py-6 font-sans text-[11px] font-bold tracking-[0.2em] text-white uppercase shadow-2xl transition-all hover:bg-refenti-gold">
              Download Dossier
            </button>
            <button className="rounded-2xl border border-gray-200 px-16 py-6 font-sans text-[11px] font-bold tracking-[0.2em] text-refenti-charcoal uppercase transition-all hover:bg-white">
              Book Private Tour
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default BoleReventin
