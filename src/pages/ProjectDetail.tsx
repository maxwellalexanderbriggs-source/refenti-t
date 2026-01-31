import { useEffect, useRef, useState } from "react"
import { Navigate, useParams } from "react-router-dom"
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
      className={`mx-auto flex max-w-7xl flex-col items-center gap-12 px-8 py-16 md:flex-row md:gap-24 md:px-12 ${!isLeft ? "md:flex-row-reverse" : ""}`}
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
        <div className="space-y-2">
          <span className="font-display text-7xl leading-none font-light text-refenti-gold opacity-10 select-none">
            0{index + 1}
          </span>
          <h3 className="font-display text-4xl leading-[1.1] font-light tracking-tight text-refenti-charcoal md:text-5xl">
            {section.title}
          </h3>
        </div>
        <div className="max-w-lg space-y-4">
          <p className="text-justify text-sm leading-relaxed font-light text-gray-700">
            {section.text}
          </p>
          <div className="flex items-center gap-6">
            <div className="h-px w-12 bg-refenti-gold" />
            <p className="font-sans text-[10px] font-bold tracking-[0.3em] text-refenti-gold uppercase">
              Standard of Excellence
            </p>
          </div>
        </div>
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
      <div className="flex min-h-screen items-center justify-center bg-refenti-offwhite">
        <p className="text-sm text-gray-400">Loading...</p>
      </div>
    )
  }

  if (!project) {
    return <Navigate to="/projects" replace />
  }

  return (
    <div className="min-h-screen bg-refenti-offwhite">
      {/* Hero Banner */}
      <section className="relative flex h-screen w-full items-end justify-center overflow-hidden bg-refenti-offwhite pb-32">
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

        <div className="relative z-10 mx-auto max-w-6xl space-y-12 px-4 text-center">
          <div className="space-y-6">
            <h1 className="font-display text-7xl leading-none font-light tracking-tighter text-refenti-charcoal uppercase md:text-[10rem]">
              {project.name}
            </h1>
            <p className="font-sans text-[10px] font-bold tracking-[0.7em] text-refenti-gold uppercase md:text-xs">
              The Refenti Collection
            </p>
          </div>
        </div>
      </section>

      {/* Action Bar */}
      <section className="relative border-b border-gray-100 bg-refenti-offwhite">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-8 py-8 md:flex-row">
          <div className="flex flex-col items-center md:items-start">
            <p className="font-sans text-[10px] font-bold tracking-[0.2em] text-refenti-charcoal uppercase opacity-40">
              Project Inquiry Portal
            </p>
          </div>

          <div className="flex flex-col items-center gap-2 md:items-end">
            {project.brochureUrl && (
              <a
                href={project.brochureUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-refenti-charcoal px-12 py-4 text-center font-sans text-[10px] font-bold tracking-widest text-white uppercase shadow-xl transition-all hover:bg-refenti-gold active:scale-95"
              >
                Download Brochure
              </a>
            )}
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-refenti-gold" />
              <p className="text-[9px] font-bold tracking-[0.15em] text-refenti-gold uppercase">
                Under Construction
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Asset Narrative Section */}
      <section className="bg-white px-8 py-24 md:px-12 md:py-40">
        <div className="mx-auto grid max-w-7xl items-center gap-16 md:grid-cols-2">
          <div className="space-y-8">
            <div className="space-y-3">
              <p className="font-sans text-[9px] font-bold tracking-ultra text-refenti-gold uppercase">
                Asset Narrative
              </p>
              <h2 className="font-display text-4xl leading-tight font-light text-refenti-charcoal uppercase md:text-6xl">
                {project.introTitle?.split(" ")[0]} <br />
                <span className="text-refenti-gold italic">
                  {project.introTitle?.split(" ").slice(1).join(" ")}
                </span>
              </h2>
            </div>
            <p className="max-w-xl text-justify text-sm leading-relaxed font-light text-gray-700">
              {project.introText}
            </p>
          </div>

          <div className="relative aspect-16/10 overflow-hidden rounded-[2.5rem] shadow-2xl">
            <img
              src={project.introImage || project.image}
              className="h-full w-full object-cover"
              alt={`${project.name} Perspective`}
            />
            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-refenti-charcoal/20 to-transparent" />
          </div>
        </div>
      </section>

      {/* Project Features Section */}
      {project.projectFeatures && project.projectFeatures.length > 0 && (
        <section className="border-t border-gray-100 bg-refenti-offwhite px-8 py-24 md:px-12">
          <div className="mx-auto max-w-7xl space-y-16">
            <div className="space-y-3 text-center md:text-left">
              <p className="font-sans text-[9px] font-bold tracking-ultra text-refenti-gold uppercase">
                Scope of Amenities
              </p>
              <h2 className="font-display text-4xl font-light text-refenti-charcoal uppercase md:text-5xl">
                Project{" "}
                <span className="text-refenti-gold italic">Features</span>
              </h2>
            </div>

            <div className="flex flex-wrap gap-4">
              {project.projectFeatures.map((feature, idx) => (
                <div
                  key={idx}
                  className="group flex cursor-default items-center justify-center rounded-full border border-gray-100 bg-white px-10 py-5 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-md"
                  style={{ transitionDelay: `${idx * 100}ms` }}
                >
                  <span className="text-[11px] font-bold tracking-widest text-refenti-charcoal uppercase transition-colors group-hover:text-refenti-gold">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Main Attributes Section */}
      <section className="bg-white py-24 md:py-32">
        <div className="mx-auto mb-16 max-w-7xl px-8 md:px-12">
          <div className="space-y-3 text-center md:text-left">
            <p className="font-sans text-[9px] font-bold tracking-ultra text-refenti-gold uppercase">
              Technical Depth
            </p>
            <h2 className="font-display text-4xl font-light text-refenti-charcoal uppercase md:text-6xl">
              Main <span className="text-refenti-gold italic">Attributes</span>
            </h2>
          </div>
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

      <footer className="border-t border-gray-100 bg-white px-8 py-24 text-center">
        <div className="mx-auto max-w-3xl space-y-8">
          <h2 className="font-display text-4xl leading-none font-light text-refenti-charcoal uppercase">
            Define Your <span className="text-refenti-gold italic">Legacy</span>
          </h2>
          <p className="text-justify text-base leading-relaxed font-light tracking-wide text-gray-600">
            Discover a level of exclusivity reserved for the most discerning
            global citizens.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default ProjectDetail
