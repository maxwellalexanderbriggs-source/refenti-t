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
        alert("Failed to update news. Please try again.")
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
        alert("Failed to create news. Please try again.")
      } else {
        setNews([...news, data])
        resetForm()
      }
    }
  }

  const handleEdit = (n: NewsItem) => {
    setEditingId(n.id)
    setFormData(n)
  }

  const handleDelete = async (id: string) => {
    if (confirm("Delete news story?")) {
      await deleteNewsImage(id)
      const { error } = await deleteNews(id)
      if (error) {
        console.error("Failed to delete news:", error.message)
        alert("Failed to delete news. Please try again.")
      } else {
        setNews(news.filter((n) => n.id !== id))
      }
    }
  }

  const resetForm = () => {
    setEditingId(null)
    setFormData({ title: "", category: "", date: "", excerpt: "", image: "" })
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
            Journal Management
          </p>
          <h1 className="font-display text-5xl leading-none font-light text-refenti-charcoal uppercase md:text-6xl">
            Editorial <span className="text-refenti-gold">Feed</span>
          </h1>
        </div>
        <button
          onClick={resetForm}
          className="rounded-xl bg-refenti-charcoal px-6 py-2.5 text-[10px] font-bold text-white uppercase shadow-lg transition-all hover:bg-refenti-gold"
        >
          New Story
        </button>
      </header>

      {/* Editor Form */}
      <div className="space-y-4 rounded-xl border border-gray-100 bg-white p-6 shadow-xl">
        <h2 className="border-b border-gray-50 pb-3 font-display text-2xl text-refenti-charcoal uppercase">
          {editingId ? "Modify Story" : "New Story"}
        </h2>
        <form onSubmit={handleSave} className="space-y-4">
          {[
            {
              label: "Article Headline",
              key: "title",
              placeholder: "The Future of Addis Architecture",
            },
            {
              label: "Journal Category",
              key: "category",
              placeholder: "Architecture, Investment",
            },
            {
              label: "Publishing Date",
              key: "date",
              placeholder: "Nov 12, 2024",
            },
          ].map((field) => (
            <div key={field.key} className="group space-y-2">
              <label className="text-[10px] font-bold tracking-widest text-refenti-gold uppercase transition-colors group-focus-within:text-refenti-charcoal">
                {field.label}
              </label>
              <input
                placeholder={field.placeholder}
                value={formData[field.key as keyof NewsItem] as string}
                onChange={(e) =>
                  setFormData({ ...formData, [field.key]: e.target.value })
                }
                className="w-full border-b-2 border-gray-100 bg-transparent py-3 text-xl font-medium text-refenti-charcoal transition-all placeholder:text-gray-200 focus:border-refenti-gold focus:outline-none"
              />
            </div>
          ))}

          <FileUpload
            label="Hero Cover Image"
            value={formData.image || ""}
            onChange={(url) => setFormData({ ...formData, image: url })}
            accept="image/*"
            uploadFn={(file) => {
              const newsId = editingId || "n" + Date.now()
              return uploadNewsImage(newsId, file)
            }}
            validator={validateImageFile}
          />

          <div className="space-y-2">
            <label className="text-[10px] font-bold tracking-widest text-refenti-gold uppercase">
              Article Excerpt
            </label>
            <textarea
              placeholder="Short, high-impact summary for the feed..."
              value={formData.excerpt}
              onChange={(e) =>
                setFormData({ ...formData, excerpt: e.target.value })
              }
              rows={3}
              className="w-full rounded-xl border-2 border-transparent bg-refenti-offwhite/50 p-3 text-sm leading-relaxed font-medium text-refenti-charcoal transition-all placeholder:text-gray-200 focus:border-refenti-gold focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-refenti-charcoal py-3 text-[10px] font-bold tracking-ultra text-white uppercase shadow-2xl transition-all hover:bg-refenti-gold active:scale-[0.98]"
          >
            {editingId ? "Confirm Editorial" : "Publish Story"}
          </button>
        </form>
      </div>

      {/* List View */}
      <div className="grid gap-3">
        {news.length === 0 ? (
          <div className="rounded-xl border-2 border-dashed border-gray-100 bg-white p-12 text-center">
            <p className="font-display text-2xl text-gray-300">
              Editorial feed empty.
            </p>
          </div>
        ) : (
          news.map((n) => (
            <div
              key={n.id}
              className="group flex items-center justify-between rounded-xl border border-gray-50 bg-white p-4 transition-all duration-700 hover:shadow-2xl"
            >
              <div className="flex items-center gap-4">
                <div className="h-28 w-28 flex-shrink-0 overflow-hidden rounded-[2rem] border border-gray-100 shadow-xl">
                  <img
                    src={n.image}
                    className="h-full w-full object-cover"
                    alt=""
                  />
                </div>
                <div className="max-w-md space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-[9px] font-bold tracking-ultra text-refenti-gold uppercase">
                      {n.category}
                    </span>
                    <span className="h-[1px] w-4 bg-gray-100" />
                    <span className="text-[9px] font-bold tracking-ultra text-gray-300 uppercase">
                      {n.date}
                    </span>
                  </div>
                  <h3 className="font-display text-3xl leading-tight text-refenti-charcoal">
                    {n.title}
                  </h3>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <button
                  onClick={() => handleEdit(n)}
                  className="rounded-lg border border-transparent bg-refenti-offwhite/50 px-4 py-2 text-[10px] font-bold tracking-widest text-refenti-gold uppercase transition-all hover:border-gray-100 hover:bg-white hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(n.id)}
                  className="px-4 py-2 text-[10px] font-bold tracking-widest text-red-400 uppercase transition-all hover:text-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default AdminNews
