import { useEffect, useRef, useState } from "react"
import { Helmet } from "react-helmet-async"
import { Link } from "react-router-dom"
import FadeIn from "../components/FadeIn"
import LazyImage from "../components/LazyImage"
import { getEvents, getProjects } from "../lib/api"
import type { EventItem, Project } from "../types"

function EventCard({ event, index }: { event: EventItem; index: number }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      className="group rounded-4xl border border-gray-100 bg-white p-6 shadow-[0_15px_50px_-15px_rgba(0,0,0,0.05)] transition-all duration-1000"
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="relative mb-6 aspect-4/5 overflow-hidden rounded-3xl">
        <LazyImage
          src={event.image}
          alt={event.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="px-2 pb-2">
        <p className="mb-2 text-xs font-bold text-refenti-gold uppercase">
          {event.date}
        </p>
        <h3 className="mb-1 font-display text-xl font-light text-refenti-charcoal">
          {event.title}
        </h3>
        <p className="mb-4 text-xs font-bold text-gray-500 uppercase">
          {event.location}
        </p>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 text-xs font-bold text-refenti-gold uppercase opacity-80 transition-opacity hover:opacity-100"
        >
          {isOpen ? "Close" : "View Details"}
        </button>

        <div
          className={`overflow-hidden transition-all duration-700 ease-in-out ${isOpen ? "mt-4 max-h-40 border-t border-gray-100 pt-4 opacity-100" : "max-h-0 opacity-0"}`}
        >
          <p className="text-sm leading-relaxed font-light text-gray-600">
            {event.details}
          </p>
        </div>
      </div>
    </div>
  )
}

