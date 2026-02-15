import React, { useEffect, useState } from "react"
import FileUpload from "../components/FileUpload"
import { createNews, deleteNews, getNews, updateNews } from "../lib/api"
import {
  deleteNewsImage,
  uploadNewsImage,
  validateImageFile,
} from "../lib/storage"
import type { NewsItem } from "../types"

function AdminNews() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<NewsItem>>({
    title: "",
    category: "",
    date: "",
    excerpt: "",
    image: "",
  })

  useEffect(() => {
    fetchNews()
  }, [])

  const fetchNews = async () => {
    const { data, error } = await getNews()
    if (error) {
      console.error("Failed to load news:", error.message)
    } else {
      setNews(data)
    }
    setLoading(false)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title) return

    if (editingId) {
      const { data, error } = await updateNews(editingId, formData)
      if (error) {
        console.error("Failed to update news:", error.message)
        alert("Failed to update article.")
      } else {
        setNews(news.map((n) => (n.id === editingId ? data : n)))
        resetForm()
      }
    } else {
      const newNews = {
        ...formData,
        id: "n" + Date.now(),
      } as NewsItem
      const { data, error } = await createNews(newNews)
      if (error) {
        console.error("Failed to create news:", error.message)
        alert("Failed to create article.")
      } else {
        setNews([...news, data])
        resetForm()
      }
    }
  }

  const handleEdit = (n: NewsItem) => {
    setEditingId(n.id)
    setFormData(n)
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleDelete = async (id: string) => {
    if (confirm("Delete this article?")) {
      await deleteNewsImage(id)
      const { error } = await deleteNews(id)
      if (error) {
        console.error("Failed to delete news:", error.message)
        alert("Failed to delete article.")
      } else {
        setNews(news.filter((n) => n.id !== id))
      }
    }
  }

  const resetForm = () => {
    setEditingId(null)
    setShowForm(false)
    setFormData({ title: "", category: "", date: "", excerpt: "", image: "" })
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
    {
      label: "Title",
      key: "title",
      placeholder: "The Future of Addis Architecture",
    },
    { label: "Category", key: "category", placeholder: "Architecture, Investment" },
    { label: "Date", key: "date", placeholder: "Nov 12, 2024" },
  ]

  return (
    <div className="mx-auto max-w-5xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-semibold text-black">News</h1>
          <span className="rounded-full bg-refenti-gold/10 px-2.5 py-0.5 text-xs font-medium text-refenti-gold">
            {news.length}
          </span>
        </div>
        <button
          onClick={() => {
            resetForm()
            setShowForm(true)
          }}
          className="rounded-lg bg-refenti-charcoal px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-refenti-gold"
        >
          New article
        </button>
      </div>

      {/* Collapsible Form */}
      {showForm && (
        <div className="mb-6 rounded-lg border border-gray-200 bg-white p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-black">
              {editingId ? "Edit article" : "New article"}
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
                    value={formData[field.key as keyof NewsItem] as string}
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
                  const newsId = editingId || "n" + Date.now()
                  return uploadNewsImage(newsId, file)
                }}
                validator={validateImageFile}
              />
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-600">
                  Excerpt
                </label>
                <textarea
                  placeholder="Short summary for the feed..."
                  value={formData.excerpt}
                  onChange={(e) =>
                    setFormData({ ...formData, excerpt: e.target.value })
                  }
                  rows={4}
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm leading-relaxed text-refenti-charcoal placeholder:text-gray-400 focus:border-refenti-gold focus:outline-none focus:ring-1 focus:ring-refenti-gold"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="rounded-lg bg-refenti-charcoal px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-refenti-gold"
              >
                {editingId ? "Save changes" : "Create article"}
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
      {news.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-200 py-12 text-center text-sm text-gray-400">
          No articles yet
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
          {news.map((n, idx) => (
            <div
              key={n.id}
              className={`flex items-center gap-4 px-4 py-3 transition-colors hover:bg-gray-50 ${
                idx !== news.length - 1 ? "border-b border-gray-100" : ""
              }`}
            >
              <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg">
                <img
                  src={n.image}
                  className="h-full w-full object-cover"
                  alt=""
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-refenti-charcoal">
                  {n.title}
                </p>
                <p className="truncate text-xs text-gray-400">{n.date}</p>
              </div>
              <span className="hidden rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600 sm:inline-block">
                {n.category}
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleEdit(n)}
                  className="rounded-md px-3 py-1.5 text-sm text-gray-500 transition-colors hover:bg-gray-100 hover:text-refenti-charcoal"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(n.id)}
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

export default AdminNews
