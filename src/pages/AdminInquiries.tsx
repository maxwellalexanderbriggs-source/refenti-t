import React, { useEffect, useState } from "react"
import { deleteInquiry, getInquiries } from "../lib/api"
import type { Inquiry } from "../types"

type FilterType = "name" | "email" | "type" | "date"

function AdminInquiries() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [filterBy, setFilterBy] = useState<FilterType>("name")
  const [filterValue, setFilterValue] = useState("")

  useEffect(() => {
    const fetchInquiries = async () => {
      const { data, error } = await getInquiries()
      if (error) {
        console.error("Failed to load inquiries:", error.message)
      } else {
        setInquiries(data)
      }
      setLoading(false)
    }
    fetchInquiries()
  }, [])

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation()
    if (confirm("Delete this inquiry?")) {
      const { error } = await deleteInquiry(id)
      if (error) {
        console.error("Failed to delete inquiry:", error.message)
        alert("Failed to delete inquiry.")
      } else {
        setInquiries(inquiries.filter((i) => i.id !== id))
        if (expandedId === id) setExpandedId(null)
      }
    }
  }

  const filteredInquiries = inquiries
    .filter((i) => {
      if (!filterValue) return true
      const search = filterValue.toLowerCase()
      switch (filterBy) {
        case "name":
          return i.name.toLowerCase().includes(search)
        case "email":
          return i.email.toLowerCase().includes(search)
        case "type":
          return i.type.toLowerCase().includes(search)
        case "date":
          return i.date.toLowerCase().includes(search)
        default:
          return true
      }
    })
    .reverse()

  return (
    <div className="mx-auto max-w-5xl p-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-semibold text-black">
            Inquiries
          </h1>
          {!loading && (
            <span className="rounded-full bg-refenti-gold/10 px-2.5 py-0.5 text-xs font-medium text-refenti-gold">
              {inquiries.length}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value as FilterType)}
            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-600 focus:border-refenti-gold focus:outline-none focus:ring-1 focus:ring-refenti-gold"
          >
            <option value="name">Name</option>
            <option value="email">Email</option>
            <option value="type">Type</option>
            <option value="date">Date</option>
          </select>
          <div className="relative">
            <input
              type="text"
              placeholder={`Search ${filterBy}...`}
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              className="w-48 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:border-refenti-gold focus:outline-none focus:ring-1 focus:ring-refenti-gold"
            />
            {filterValue && (
              <button
                onClick={() => setFilterValue("")}
                className="absolute top-1/2 right-2 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-600"
              >
                &times;
              </button>
            )}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="py-12 text-center text-sm text-gray-400">
          Loading...
        </div>
      ) : filteredInquiries.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-200 py-12 text-center text-sm text-gray-400">
          No inquiries found
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
          {/* Table header */}
          <div className="hidden border-b border-gray-100 px-4 py-2 text-xs font-medium text-gray-400 lg:grid lg:grid-cols-12 lg:gap-4">
            <div className="col-span-2">Date</div>
            <div className="col-span-3">Name</div>
            <div className="col-span-3">Type</div>
            <div className="col-span-4 text-right">Actions</div>
          </div>

          {filteredInquiries.map((i, idx) => {
            const isExpanded = expandedId === i.id
            return (
              <div
                key={i.id}
                className={
                  idx !== filteredInquiries.length - 1
                    ? "border-b border-gray-100"
                    : ""
                }
              >
                {/* Row */}
                <div
                  onClick={() => setExpandedId(isExpanded ? null : i.id)}
                  className={`flex cursor-pointer items-center gap-4 px-4 py-3 transition-colors hover:bg-gray-50 lg:grid lg:grid-cols-12 ${
                    isExpanded ? "bg-gray-50" : ""
                  }`}
                >
                  <div className="col-span-2 text-xs text-gray-400">
                    {i.date}
                  </div>
                  <div className="col-span-3 text-sm font-medium text-refenti-charcoal">
                    {i.name}
                  </div>
                  <div className="col-span-3">
                    <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                      {i.type}
                    </span>
                  </div>
                  <div className="col-span-4 flex items-center justify-end gap-2">
                    <span className="text-xs text-gray-400">
                      {isExpanded ? "Collapse" : "Expand"}
                    </span>
                    <svg
                      className={`h-3.5 w-3.5 text-gray-400 transition-transform duration-200 ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                    >
                      <path d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Expanded detail */}
                {isExpanded && (
                  <div className="border-t border-gray-100 bg-gray-50/50 px-4 py-4">
                    <div className="mb-3 flex items-start justify-between">
                      <div className="space-y-1">
                        <p className="text-xs font-medium text-gray-400">
                          Email
                        </p>
                        <p className="text-sm text-refenti-charcoal">
                          {i.email}
                        </p>
                      </div>
                      <button
                        onClick={(e) => handleDelete(e, i.id)}
                        className="rounded-md px-3 py-1.5 text-sm text-red-400 transition-colors hover:bg-red-50 hover:text-red-600"
                      >
                        Delete
                      </button>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-gray-400">
                        Message
                      </p>
                      <p className="rounded-lg bg-white p-3 text-sm leading-relaxed text-gray-700">
                        {i.message}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default AdminInquiries
