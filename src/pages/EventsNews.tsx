import React, { useEffect, useState } from "react"
import { getEvents, getNews } from "../constants"
import type { NewsItem } from "../types"

const NewsCard: React.FC<{ item: NewsItem; index: number }> = ({
  item,
  index,
}) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div
      className="group reveal active relative h-fit overflow-hidden rounded-[2.5rem] bg-white shadow-sm transition-all duration-1000"
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

const EventsNews: React.FC = () => {
  const [scrollY, setScrollY] = useState(0)
  const events = getEvents()
  const news = getNews()

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-refenti-offwhite">
      <section className="relative flex h-[80vh] w-full items-end justify-center overflow-hidden bg-refenti-offwhite pb-24">
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

        <div className="reveal active relative z-10 mx-auto max-w-6xl space-y-8 px-4 text-center">
          <div className="space-y-6">
            <h1 className="font-display text-7xl leading-none font-light tracking-tighter text-refenti-charcoal uppercase md:text-[9rem]">
              News
            </h1>
            <p className="font-sans text-[10px] font-bold tracking-[0.7em] text-refenti-gold uppercase md:text-xs">
              Institutional Updates
            </p>
          </div>
        </div>
      </section>

      <div className="px-6 py-24 md:px-12 md:py-40">
        <div className="mx-auto max-w-7xl space-y-32 md:space-y-48">
          <section className="space-y-16">
            <div className="reveal active flex flex-col items-start justify-between border-b border-gray-300 pb-8 md:flex-row md:items-end">
              <div className="space-y-2">
                <p className="font-sans text-[8px] font-bold tracking-ultra text-refenti-gold uppercase">
                  Sector Insights
                </p>
                <h2 className="font-display text-4xl font-light text-refenti-charcoal uppercase md:text-6xl">
                  Asset <br className="hidden md:block" /> Milestones
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
              {news.map((item, idx) => (
                <NewsCard key={item.id} item={item} index={idx} />
              ))}
            </div>
          </section>

          <section className="space-y-20">
            <div className="reveal active space-y-4 text-center">
              <p className="font-sans text-[9px] font-bold tracking-ultra text-refenti-gold uppercase">
                Strategic Engagements
              </p>
              <h2 className="font-display text-5xl font-light text-refenti-charcoal uppercase md:text-7xl">
                Technical Summits
              </h2>
            </div>

            <div className="mx-auto max-w-5xl space-y-8">
              {events.map((event, idx) => (
                <div
                  key={event.id}
                  className="group reveal active flex flex-col items-center gap-10 rounded-[3rem] border border-gray-200 bg-white p-8 shadow-sm transition-all duration-700 md:flex-row md:gap-16 md:p-12"
                  style={{ transitionDelay: `${idx * 200}ms` }}
                >
                  <div className="aspect-square w-full flex-shrink-0 overflow-hidden rounded-[2rem] bg-gray-50 shadow-inner md:w-1/3">
                    <img
                      src={event.image}
                      className="h-full w-full object-cover"
                      alt={event.title}
                    />
                  </div>
                  <div className="flex-1 space-y-6">
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
                      <h3 className="font-display text-4xl leading-none font-light text-refenti-charcoal">
                        {event.title}
                      </h3>
                    </div>
                    <p className="line-clamp-3 text-justify text-base leading-relaxed font-light text-gray-800">
                      {event.details}
                    </p>
                    <button className="rounded-xl bg-refenti-charcoal px-10 py-4 text-[10px] font-bold tracking-ultra text-white uppercase shadow-xl transition-all duration-500 hover:bg-refenti-gold">
                      Inquire for Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default EventsNews
