import React, { useEffect, useState } from "react"
import FileUpload from "../components/FileUpload"
import {
  createEvent,
  deleteEvent,
  getEvents,
  updateEvent,
} from "../lib/api"
import {
  deleteEventImage,
  uploadEventImage,
  validateImageFile,
} from "../lib/storage"
import type { EventItem } from "../types"

function AdminEvents() {
  const [events, setEvents] = useState<EventItem[]>([])
  const [loading, setLoading] = useState(true)
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
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    const { data, error } = await getEvents()
    if (error) {
      console.error("Failed to load events:", error.message)
    } else {
      setEvents(data)
    }
    setLoading(false)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title) return

    if (editingId) {
      const { data, error } = await updateEvent(editingId, formData)
      if (error) {
        console.error("Failed to update event:", error.message)
        alert("Failed to update event. Please try again.")
      } else {
        setEvents(events.map((ev) => (ev.id === editingId ? data : ev)))
        resetForm()
      }
    } else {
      const newEvent = {
        ...formData,
        id: Date.now().toString(),
      } as EventItem
      const { data, error } = await createEvent(newEvent)
      if (error) {
        console.error("Failed to create event:", error.message)
        alert("Failed to create event. Please try again.")
      } else {
        setEvents([...events, data])
        resetForm()
      }
    }
  }

  const handleEdit = (ev: EventItem) => {
    setEditingId(ev.id)
    setFormData(ev)
  }

  const handleDelete = async (id: string) => {
    if (confirm("Delete engagement?")) {
      await deleteEventImage(id)
      const { error } = await deleteEvent(id)
      if (error) {
        console.error("Failed to delete event:", error.message)
        alert("Failed to delete event. Please try again.")
      } else {
        setEvents(events.filter((e) => e.id !== id))
      }
    }
  }

  const toggleFeatured = async (id: string) => {
    const event = events.find((e) => e.id === id)
    if (!event) return

    const { data, error } = await updateEvent(id, {
      isFeatured: !event.isFeatured,
    })
    if (error) {
      console.error("Failed to toggle featured:", error.message)
    } else {
      setEvents(events.map((e) => (e.id === id ? data : e)))
    }
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

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl space-y-16 p-8 pb-40 md:p-16">
        <div className="py-20 text-center text-gray-400">Loading...</div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-6 pb-12 md:p-8">
      <header className="flex items-end justify-between border-b border-gray-100 pb-4">
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
          className="rounded-xl bg-refenti-charcoal px-6 py-2.5 text-[10px] font-bold text-white uppercase shadow-lg transition-all hover:bg-refenti-gold"
        >
          New Event
        </button>
      </header>

      {/* Editor Form */}
      <div className="space-y-4 rounded-xl border border-gray-100 bg-white p-6 shadow-xl">
            <h2 className="border-b border-gray-50 pb-3 font-display text-2xl text-refenti-charcoal uppercase italic">
              {editingId ? "Modify Event" : "Create Event"}
            </h2>
            <form onSubmit={handleSave} className="space-y-4">
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

              <FileUpload
                label="Event Image"
                value={formData.image || ""}
                onChange={(url) => setFormData({ ...formData, image: url })}
                accept="image/*"
                uploadFn={(file) => {
                  const eventId = editingId || Date.now().toString()
                  return uploadEventImage(eventId, file)
                }}
                validator={validateImageFile}
              />

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
                  rows={3}
                  className="w-full rounded-xl border-2 border-transparent bg-refenti-offwhite/50 p-3 text-sm leading-relaxed font-medium text-refenti-charcoal transition-all placeholder:text-gray-200 focus:border-refenti-gold focus:outline-none"
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
                className="w-full rounded-xl bg-refenti-charcoal py-3 text-[10px] font-bold tracking-ultra text-white uppercase shadow-2xl transition-all hover:bg-refenti-gold active:scale-[0.98]"
              >
                {editingId ? "Confirm Updates" : "Publish Engagement"}
              </button>
            </form>
      </div>

      {/* List view */}
      <div className="grid gap-3">
          {events.length === 0 ? (
            <div className="rounded-xl border-2 border-dashed border-gray-100 bg-white p-12 text-center">
              <p className="font-display text-2xl text-gray-300 italic">
                Engagements list empty.
              </p>
            </div>
          ) : (
            events.map((ev) => (
              <div
                key={ev.id}
                className="group flex items-center justify-between rounded-xl border border-gray-50 bg-white p-4 transition-all duration-700 hover:shadow-2xl"
              >
                <div className="flex items-center gap-4">
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
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleFeatured(ev.id)}
                    className={`rounded-full border-2 px-4 py-1.5 text-[9px] font-bold tracking-widest uppercase transition-all ${ev.isFeatured ? "scale-105 border-refenti-gold bg-refenti-gold text-white shadow-lg" : "border-gray-100 text-gray-300 hover:border-refenti-gold/40 hover:text-refenti-gold"}`}
                  >
                    {ev.isFeatured ? "Featured" : "Regular"}
                  </button>
                  <div className="flex flex-col gap-1">
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
  )
}

export default AdminEvents
