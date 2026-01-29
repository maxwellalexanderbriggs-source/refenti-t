import React, { useEffect, useState } from "react"
import { getNews, saveNews } from "../constants"
import type { NewsItem } from "../types"

const AdminNews: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<NewsItem>>({
    title: "",
    category: "",
    date: "",
    excerpt: "",
    image: "",
  })

  useEffect(() => {
    setNews(getNews())
  }, [])

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title) return
    let updated: NewsItem[]
    if (editingId) {
      updated = news.map((n) =>
        n.id === editingId ? ({ ...n, ...formData } as NewsItem) : n,
      )
    } else {
      updated = [...news, { ...formData, id: "n" + Date.now() } as NewsItem]
    }
    setNews(updated)
    saveNews(updated)
    resetForm()
  }

  const handleEdit = (n: NewsItem) => {
    setEditingId(n.id)
    setFormData(n)
  }
  const handleDelete = (id: string) => {
    if (confirm("Delete news story?")) {
      const u = news.filter((n) => n.id !== id)
      setNews(u)
      saveNews(u)
    }
  }
  const resetForm = () => {
    setEditingId(null)
    setFormData({ title: "", category: "", date: "", excerpt: "", image: "" })
  }

  return (
    <div className="mx-auto max-w-7xl space-y-16 p-8 pb-40 md:p-16">
      <header className="flex items-end justify-between border-b border-gray-100 pb-8">
        <div className="space-y-2">
          <p className="font-sans text-[10px] font-bold tracking-ultra text-refenti-gold uppercase">
            Journal Management
          </p>
          <h1 className="font-display text-5xl leading-none font-light text-refenti-charcoal uppercase md:text-6xl">
            Editorial <span className="text-refenti-gold italic">Feed</span>
          </h1>
        </div>
        <button
          onClick={resetForm}
          className="rounded-xl bg-refenti-charcoal px-10 py-4 text-[10px] font-bold text-white uppercase shadow-lg transition-all hover:bg-refenti-gold"
        >
          New Story
        </button>
      </header>

      <div className="grid gap-16 lg:grid-cols-12">
        {/* Editor Form */}
        <div className="lg:col-span-5">
          <div className="sticky top-28 space-y-10 rounded-[4rem] border border-gray-100 bg-white p-12 shadow-xl">
            <h2 className="border-b border-gray-50 pb-6 font-display text-3xl text-refenti-charcoal uppercase italic">
              {editingId ? "Modify Story" : "New Story"}
            </h2>
            <form onSubmit={handleSave} className="space-y-10">
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
                {
                  label: "Hero Cover (URL)",
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
                    value={formData[field.key as keyof NewsItem] as string}
                    onChange={(e) =>
                      setFormData({ ...formData, [field.key]: e.target.value })
                    }
                    className="w-full border-b-2 border-gray-100 bg-transparent py-3 text-xl font-medium text-refenti-charcoal transition-all placeholder:text-gray-200 focus:border-refenti-gold focus:outline-none"
                  />
                </div>
              ))}

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
                  rows={4}
                  className="w-full rounded-[2rem] border-2 border-transparent bg-refenti-offwhite/50 p-6 text-base leading-relaxed font-medium text-refenti-charcoal transition-all placeholder:text-gray-200 focus:border-refenti-gold focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-[2rem] bg-refenti-charcoal py-6 text-[10px] font-bold tracking-ultra text-white uppercase shadow-2xl transition-all hover:bg-refenti-gold active:scale-[0.98]"
              >
                {editingId ? "Confirm Editorial" : "Publish Story"}
              </button>
            </form>
          </div>
        </div>

        {/* List View */}
        <div className="grid gap-8 lg:col-span-7">
          {news.length === 0 ? (
            <div className="rounded-[4rem] border-2 border-dashed border-gray-100 bg-white p-32 text-center">
              <p className="font-display text-3xl text-gray-300 italic">
                Editorial feed empty.
              </p>
            </div>
          ) : (
            news.map((n) => (
              <div
                key={n.id}
                className="group flex items-center justify-between rounded-[3.5rem] border border-gray-50 bg-white p-10 transition-all duration-700 hover:shadow-2xl"
              >
                <div className="flex items-center gap-10">
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
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => handleEdit(n)}
                    className="rounded-xl border border-transparent bg-refenti-offwhite/50 px-6 py-3 text-[10px] font-bold tracking-widest text-refenti-gold uppercase transition-all hover:border-gray-100 hover:bg-white hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(n.id)}
                    className="px-6 py-3 text-[10px] font-bold tracking-widest text-red-400 uppercase transition-all hover:text-red-600"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminNews
