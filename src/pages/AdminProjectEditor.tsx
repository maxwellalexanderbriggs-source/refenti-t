import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getProjects, saveProjects } from "../constants"
import type { Project, ProjectDetailSection } from "../types"

const AdminInput: React.FC<{
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  small?: boolean
}> = ({ label, value, onChange, placeholder, small }) => (
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

const AdminProjectEditor: React.FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()
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
    if (id) {
      const projects = getProjects()
      const project = projects.find((p) => p.id === id)
      if (project) setFormData(project)
    }
  }, [id])

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name) return

    const projects = getProjects()
    let updated: Project[]
    const pid = id || formData.name.toLowerCase().replace(/\s+/g, "-")

    const projectData = { ...formData, id: pid } as Project

    if (id) {
      updated = projects.map((p) => (p.id === id ? projectData : p))
    } else {
      updated = [...projects, projectData]
    }

    saveProjects(updated)
    navigate("/admin/projects")
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
    <div className="mx-auto max-w-5xl p-8 pb-40 md:p-16">
      <header className="mb-16 flex items-center gap-8">
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
        className="space-y-20 rounded-[4rem] border border-gray-100 bg-white p-10 shadow-xl md:p-20"
      >
        {/* Primary Identification */}
        <div className="space-y-12">
          <h2 className="border-b border-gray-50 pb-4 text-[11px] font-bold tracking-ultra text-gray-300 uppercase">
            Identification
          </h2>
          <div className="grid gap-16 md:grid-cols-2">
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
        <div className="space-y-12">
          <h2 className="border-b border-gray-50 pb-4 text-[11px] font-bold tracking-ultra text-gray-300 uppercase">
            Media & Resources
          </h2>
          <div className="grid gap-16 md:grid-cols-2">
            <AdminInput
              label="Hero Banner URL"
              value={formData.image || ""}
              onChange={(v) => setFormData({ ...formData, image: v })}
              small
              placeholder="https://images.unsplash.com/..."
            />
            <AdminInput
              label="Brochure URL"
              value={formData.brochureUrl || ""}
              onChange={(v) => setFormData({ ...formData, brochureUrl: v })}
              small
              placeholder="#"
            />
          </div>
        </div>

        {/* Introductory Content */}
        <div className="space-y-12">
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
              className="w-full rounded-[2.5rem] border-2 border-transparent bg-refenti-offwhite/50 p-8 text-lg leading-relaxed font-medium text-refenti-charcoal transition-all placeholder:text-gray-300 focus:border-refenti-gold focus:outline-none"
            />
          </div>
        </div>

        {/* Features Pills */}
        <div className="space-y-8 border-t border-gray-50 pt-12">
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
                className="group flex items-center gap-3 rounded-full border-2 border-gray-100 bg-white px-6 py-4 transition-all focus-within:border-refenti-gold"
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
        <div className="space-y-12 border-t border-gray-50 pt-12">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-3xl font-light text-refenti-charcoal uppercase">
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
          <div className="space-y-16">
            {formData.detailSections?.map((s, i) => (
              <div
                key={i}
                className="group relative space-y-10 rounded-[4rem] border-2 border-gray-100 bg-refenti-offwhite/30 p-10 transition-all hover:border-refenti-gold/20 md:p-16"
              >
                <button
                  type="button"
                  onClick={() => removeDetailSection(i)}
                  className="absolute top-10 right-12 text-[10px] font-bold tracking-widest text-gray-300 uppercase transition-colors hover:text-red-600"
                >
                  REMOVE SECTION
                </button>
                <div className="grid gap-12 pt-8 md:grid-cols-2">
                  <AdminInput
                    label="Section Title"
                    value={s.title}
                    onChange={(v) => updateDetailSection(i, "title", v)}
                    small
                    placeholder="e.g. Penthouse Interiors"
                  />
                  <AdminInput
                    label="Media Source (URL)"
                    value={s.image}
                    onChange={(v) => updateDetailSection(i, "image", v)}
                    small
                    placeholder="https://..."
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
                    className="w-full rounded-[2rem] border-2 border-transparent bg-white p-8 text-base leading-relaxed font-medium text-refenti-charcoal shadow-sm transition-all placeholder:text-gray-300 focus:border-refenti-gold focus:outline-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-[2.5rem] bg-refenti-charcoal py-10 font-sans font-bold tracking-ultra text-white uppercase shadow-2xl transition-all hover:bg-refenti-gold active:scale-[0.99]"
        >
          Publish Project Updates
        </button>
      </form>
    </div>
  )
}

export default AdminProjectEditor
