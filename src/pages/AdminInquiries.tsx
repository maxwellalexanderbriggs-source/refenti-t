import React, { useEffect, useRef, useState } from "react"
import { deleteInquiry, getInquiries } from "../lib/api"
import type { Inquiry } from "../types"

type FilterType = "name" | "email" | "type" | "date"

function AdminInquiries() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [filterBy, setFilterBy] = useState<FilterType>("name")
  const [filterValue, setFilterValue] = useState("")
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false)
  const filterRef = useRef<HTMLDivElement>(null)

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

    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setIsFilterMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation()
    if (confirm("Permanently delete this record?")) {
      const { error } = await deleteInquiry(id)
      if (error) {
        console.error("Failed to delete inquiry:", error.message)
        alert("Failed to delete inquiry. Please try again.")
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

  const filterOptions: { value: FilterType; label: string }[] = [
    { value: "name", label: "Name" },
    { value: "email", label: "Email" },
    { value: "type", label: "Type" },
    { value: "date", label: "Date" },
  ]

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-6 pb-12 md:p-8">
      <header className="flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-4 md:flex-row md:items-end">
        <div className="space-y-2">
          <p className="font-sans text-[10px] font-bold tracking-ultra text-refenti-gold uppercase">
            Engagement Portal
          </p>
          <h1 className="font-display text-5xl leading-none font-light text-refenti-charcoal uppercase md:text-7xl">
            Global <span className="text-refenti-gold">Inquiries</span>
          </h1>
        </div>

        {/* Refined Filter System */}
        <div className="group relative flex h-14 items-center rounded-[2rem] border border-gray-200 bg-white shadow-sm transition-all focus-within:shadow-xl">
          <div className="relative h-full" ref={filterRef}>
            <button
              type="button"
              onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
              className="flex h-full items-center gap-3 rounded-l-[2rem] border-r border-gray-200 px-8 text-[9px] font-bold tracking-widest text-refenti-gold uppercase transition-colors hover:bg-refenti-offwhite"
            >
              Filter By:{" "}
              <span className="text-refenti-charcoal">
                {filterOptions.find((o) => o.value === filterBy)?.label}
              </span>
              <svg
                className={`h-2 w-2 transition-transform duration-500 ${isFilterMenuOpen ? "rotate-180" : ""}`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
              >
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Custom Dropdown Interface */}
            {isFilterMenuOpen && (
              <div className="absolute top-[calc(100%+0.5rem)] left-0 z-[110] w-56 animate-slide-in-from-top overflow-hidden rounded-3xl border border-gray-200 bg-white py-3 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)]">
                <div className="mb-2 border-b border-gray-100 px-6 py-2">
                  <p className="text-[8px] font-bold tracking-widest text-gray-500 uppercase">
                    Select Parameter
                  </p>
                </div>
                {filterOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      setFilterBy(option.value)
                      setIsFilterMenuOpen(false)
                    }}
                    className={`w-full px-8 py-3 text-left text-[10px] font-bold tracking-widest uppercase transition-all ${filterBy === option.value ? "bg-refenti-offwhite text-refenti-gold" : "text-gray-600 hover:bg-gray-50 hover:pl-10 hover:text-refenti-charcoal"} `}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-1 items-center px-6">
            <input
              type="text"
              placeholder={`Search ${filterBy}...`}
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              className="w-full bg-transparent py-3 text-xs font-medium text-refenti-charcoal placeholder:text-gray-400 focus:outline-none"
            />
            {filterValue && (
              <button
                onClick={() => setFilterValue("")}
                className="ml-2 text-gray-400 transition-colors hover:text-refenti-gold"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
      </header>

      <div className="space-y-4">
        {filteredInquiries.length === 0 ? (
          <div className="rounded-xl border-2 border-dashed border-gray-200 bg-white p-12 text-center">
            <p className="font-display text-2xl text-gray-500">
              No matching engagement records found.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {/* Table Headers */}
            <div className="hidden grid-cols-12 px-12 py-4 text-[8px] font-bold tracking-ultra text-gray-500 uppercase select-none lg:grid">
              <div className="col-span-2">Date Received</div>
              <div className="col-span-3">Full Identity</div>
              <div className="col-span-3">Nature of Inquiry</div>
              <div className="col-span-4 text-right">Action</div>
            </div>

            {filteredInquiries.map((i) => {
              const isExpanded = expandedId === i.id
              return (
                <div
                  key={i.id}
                  className={`group overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-700 ${isExpanded ? "scale-[1.01] shadow-2xl ring-2 ring-refenti-gold/10" : "hover:border-gray-300 hover:shadow-lg"} `}
                >
                  {/* Summary Line Row */}
                  <div
                    onClick={() => setExpandedId(isExpanded ? null : i.id)}
                    className="flex cursor-pointer flex-col items-center gap-3 px-4 py-3 text-center lg:grid lg:grid-cols-12 lg:flex-row lg:text-left"
                  >
                    <div className="col-span-2 text-[10px] font-bold tracking-widest text-gray-500">
                      {i.date}
                    </div>
                    <div className="col-span-3">
                      <h3
                        className={`font-display text-2xl transition-colors duration-500 ${isExpanded ? "text-refenti-gold" : "text-refenti-charcoal"}`}
                      >
                        {i.name}
                      </h3>
                    </div>
                    <div className="col-span-3">
                      <span
                        className={`text-[9px] font-bold tracking-widest uppercase transition-colors ${isExpanded ? "text-refenti-gold" : "text-gray-600 group-hover:text-refenti-gold"}`}
                      >
                        {i.type}
                      </span>
                    </div>
                    <div className="col-span-4 flex w-full items-center justify-end gap-8 lg:w-auto">
                      <div
                        className={`rounded-full border px-6 py-2 text-[9px] font-bold tracking-widest uppercase transition-colors ${isExpanded ? "border-refenti-gold/20 bg-refenti-gold/5 text-refenti-gold" : "border-transparent text-gray-400 group-hover:border-gray-200 group-hover:text-refenti-charcoal"}`}
                      >
                        {isExpanded ? "Close Record" : "View Details"}
                        <span
                          className="ml-2 inline-block transition-transform duration-700"
                          style={{
                            transform: isExpanded ? "rotate(180deg)" : "none",
                          }}
                        >
                          ▼
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Detail Panel */}
                  <div
                    className={`overflow-hidden bg-refenti-offwhite/30 transition-all duration-1000 ease-in-out ${isExpanded ? "max-h-[1000px] border-t border-gray-200 opacity-100" : "max-h-0 opacity-0"} `}
                  >
                    <div className="space-y-4 p-4 md:p-6">
                      <div className="flex flex-col items-start justify-between gap-4 md:flex-row">
                        <div className="space-y-3">
                          <div className="space-y-2">
                            <p className="text-[9px] font-bold tracking-ultra text-gray-500 uppercase">
                              Correspondence Channel
                            </p>
                            <p className="text-2xl font-light break-all text-refenti-charcoal md:text-3xl">
                              {i.email}
                            </p>
                          </div>
                          <div className="flex items-center gap-6">
                            <div className="h-px w-12 bg-refenti-gold" />
                            <p className="font-sans text-[9px] font-bold tracking-widest text-refenti-gold uppercase">
                              Documented Inquiry
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={(e) => handleDelete(e, i.id)}
                          className="flex items-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2 text-[10px] font-bold tracking-ultra text-red-500 uppercase shadow-sm transition-all hover:bg-red-500 hover:text-white"
                        >
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                          Archive Record
                        </button>
                      </div>

                      <div className="space-y-3">
                        <p className="text-[9px] font-bold tracking-ultra text-gray-500 uppercase">
                          Narrative Submission
                        </p>
                        <div className="relative overflow-hidden rounded-xl border border-gray-100 bg-white p-6 shadow-inner md:p-8">
                          <span className="absolute top-4 left-4 font-display text-[6rem] text-refenti-gold opacity-5 select-none">
                            "
                          </span>
                          <p className="relative z-10 px-2 font-display text-base leading-relaxed font-light text-gray-700 md:px-4 md:text-lg">
                            {i.message}
                          </p>
                          <span className="absolute -right-4 -bottom-8 font-display text-[6rem] text-refenti-gold opacity-5 select-none">
                            "
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminInquiries
