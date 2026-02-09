import { useEffect, useRef, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { getProjects } from "../lib/api"
import type { Project } from "../types"

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [projects, setProjects] = useState<Project[]>([])
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const location = useLocation()
  const menuTimeoutRef = useRef<number | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1600)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)

    const fetchProjects = async () => {
      const cached = sessionStorage.getItem("refenti-projects")
      if (cached) {
        try {
          const data = JSON.parse(cached)
          setProjects(data)
          if (data.length > 0) setHoveredProject(data[0])
          return
        } catch (e) {
          console.error("Failed to parse cached projects")
        }
      }

      const { data, error } = await getProjects()
      if (error) {
        console.error("Failed to load projects:", error.message)
      } else {
        setProjects(data)
        if (data.length > 0) setHoveredProject(data[0])
        sessionStorage.setItem("refenti-projects", JSON.stringify(data))
      }
    }
    fetchProjects()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
    setIsMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isMobileMenuOpen])

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Investment", path: "/investment" },
    { name: "Portfolio", path: "/projects", isDropdown: true },
    { name: "News & Events", path: "/news" },
    { name: "Contact", path: "/contact" },
  ]

  const handleMouseEnter = () => {
    if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current)
    setIsMenuOpen(true)
  }

  const handleMouseLeave = () => {
    menuTimeoutRef.current = window.setTimeout(() => {
      setIsMenuOpen(false)
    }, 400)
  }

  return (
    <>
      {/* Mobile Menu Backdrop */}
      <div
        onClick={() => setIsMobileMenuOpen(false)}
        className={`fixed inset-0 z-98 bg-black/20 transition-all duration-700 ${isMobileMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
      />

      <div
        className="pointer-events-none fixed top-6 left-0 z-100 w-full px-4 transition-all duration-1000 ease-out md:top-8"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(-20px)",
        }}
      >
        <div className="pointer-events-auto relative mx-auto max-w-4/5 lg:max-w-fit">
          <nav
            className={`rounded-full border border-white/40 bg-white/70 px-8 py-3 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] backdrop-blur-xl transition-all duration-700 ease-out md:px-12 md:py-4 ${scrolled ? "-translate-y-2 opacity-95" : ""} `}
          >
            <ul className="flex items-center gap-8 md:gap-10">
              <li className="flex items-center">
                <Link to="/" className="flex items-center">
                  <img src="/logo.png" alt="REFENTI" className="h-8 md:h-10" />
                </Link>
              </li>

              {navLinks.map((link) => {
                const isActive = location.pathname === link.path
                if (link.isDropdown) {
                  return (
                    <li
                      key={link.path}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                      className="relative hidden lg:flex lg:items-center"
                    >
                      <Link
                        to={link.path}
                        onClick={(e) => {
                          if (e.detail === 0) {
                            e.preventDefault()
                            setIsMenuOpen(!isMenuOpen)
                          }
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Escape" && isMenuOpen) {
                            setIsMenuOpen(false)
                          }
                        }}
                        aria-expanded={isMenuOpen}
                        aria-haspopup="true"
                        aria-controls="portfolio-dropdown"
                        className={`relative inline-flex items-center gap-2 text-xs font-bold text-refenti-charcoal/80 uppercase transition-all hover:text-refenti-gold ${isActive || isMenuOpen ? "text-refenti-gold after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:bg-refenti-gold" : ""} `}
                      >
                        {link.name}
                        <svg
                          className={`h-2 w-2 transition-transform duration-700 ${isMenuOpen ? "rotate-180" : ""}`}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="4"
                        >
                          <path d="M19 9l-7 7-7-7" />
                        </svg>
                      </Link>
                    </li>
                  )
                }
                return (
                  <li
                    key={link.path}
                    className="hidden lg:flex lg:items-center"
                  >
                    <Link
                      to={link.path}
                      className={`relative text-xs font-bold text-refenti-charcoal/80 uppercase transition-all hover:text-refenti-gold ${isActive ? "text-refenti-gold after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:bg-refenti-gold" : ""} `}
                    >
                      {link.name}
                    </Link>
                  </li>
                )
              })}

              <li className="ml-auto flex items-center lg:hidden">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                  aria-expanded={isMobileMenuOpen}
                  aria-controls="mobile-menu"
                  className="flex items-center text-refenti-charcoal/80 transition-colors hover:text-refenti-gold"
                >
                  <div className="flex w-7 flex-col gap-1.5">
                    <span
                      className={`h-px w-full bg-current transition-all duration-500 ${isMobileMenuOpen ? "translate-y-1.75 rotate-45" : ""}`}
                    />
                    <span
                      className={`h-px w-full bg-current transition-all duration-500 ${isMobileMenuOpen ? "opacity-0" : ""}`}
                    />
                    <span
                      className={`h-px w-full bg-current transition-all duration-500 ${isMobileMenuOpen ? "-translate-y-1.75 -rotate-45" : ""}`}
                    />
                  </div>
                </button>
              </li>
            </ul>
          </nav>

          {/* Mobile Menu */}
          <div
            id="mobile-menu"
            role="menu"
            aria-label="Mobile navigation"
            className={`absolute right-0 left-0 z-99 mt-2 rounded-3xl bg-white/70 backdrop-blur-xl transition-all duration-700 ease-out ${isMobileMenuOpen ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 scale-98 opacity-0"}`}
          >
            <div className="space-y-1 px-6 py-8 md:px-8 md:py-10">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    role="menuitem"
                    className={`block px-4 py-3 text-sm font-bold uppercase transition-all duration-300 ${isActive ? "text-refenti-gold" : "text-refenti-charcoal/80"} hover:bg-refenti-offwhite/50 hover:text-refenti-gold`}
                  >
                    {link.name}
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Dropdown Desktop */}
          <div
            id="portfolio-dropdown"
            role="menu"
            aria-label="Portfolio projects"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`cubic-bezier(0.19, 1, 0.22, 1) absolute top-[calc(100%-0.5rem)] left-1/2 w-212.5 origin-top -translate-x-1/2 pt-4 transition-all duration-1000 ${isMenuOpen ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none -translate-y-4 scale-98 opacity-0"} `}
          >
            <div className="flex min-h-120 overflow-hidden rounded-[3rem] border border-gray-100/50 bg-white shadow-[0_30px_80px_-20px_rgba(0,0,0,0.08)]">
              <div className="w-[38%] space-y-10 border-r border-gray-100 bg-white p-12">
                <div className="space-y-8">
                  {projects.map((project) => (
                    <Link
                      key={project.id}
                      to={`/projects/${project.id}`}
                      role="menuitem"
                      onMouseEnter={() => setHoveredProject(project)}
                      onClick={() => setIsMenuOpen(false)}
                      className={`group flex items-center justify-between transition-all duration-500 ${hoveredProject?.id === project.id ? "translate-x-2" : ""} `}
                    >
                      <div className="space-y-1">
                        <h4
                          className={`font-display text-2xl transition-all duration-500 ${hoveredProject?.id === project.id ? "text-refenti-gold" : "text-refenti-charcoal/80"} `}
                        >
                          {project.name}
                        </h4>
                        <p className="text-xs font-bold text-gray-500 uppercase">
                          {project.location}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="relative w-[62%] bg-refenti-offwhite/30 p-10">
                <div className="relative h-full w-full overflow-hidden rounded-[2.5rem] shadow-xl">
                  {projects.map((project) => (
                    <div
                      key={`img-${project.id}`}
                      className={`cubic-bezier(0.19, 1, 0.22, 1) absolute inset-0 transition-all duration-1000 ${hoveredProject?.id === project.id ? "scale-100 opacity-100" : "scale-105 opacity-0"} `}
                    >
                      <img
                        src={project.image}
                        className="h-full w-full object-cover"
                        alt={project.name}
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-10 left-10 max-w-xs space-y-2 text-white">
                        <p className="text-xs font-bold text-refenti-gold uppercase">
                          {project.assetClass}
                        </p>
                        <h3 className="font-display text-3xl leading-none font-light">
                          {project.name}
                        </h3>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
