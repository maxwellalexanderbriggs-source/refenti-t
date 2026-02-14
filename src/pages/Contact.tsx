import React, { useEffect, useRef, useState } from "react"
import { Helmet } from "react-helmet-async"
import FadeIn from "../components/FadeIn"
import { createInquiry } from "../lib/api"
import type { Inquiry } from "../types"

function Contact() {
  const [scrollY, setScrollY] = useState(0)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "Partnership",
    message: "",
  })
  const [isSent, setIsSent] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
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

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = "Name is required"

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format"
    }

    if (formData.message.length > 1000) {
      newErrors.message = "Message exceeds 1000 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)
    setErrors({})

    const newInquiry: Inquiry = {
      ...formData,
      id: Date.now().toString(),
      date: new Date().toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    }

    const { error } = await createInquiry(newInquiry)
    setIsSubmitting(false)

    if (error) {
      console.error("Failed to submit inquiry:", error.message)
      setErrors({ submit: "Failed to submit. Please try again." })
      return
    }

    setIsSent(true)
    setFormData({ name: "", email: "", type: "Partnership", message: "" })
    setTimeout(() => setIsSent(false), 8000)
  }

  const selectType = (type: string) => {
    setFormData({ ...formData, type })
    setIsDropdownOpen(false)
  }

  const handleDropdownKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape" && isDropdownOpen) {
      setIsDropdownOpen(false)
      return
    }

    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault()
      if (!isDropdownOpen) {
        setIsDropdownOpen(true)
        return
      }

      const currentIndex = inquiryTypes.indexOf(formData.type)
      const nextIndex =
        e.key === "ArrowDown"
          ? (currentIndex + 1) % inquiryTypes.length
          : (currentIndex - 1 + inquiryTypes.length) % inquiryTypes.length

      setFormData({ ...formData, type: inquiryTypes[nextIndex] })
    }
  }

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>
          Contact Refenti Group - Partnership & Investment Inquiries
        </title>
        <meta
          name="description"
          content="Get in touch with Refenti Group for partnership opportunities, investment inquiries, or stakeholder engagement. Connect with our team in Ethiopia and Dubai."
        />
      </Helmet>
      <div className="relative z-20 px-6 pt-32 pb-20 md:px-8 md:pt-44 md:pb-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-12 md:gap-10">
            <div className="space-y-6 md:col-span-5 md:space-y-8">
              <FadeIn>
                <div className="space-y-4 md:space-y-6">
                  <h2 className="font-display text-4xl leading-none font-light text-refenti-charcoal uppercase md:text-5xl">
                    Connect <br />
                    <span className="text-refenti-gold ">With Us</span>
                  </h2>
                  <p className="font-display text-xs font-bold text-refenti-gold uppercase">
                    Inquiry Portal
                  </p>
                </div>
              </FadeIn>

              <div className="space-y-8 md:space-y-10">
                {[
                  { label: "Management", val: "info@refenti.com" },
                  { label: "Connect", val: "+251 986 1986 86" },
                  {
                    label: "Our Hub",
                    val: "Refenti (Bole Bulbula), Addis Ababa, Ethiopia",
                  },
                ].map((item, idx) => (
                  <FadeIn key={item.label} delay={100 + idx * 100}>
                    <div className="space-y-1 md:space-y-2">
                      <p className="text-xs font-bold text-gray-400 uppercase">
                        {item.label}
                      </p>
                      <p className="text-xl font-light break-words md:text-2xl">
                        {item.val}
                      </p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>

            <FadeIn delay={200} direction="right" className="md:col-span-7">
              <div className="relative min-h-[600px] border border-gray-50 bg-white p-6 shadow-2xl md:p-12">
                <form
                onSubmit={handleSubmit}
                className={`space-y-6 transition-opacity duration-300 md:space-y-8 ${isSent ? "pointer-events-none opacity-0" : "opacity-100"}`}
              >
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-6">
                    <div className="space-y-3 md:space-y-4">
                      <label className="text-xs font-bold text-gray-400 uppercase">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Representative Name"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value })
                          if (errors.name)
                            setErrors({ ...errors, name: undefined })
                        }}
                        disabled={isSubmitting}
                        className="w-full border-b border-gray-100 bg-transparent py-3 text-base font-light transition-colors focus:border-refenti-gold focus:outline-none disabled:opacity-50 md:py-4 md:text-lg"
                      />
                      {errors.name && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div className="space-y-3 md:space-y-4">
                      <label className="text-xs font-bold text-gray-400 uppercase">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="Contact Email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value })
                          if (errors.email)
                            setErrors({ ...errors, email: undefined })
                        }}
                        disabled={isSubmitting}
                        className="w-full border-b border-gray-100 bg-transparent py-3 text-base font-light transition-colors focus:border-refenti-gold focus:outline-none disabled:opacity-50 md:py-4 md:text-lg"
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Inquiry Type Section */}
                  <div
                    className="relative space-y-3 md:space-y-4"
                    ref={dropdownRef}
                  >
                    <label className="text-xs font-bold text-gray-400 uppercase">
                      Inquiry Type
                    </label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        onKeyDown={handleDropdownKeyDown}
                        aria-expanded={isDropdownOpen}
                        aria-haspopup="listbox"
                        aria-controls="inquiry-type-listbox"
                        disabled={isSubmitting}
                        className={`flex w-full items-center justify-between border-b border-gray-100 py-3 text-left text-base font-light transition-all disabled:opacity-50 md:py-4 md:text-lg ${isDropdownOpen ? "border-refenti-gold text-refenti-gold" : "text-refenti-charcoal hover:border-refenti-gold/50"} `}
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
                        id="inquiry-type-listbox"
                        role="listbox"
                        aria-label="Inquiry type options"
                        className={`absolute top-full left-0 z-[999] mt-2 w-full origin-top overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-[0_40px_80px_-15px_rgba(0,0,0,0.15)] transition-all duration-500 ${isDropdownOpen ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none -translate-y-4 scale-95 opacity-0"} `}
                        style={{ backgroundColor: "#ffffff" }}
                      >
                        <div className="bg-white py-2">
                          {inquiryTypes.map((type) => (
                            <button
                              key={type}
                              type="button"
                              role="option"
                              aria-selected={formData.type === type}
                              onClick={() => selectType(type)}
                              className={`w-full px-8 py-5 text-left text-xs font-bold uppercase transition-all ${formData.type === type ? "bg-refenti-offwhite text-refenti-gold" : "text-gray-500 hover:bg-gray-50 hover:text-refenti-charcoal"} `}
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 md:space-y-4">
                    <label className="text-xs font-bold text-gray-400 uppercase">
                      Your Message
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Tell us about your requirements or interest..."
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value })
                        if (errors.message)
                          setErrors({ ...errors, message: undefined })
                      }}
                      disabled={isSubmitting}
                      className="w-full resize-none border-b border-gray-100 bg-transparent py-3 text-base font-light transition-colors focus:border-refenti-gold focus:outline-none disabled:opacity-50 md:py-4 md:text-lg"
                    />
                    <div className="mt-1 flex items-center justify-between">
                      <span className="text-xs text-gray-400">
                        {formData.message.length} / 1000
                      </span>
                      {errors.message && (
                        <p className="text-xs text-red-500">{errors.message}</p>
                      )}
                    </div>
                  </div>

                  {errors.submit && (
                    <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                      {errors.submit}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group w-full rounded-xl bg-refenti-charcoal py-5 font-sans text-xs font-bold text-white uppercase shadow-2xl transition-all duration-500 hover:bg-refenti-gold disabled:cursor-not-allowed disabled:bg-gray-400 md:rounded-2xl md:py-6"
                  >
                    <span className="flex items-center justify-center gap-4">
                      {isSubmitting ? "Submitting..." : "Submit Inquiry"}
                      {!isSubmitting && (
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
                      )}
                    </span>
                  </button>
                </form>

                <div
                  className={`absolute inset-0 flex flex-col items-center justify-center space-y-6 text-center transition-opacity duration-300 ${isSent ? "opacity-100" : "pointer-events-none opacity-0"}`}
                >
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
                  <h3 className="font-display text-4xl text-refenti-charcoal uppercase">
                    Received.
                  </h3>
                  <p className="font-light text-gray-400">
                    Your inquiry has been logged for review by our team.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
