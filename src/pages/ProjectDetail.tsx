import { useEffect, useRef, useState } from "react"
import { Helmet } from "react-helmet-async"
import { Navigate, useParams } from "react-router-dom"
import FadeIn from "../components/FadeIn"
import { getProjectById } from "../lib/api"
import type { Project } from "../types"

function FeatureSection({
  section,
  index,
}: {
  section: { title: string; text: string; image: string }
  index: number
  projectName: string
}) {
  const [targetProgress, setTargetProgress] = useState(0)
  const [smoothedProgress, setSmoothedProgress] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const requestRef = useRef<number>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight

      const start = windowHeight
      const end = windowHeight * 0.15
      const current = rect.top

      let p = (start - current) / (start - end)
      p = Math.min(Math.max(p, 0), 1)
      setTargetProgress(p)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const animate = () => {
      setSmoothedProgress((prev) => {
        const diff = targetProgress - prev
        const next = prev + diff * 0.025
        if (Math.abs(diff) < 0.0001) return targetProgress
        return next
      })
      requestRef.current = requestAnimationFrame(animate)
    }
    requestRef.current = requestAnimationFrame(animate)
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current)
    }
  }, [targetProgress])

  const isLeft = index % 2 === 0
  const widthPercentage = 40 + smoothedProgress * 60

  return (
    <div
      ref={sectionRef}
      className={`mx-auto flex max-w-7xl flex-col items-center gap-8 px-8 py-12 md:flex-row md:gap-16 md:px-12 ${!isLeft ? "md:flex-row-reverse" : ""}`}
    >
      <div
        className={`flex h-[50vh] w-full md:h-[60vh] md:w-1/2 ${isLeft ? "justify-end" : "justify-start"}`}
      >
        <div
          className="relative h-full overflow-hidden rounded-[3.5rem] shadow-2xl"
          style={{
            width: `${widthPercentage}%`,
            transition: "none",
          }}
        >
          <div
            className="absolute h-full"
            style={{
              width: "50vw",
              right: isLeft ? 0 : "auto",
              left: !isLeft ? 0 : "auto",
            }}
          >
            <img
              src={section.image}
              className="h-full w-full object-cover"
              alt={section.title}
            />
          </div>
        </div>
      </div>

      <div className={`w-full space-y-6 px-4 md:w-1/2 md:px-12`}>
        <FadeIn delay={100}>
          <div className="space-y-2">
            <span className="font-display text-5xl leading-none font-light text-refenti-gold opacity-10 select-none">
              0{index + 1}
            </span>
            <h3 className="font-display text-4xl leading-[1.1] font-light text-refenti-charcoal md:text-5xl">
              {section.title}
            </h3>
          </div>
        </FadeIn>
        <FadeIn delay={200}>
          <div className="max-w-lg space-y-4">
            <p className="text-sm leading-relaxed font-light text-gray-700">
              {section.text}
            </p>
            <div className="flex items-center gap-6">
              <div className="h-px w-12 bg-refenti-gold" />
              <p className="font-sans text-xs font-bold text-refenti-gold uppercase">
                Standard of Excellence
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  )
}

