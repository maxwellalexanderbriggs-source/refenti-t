import React, { useEffect, useRef, useState } from "react"
import { getInquiries, saveInquiries } from "../constants"
import type { Inquiry } from "../types"

const Contact: React.FC = () => {
  const [scrollY, setScrollY] = useState(0)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "Partnership",
    message: "",
  })
  const [isSent, setIsSent] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const inquiryTypes = ["Partnership", "Investment", "Stakeholder"]

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email) return

    const newInquiry: Inquiry = {
      ...formData,
      id: Date.now().toString(),
      date: new Date().toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    }

    const current = getInquiries()
    saveInquiries([...current, newInquiry])

    setIsSent(true)
    setFormData({ name: "", email: "", type: "Partnership", message: "" })
    setTimeout(() => setIsSent(false), 5000)
  }

  const selectType = (type: string) => {
    setFormData({ ...formData, type })
    setIsDropdownOpen(false)
  }

  return (
    <div className="min-h-screen bg-refenti-offwhite">
      {/* Hero Section */}
      <section className="relative flex h-screen w-full items-end justify-center overflow-hidden bg-refenti-offwhite pb-16 md:pb-32">
        <div
          className="absolute inset-[-5%]"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=1600')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: `translateY(${-scrollY * 0.1}px)`,
            willChange: "transform",
          }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-refenti-offwhite via-refenti-offwhite/70 to-transparent" />
        <div className="reveal active relative z-10 mx-auto max-w-6xl space-y-8 px-4 text-center md:space-y-12">
          <div className="space-y-4">
            <h1 className="font-display text-6xl leading-none font-light tracking-tight text-refenti-charcoal uppercase md:text-8xl lg:text-[9rem]">
              Contact
            </h1>
            <p className="font-sans text-[10px] font-bold tracking-[0.5em] text-refenti-gold uppercase">
              Direct Engagement
            </p>
          </div>
        </div>
      </section>

      <div className="relative z-20 px-6 py-12 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 md:grid-cols-12 md:gap-16">
            <div className="reveal space-y-8 md:col-span-5 md:space-y-12">
              <div className="space-y-4 md:space-y-6">
                <h2 className="font-display text-4xl leading-none font-light text-refenti-charcoal uppercase md:text-5xl">
                  Connect <br />
                  <span className="text-refenti-gold italic">With Us</span>
                </h2>
                <p className="font-display text-[10px] font-bold tracking-widest text-refenti-gold uppercase md:text-xs">
                  Inquiry Portal
                </p>
              </div>

              <div className="space-y-8 md:space-y-10">
                {[
                  { label: "Management", val: "info@refenti.com" },
                  { label: "Connect", val: "+251 986 1986 86" },
                  {
                    label: "Our Hub",
                    val: "Refenti (Bole Bulbula), Addis Ababa, Ethiopia",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="reveal space-y-1 md:space-y-2"
                  >
                    <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                      {item.label}
                    </p>
                    <p className="text-xl font-light break-words md:text-2xl">
                      {item.val}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="reveal rounded-[2.5rem] border border-gray-50 bg-white p-8 shadow-2xl md:col-span-7 md:rounded-[3rem] md:p-16">
              {isSent ? (
                <div className="flex h-full flex-col items-center justify-center space-y-6 py-20 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-refenti-gold/10">
                    <svg
                      className="h-8 w-8 text-refenti-gold"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="font-display text-4xl tracking-tighter text-refenti-charcoal uppercase">
                    Received.
                  </h3>
                  <p className="font-light text-gray-400">
                    Your inquiry has been logged for review by our team.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-8 md:space-y-12"
                >
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8">
                    <div className="reveal space-y-3 md:space-y-4">
                      <label className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Representative Name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full border-b border-gray-100 bg-transparent py-3 text-base font-light transition-colors focus:border-refenti-gold focus:outline-none md:py-4 md:text-lg"
                      />
                    </div>
                    <div className="reveal space-y-3 md:space-y-4">
                      <label className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="Contact Email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full border-b border-gray-100 bg-transparent py-3 text-base font-light transition-colors focus:border-refenti-gold focus:outline-none md:py-4 md:text-lg"
                      />
                    </div>
                  </div>

                  {/* Inquiry Type Section */}
                  <div
                    className="reveal relative space-y-3 md:space-y-4"
                    ref={dropdownRef}
                  >
                    <label className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                      Inquiry Type
                    </label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className={`flex w-full items-center justify-between border-b border-gray-100 py-3 text-left text-base font-light transition-all md:py-4 md:text-lg ${isDropdownOpen ? "border-refenti-gold text-refenti-gold" : "text-refenti-charcoal hover:border-refenti-gold/50"} `}
                      >
                        <span>{formData.type}</span>
                        <svg
                          className={`h-4 w-4 transition-transform duration-500 ${isDropdownOpen ? "rotate-180" : ""}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>

                      {/* Dropdown Options List - Remade for total opacity and highest z-index */}
                      <div
                        className={`absolute top-full left-0 z-[999] mt-2 w-full origin-top overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-[0_40px_80px_-15px_rgba(0,0,0,0.15)] transition-all duration-500 ${isDropdownOpen ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none -translate-y-4 scale-95 opacity-0"} `}
                        style={{ backgroundColor: "#ffffff" }}
                      >
                        <div className="bg-white py-2">
                          {inquiryTypes.map((type) => (
                            <button
                              key={type}
                              type="button"
                              onClick={() => selectType(type)}
                              className={`w-full px-8 py-5 text-left text-[11px] font-bold tracking-widest uppercase transition-all ${formData.type === type ? "bg-refenti-offwhite text-refenti-gold" : "text-gray-500 hover:bg-gray-50 hover:text-refenti-charcoal"} `}
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="reveal space-y-3 md:space-y-4">
                    <label className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                      Your Message
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Tell us about your requirements or interest..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full resize-none border-b border-gray-100 bg-transparent py-3 text-base font-light transition-colors focus:border-refenti-gold focus:outline-none md:py-4 md:text-lg"
                    />
                  </div>

                  <button className="reveal group w-full rounded-xl bg-refenti-charcoal py-5 font-sans text-[10px] font-bold tracking-widest text-white uppercase shadow-2xl transition-all duration-500 hover:bg-refenti-gold md:rounded-2xl md:py-6 md:text-xs">
                    <span className="flex items-center justify-center gap-4">
                      Submit Inquiry
                      <svg
                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
