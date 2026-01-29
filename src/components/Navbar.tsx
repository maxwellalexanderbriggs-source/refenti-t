import React, { useEffect, useRef, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { getProjects } from "../constants"
import type { Project } from "../types"

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [projects, setProjects] = useState<Project[]>([])
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null)
  const location = useLocation()
  const menuTimeoutRef = useRef<number | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)

    const p = getProjects()
    setProjects(p)
    if (p.length > 0) setHoveredProject(p[0])

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
    setIsMenuOpen(false)
  }, [location.pathname])

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Investment", path: "/investment" },
    { name: "Portfolio", path: "/projects", isDropdown: true },
    { name: "News", path: "/news" },
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
    <div className="pointer-events-none fixed top-6 left-0 z-[100] w-full px-4 md:top-8">
      <div className="pointer-events-auto relative mx-auto max-w-fit">
        <nav
          className={`glass-nav subtle-shadow rounded-full border border-white/40 px-8 py-3 transition-all duration-700 ease-out md:px-12 md:py-4 ${scrolled ? "-translate-y-2 scale-90" : "scale-100"} `}
        >
          <ul className="flex items-center gap-8 md:gap-10">
            <li>
              <Link
                to="/"
                className="font-display text-xl leading-none font-medium tracking-tight text-refenti-gold md:text-2xl"
              >
                REFENTI
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
                    className="relative hidden lg:block"
                  >
                    <Link
                      to={link.path}
                      className={`relative flex items-center gap-2 py-1 text-[9px] font-bold tracking-ultra text-refenti-charcoal/80 uppercase transition-all hover:text-refenti-gold ${isActive || isMenuOpen ? "text-refenti-gold" : ""} `}
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
                <li key={link.path} className="hidden lg:block">
                  <Link
                    to={link.path}
                    className={`relative py-1 text-[9px] font-bold tracking-ultra text-refenti-charcoal/80 uppercase transition-all hover:text-refenti-gold ${isActive ? "text-refenti-gold after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:bg-refenti-gold" : ""} `}
                  >
                    {link.name}
                  </Link>
                </li>
              )
            })}

            <li className="ml-2 flex items-center border-l border-gray-100/30 pl-6 lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="flex items-center gap-3 py-2 text-[9px] font-bold tracking-ultra text-refenti-charcoal/80 uppercase transition-colors hover:text-refenti-gold"
              >
                <span>{isMobileMenuOpen ? "Close" : "Menu"}</span>
                <div className="flex w-4 flex-col gap-1">
                  <span
                    className={`h-px w-full bg-current transition-all duration-500 ${isMobileMenuOpen ? "translate-y-1 rotate-45" : ""}`}
                  />
                  <span
                    className={`h-px w-full bg-current transition-all duration-500 ${isMobileMenuOpen ? "opacity-0" : ""}`}
                  />
                  <span
                    className={`h-px w-full bg-current transition-all duration-500 ${isMobileMenuOpen ? "-translate-y-1 -rotate-45" : ""}`}
                  />
                </div>
              </button>
            </li>
          </ul>
        </nav>

        {/* Dropdown Desktop */}
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`cubic-bezier(0.19, 1, 0.22, 1) absolute top-[calc(100%-0.5rem)] left-1/2 w-[850px] origin-top -translate-x-1/2 pt-4 transition-all duration-1000 ${isMenuOpen ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none -translate-y-4 scale-98 opacity-0"} `}
        >
          <div className="flex min-h-[480px] overflow-hidden rounded-[3rem] border border-gray-100/50 bg-white shadow-[0_30px_80px_-20px_rgba(0,0,0,0.08)]">
            <div className="w-[38%] space-y-10 border-r border-gray-100 bg-white p-12">
              <p className="text-[8px] font-bold tracking-ultra text-refenti-gold uppercase opacity-80">
                Refenti Collection
              </p>
              <div className="space-y-8">
                {projects.map((project) => (
                  <Link
                    key={project.id}
                    to={`/projects/${project.id}`}
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
                      <p className="text-[8px] font-bold tracking-extrawide text-gray-500 uppercase">
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
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-10 left-10 max-w-xs space-y-2 text-white">
                      <p className="text-[8px] font-bold tracking-ultra text-refenti-gold uppercase">
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

        {/* Mobile Menu */}
        <div
          className={`cubic-bezier(0.19, 1, 0.22, 1) fixed inset-0 top-[5rem] z-[-1] overflow-y-auto bg-white px-8 py-16 transition-all duration-700 lg:hidden ${isMobileMenuOpen ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-full opacity-0"} `}
        >
          <div className="mx-auto max-w-md space-y-16">
            <div className="space-y-8">
              <p className="border-b border-gray-100 pb-4 text-[8px] font-bold tracking-ultra text-refenti-gold uppercase opacity-70">
                Refenti Navigation
              </p>
              <ul className="space-y-6">
                {navLinks.map((link) => (
                  <li key={link.path} className="overflow-hidden">
                    <Link
                      to={link.path}
                      className="block font-display text-4xl tracking-tight text-refenti-charcoal/90 uppercase transition-all hover:text-refenti-gold"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mobile-specific Project Collection Links */}
            <div className="space-y-8 border-t border-gray-100 pt-8">
              <p className="text-[8px] font-bold tracking-ultra text-refenti-gold uppercase opacity-70">
                The Collection
              </p>
              <ul className="space-y-6">
                {projects.map((project) => (
                  <li key={project.id} className="overflow-hidden">
                    <Link
                      to={`/projects/${project.id}`}
                      className="block font-display text-3xl tracking-tight text-refenti-charcoal/70 uppercase transition-all hover:text-refenti-gold"
                    >
                      {project.name}
                    </Link>
                    <p className="mt-1 text-[8px] font-bold tracking-extrawide text-gray-400 uppercase">
                      {project.location}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
