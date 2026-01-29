import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getProjects, saveProjects } from "../constants"
import type { Project } from "../types"

const AdminProjects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    setProjects(getProjects())
  }, [])

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      const updated = projects.filter((p) => p.id !== id)
      setProjects(updated)
      saveProjects(updated)
    }
  }

  return (
    <div className="mx-auto max-w-7xl space-y-12 p-8 md:p-16">
      <header className="flex items-end justify-between border-b border-gray-100 pb-8">
        <div className="space-y-2">
          <p className="font-sans text-[10px] font-bold tracking-ultra text-refenti-gold uppercase">
            Portfolio Management
          </p>
          <h1 className="font-display text-5xl leading-none font-light text-refenti-charcoal uppercase md:text-6xl">
            Global <span className="text-refenti-gold italic">Assets</span>
          </h1>
        </div>
        <button
          onClick={() => navigate("/admin/projects/new")}
          className="rounded-xl bg-refenti-charcoal px-10 py-4 text-[10px] font-bold tracking-widest text-white uppercase transition-all hover:bg-refenti-gold"
        >
          New Project
        </button>
      </header>

      <div className="grid gap-6">
        {projects.map((p) => (
          <div
            key={p.id}
            className="group flex items-center justify-between rounded-[2rem] border border-gray-50 bg-white p-8 shadow-sm transition-all duration-700 hover:shadow-xl"
          >
            <div className="flex items-center gap-10">
              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-3xl shadow-inner">
                <img
                  src={p.image}
                  className="h-full w-full object-cover"
                  alt={p.name}
                />
              </div>
              <div>
                <h3 className="mb-2 font-display text-3xl leading-none text-refenti-charcoal">
                  {p.name}
                </h3>
                {/* Fix: Property 'type' does not exist on type 'Project'. Using 'assetClass' instead. */}
                <p className="text-[10px] font-bold tracking-widest text-gray-300 uppercase">
                  {p.location} • {p.assetClass}
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => navigate(`/admin/projects/edit/${p.id}`)}
                className="rounded-xl bg-gray-50 px-6 py-3 text-[9px] font-bold tracking-widest uppercase transition-all hover:bg-refenti-gold hover:text-white"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(p.id)}
                className="rounded-xl bg-red-50 px-6 py-3 text-[9px] font-bold tracking-widest text-red-400 uppercase transition-all hover:bg-red-400 hover:text-white"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminProjects
