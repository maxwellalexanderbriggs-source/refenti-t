import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { deleteProject, getProjects } from "../lib/api"
import type { Project } from "../types"

function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    const { data, error } = await getProjects()
    if (error) {
      console.error("Failed to load projects:", error.message)
    } else {
      setProjects(data)
    }
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      const { error } = await deleteProject(id)
      if (error) {
        console.error("Failed to delete project:", error.message)
        alert("Failed to delete project. Please try again.")
      } else {
        setProjects(projects.filter((p) => p.id !== id))
      }
    }
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-6 pb-12 md:p-8">
      <header className="flex items-end justify-between border-b border-gray-100 pb-4">
        <div className="space-y-2">
          <p className="font-sans text-[10px] font-bold tracking-ultra text-refenti-gold uppercase">
            Portfolio Management
          </p>
          <h1 className="font-display text-5xl leading-none font-light text-refenti-charcoal uppercase md:text-6xl">
            Global <span className="text-refenti-gold">Assets</span>
          </h1>
        </div>
        <button
          onClick={() => navigate("/admin/projects/new")}
          className="rounded-xl bg-refenti-charcoal px-6 py-2.5 text-[10px] font-bold tracking-widest text-white uppercase transition-all hover:bg-refenti-gold"
        >
          New Project
        </button>
      </header>

      {loading ? (
        <div className="py-20 text-center text-gray-400">Loading...</div>
      ) : (
        <div className="grid gap-6">
          {projects.map((p) => (
            <div
              key={p.id}
              className="group flex items-center justify-between rounded-xl border border-gray-50 bg-white p-4 shadow-sm transition-all duration-700 hover:shadow-xl"
            >
              <div className="flex items-center gap-4">
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
              <div className="flex gap-2">
                <button
                  onClick={() => navigate(`/admin/projects/edit/${p.id}`)}
                  className="rounded-lg bg-gray-50 px-4 py-2 text-[9px] font-bold tracking-widest uppercase transition-all hover:bg-refenti-gold hover:text-white"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="rounded-lg bg-red-50 px-4 py-2 text-[9px] font-bold tracking-widest text-red-400 uppercase transition-all hover:bg-red-400 hover:text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AdminProjects
