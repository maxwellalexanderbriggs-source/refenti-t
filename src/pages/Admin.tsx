import React from "react"
import { Link, Route, Routes, useLocation, useNavigate } from "react-router-dom"
import AdminEvents from "./AdminEvents"
import AdminInquiries from "./AdminInquiries"
import AdminNews from "./AdminNews"
import AdminProjectEditor from "./AdminProjectEditor"
import AdminProjects from "./AdminProjects"

const AdminNavbar: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const links = [
    { name: "Projects", path: "/admin/projects" },
    { name: "Events", path: "/admin/events" },
    { name: "News", path: "/admin/news" },
    { name: "Inquiries", path: "/admin/inquiries" },
  ]

  return (
    <nav className="fixed top-0 left-0 z-[100] flex h-20 w-full items-center justify-between border-b border-white/5 bg-refenti-charcoal px-8 text-white">
      <div className="flex items-center gap-12">
        <Link
          to="/"
          className="font-display text-2xl tracking-tighter text-refenti-gold"
        >
          REFENTI ADMIN
        </Link>
        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.path}
              to={l.path}
              className={`text-[9px] font-bold tracking-ultra uppercase transition-colors ${location.pathname.startsWith(l.path) ? "text-refenti-gold" : "text-white/40 hover:text-white"}`}
            >
              {l.name}
            </Link>
          ))}
        </div>
      </div>
      <button
        onClick={() => navigate("/")}
        className="text-[9px] font-bold tracking-ultra text-white/40 uppercase transition-colors hover:text-refenti-gold"
      >
        Exit to Site
      </button>
    </nav>
  )
}

const Admin: React.FC = () => {
  return (
    <div className="min-h-screen bg-refenti-offwhite text-refenti-charcoal">
      <AdminNavbar />
      <div className="pt-20">
        <Routes>
          <Route path="/" element={<AdminProjects />} />
          <Route path="/projects" element={<AdminProjects />} />
          <Route path="/projects/new" element={<AdminProjectEditor />} />
          <Route path="/projects/edit/:id" element={<AdminProjectEditor />} />
          <Route path="/events" element={<AdminEvents />} />
          <Route path="/news" element={<AdminNews />} />
          <Route path="/inquiries" element={<AdminInquiries />} />
        </Routes>
      </div>
    </div>
  )
}

export default Admin
