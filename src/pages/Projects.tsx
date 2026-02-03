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
        <section className="relative flex h-screen w-full items-end justify-center overflow-hidden bg-refenti-offwhite pb-20 md:pb-32">
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

          <div className="relative z-10 mx-auto max-w-7xl space-y-8 px-4 text-center">
            <FadeIn direction="none" duration={1000}>
              <div className="space-y-6 md:space-y-10">
                <h1 className="font-display text-7xl leading-none font-light tracking-tighter text-refenti-charcoal uppercase md:text-[12rem]">
                  Portfolio
                </h1>
                <p className="font-sans text-[10px] font-bold tracking-ultra text-refenti-gold uppercase md:text-xs">
                  Refined Urban Assets
                </p>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Project Grid */}
        <div className="relative z-10 -mt-10 px-6 pt-16 md:-mt-16 md:px-12 md:pt-28">
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
                          className="h-full w-full object-cover grayscale-[0.2] transition-all duration-1000 group-hover:scale-105 group-hover:grayscale-0"
                        />
                      </div>

                      {/* Project Info Container */}
                      <div className="space-y-6 px-6 md:px-10">
                        <div className="space-y-3">
                          <div className="flex items-center gap-4">
                            <p className="text-[10px] font-bold tracking-extrawide text-refenti-gold uppercase">
                              {project.assetClass}
                            </p>
                            <div className="h-px w-8 bg-gray-200" />
                          </div>
                          <h2 className="font-display text-4xl leading-none font-light text-refenti-charcoal transition-colors duration-700 group-hover:text-refenti-gold md:text-6xl">
                            {project.name}
                          </h2>
                          <p className="font-sans text-[9px] font-bold tracking-widest text-gray-400 uppercase">
                            {project.location}
                          </p>
                        </div>
                        <p className="max-w-lg text-justify text-sm leading-relaxed font-light text-gray-600 opacity-80 transition-opacity duration-700 group-hover:opacity-100">
                          {project.description}
                        </p>

                        <div className="pt-4">
                          <span className="inline-flex -translate-x-2.5 items-center gap-4 text-[9px] font-bold tracking-ultra text-refenti-gold uppercase opacity-0 transition-all duration-700 group-hover:translate-x-0 group-hover:opacity-100">
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
