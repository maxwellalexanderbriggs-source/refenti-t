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
    if (window.confirm("Delete this project?")) {
      const { error } = await deleteProject(id)
      if (error) {
        console.error("Failed to delete project:", error.message)
        alert("Failed to delete project.")
      } else {
        setProjects(projects.filter((p) => p.id !== id))
      }
    }
  }

  return (
    <div className="mx-auto max-w-5xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-semibold text-black">
            Projects
          </h1>
          {!loading && (
            <span className="rounded-full bg-refenti-gold/10 px-2.5 py-0.5 text-xs font-medium text-refenti-gold">
              {projects.length}
            </span>
          )}
        </div>
        <button
          onClick={() => navigate("/admin/projects/new")}
          className="rounded-lg bg-refenti-charcoal px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-refenti-gold"
        >
          New project
        </button>
      </div>

      {loading ? (
        <div className="py-12 text-center text-sm text-gray-400">
          Loading...
        </div>
      ) : projects.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-200 py-12 text-center text-sm text-gray-400">
          No projects yet
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
          {projects.map((p, idx) => (
            <div
              key={p.id}
              className={`flex items-center gap-4 px-4 py-3 transition-colors hover:bg-gray-50 ${
                idx !== projects.length - 1
                  ? "border-b border-gray-100"
                  : ""
              }`}
            >
              <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg">
                <img
                  src={p.image}
                  className="h-full w-full object-cover"
                  alt={p.name}
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-refenti-charcoal">
                  {p.name}
                </p>
                <p className="truncate text-xs text-gray-400">{p.location}</p>
              </div>
              <span className="hidden rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600 sm:inline-block">
                {p.assetClass}
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => navigate(`/admin/projects/edit/${p.id}`)}
                  className="rounded-md px-3 py-1.5 text-sm text-gray-500 transition-colors hover:bg-gray-100 hover:text-refenti-charcoal"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="rounded-md px-3 py-1.5 text-sm text-red-400 transition-colors hover:bg-red-50 hover:text-red-600"
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
