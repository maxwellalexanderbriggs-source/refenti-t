import React, { useEffect, useState } from "react"

const KazanchesExecutive: React.FC = () => {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const keyFeatures = [
    "City-Scale Mixed-Use Hub",
    "104,000 Built-Up Area",
    "28-Story Landmark Structure",
    "25,000 Luxury Apartments",
    "15,000 Hotel Infrastructure",
    "5,000 Event Facility",
    "31,000 Commercial and Office",
    "26,000 Parking Capacity",
  ]

  const detailSections = [
    {
      title: "Urban Commercial and Office Engine",
      subtitle: "The Business Center",
      text: "The development allocates 31,000 to professional office and modern mall spaces designed to handle major commercial footfall. This retail core is positioned to attract brands and corporate tenants seeking a central city presence. The layout is optimized for high occupancy and long-term commercial stability.",
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200",
    },
    {
      title: "Strategic Event and Hospitality Wing",
      subtitle: "International Gathering Hub",
      text: "A significant 5,000 zone is dedicated to Meetings, Conferences, and Exhibitions. This area provides high-capacity event infrastructure. This is paired with 15,000 of hotel space to cater to the international business community. The integration of these components establishes the project as a primary venue for regional gatherings.",
      image:
        "https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?auto=format&fit=crop&q=80&w=1200",
    },
    {
      title: "Modern Residential Integration",
      subtitle: "Vertical Living Experience",
      text: "The project includes 25,000 of residential apartments positioned within the 28-story frame. This provides a live-work environment in the heart of the business district. Residents have immediate vertical access to the dining, networking, and commercial services of the building.",
      image:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200",
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
            Refenti Kazanchis
          </h1>
          <p className="font-sans text-[10px] font-bold tracking-[0.6em] text-refenti-gold uppercase md:text-xs">
            Landmark Asset Collection
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
                <span className="text-refenti-gold italic">Identity</span>
              </h2>
            </div>
            <p className="max-w-lg text-justify text-sm leading-relaxed font-light text-gray-700 md:text-base">
              Refenti Kazanchis is a city-scale mixed-use development designed
              to serve as a landmark urban hub. This project integrates multiple
              high-capacity spaces—commercial, residential, and hospitality—to
              create a vibrant, high-value destination. At 28 stories, it
              represents the structural future of the Kazanchis business
              district.
            </p>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-[2.5rem] shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=1200"
              className="h-full w-full object-cover"
              alt="Kazanchis Rendering"
            />
          </div>
        </div>
      </section>

      {/* Project Features Section */}
      <section className="reveal border-t border-gray-100 bg-refenti-offwhite px-8 py-24">
        <div className="mx-auto max-w-7xl space-y-16">
          <div className="space-y-3">
            <p className="font-sans text-[9px] font-bold tracking-ultra text-refenti-gold uppercase">
              Functional Scope
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
              Core Pillars
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

export default KazanchesExecutive