function PhilosophySection() {
  // const [progress, setProgress] = useState(0)
  // const sectionRef = useRef<HTMLDivElement>(null)

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (!sectionRef.current) return
  //     const rect = sectionRef.current.getBoundingClientRect()
  //     const windowHeight = window.innerHeight
  //     let p = (windowHeight - rect.top) / (windowHeight * 0.8)
  //     setProgress(Math.min(Math.max(p, 0), 1))
  //   }
  //   window.addEventListener("scroll", handleScroll, { passive: true })
  //   handleScroll()
  //   return () => window.removeEventListener("scroll", handleScroll)
  // }, [])

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768
  // const archRadiusY = isMobile ? 150 - progress * 100 : 250 - progress * 200
  const baseRadius = isMobile ? "2.5rem" : "4rem"

  return (
    <section
      // ref={sectionRef}
      className="flex items-center justify-center px-4 pt-16 md:px-8 md:pt-28"
    >
      <div
        className="relative w-full max-w-6xl overflow-hidden border border-gray-100 bg-white p-6 shadow-sm transition-all duration-700 ease-out md:p-14"
        style={{
          borderTopLeftRadius: baseRadius,
          borderTopRightRadius: baseRadius,
          // borderTopLeftRadius:
          //   progress >= 0.95 ? baseRadius : `${50}% ${archRadiusY}px`,
          // borderTopRightRadius:
          //   progress >= 0.95 ? baseRadius : `${50}% ${archRadiusY}px`,
          borderBottomLeftRadius: baseRadius,
          borderBottomRightRadius: baseRadius,
        }}
      >
        <div className="grid items-center gap-8 md:grid-cols-2 md:gap-10">
          <div className="space-y-6 md:space-y-8">
            <FadeIn delay={100}>
              <h2 className="font-display text-3xl leading-[1.1] font-light text-refenti-charcoal sm:text-4xl md:text-6xl">
                Quality <span className="text-refenti-gold ">Assets</span> <br />
                in Growth Markets.
              </h2>
            </FadeIn>
            <FadeIn delay={200}>
              <p className="max-w-sm text-sm leading-relaxed font-light text-gray-600 md:text-base">
                Refenti Realty Group is a real estate investment and development
                platform focused on the creation of institutional-quality assets
                in select growth markets.
              </p>
            </FadeIn>
          </div>
          <FadeIn delay={300} direction="right">
            <div className="relative aspect-square overflow-hidden rounded-4xl border border-gray-50 shadow-sm md:rounded-[3rem]">
              <img
                src="/art.webp"
                className="h-full w-full object-cover opacity-90"
                alt="Interior"
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

function Home() {
  const [scrollY, setScrollY] = useState(0)
  const [projects, setProjects] = useState<Project[]>([])
  const [featuredEvents, setFeaturedEvents] = useState<EventItem[]>([])
  const [loading, setLoading] = useState(true)
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll, { passive: true })

    const fetchData = async () => {
      const [projectsResult, eventsResult] = await Promise.all([
        getProjects(),
        getEvents(),
      ])

      if (projectsResult.error) {
        console.error("Failed to load projects:", projectsResult.error.message)
      } else {
        setProjects(projectsResult.data)
      }

      if (eventsResult.error) {
        console.error("Failed to load events:", eventsResult.error.message)
      } else {
        setFeaturedEvents(eventsResult.data.filter((e) => e.isFeatured))
      }

      setLoading(false)
    }
    fetchData()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="overflow-hidden">
      <Helmet>
        <title>Refenti Group - Premium Real Estate Development</title>
        <meta
          name="description"
          content="Refenti Group specializes in luxury real estate development across residential, mixed-use, commercial, and hospitality sectors. Precision-driven urban destinations in Ethiopia and Dubai."
        />
      </Helmet>
      <section className="relative flex min-h-[64vh] w-full items-end justify-center overflow-hidden pb-12 md:min-h-[80vh] md:pb-20">
        <div
          className="absolute inset-[-5%] animate-fade-in"
          style={{
            backgroundImage: `url('/home-hero.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: `translateY(${-scrollY * 0.1}px)`,
            willChange: "transform",
            animationDuration: "1200ms",
          }}
        />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-refenti-offwhite via-refenti-offwhite/40 to-transparent" />

        <div className="relative z-10 mx-auto max-w-6xl space-y-3 px-4 text-center sm:px-6 md:space-y-6">
          <FadeIn direction="none" duration={1000} delay={1000}>
            <img
              src="/reftext.png"
              alt="Refenti Realty Group"
              className="mx-auto w-full max-w-3xl"
            />
          </FadeIn>
          <FadeIn direction="none" duration={1000} delay={1300}>
            <p className="font-sans text-xs font-bold text-refenti-gold uppercase opacity-90 md:text-sm">
              Refining urban landscapes
            </p>
          </FadeIn>
        </div>
      </section>

      <PhilosophySection />

      <section className="px-4 pt-20 pb-24 md:pt-40 md:pb-54">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <div className="space-y-6 text-center md:space-y-8">
              <h2 className="font-display text-3xl leading-[1.2] font-light text-refenti-charcoal md:text-5xl">
                A Platform Built for{" "}
                <span className="text-refenti-gold ">
                  Long-Term Value
                </span>
              </h2>
              <p className="mx-auto max-w-3xl text-sm leading-relaxed font-light text-gray-600 md:text-base">
                The platform operates with a long-term orientation, disciplined
                capital deployment, and a structured development approach
                designed to support governance, execution certainty, and
                long-term asset performance. Refenti operates under Solstice
                Ventures Holding (SVH) and serves as a public, non-operational
                institutional reference point.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="px-6 pb-20 md:px-12 md:pb-32">
        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl md:rounded-3xl">
            <div className="grid gap-0 md:grid-cols-5">
              {/* Left Column - Heading */}
              <div className="flex flex-col justify-center border-b border-gray-100 bg-gradient-to-br from-refenti-offwhite to-white p-8 md:col-span-2 md:border-r md:border-b-0 md:p-12">
                <FadeIn>
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-3 rounded-full border border-refenti-gold/20 bg-refenti-gold/5 px-4 py-2">
                      <div className="h-2 w-2 rounded-full bg-refenti-gold" />
                      <span className="font-sans text-xs font-bold tracking-wider text-refenti-gold uppercase">
                        The Collection
                      </span>
                    </div>
                    <h2 className="font-display text-4xl leading-tight font-light text-refenti-charcoal uppercase md:text-5xl">
                      Portfolio
                    </h2>
                  </div>
                </FadeIn>
              </div>

              {/* Right Column - Content */}
              <div className="flex flex-col justify-center p-8 md:col-span-3 md:p-12">
                <FadeIn delay={100}>
                  <div className="space-y-8">
                    <p className="text-sm leading-relaxed font-light text-gray-700 md:text-base md:leading-relaxed">
                      Refenti's portfolio represents the application of a
                      consistent investment and development logic across a
                      selective set of real estate assets. Each project reflects
                      how the platform originates, structures, and stewards
                      assets with a primary focus on long-term capital
                      appreciation, supported by disciplined execution and
                      operational resilience.
                    </p>
                    <div className="flex items-center gap-4">
                      <Link
                        to="/projects"
                        className="group inline-flex items-center gap-3 rounded-xl bg-refenti-charcoal px-6 py-3 text-xs font-bold text-white uppercase shadow-lg transition-all duration-300 hover:bg-refenti-gold hover:shadow-xl"
                      >
                        View Projects
                        <svg
                          className="h-4 w-4 transition-transform group-hover:translate-x-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </Link>
                      <div className="flex items-center gap-2 text-xs font-light text-gray-400">
                        <div className="h-px w-8 bg-gray-200" />
                        <span>Selective Development</span>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              </div>
            </div>

            {/* Interactive Project Showcase */}
            <div className="relative">
              {projects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2">
                  {/* Left: Project Titles */}
                  <div className="border-t border-gray-100 p-6 md:border-r md:p-8">
                    <div className="space-y-1">
                      {projects.map((project) => (
                        <button
                          key={project.id}
                          onClick={() => setHoveredProject(project)}
                          className={`w-full rounded-lg px-4 py-3 text-left transition-all duration-300 ${
                            hoveredProject?.id === project.id
                              ? "bg-refenti-gold/10 text-refenti-gold"
                              : "text-refenti-charcoal hover:bg-gray-50"
                          }`}
                        >
                          <div className="font-display text-xl font-light uppercase">
                            {project.name}
                          </div>
                          <div className="mt-1 text-xs font-light text-gray-500">
                            {project.location}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Right: Project Preview */}
                  <div className="border-t border-gray-100 md:border-t-0">
                    {hoveredProject ? (
                      <div
                        key={hoveredProject.id}
                        className="h-full animate-fade-in"
                        style={{ animationDuration: "500ms" }}
                      >
                        <div className="relative aspect-[16/10] overflow-hidden">
                          <img
                            src={hoveredProject.image}
                            alt={hoveredProject.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="p-6 md:p-8">
                          <h3 className="mb-6 font-display text-2xl font-light text-refenti-charcoal uppercase">
                            Key Features
                          </h3>
                          <ul className="space-y-3">
                            {hoveredProject.projectFeatures
                              ?.slice(0, 4)
                              .map((feature, idx) => (
                                <li
                                  key={idx}
                                  className="flex items-start gap-3 text-sm text-gray-700"
                                  style={{
                                    animation: "fade-in 500ms ease-out",
                                    animationDelay: `${idx * 50}ms`,
                                    animationFillMode: "both",
                                  }}
                                >
                                  <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-refenti-gold" />
                                  <span className="font-light">{feature}</span>
                                </li>
                              ))}
                          </ul>
                        </div>
                      </div>
                    ) : (
                      <div className="flex h-full min-h-[300px] items-center justify-center p-12 text-center">
                        <p className="text-sm font-light text-gray-400">
                          Click on a project to view details
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center border-t border-gray-100 p-12">
                  <p className="text-sm font-light text-gray-400">
                    No projects available
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 md:py-28">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <div className="mb-8 space-y-4 text-center md:mb-10 md:space-y-6">
              <div className="space-y-2 md:space-y-3">
                <h2 className="font-display text-3xl font-light text-refenti-charcoal md:text-6xl">
                  Featured Updates
                </h2>
                <p className="font-sans text-xs font-bold text-refenti-gold uppercase opacity-80">
                  Current Milestones
                </p>
              </div>
              <Link
                to="/news"
                className="inline-flex items-center gap-2 rounded-full border border-refenti-gold/30 bg-white px-6 py-3 text-xs font-bold text-refenti-gold uppercase shadow-sm transition-all duration-300 hover:border-refenti-gold hover:bg-refenti-gold hover:text-white hover:shadow-md"
              >
                View All News & Events
                <svg
                  className="h-3 w-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          </FadeIn>

          {featuredEvents.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:gap-10 lg:grid-cols-3">
              {featuredEvents.map((event, idx) => (
                <FadeIn key={event.id} delay={idx * 150}>
                  <EventCard event={event} index={idx} />
                </FadeIn>
              ))}
            </div>
          ) : (
            <FadeIn delay={200}>
              <div className="py-20 text-center font-display text-lg text-gray-500  md:text-xl">
                No recent updates at this moment.
              </div>
            </FadeIn>
          )}
        </div>
      </section>
    </div>
  )
}

export default Home