function ProjectDetail() {
  const { id } = useParams()
  const [scrollY, setScrollY] = useState(0)
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)

    // Fetch project data
    const fetchProject = async () => {
      if (!id) {
        setLoading(false)
        return
      }

      const { data, error } = await getProjectById(id)
      if (error) {
        console.error("Failed to load project:", error.message)
      } else {
        setProject(data)
      }
      setLoading(false)
    }
    fetchProject()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [id])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-gray-400">Loading...</p>
      </div>
    )
  }

  if (!project) {
    return <Navigate to="/projects" replace />
  }

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>{project.name} - Refenti Group Project</title>
        <meta
          name="description"
          content={`${project.name} - ${project.assetClass} development by Refenti Group. ${project.description}`}
        />
      </Helmet>
      {/* Hero Banner */}
      <section className="relative flex min-h-[70vh] w-full items-end justify-center overflow-hidden pb-16 md:min-h-[90vh] md:pb-32">
        <div
          className="absolute inset-[-5%]"
          style={{
            backgroundImage: `url('${project.image}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: `translateY(${-scrollY * 0.1}px)`,
            willChange: "transform",
          }}
        />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-refenti-offwhite via-refenti-offwhite/80 to-transparent" />

        <div className="relative z-10 mx-auto max-w-6xl space-y-6 px-4 text-center md:space-y-8">
          <FadeIn direction="none" duration={1000}>
            <h1 className="font-display text-6xl leading-none font-light text-refenti-charcoal uppercase md:text-9xl">
              {project.name}
            </h1>
          </FadeIn>
        </div>
      </section>

      {/* Action Bar */}
      <section className="relative border-b border-gray-100">
        <FadeIn>
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-8 py-8 md:flex-row">
            <div className="flex flex-col items-center md:items-start">
              <p className="font-sans text-xs font-bold text-refenti-charcoal uppercase opacity-40">
                Project Inquiry Portal
              </p>
            </div>

            <div className="flex flex-col items-center gap-2 md:items-end">
              {project.brochureUrl && (
                <a
                  href={project.brochureUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-refenti-charcoal px-12 py-4 text-center font-sans text-xs font-bold text-white uppercase shadow-xl transition-all hover:bg-refenti-gold active:scale-95"
                >
                  Download Brochure
                </a>
              )}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Asset Narrative Section */}
      <section className="bg-white px-8 py-20 md:px-12 md:py-36">
        <div className="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-2">
          <div className="space-y-8">
            <FadeIn>
              <div className="space-y-3">
                <p className="font-sans text-xs font-bold text-refenti-gold uppercase">
                  Asset Narrative
                </p>
                <h2 className="font-display text-4xl leading-tight font-light text-refenti-charcoal uppercase md:text-6xl">
                  {project.introTitle?.split(" ")[0]} <br />
                  <span className="text-refenti-gold ">
                    {project.introTitle?.split(" ").slice(1).join(" ")}
                  </span>
                </h2>
              </div>
            </FadeIn>
            <FadeIn delay={100}>
              <p className="max-w-md text-sm leading-relaxed font-light text-gray-700">
                {project.introText}
              </p>
            </FadeIn>
          </div>

          <FadeIn delay={200} direction="right">
            <div className="relative overflow-hidden rounded-[2.5rem] shadow-2xl">
              <img
                src={project.introImage || project.image}
                className="w-full"
                alt={`${project.name} Perspective`}
              />
              <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-refenti-charcoal/20 to-transparent" />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Project Information Section */}
      <section className="border-y border-gray-100 px-8 py-16 md:px-12 md:py-20">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <div className="mb-12 space-y-3 text-center">
              <p className="font-sans text-xs font-bold text-refenti-gold uppercase">
                Project Intelligence
              </p>
              <h2 className="font-display text-3xl font-light text-refenti-charcoal uppercase md:text-4xl">
                Key <span className="text-refenti-gold ">Details</span>
              </h2>
            </div>
          </FadeIn>

          <div className="grid gap-8 md:grid-cols-3">
            <FadeIn delay={100}>
              <div className="group relative overflow-hidden rounded-full border-2 border-gray-200 bg-white p-8 shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.35)]">
                <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-refenti-gold to-transparent" />
                <div className="space-y-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-refenti-gold/10">
                    <svg
                      className="h-8 w-8 text-refenti-gold"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div className="space-y-2">
                    <p className="font-sans text-xs font-bold text-gray-400 uppercase">
                      Location
                    </p>
                    <p className="font-display text-2xl font-light text-refenti-charcoal">
                      {project.location}
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={200}>
              <div className="group relative overflow-hidden rounded-full border-2 border-gray-200 bg-white p-8 shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.35)]">
                <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-refenti-gold to-transparent" />
                <div className="space-y-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-refenti-gold/10">
                    <svg
                      className="h-8 w-8 text-refenti-gold"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                  </div>
                  <div className="space-y-2">
                    <p className="font-sans text-xs font-bold text-gray-400 uppercase">
                      Asset Class
                    </p>
                    <p className="font-display text-2xl font-light text-refenti-charcoal">
                      {project.assetClass}
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={300}>
              <div className="group relative overflow-hidden rounded-full border-2 border-gray-200 bg-white p-8 shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.35)]">
                <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-refenti-gold to-transparent" />
                <div className="space-y-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-refenti-gold/10">
                    <svg
                      className="h-8 w-8 text-refenti-gold"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="space-y-2">
                    <p className="font-sans text-xs font-bold text-gray-400 uppercase">
                      Status
                    </p>
                    <p className="font-display text-2xl font-light text-refenti-charcoal">
                      {project.status || "In Progress"}
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Project Features Section */}
      {project.projectFeatures && project.projectFeatures.length > 0 && (
        <section className="border-t border-gray-100 px-8 py-16 md:px-12">
          <div className="mx-auto max-w-7xl space-y-10">
            <FadeIn>
              <div className="space-y-3 text-center md:text-left">
                <p className="font-sans text-xs font-bold text-refenti-gold uppercase">
                  Scope of Amenities
                </p>
                <h2 className="font-display text-4xl font-light text-refenti-charcoal uppercase md:text-5xl">
                  Project{" "}
                  <span className="text-refenti-gold ">Features</span>
                </h2>
              </div>
            </FadeIn>

            <div className="flex flex-wrap gap-4">
              {project.projectFeatures.map((feature, idx) => (
                <FadeIn key={idx} delay={idx * 75}>
                  <div className="group flex cursor-default items-center justify-center rounded-full border border-gray-100 bg-white px-10 py-5 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-md">
                    <span className="text-xs font-bold text-refenti-charcoal uppercase transition-colors group-hover:text-refenti-gold">
                      {feature}
                    </span>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Main Attributes Section */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto mb-10 max-w-7xl px-8 md:px-12">
          <FadeIn>
            <div className="space-y-3 text-center md:text-left">
              <p className="font-sans text-xs font-bold text-refenti-gold uppercase">
                Technical Depth
              </p>
              <h2 className="font-display text-4xl font-light text-refenti-charcoal uppercase md:text-6xl">
                Main{" "}
                <span className="text-refenti-gold ">Attributes</span>
              </h2>
            </div>
          </FadeIn>
        </div>
        <div className="w-full">
          {project.detailSections?.map((section, idx) => (
            <FeatureSection
              key={idx}
              section={section}
              index={idx}
              projectName={project.name}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

export default ProjectDetail
