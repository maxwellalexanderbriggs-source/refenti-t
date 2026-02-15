import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import FileUpload from "../components/FileUpload"
import { createProject, getProjectById, updateProject } from "../lib/api"
import {
  uploadProjectBrochure,
  uploadProjectDetailImage,
  uploadProjectHero,
  uploadProjectIntro,
  validateImageFile,
  validatePdfFile,
} from "../lib/storage"
import type { Project, ProjectDetailSection } from "../types"

function AdminInput({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  small?: boolean
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-gray-600">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-refenti-charcoal placeholder:text-gray-400 focus:border-refenti-gold focus:outline-none focus:ring-1 focus:ring-refenti-gold"
      />
    </div>
  )
}

function AdminSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  options: string[]
  small?: boolean
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-gray-600">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-refenti-charcoal focus:border-refenti-gold focus:outline-none focus:ring-1 focus:ring-refenti-gold"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

function AdminProjectEditor() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<Partial<Project>>({
    name: "",
    assetClass: "Residential",
    location: "",
    image: "",
    description: "",
    brochureUrl: "",
    introTitle: "",
    introText: "",
    introImage: "",
    projectFeatures: [],
    detailSections: [],
  })

  useEffect(() => {
    const fetchProject = async () => {
      if (id) {
        const { data, error } = await getProjectById(id)
        if (error) {
          console.error("Failed to load project:", error.message)
          alert("Project not found")
          navigate("/admin/projects")
        } else {
          setFormData(data)
        }
      }
    }
    fetchProject()
  }, [id, navigate])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name) return

    setLoading(true)
    const pid = id || formData.name.toLowerCase().replace(/\s+/g, "-")
    const projectData = { ...formData, id: pid } as Project

    if (id) {
      const { error } = await updateProject(id, projectData)
      if (error) {
        console.error("Failed to update project:", error.message)
        alert("Failed to update project.")
        setLoading(false)
      } else {
        navigate("/admin/projects")
      }
    } else {
      const { error } = await createProject(projectData)
      if (error) {
        console.error("Failed to create project:", error.message)
        alert("Failed to create project.")
        setLoading(false)
      } else {
        navigate("/admin/projects")
      }
    }
  }

  const addFeature = () =>
    setFormData((prev) => ({
      ...prev,
      projectFeatures: [...(prev.projectFeatures || []), ""],
    }))
  const updateFeature = (i: number, v: string) => {
    const updated = [...(formData.projectFeatures || [])]
    updated[i] = v
    setFormData((prev) => ({ ...prev, projectFeatures: updated }))
  }
  const removeFeature = (i: number) =>
    setFormData((prev) => ({
      ...prev,
      projectFeatures: prev.projectFeatures?.filter((_, idx) => idx !== i),
    }))

  const addDetailSection = () =>
    setFormData((prev) => ({
      ...prev,
      detailSections: [
        ...(prev.detailSections || []),
        { title: "", text: "", image: "" },
      ],
    }))
  const updateDetailSection = (
    i: number,
    field: keyof ProjectDetailSection,
    v: string,
  ) => {
    const updated = [...(formData.detailSections || [])]
    updated[i] = { ...updated[i], [field]: v }
    setFormData((prev) => ({ ...prev, detailSections: updated }))
  }
  const removeDetailSection = (i: number) =>
    setFormData((prev) => ({
      ...prev,
      detailSections: prev.detailSections?.filter((_, idx) => idx !== i),
    }))

  return (
    <div className="mx-auto max-w-4xl p-6">
      <header className="mb-6 flex items-center gap-2 text-sm">
        <button
          onClick={() => navigate("/admin/projects")}
          className="text-gray-400 transition-colors hover:text-refenti-charcoal"
        >
          &larr; Projects
        </button>
        <span className="text-gray-300">/</span>
        <h1 className="font-semibold text-black">
          {id ? "Edit project" : "New project"}
        </h1>
      </header>

      <form
        onSubmit={handleSave}
        className="space-y-6 rounded-lg border border-gray-200 bg-white p-6"
      >
        {/* Basic Info */}
        <div className="space-y-4">
          <h2 className="text-sm font-semibold text-black">
            Basic Info
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <AdminInput
              label="Name"
              value={formData.name || ""}
              onChange={(v) => setFormData({ ...formData, name: v })}
              placeholder="e.g. Bole High-Rise"
            />
            <AdminInput
              label="Location"
              value={formData.location || ""}
              onChange={(v) => setFormData({ ...formData, location: v })}
              placeholder="e.g. Bole, Addis Ababa"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <AdminSelect
              label="Asset Class"
              value={formData.assetClass || "Residential"}
              onChange={(v) =>
                setFormData({
                  ...formData,
                  assetClass: v as Project["assetClass"],
                })
              }
              options={["Residential", "Mixed-Use", "Commercial", "Hospitality"]}
            />
            <AdminInput
              label="Status"
              value={formData.status || ""}
              onChange={(v) => setFormData({ ...formData, status: v })}
              placeholder="e.g. In Development, Completed"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-600">
              Description
            </label>
            <textarea
              value={formData.description || ""}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Short description shown on the portfolio page..."
              rows={3}
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm leading-relaxed text-refenti-charcoal placeholder:text-gray-400 focus:border-refenti-gold focus:outline-none focus:ring-1 focus:ring-refenti-gold"
            />
          </div>
        </div>

        {/* Media */}
        <div className="space-y-4 border-t border-gray-100 pt-6">
          <h2 className="text-sm font-semibold text-black">Media</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <FileUpload
              label="Hero Image"
              value={formData.image || ""}
              onChange={(url) => setFormData({ ...formData, image: url })}
              accept="image/*"
              uploadFn={(file) => {
                const projectId =
                  id || formData.name.toLowerCase().replace(/\s+/g, "-")
                return uploadProjectHero(projectId, file)
              }}
              validator={validateImageFile}
            />
            <FileUpload
              label="Brochure (PDF)"
              value={formData.brochureUrl || ""}
              onChange={(url) => setFormData({ ...formData, brochureUrl: url })}
              accept=".pdf"
              uploadFn={(file) => {
                const projectId =
                  id || formData.name.toLowerCase().replace(/\s+/g, "-")
                return uploadProjectBrochure(projectId, file)
              }}
              validator={validatePdfFile}
            />
          </div>
        </div>

        {/* Introduction */}
        <div className="space-y-4 border-t border-gray-100 pt-6">
          <h2 className="text-sm font-semibold text-black">
            Introduction
          </h2>
          <AdminInput
            label="Intro Title"
            value={formData.introTitle || ""}
            onChange={(v) => setFormData({ ...formData, introTitle: v })}
          />
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-600">
              Intro Text
            </label>
            <textarea
              value={formData.introText}
              onChange={(e) =>
                setFormData({ ...formData, introText: e.target.value })
              }
              placeholder="Provide a compelling narrative for this project..."
              rows={5}
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm leading-relaxed text-refenti-charcoal placeholder:text-gray-400 focus:border-refenti-gold focus:outline-none focus:ring-1 focus:ring-refenti-gold"
            />
          </div>
          <FileUpload
            label="Intro Image"
            value={formData.introImage || ""}
            onChange={(url) => setFormData({ ...formData, introImage: url })}
            accept="image/*"
            uploadFn={(file) => {
              const projectId =
                id || formData.name.toLowerCase().replace(/\s+/g, "-")
              return uploadProjectIntro(projectId, file)
            }}
            validator={validateImageFile}
          />
        </div>

        {/* Features */}
        <div className="space-y-4 border-t border-gray-100 pt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-black">
              Features
            </h2>
            <button
              type="button"
              onClick={addFeature}
              className="text-sm font-medium text-refenti-gold transition-colors hover:text-refenti-charcoal"
            >
              + Add feature
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.projectFeatures?.map((f, i) => (
              <div
                key={i}
                className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5"
              >
                <input
                  value={f}
                  onChange={(e) => updateFeature(i, e.target.value)}
                  className="w-28 border-none bg-transparent text-sm text-refenti-charcoal placeholder:text-gray-400 focus:outline-none"
                  placeholder="Feature..."
                />
                <button
                  type="button"
                  onClick={() => removeFeature(i)}
                  className="text-gray-300 transition-colors hover:text-red-500"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Detail Sections */}
        <div className="space-y-4 border-t border-gray-100 pt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-black">
              Detail Sections
            </h2>
            <button
              type="button"
              onClick={addDetailSection}
              className="text-sm font-medium text-refenti-gold transition-colors hover:text-refenti-charcoal"
            >
              + Add section
            </button>
          </div>
          <div className="space-y-4">
            {formData.detailSections?.map((s, i) => (
              <div
                key={i}
                className="relative space-y-4 rounded-lg border border-gray-200 bg-gray-50/50 p-4"
              >
                <div className="flex items-start justify-between">
                  <span className="text-xs font-medium text-gray-400">
                    Section {i + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeDetailSection(i)}
                    className="text-sm text-red-400 transition-colors hover:text-red-600"
                  >
                    Remove
                  </button>
                </div>
                <AdminInput
                  label="Title"
                  value={s.title}
                  onChange={(v) => updateDetailSection(i, "title", v)}
                  small
                  placeholder="e.g. Penthouse Interiors"
                />
                <FileUpload
                  label="Image"
                  value={s.image}
                  onChange={(url) => updateDetailSection(i, "image", url)}
                  accept="image/*"
                  uploadFn={(file) => {
                    const projectId =
                      id || formData.name.toLowerCase().replace(/\s+/g, "-")
                    return uploadProjectDetailImage(projectId, i, file)
                  }}
                  validator={validateImageFile}
                  uniqueId={`section-${i}`}
                />
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-600">
                    Section Text
                  </label>
                  <textarea
                    placeholder="Describe this specific feature or area..."
                    value={s.text}
                    onChange={(e) =>
                      updateDetailSection(i, "text", e.target.value)
                    }
                    rows={4}
                    className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm leading-relaxed text-refenti-charcoal placeholder:text-gray-400 focus:border-refenti-gold focus:outline-none focus:ring-1 focus:ring-refenti-gold"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-refenti-charcoal py-2.5 text-sm font-medium text-white transition-colors hover:bg-refenti-gold disabled:opacity-50"
        >
          {loading
            ? "Saving..."
            : id
              ? "Save changes"
              : "Create project"}
        </button>
      </form>
    </div>
  )
}

export default AdminProjectEditor
