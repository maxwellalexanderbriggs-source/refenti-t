import React, { useEffect, useState } from "react"
import { getEvents, saveEvents } from "../constants"
import type { EventItem } from "../types"

const AdminEvents: React.FC = () => {
  const [events, setEvents] = useState<EventItem[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<EventItem>>({
    title: "",
    date: "",
    location: "",
    image: "",
    details: "",
    isFeatured: false,
  })

  useEffect(() => {
    setEvents(getEvents())
  }, [])

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title) return
    let updated: EventItem[]
    if (editingId) {
      updated = events.map((ev) =>
        ev.id === editingId ? ({ ...ev, ...formData } as EventItem) : ev,
      )
    } else {
      updated = [
        ...events,
        { ...formData, id: Date.now().toString() } as EventItem,
      ]
    }
    setEvents(updated)
    saveEvents(updated)
    resetForm()
  }

  const handleEdit = (ev: EventItem) => {
    setEditingId(ev.id)
    setFormData(ev)
  }
  const handleDelete = (id: string) => {
    if (confirm("Delete engagement?")) {
      const u = events.filter((e) => e.id !== id)
      setEvents(u)
      saveEvents(u)
    }
  }
  const toggleFeatured = (id: string) => {
    const u = events.map((e) =>
      e.id === id ? { ...e, isFeatured: !e.isFeatured } : e,
    )
    setEvents(u)
    saveEvents(u)
  }
  const resetForm = () => {
    setEditingId(null)
    setFormData({
      title: "",
      date: "",
      location: "",
      image: "",
      details: "",
      isFeatured: false,
    })
  }

  return (
    <div className="mx-auto max-w-7xl space-y-16 p-8 pb-40 md:p-16">
      <header className="flex items-end justify-between border-b border-gray-100 pb-8">
        <div className="space-y-2">
          <p className="font-sans text-[10px] font-bold tracking-ultra text-refenti-gold uppercase">
            Engagement Management
          </p>
          <h1 className="font-display text-5xl leading-none font-light text-refenti-charcoal uppercase md:text-6xl">
            Global <span className="text-refenti-gold italic">Events</span>
          </h1>
        </div>
        <button
          onClick={resetForm}
          className="rounded-xl bg-refenti-charcoal px-10 py-4 text-[10px] font-bold text-white uppercase shadow-lg transition-all hover:bg-refenti-gold"
        >
          New Event
        </button>
      </header>

      <div className="grid gap-16 lg:grid-cols-12">
        {/* Editor Form */}
        <div className="lg:col-span-5">
          <div className="sticky top-28 space-y-10 rounded-[4rem] border border-gray-100 bg-white p-12 shadow-xl">
            <h2 className="border-b border-gray-50 pb-6 font-display text-3xl text-refenti-charcoal uppercase italic">
              {editingId ? "Modify Event" : "Create Event"}
            </h2>
            <form onSubmit={handleSave} className="space-y-10">
              {[
                {
                  label: "Event Identity",
                  key: "title",
                  placeholder: "e.g. Private Investor Gala",
                },
                {
                  label: "Calendar Date",
                  key: "date",
                  placeholder: "Dec 15, 2024",
                },
                {
                  label: "Venue Location",
                  key: "location",
                  placeholder: "Refenti Showroom, Bole",
                },
                {
                  label: "Media Source (URL)",
                  key: "image",
                  placeholder: "https://...",
                },
              ].map((field) => (
                <div key={field.key} className="group space-y-2">
                  <label className="text-[10px] font-bold tracking-widest text-refenti-gold uppercase transition-colors group-focus-within:text-refenti-charcoal">
                    {field.label}
                  </label>
                  <input
                    placeholder={field.placeholder}
                    value={formData[field.key as keyof EventItem] as string}
                    onChange={(e) =>
                      setFormData({ ...formData, [field.key]: e.target.value })
                    }
                    className="w-full border-b-2 border-gray-100 bg-transparent py-3 text-xl font-medium text-refenti-charcoal transition-all placeholder:text-gray-200 focus:border-refenti-gold focus:outline-none"
                  />
                </div>
              ))}

              <div className="space-y-2">
                <label className="text-[10px] font-bold tracking-widest text-refenti-gold uppercase">
                  Event Brief
                </label>
                <textarea
                  placeholder="Detailed description of the event..."
                  value={formData.details}
                  onChange={(e) =>
                    setFormData({ ...formData, details: e.target.value })
                  }
                  rows={4}
                  className="w-full rounded-[2rem] border-2 border-transparent bg-refenti-offwhite/50 p-6 text-base leading-relaxed font-medium text-refenti-charcoal transition-all placeholder:text-gray-200 focus:border-refenti-gold focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <label className="group flex cursor-pointer items-center gap-4 text-[10px] font-bold tracking-ultra text-refenti-charcoal uppercase">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) =>
                      setFormData({ ...formData, isFeatured: e.target.checked })
                    }
                    className="h-5 w-5 rounded border-2 border-gray-200 text-refenti-gold transition-all focus:ring-refenti-gold"
                  />
                  Featured on Home Page
                </label>
              </div>

              <button
                type="submit"
                className="w-full rounded-[2rem] bg-refenti-charcoal py-6 text-[10px] font-bold tracking-ultra text-white uppercase shadow-2xl transition-all hover:bg-refenti-gold active:scale-[0.98]"
              >
                {editingId ? "Confirm Updates" : "Publish Engagement"}
              </button>
            </form>
          </div>
        </div>

        {/* List view */}
        <div className="grid gap-6 lg:col-span-7">
          {events.length === 0 ? (
            <div className="rounded-[4rem] border-2 border-dashed border-gray-100 bg-white p-32 text-center">
              <p className="font-display text-3xl text-gray-300 italic">
                Engagements list empty.
              </p>
            </div>
          ) : (
            events.map((ev) => (
              <div
                key={ev.id}
                className="group flex items-center justify-between rounded-[3.5rem] border border-gray-50 bg-white p-10 transition-all duration-700 hover:shadow-2xl"
              >
                <div className="flex items-center gap-10">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-3xl border border-gray-100 shadow-xl">
                    <img
                      src={ev.image}
                      className="h-full w-full object-cover"
                      alt=""
                    />
                  </div>
                  <div>
                    <p className="mb-2 text-[9px] font-bold tracking-ultra text-refenti-gold uppercase">
                      {ev.date}
                    </p>
                    <h3 className="mb-2 font-display text-3xl leading-none text-refenti-charcoal">
                      {ev.title}
                    </h3>
                    <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                      {ev.location}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <button
                    onClick={() => toggleFeatured(ev.id)}
                    className={`rounded-full border-2 px-6 py-3 text-[9px] font-bold tracking-widest uppercase transition-all ${ev.isFeatured ? "scale-105 border-refenti-gold bg-refenti-gold text-white shadow-lg" : "border-gray-100 text-gray-300 hover:border-refenti-gold/40 hover:text-refenti-gold"}`}
                  >
                    {ev.isFeatured ? "Featured" : "Regular"}
                  </button>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => handleEdit(ev)}
                      className="text-[9px] font-bold tracking-widest text-refenti-gold uppercase hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(ev.id)}
                      className="text-[9px] font-bold tracking-widest text-red-400 uppercase transition-colors hover:text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminEvents
