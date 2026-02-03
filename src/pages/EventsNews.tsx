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
      className="group relative h-fit min-h-[500px] overflow-hidden rounded-[2.5rem] bg-white shadow-sm transition-all duration-1000"
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-cover grayscale-[0.3] transition-transform duration-1000 group-hover:grayscale-0"
        />
        <div className="absolute top-6 left-6">
          <span className="rounded-full bg-refenti-gold px-4 py-1.5 text-[8px] font-bold tracking-ultra text-white uppercase">
            {item.category}
          </span>
        </div>
      </div>
      <div className="space-y-4 p-8">
        <p className="text-[8px] font-bold tracking-ultra text-gray-800 uppercase">
          {item.date}
        </p>
        <h3 className="font-display text-3xl leading-none font-light text-refenti-charcoal">
          {item.title}
        </h3>
        <p className="text-justify text-sm leading-relaxed font-light text-gray-700">
          {item.excerpt}
        </p>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 border-b border-transparent pb-1 text-[8px] font-bold tracking-ultra text-refenti-gold uppercase transition-all hover:border-refenti-gold"
        >
          {isExpanded ? "Close Brief" : "View Brief"}
        </button>

        <div
          className={`overflow-hidden transition-all duration-1000 ease-in-out ${isExpanded ? "mt-6 max-h-[500px] border-t border-gray-100 pt-6 opacity-100" : "max-h-0 opacity-0"}`}
        >
          <p className="text-justify text-[15px] leading-relaxed font-light text-gray-700 italic">
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

  return (
    <div className="min-h-screen bg-refenti-offwhite">
      <Helmet>
        <title>Events & News - Refenti Group Updates</title>
        <meta
          name="description"
          content="Stay updated with Refenti Group's latest events, milestones, and industry insights. Real estate development news and announcements from Ethiopia and Dubai."
        />
      </Helmet>
      <section className="relative flex h-[80vh] w-full items-end justify-center overflow-hidden bg-refenti-offwhite pb-16">
        <div
          className="absolute inset-[-5%]"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?auto=format&fit=crop&q=80&w=2000')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: `translateY(${-scrollY * 0.1}px)`,
            willChange: "transform",
          }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-refenti-offwhite via-refenti-offwhite/80 to-transparent" />

        <div className="relative z-10 mx-auto max-w-6xl space-y-6 px-4 text-center">
          <FadeIn direction="none" duration={1000}>
            <div className="space-y-6">
              <h1 className="font-display text-7xl leading-none font-light tracking-tighter text-refenti-charcoal uppercase md:text-[9rem]">
                News & Events
              </h1>
              <p className="font-sans text-[10px] font-bold tracking-[0.7em] text-refenti-gold uppercase md:text-xs">
                Institutional Updates
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="px-6 py-16 md:px-12 md:py-28">
        {loading ? (
          <FadeIn>
            <div className="py-20 text-center text-gray-400">Loading...</div>
          </FadeIn>
        ) : (
          <div className="mx-auto max-w-7xl space-y-20 md:space-y-32">
            <section className="space-y-10">
              <FadeIn>
                <div className="flex flex-col items-start justify-between border-b border-gray-300 pb-8 md:flex-row md:items-end">
                  <div className="space-y-2">
                    <p className="font-sans text-[8px] font-bold tracking-ultra text-refenti-gold uppercase">
                      Sector Insights
                    </p>
                    <h2 className="font-display text-4xl font-light text-refenti-charcoal uppercase md:text-6xl">
                      Asset <br className="hidden md:block" /> Milestones
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

            <section className="space-y-12">
              <FadeIn>
                <div className="space-y-4 text-center">
                  <p className="font-sans text-[9px] font-bold tracking-ultra text-refenti-gold uppercase">
                    Strategic Engagements
                  </p>
                  <h2 className="font-display text-5xl font-light text-refenti-charcoal uppercase md:text-7xl">
                    Technical Events
                  </h2>
                </div>
              </FadeIn>

              <div className="mx-auto max-w-5xl space-y-8">
                {events.map((event, idx) => (
                  <FadeIn key={event.id} delay={idx * 150}>
                    <div className="group flex flex-col items-center gap-6 rounded-[2rem] border border-gray-200 bg-white p-6 shadow-sm transition-all duration-700 md:flex-row md:gap-8 md:p-8">
                      <div className="aspect-square w-full flex-shrink-0 overflow-hidden rounded-[1.5rem] bg-gray-50 shadow-inner md:w-32">
                        <img
                          src={event.image}
                          className="h-full w-full object-cover"
                          alt={event.title}
                        />
                      </div>
                      <div className="flex-1 space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-4">
                            <span className="font-sans text-[10px] font-bold tracking-ultra text-refenti-gold uppercase">
                              {event.date}
                            </span>
                            <span className="h-px w-8 bg-gray-300" />
                            <span className="font-sans text-[10px] font-bold tracking-ultra text-gray-800 uppercase">
                              {event.location}
                            </span>
                          </div>
                          <h3 className="font-display text-3xl leading-none font-light text-refenti-charcoal">
                            {event.title}
                          </h3>
                        </div>
                        <p className="line-clamp-3 text-justify text-sm leading-relaxed font-light text-gray-800">
                          {event.details}
                        </p>
                        <Link
                          to="/contact"
                          className="inline-block rounded-xl bg-refenti-charcoal px-8 py-3 text-[10px] font-bold tracking-ultra text-white uppercase shadow-xl transition-all duration-500 hover:bg-refenti-gold"
                        >
                          Inquire for Details
                        </Link>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  )
}

export default EventsNews
