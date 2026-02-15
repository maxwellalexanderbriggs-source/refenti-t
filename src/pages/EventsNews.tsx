import { useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"
import { Link } from "react-router-dom"
import FadeIn from "../components/FadeIn"
import { getEvents, getNews } from "../lib/api"
import type { EventItem, NewsItem } from "../types"

function NewsCard({ item, index }: { item: NewsItem; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div
      className="group relative h-fit min-h-[500px] overflow-hidden bg-white shadow-sm transition-all duration-1000"
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-cover grayscale-[0.3] transition-transform duration-500 group-hover:grayscale-0"
        />
        <div className="absolute top-6 left-6">
          <span className="rounded-full bg-refenti-gold px-4 py-1.5 text-xs font-bold text-white uppercase">
            {item.category}
          </span>
        </div>
      </div>
      <div className="space-y-4 p-8">
        <p className="text-xs font-bold text-gray-800 uppercase">{item.date}</p>
        <h3 className="font-display text-3xl leading-none font-light text-black">
          {item.title}
        </h3>
        <p className="text-sm leading-relaxed font-light text-gray-700">
          {item.excerpt}
        </p>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 border-b border-transparent pb-1 text-xs font-bold text-refenti-gold uppercase transition-all hover:border-refenti-gold"
        >
          {isExpanded ? "Close Brief" : "View Brief"}
        </button>

        <div
          className={`overflow-hidden transition-all duration-1000 ease-in-out ${isExpanded ? "mt-6 max-h-[500px] border-t border-gray-100 pt-6 opacity-100" : "max-h-0 opacity-0"}`}
        >
          <p className="text-sm leading-relaxed font-light text-gray-700 ">
            {item.content || item.excerpt}
          </p>
        </div>
      </div>
    </div>
  )
}

function EventsNews() {
  const [scrollY, setScrollY] = useState(0)
  const [events, setEvents] = useState<EventItem[]>([])
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState<"all" | "news" | "events">(
    "all",
  )

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      const [eventsResult, newsResult] = await Promise.all([
        getEvents(),
        getNews(),
      ])

      if (eventsResult.error) {
        console.error("Failed to load events:", eventsResult.error.message)
      } else {
        setEvents(eventsResult.data)
      }

      if (newsResult.error) {
        console.error("Failed to load news:", newsResult.error.message)
      } else {
        setNews(newsResult.data)
      }

      setLoading(false)
    }
    fetchData()
  }, [])

  const showNews = activeFilter === "all" || activeFilter === "news"
  const showEvents = activeFilter === "all" || activeFilter === "events"

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Events & News - Refenti Group Updates</title>
        <meta
          name="description"
          content="Stay updated with Refenti Group's latest events, milestones, and industry insights. Real estate development news and announcements from Ethiopia and Dubai."
        />
      </Helmet>
      <div className="px-6 pt-32 pb-20 md:px-12 md:pt-44 md:pb-32">
        <div className="mx-auto max-w-7xl">
          {/* Page Header */}
          <FadeIn>
            <div className="mb-12 space-y-6 text-center">
              <div className="space-y-3">
                <p className="font-sans text-xs font-bold text-refenti-gold uppercase">
                  Institutional Updates
                </p>
                <h1 className="font-display text-6xl leading-none font-light text-black uppercase md:text-9xl">
                  News & Events
                </h1>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center justify-center gap-3 pt-6">
                <button
                  onClick={() => setActiveFilter("all")}
                  className={`rounded-full border px-6 py-3 text-xs font-bold uppercase transition-all duration-300 ${
                    activeFilter === "all"
                      ? "border-refenti-gold bg-refenti-gold text-white shadow-md"
                      : "border-gray-200 bg-white text-gray-600 hover:border-refenti-gold hover:text-refenti-gold"
                  }`}
                >
                  All Updates
                </button>
                <button
                  onClick={() => setActiveFilter("news")}
                  className={`rounded-full border px-6 py-3 text-xs font-bold uppercase transition-all duration-300 ${
                    activeFilter === "news"
                      ? "border-refenti-gold bg-refenti-gold text-white shadow-md"
                      : "border-gray-200 bg-white text-gray-600 hover:border-refenti-gold hover:text-refenti-gold"
                  }`}
                >
                  News
                </button>
                <button
                  onClick={() => setActiveFilter("events")}
                  className={`rounded-full border px-6 py-3 text-xs font-bold uppercase transition-all duration-300 ${
                    activeFilter === "events"
                      ? "border-refenti-gold bg-refenti-gold text-white shadow-md"
                      : "border-gray-200 bg-white text-gray-600 hover:border-refenti-gold hover:text-refenti-gold"
                  }`}
                >
                  Events
                </button>
              </div>
            </div>
          </FadeIn>

          {loading ? (
            <FadeIn>
              <div className="py-20 text-center text-gray-400">Loading...</div>
            </FadeIn>
          ) : (
            <div className="space-y-20 md:space-y-32">
              {/* News Section */}
              {showNews && news.length > 0 && (
                <section className="space-y-10">
                  <FadeIn>
                    <div className="flex flex-col items-start justify-between border-b border-gray-300 pb-8 md:flex-row md:items-end">
                      <div className="space-y-2">
                        <p className="font-sans text-xs font-bold text-refenti-gold uppercase">
                          Sector Insights
                        </p>
                        <h2 className="font-display text-4xl font-light text-black uppercase md:text-6xl">
                          News
                        </h2>
                      </div>
                    </div>
                  </FadeIn>

                  <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-2 lg:grid-cols-3">
                    {news.map((item, idx) => (
                      <FadeIn key={item.id} delay={idx * 100}>
                        <NewsCard item={item} index={idx} />
                      </FadeIn>
                    ))}
                  </div>
                </section>
              )}

              {/* Events Section */}
              {showEvents && events.length > 0 && (
                <section className="space-y-12">
                  <FadeIn>
                    <div className="space-y-4 text-center">
                      <p className="font-sans text-xs font-bold text-refenti-gold uppercase">
                        Strategic Engagements
                      </p>
                      <h2 className="font-display text-4xl font-light text-black uppercase md:text-5xl">
                        Technical Events
                      </h2>
                    </div>
                  </FadeIn>

                  <div className="relative mx-auto max-w-5xl space-y-8">
                    {/* Timeline connector */}
                    <div className="absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b from-transparent via-refenti-gold to-transparent md:left-8" />

                    {events.map((event, idx) => (
                      <FadeIn key={event.id} delay={idx * 150}>
                        <div className="relative">
                          {/* Timeline dot */}
                          <div className="absolute top-6 left-0 z-10 flex items-center md:left-8">
                            <div className="h-2.5 w-2.5 -translate-x-1/2 rounded-full border-2 border-refenti-gold bg-refenti-offwhite transition-all duration-500 group-hover:scale-150" />
                          </div>

                          <div className="group relative ml-6 md:ml-20">
                            {/* Main card container with dramatic layout */}
                            <div className="relative overflow-hidden bg-white">
                              <div className="grid gap-0 md:grid-cols-[1.2fr,1fr]">
                                {/* Image section with diagonal cut */}
                                <div className="relative aspect-[5/3] overflow-hidden md:aspect-[2/1]">
                                  <div
                                    className="absolute inset-0 bg-refenti-charcoal/5"
                                    style={{
                                      clipPath:
                                        "polygon(0 0, 100% 0, 95% 100%, 0 100%)",
                                    }}
                                  />
                                  <img
                                    src={event.image}
                                    alt={event.title}
                                    className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                                    style={{
                                      clipPath:
                                        "polygon(0 0, 100% 0, 95% 100%, 0 100%)",
                                    }}
                                  />
                                  {/* Gradient overlay */}
                                  <div
                                    className="absolute inset-0 bg-gradient-to-br from-refenti-charcoal/20 via-transparent to-refenti-gold/10 opacity-60 transition-opacity duration-700 group-hover:opacity-30"
                                    style={{
                                      clipPath:
                                        "polygon(0 0, 100% 0, 95% 100%, 0 100%)",
                                    }}
                                  />
                                </div>

                                {/* Content section */}
                                <div className="relative flex flex-col justify-between bg-white p-6 md:p-8">
                                  {/* Date label - positioned absolutely for drama */}
                                  <div className="absolute -top-0 right-0 left-0 flex items-center gap-3 border-b border-refenti-gold/20 bg-gradient-to-r from-refenti-gold/5 to-transparent px-6 py-3 md:-left-6 md:px-8">
                                    <span className="font-sans text-[10px] font-bold tracking-widest text-refenti-gold uppercase">
                                      {event.date}
                                    </span>
                                    <div className="h-[1px] flex-1 bg-gradient-to-r from-refenti-gold/30 to-transparent" />
                                    <span className="font-sans text-[10px] font-bold tracking-widest text-refenti-charcoal/60 uppercase">
                                      {event.location}
                                    </span>
                                  </div>

                                  <div className="mt-12 space-y-4">
                                    <h3 className="font-display text-2xl leading-[0.95] font-light text-black md:text-3xl">
                                      {event.title}
                                    </h3>

                                    <p className="text-sm leading-relaxed font-light text-gray-700">
                                      {event.details}
                                    </p>
                                  </div>

                                  {/* CTA with sophisticated hover */}
                                  <div className="mt-6 flex items-center gap-3">
                                    <Link
                                      to="/contact"
                                      className="group/btn relative overflow-hidden bg-refenti-charcoal px-6 py-3 text-[10px] font-bold tracking-widest text-white uppercase transition-all duration-500 hover:bg-refenti-gold hover:tracking-[0.2em]"
                                    >
                                      <span className="relative z-10">
                                        Request Information
                                      </span>
                                      <div className="absolute inset-0 translate-y-full bg-gradient-to-t from-refenti-gold to-refenti-gold/80 transition-transform duration-500 group-hover/btn:translate-y-0" />
                                    </Link>

                                    {/* Decorative arrow */}
                                    <div className="flex h-10 w-10 items-center justify-center border border-refenti-gold/20 transition-all duration-500 group-hover:border-refenti-gold group-hover:bg-refenti-gold/5">
                                      <svg
                                        className="h-4 w-4 text-refenti-gold transition-transform duration-500 group-hover:translate-x-1"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={1.5}
                                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                                        />
                                      </svg>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Bottom accent line */}
                              <div className="h-1 w-full bg-gradient-to-r from-refenti-gold via-refenti-charcoal to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                            </div>

                            {/* Floating event number badge */}
                            <div className="absolute -top-3 -right-3 flex h-12 w-12 items-center justify-center border-2 border-refenti-gold bg-refenti-offwhite transition-all duration-500 group-hover:scale-110 group-hover:border-refenti-charcoal md:-top-4 md:-right-4 md:h-14 md:w-14">
                              <span className="font-display text-xl font-light text-refenti-charcoal md:text-2xl">
                                {String(idx + 1).padStart(2, "0")}
                              </span>
                            </div>
                          </div>
                        </div>
                      </FadeIn>
                    ))}
                  </div>
                </section>
              )}

              {/* Empty State */}
              {!loading &&
                ((activeFilter === "news" && news.length === 0) ||
                  (activeFilter === "events" && events.length === 0) ||
                  (activeFilter === "all" &&
                    news.length === 0 &&
                    events.length === 0)) && (
                  <FadeIn>
                    <div className="py-20 text-center">
                      <p className="font-display text-xl font-light text-gray-400">
                        No updates available at this time.
                      </p>
                    </div>
                  </FadeIn>
                )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default EventsNews
