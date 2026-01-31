import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import FileUpload from "../components/FileUpload"
import {
  createProject,
  getProjectById,
  updateProject,
} from "../lib/api"
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
  small,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  small?: boolean
}) {
  return (
  <div className="group space-y-2">
    <label className="text-[10px] font-bold tracking-widest text-refenti-gold uppercase transition-colors group-focus-within:text-refenti-charcoal">
      {label}
    </label>
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`w-full border-b-2 border-gray-200 bg-transparent py-4 font-medium text-refenti-charcoal transition-all placeholder:text-gray-300 focus:border-refenti-gold focus:outline-none ${small ? "text-base" : "text-3xl md:text-4xl"}`}
    />
  </div>
  )
}

function AdminProjectEditor() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<Partial<Project>>({
    name: "",
    // Fix: 'type' does not exist in type 'Partial<Project>'. Changed to 'assetClass'.
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
        alert("Failed to update project. Please try again.")
        setLoading(false)
      } else {
        navigate("/admin/projects")
      }
    } else {
      const { error } = await createProject(projectData)
      if (error) {
        console.error("Failed to create project:", error.message)
        alert("Failed to create project. Please try again.")
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
    <div className="mx-auto max-w-5xl p-6 pb-12 md:p-8">
      <header className="mb-6 flex items-center gap-4">
        <button
          onClick={() => navigate("/admin/projects")}
          className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-gray-400 uppercase transition-colors hover:text-refenti-charcoal"
        >
          <span className="text-lg">←</span> Back to Assets
        </button>
        <h1 className="font-display text-5xl font-light text-refenti-charcoal uppercase">
          Project <span className="text-refenti-gold italic">Editor</span>
        </h1>
      </header>

      <form
        onSubmit={handleSave}
        className="space-y-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-xl md:p-8"
      >
        {/* Primary Identification */}
        <div className="space-y-4">
          <h2 className="border-b border-gray-50 pb-4 text-[11px] font-bold tracking-ultra text-gray-300 uppercase">
            Identification
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <AdminInput
              label="Project Name"
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
        </div>

        {/* Media & Resources */}
        <div className="space-y-4">
          <h2 className="border-b border-gray-50 pb-4 text-[11px] font-bold tracking-ultra text-gray-300 uppercase">
            Media & Resources
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <FileUpload
              label="Hero Banner"
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
              onChange={(url) =>
                setFormData({ ...formData, brochureUrl: url })
              }
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

        {/* Introductory Content */}
        <div className="space-y-4">
          <h2 className="border-b border-gray-50 pb-4 text-[11px] font-bold tracking-ultra text-gray-300 uppercase">
            Storytelling
          </h2>
          <AdminInput
            label="Intro Headline"
            value={formData.introTitle || ""}
            onChange={(v) => setFormData({ ...formData, introTitle: v })}
          />
          <div className="space-y-3">
            <label className="text-[10px] font-bold tracking-widest text-refenti-gold uppercase">
              Narrative Description
            </label>
            <textarea
              value={formData.introText}
              onChange={(e) =>
                setFormData({ ...formData, introText: e.target.value })
              }
              placeholder="Provide a compelling narrative for this project..."
              rows={6}
              className="w-full rounded-xl border-2 border-transparent bg-refenti-offwhite/50 p-4 text-base leading-relaxed font-medium text-refenti-charcoal transition-all placeholder:text-gray-300 focus:border-refenti-gold focus:outline-none"
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

        {/* Features Pills */}
        <div className="space-y-4 border-t border-gray-50 pt-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-3xl font-light text-refenti-charcoal uppercase">
              Feature{" "}
              <span className="text-refenti-gold italic">Attributes</span>
            </h2>
            <button
              type="button"
              onClick={addFeature}
              className="text-[10px] font-bold tracking-widest text-refenti-gold uppercase underline transition-colors hover:text-refenti-charcoal"
            >
              Add Attribute
            </button>
          </div>
          <div className="flex flex-wrap gap-4">
            {formData.projectFeatures?.map((f, i) => (
              <div
                key={i}
                className="group flex items-center gap-2 rounded-full border-2 border-gray-100 bg-white px-4 py-2 transition-all focus-within:border-refenti-gold"
              >
                <input
                  value={f}
                  onChange={(e) => updateFeature(i, e.target.value)}
                  className="w-32 border-none bg-transparent text-[11px] font-bold tracking-widest text-refenti-charcoal uppercase focus:ring-0"
                  placeholder="Feature..."
                />
                <button
                  type="button"
                  onClick={() => removeFeature(i)}
                  className="font-bold text-gray-300 transition-colors hover:text-red-500"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Detail Sections */}
        <div className="space-y-4 border-t border-gray-50 pt-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl font-light text-refenti-charcoal uppercase">
              Detailed{" "}
              <span className="text-refenti-gold italic">Showcases</span>
            </h2>
            <button
              type="button"
              onClick={addDetailSection}
              className="text-[10px] font-bold tracking-widest text-refenti-gold uppercase underline transition-colors hover:text-refenti-charcoal"
            >
              Add Section
            </button>
          </div>
          <div className="space-y-4">
            {formData.detailSections?.map((s, i) => (
              <div
                key={i}
                className="group relative space-y-4 rounded-xl border-2 border-gray-100 bg-refenti-offwhite/30 p-4 transition-all hover:border-refenti-gold/20 md:p-6"
              >
                <button
                  type="button"
                  onClick={() => removeDetailSection(i)}
                  className="absolute top-4 right-4 text-[10px] font-bold tracking-widest text-gray-300 uppercase transition-colors hover:text-red-600"
                >
                  REMOVE SECTION
                </button>
                <div className="space-y-4 pt-6">
                  <AdminInput
                    label="Section Title"
                    value={s.title}
                    onChange={(v) => updateDetailSection(i, "title", v)}
                    small
                    placeholder="e.g. Penthouse Interiors"
                  />
                  <FileUpload
                    label="Section Image"
                    value={s.image}
                    onChange={(url) => updateDetailSection(i, "image", url)}
                    accept="image/*"
                    uploadFn={(file) => {
                      const projectId =
                        id || formData.name.toLowerCase().replace(/\s+/g, "-")
                      return uploadProjectDetailImage(projectId, i, file)
                    }}
                    validator={validateImageFile}
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold tracking-widest text-refenti-gold uppercase">
                    Section Copy
                  </label>
                  <textarea
                    placeholder="Describe this specific feature or area..."
                    value={s.text}
                    onChange={(e) =>
                      updateDetailSection(i, "text", e.target.value)
                    }
                    rows={4}
                    className="w-full rounded-xl border-2 border-transparent bg-white p-4 text-sm leading-relaxed font-medium text-refenti-charcoal shadow-sm transition-all placeholder:text-gray-300 focus:border-refenti-gold focus:outline-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-refenti-charcoal py-3 font-sans font-bold tracking-ultra text-white uppercase shadow-2xl transition-all hover:bg-refenti-gold active:scale-[0.99]"
        >
          Publish Project Updates
        </button>
      </form>
    </div>
  )
}

export default AdminProjectEditor
