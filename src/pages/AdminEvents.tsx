import React, { useEffect, useState } from "react"
import FileUpload from "../components/FileUpload"
import { createEvent, deleteEvent, getEvents, updateEvent } from "../lib/api"
import {
  deleteEventImage,
  uploadEventImage,
  validateImageFile,
} from "../lib/storage"
import type { EventItem } from "../types"

function AdminEvents() {
  const [events, setEvents] = useState<EventItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
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
        alert("Failed to update event.")
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
        alert("Failed to create event.")
      } else {
        setEvents([...events, data])
        resetForm()
      }
    }
  }

  const handleEdit = (ev: EventItem) => {
    setEditingId(ev.id)
    setFormData(ev)
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleDelete = async (id: string) => {
    if (confirm("Delete this event?")) {
      await deleteEventImage(id)
      const { error } = await deleteEvent(id)
      if (error) {
        console.error("Failed to delete event:", error.message)
        alert("Failed to delete event.")
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
    setShowForm(false)
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
      <div className="mx-auto max-w-5xl p-6">
        <div className="py-12 text-center text-sm text-gray-400">
          Loading...
        </div>
      </div>
    )
  }

  const formFields = [
    { label: "Title", key: "title", placeholder: "e.g. Private Investor Gala" },
    { label: "Date", key: "date", placeholder: "Dec 15, 2024" },
    { label: "Location", key: "location", placeholder: "Refenti Showroom, Bole" },
  ]

  return (
    <div className="mx-auto max-w-5xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-semibold text-black">
            Events
          </h1>
          <span className="rounded-full bg-refenti-gold/10 px-2.5 py-0.5 text-xs font-medium text-refenti-gold">
            {events.length}
          </span>
        </div>
        <button
          onClick={() => {
            resetForm()
            setShowForm(true)
          }}
          className="rounded-lg bg-refenti-charcoal px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-refenti-gold"
        >
          New event
        </button>
      </div>

      {/* Collapsible Form */}
      {showForm && (
        <div className="mb-6 rounded-lg border border-gray-200 bg-white p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-black">
              {editingId ? "Edit event" : "New event"}
            </h2>
            <button
              type="button"
              onClick={resetForm}
              className="text-sm text-gray-400 transition-colors hover:text-refenti-charcoal"
            >
              Cancel
            </button>
          </div>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-3">
              {formFields.map((field) => (
                <div key={field.key} className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-600">
                    {field.label}
                  </label>
                  <input
                    placeholder={field.placeholder}
                    value={formData[field.key as keyof EventItem] as string}
                    onChange={(e) =>
                      setFormData({ ...formData, [field.key]: e.target.value })
                    }
                    className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-refenti-charcoal placeholder:text-gray-400 focus:border-refenti-gold focus:outline-none focus:ring-1 focus:ring-refenti-gold"
                  />
                </div>
              ))}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <FileUpload
                label="Image"
                value={formData.image || ""}
                onChange={(url) => setFormData({ ...formData, image: url })}
                accept="image/*"
                uploadFn={(file) => {
                  const eventId = editingId || Date.now().toString()
                  return uploadEventImage(eventId, file)
                }}
                validator={validateImageFile}
              />
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-600">
                  Details
                </label>
                <textarea
                  placeholder="Detailed description of the event..."
                  value={formData.details}
                  onChange={(e) =>
                    setFormData({ ...formData, details: e.target.value })
                  }
                  rows={4}
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm leading-relaxed text-refenti-charcoal placeholder:text-gray-400 focus:border-refenti-gold focus:outline-none focus:ring-1 focus:ring-refenti-gold"
                />
              </div>
            </div>

            <label className="flex items-center gap-2 text-sm text-refenti-charcoal">
              <input
                type="checkbox"
                checked={formData.isFeatured}
                onChange={(e) =>
                  setFormData({ ...formData, isFeatured: e.target.checked })
                }
                className="h-4 w-4 rounded border-gray-300 text-refenti-gold focus:ring-refenti-gold"
              />
              Featured on home page
            </label>

            <div className="flex gap-2">
              <button
                type="submit"
                className="rounded-lg bg-refenti-charcoal px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-refenti-gold"
              >
                {editingId ? "Save changes" : "Create event"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-500 transition-colors hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* List */}
      {events.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-200 py-12 text-center text-sm text-gray-400">
          No events yet
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
          {events.map((ev, idx) => (
            <div
              key={ev.id}
              className={`flex items-center gap-4 px-4 py-3 transition-colors hover:bg-gray-50 ${
                idx !== events.length - 1 ? "border-b border-gray-100" : ""
              }`}
            >
              <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg">
                <img
                  src={ev.image}
                  className="h-full w-full object-cover"
                  alt=""
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-refenti-charcoal">
                  {ev.title}
                </p>
                <p className="truncate text-xs text-gray-400">
                  {ev.date} &middot; {ev.location}
                </p>
              </div>
              {ev.isFeatured && (
                <span className="rounded-full bg-refenti-gold/10 px-2.5 py-0.5 text-xs font-medium text-refenti-gold">
                  Featured
                </span>
              )}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => toggleFeatured(ev.id)}
                  className="rounded-md px-3 py-1.5 text-sm text-gray-500 transition-colors hover:bg-gray-100 hover:text-refenti-charcoal"
                >
                  {ev.isFeatured ? "Unfeature" : "Feature"}
                </button>
                <button
                  onClick={() => handleEdit(ev)}
                  className="rounded-md px-3 py-1.5 text-sm text-gray-500 transition-colors hover:bg-gray-100 hover:text-refenti-charcoal"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(ev.id)}
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

export default AdminEvents
