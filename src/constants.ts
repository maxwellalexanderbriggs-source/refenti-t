import type { EventItem, Inquiry, NewsItem, Project } from "./types"

export const INITIAL_PROJECTS: Project[] = [
  {
    id: "bole",
    name: "Refenti Bole",
    assetClass: "Residential",
    location: "Bole, Addis Ababa",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1200",
    description:
      "A boutique residential sanctuary defined by architectural privacy and refined urban living.",
    brochureUrl: "#",
    introTitle: "Architectural Privacy in Bole",
    introText:
      "Refenti Bole represents a commitment to high-privacy urban living. The development is structured as a low-density residence, prioritized for those who value exclusivity and architectural precision in the heart of the city.",
    introImage:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200",
    projectFeatures: [
      "5,000 Built-Up Area",
      "500 Plot Size",
      "Boutique Service",
      "Duplex Penthouse",
      "Single-Unit Floors",
      "Private Reservoir",
    ],
    detailSections: [
      {
        title: "Excellence in Care",
        text: "Our management framework incorporates dedicated zones for professional service and security, ensuring long-term quality and resident peace of mind.",
        image:
          "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=1200",
      },
      {
        title: "Privacy by Design",
        text: "Floor plates are engineered for maximum exclusivity, featuring configurations that cater to a sophisticated lifestyle requiring total privacy.",
        image:
          "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=1200",
      },
    ],
  },
  {
    id: "kazanchis",
    name: "Refenti Kazanchis",
    assetClass: "Mixed-Use",
    location: "Kazanchis, Addis Ababa",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200",
    description:
      "A landmark destination integrating professional workspace with hospitality and residential luxury.",
    brochureUrl: "#",
    introTitle: "A Central Hub for Enterprise",
    introText:
      "Designed as a central node for enterprise, Refenti Kazanchis combines structural strength with the 104,000 sqm capacity required by modern industries and diplomatic missions.",
    introImage:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=1200",
    projectFeatures: [
      "104,000 sqm GBA",
      "28-Story Landmark",
      "Event Infrastructure",
      "Commercial Center",
      "Hospitality Wing",
      "Premium Residential",
    ],
    detailSections: [
      {
        title: "Professional Venue",
        text: "Dedicated zones for summits and conventions, establishing the asset as a regional venue for high-level gatherings.",
        image:
          "https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?auto=format&fit=crop&q=80&w=1200",
      },
    ],
  },
  {
    id: "bulbula",
    name: "Refenti Bulbula",
    assetClass: "Mixed-Use",
    location: "Bulbula, Addis Ababa",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200",
    description:
      "An integrated destination blending vibrant retail, boutique hospitality, and modern workspace.",
    brochureUrl: "#",
    introTitle: "An Urban Convergence",
    introText:
      'Refenti Bulbula utilizes a coordinated "destination loop" model, ensuring a vibrant atmosphere through a balanced mix of commercial and hospitality spaces.',
    introImage:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200",
    projectFeatures: [
      "30,000 Built-Up Area",
      "Mixed-Use Vision",
      "Hotel Component",
      "High Footfall",
      "Terrace Spaces",
      "Modern Office",
    ],
    detailSections: [
      {
        title: "Commercial Quality",
        text: "High-capacity retail zones designed for professional operations and a consistent daytime presence.",
        image:
          "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1200",
      },
    ],
  },
]

export const INITIAL_EVENTS: EventItem[] = [
  {
    id: "1",
    title: "Portfolio Review",
    date: "Dec 15, 2024",
    location: "Headquarters",
    image:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=600",
    details:
      "A private technical review for partners focusing on our 2025 pipeline and regional growth alignment.",
    isFeatured: true,
  },
  {
    id: "2",
    title: "Milestone Unveiling",
    date: "Jan 20, 2025",
    location: "Project Site",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=600",
    details:
      "The official unveiling of the Refenti Bole structural core, marking a key transition in our development cycle.",
    isFeatured: true,
  },
]

export const INITIAL_NEWS: NewsItem[] = [
  {
    id: "n1",
    category: "Vision",
    title: "The Future of Urban Living",
    date: "Nov 12, 2024",
    excerpt:
      "How Refenti is integrating modern standards into the project lifecycle.",
    content:
      "Our 2025 roadmap focuses on long-term value. By implementing high-grade oversight from inception, Refenti ensures that every structural asset is optimized for enduring performance.",
    image:
      "https://images.unsplash.com/photo-1449156001437-37c645d9bc01?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "n2",
    category: "Insights",
    title: "Real Estate Resilience",
    date: "Nov 20, 2024",
    excerpt: "The shift toward high-quality assets in East Africa.",
    content:
      "The regional market is maturing. Refenti addressed this demand by offering high-standard developments with international quality and disciplined management.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200",
  },
]

export const INITIAL_INQUIRIES: Inquiry[] = []

const P_KEY = "refenti_projects_v1"
const E_KEY = "refenti_events_v1"
const N_KEY = "refenti_news_v1"
const I_KEY = "refenti_inquiries_v1"

const getFromStore = <T>(key: string, initial: T): T => {
  const stored = localStorage.getItem(key)
  if (!stored) {
    localStorage.setItem(key, JSON.stringify(initial))
    return initial
  }
  return JSON.parse(stored)
}

export const getProjects = (): Project[] =>
  getFromStore(P_KEY, INITIAL_PROJECTS)
export const saveProjects = (projects: Project[]) =>
  localStorage.setItem(P_KEY, JSON.stringify(projects))

export const getEvents = (): EventItem[] => getFromStore(E_KEY, INITIAL_EVENTS)
export const saveEvents = (events: EventItem[]) =>
  localStorage.setItem(E_KEY, JSON.stringify(events))

export const getNews = (): NewsItem[] => getFromStore(N_KEY, INITIAL_NEWS)
export const saveNews = (news: NewsItem[]) =>
  localStorage.setItem(N_KEY, JSON.stringify(news))

export const getInquiries = (): Inquiry[] =>
  getFromStore(I_KEY, INITIAL_INQUIRIES)
export const saveInquiries = (inquiries: Inquiry[]) =>
  localStorage.setItem(I_KEY, JSON.stringify(inquiries))
