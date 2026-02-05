import { useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"
import { Link } from "react-router-dom"
import FadeIn from "../components/FadeIn"
import LazyImage from "../components/LazyImage"
import { getProjects } from "../lib/api"
import type { Project } from "../types"

function Projects() {
  const [scrollY, setScrollY] = useState(0)
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await getProjects()
      if (error) {
        console.error("Failed to load projects:", error.message)
      } else {
        setProjects(data)
      }
      setLoading(false)
    }
    fetchProjects()
  }, [])

  return (
    <>
      <Helmet>
        <title>Our Projects - Refenti Group Portfolio</title>
        <meta
          name="description"
          content="Explore Refenti Group's portfolio of luxury real estate projects. From residential developments to mixed-use landmarks across Ethiopia and Dubai."
        />
      </Helmet>
      <div className="min-h-screen bg-refenti-offwhite pb-16">
        {/* Cinematic Hero Banner */}
        <section className="relative flex min-h-[70vh] w-full items-end justify-center overflow-hidden bg-refenti-offwhite pb-16 md:min-h-[90vh] md:pb-32">
          <div
            className="absolute inset-[-10%]"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2400')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              transform: `translateY(${-scrollY * 0.15}px)`,
              willChange: "transform",
            }}
          />
          {/* Deep gradient overlay for text legibility and transition to off-white */}
          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-refenti-offwhite via-refenti-offwhite/60 to-black/20" />

          <div className="relative z-10 mx-auto max-w-6xl space-y-6 px-4 text-center md:space-y-8">
            <FadeIn direction="none" duration={1000}>
              <div className="space-y-3 md:space-y-6">
                <h1 className="font-display text-6xl leading-none font-light text-refenti-charcoal uppercase md:text-9xl">
                  Portfolio
                </h1>
                <p className="font-sans text-xs font-bold text-refenti-gold uppercase">
                  Refined Urban Assets
                </p>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Portfolio Overview */}
        <div className="relative z-10 px-6 pt-16 pb-20 md:px-12 md:py-32">
          <FadeIn delay={200}>
            <div className="mx-auto max-w-5xl">
              <div className="relative overflow-hidden rounded-3xl border border-gray-200/50 bg-white/80 p-8 shadow-xl backdrop-blur-sm md:p-12">
                <div className="absolute top-0 left-0 h-1 w-full bg-linear-to-r from-refenti-gold via-refenti-gold/50 to-transparent" />
                <div className="space-y-4">
                  <p className="font-sans text-xs font-bold tracking-wider text-refenti-gold uppercase">
                    Portfolio Overview
                  </p>
                  <p className="text-sm leading-relaxed font-light text-gray-700 md:text-base">
                    Refenti's portfolio comprises selectively developed assets
                    aligned with its investment and development mandate.
                    Projects are presented on a representative basis and may
                    include assets that are completed, under development, or in
                    advanced planning stages. Portfolio presentation is intended
                    to demonstrate platform capability rather than commercial
                    availability.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Project Grid */}
        <div className="relative z-10 px-6 md:px-12">
          <div className="mx-auto max-w-7xl">
            {loading ? (
              <FadeIn>
                <div className="py-20 text-center text-gray-400">
                  Loading projects...
                </div>
              </FadeIn>
            ) : (
              <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:gap-20">
                {projects.map((project, idx) => (
                  <FadeIn key={project.id} delay={idx * 150}>
                    <Link
                      to={`/projects/${project.id}`}
                      className="group block cursor-pointer space-y-10"
                    >
                      {/* Project Image Container */}
                      <div className="aspect-16/10 overflow-hidden rounded-[3.5rem] shadow-2xl transition-all duration-1000 group-hover:-translate-y-2 group-hover:shadow-refenti-gold/20">
                        <LazyImage
                          src={project.image}
                          alt={project.name}
                          className="h-full w-full object-cover grayscale-[0.2] transition-transform duration-500 group-hover:scale-105 group-hover:grayscale-0"
                        />
                      </div>

                      {/* Project Info Container */}
                      <div className="space-y-6 px-6 md:px-10">
                        <div className="space-y-3">
                          <div className="flex items-center gap-4">
                            <p className="text-xs font-bold text-refenti-gold uppercase">
                              {project.assetClass}
                            </p>
                            <div className="h-px w-8 bg-gray-200" />
                          </div>
                          <h2 className="font-display text-4xl leading-none font-light text-refenti-charcoal transition-colors duration-500 group-hover:text-refenti-gold md:text-6xl">
                            {project.name}
                          </h2>
                          <p className="font-sans text-xs font-bold text-gray-400 uppercase">
                            {project.location}
                          </p>
                        </div>
                        <p className="max-w-lg text-sm leading-relaxed font-light text-gray-600 opacity-80 transition-opacity duration-500 group-hover:opacity-100">
                          {project.description}
                        </p>

                        <div className="pt-4">
                          <span className="inline-flex -translate-x-2.5 items-center gap-4 text-xs font-bold text-refenti-gold uppercase opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">
                            View Asset Narrative
                            <span className="text-lg">→</span>
                          </span>
                        </div>
                      </div>
                    </Link>
                  </FadeIn>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Projects
