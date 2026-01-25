
import { Project, EventItem, NewsItem, Inquiry } from './types';

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'bole',
    name: 'Bole High-Rise',
    type: 'Sales',
    location: 'Bole, Addis Ababa',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1200',
    description: 'A masterpiece of contemporary architecture situated in the heart of the most prestigious district in Addis Ababa.',
    brochureUrl: '#',
    introTitle: 'A Vision of Vertical Luxury',
    introText: 'Bole High-Rise is a visionary development that seamlessly integrates ultra-luxury residential living with premium commercial facilities. Situated at the apex of the financial district in Addis Ababa, this architectural landmark offers a bespoke lifestyle defined by structural elegance and unparalleled convenience.',
    introImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200',
    projectFeatures: ['Commercial Space', 'Premium Hotel', 'Luxury Apartments', 'Infinity Pool', '32 Stories', 'Bole Central District'],
    detailSections: [
      { title: 'Panoramic City Views', text: 'Experience the city from an elevated perspective with floor-to-ceiling windows designed for clarity.', image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=1200' },
      { title: 'Private Concierge', text: 'Bespoke services tailored to your specific requirements, available twenty-four hours a day.', image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=1200' }
    ]
  },
  {
    id: 'kasanches',
    name: 'Kazanches Executive',
    type: 'Leasing',
    location: 'Kasanches, Addis Ababa',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200',
    description: 'Premium office spaces and luxury executive suites designed for leaders of global industry.',
    brochureUrl: '#',
    introTitle: 'Empowering Global Leadership',
    introText: 'Designed as a central node for international enterprise, the Kazanches Executive project combines structural rigidity with the flexibility required by modern industries.',
    introImage: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=1200',
    projectFeatures: ['Grade-A Office', 'Executive Suites', 'Conference Center', 'High-Speed Fiber'],
    detailSections: [
      { title: 'Executive Lounge', text: 'A private space for networking and high-level corporate strategy.', image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=1200' }
    ]
  },
  {
    id: 'bulbula',
    name: 'Bulbula Residential',
    type: 'Leasing',
    location: 'Bulbula, Addis Ababa',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200',
    description: 'Modern living spaces that blend comfort with sophisticated and functional urban design.',
    brochureUrl: '#',
    introTitle: 'Where Modernity Breathes',
    introText: 'At Bulbula Residential, we focus on the harmony between urban living and environmental serenity. Each unit is a testament to light, space, and family well-being.',
    introImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200',
    projectFeatures: ['Luxury Living', 'Family Friendly', 'Secure Perimeter', 'Lush Gardens'],
    detailSections: [
      { title: 'Community Gardens', text: 'Green spaces designed for tranquility and meaningful community bonding.', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200' }
    ]
  }
];

export const INITIAL_EVENTS: EventItem[] = [
  {
    id: '1',
    title: 'Private Investor Gala',
    date: 'Dec 15, 2024',
    location: 'Sheraton Addis',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=600',
    details: 'An exclusive evening for high-net-worth individuals to discuss our 2025 pipeline. This closed-door session will focus on the economic shifts in the Horn of Africa and the strategic positioning of Refenti assets for long-term capital preservation.',
    isFeatured: true
  },
  {
    id: '2',
    title: 'Bole Penthouse Reveal',
    date: 'Jan 20, 2025',
    location: 'Refenti Showroom',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=600',
    details: 'Witness the unveiling of our flagship triplex penthouse. Featuring custom Italian marble, integrated smart-home automation, and a private sky-terrace with 360-degree views of the capital.',
    isFeatured: true
  }
];

export const INITIAL_NEWS: NewsItem[] = [
  {
    id: 'n1',
    category: 'Architecture',
    title: 'Defining the 2025 Skyline',
    date: 'Nov 12, 2024',
    excerpt: 'How Refenti is integrating bioclimatic design into its portfolio.',
    content: 'Our 2025 vision centers on the integration of living systems within structural frameworks. By utilizing advanced bioclimatic modeling, Refenti is creating micro-climates within high-rise environments, reducing energy consumption by 40% while enhancing the physiological well-being of residents. This approach marks a shift from buildings as static objects to buildings as active participants in the urban ecosystem.',
    image: 'https://images.unsplash.com/photo-1449156001437-37c645d9bc01?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'n2',
    category: 'Market Trends',
    title: 'The Rise of Luxury Leasing',
    date: 'Nov 20, 2024',
    excerpt: 'Why high-net-worth individuals are shifting towards flexible premium assets.',
    content: 'The global shift towards mobility is reshaping the premium market in Addis Ababa. High-net-worth individuals are increasingly prioritizing Asset Agility: the ability to occupy ultra-luxury spaces without long-term capital commitment. Refenti’s Executive Collection addresses this demand by offering turnkey Grade-A residences with hotel-standard services and flexible leasing protocols.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'n3',
    category: 'Sustainability',
    title: 'Solar Glass Innovation',
    date: 'Nov 28, 2024',
    excerpt: 'Refenti explores photovoltaic glazing for the Bole High-Rise facade.',
    content: 'In collaboration with European glass manufacturers, Refenti is testing semi-transparent photovoltaic glazing for its next phase of vertical developments. This technology allows the building facade to serve as a massive solar array, generating enough electricity to power all common areas and external lighting without compromising architectural transparency.',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=1200'
  }
];

export const INITIAL_INQUIRIES: Inquiry[] = [
  {
    id: 'inq_1',
    name: 'Marcus Sterling',
    email: 'm.sterling@globalequity.com',
    type: 'Institutional Investment',
    message: 'We are monitoring the East African real estate market closely. Refenti\'s Bole project aligns with our 2025 Q1 asset acquisition strategy. Requesting a full financial prospectus and structural audit report.',
    date: 'Oct 22, 2024'
  },
  {
    id: 'inq_2',
    name: 'Elena Vance',
    email: 'elena.v@vancearchitects.com',
    type: 'Property Acquisition',
    message: 'I am interested in the triplex penthouse at Bole High-Rise. Specifically looking for information on custom marble finishes and the integrated smart-home API capabilities.',
    date: 'Oct 25, 2024'
  },
  {
    id: 'inq_3',
    name: 'Jonathan Chen',
    email: 'jchen@techcorp.hk',
    type: 'Exclusive Leasing',
    message: 'TechCorp is looking for Grade-A office space in Kasanches for our regional HQ. We require 12,000 sq ft with redundant high-speed fiber connectivity. Please provide current availability.',
    date: 'Nov 02, 2024'
  },
  {
    id: 'inq_4',
    name: 'Sara Melaku',
    email: 'sara.melaku@private.et',
    type: 'Property Acquisition',
    message: 'Requesting a private tour of the Bulbula Residential site for a family compound requirement. Privacy and perimeter security are our primary concerns.',
    date: 'Nov 05, 2024'
  },
  {
    id: 'inq_5',
    name: 'David Rossi',
    email: 'rossi.lux@milano.it',
    type: 'Property Acquisition',
    message: 'Refenti\'s design language is impressive. I would like to be invited to the next Private Investor Gala to discuss potential partnership opportunities.',
    date: 'Nov 08, 2024'
  }
];

const P_KEY = 'refenti_projects_v1';
const E_KEY = 'refenti_events_v1';
const N_KEY = 'refenti_news_v1';
const I_KEY = 'refenti_inquiries_v1';

const getFromStore = <T>(key: string, initial: T): T => {
  const stored = localStorage.getItem(key);
  if (!stored) {
    localStorage.setItem(key, JSON.stringify(initial));
    return initial;
  }
  return JSON.parse(stored);
};

export const getProjects = (): Project[] => getFromStore(P_KEY, INITIAL_PROJECTS);
export const saveProjects = (projects: Project[]) => localStorage.setItem(P_KEY, JSON.stringify(projects));

export const getEvents = (): EventItem[] => getFromStore(E_KEY, INITIAL_EVENTS);
export const saveEvents = (events: EventItem[]) => localStorage.setItem(E_KEY, JSON.stringify(events));

export const getNews = (): NewsItem[] => getFromStore(N_KEY, INITIAL_NEWS);
export const saveNews = (news: NewsItem[]) => localStorage.setItem(N_KEY, JSON.stringify(news));

export const getInquiries = (): Inquiry[] => getFromStore(I_KEY, INITIAL_INQUIRIES);
export const saveInquiries = (inquiries: Inquiry[]) => localStorage.setItem(I_KEY, JSON.stringify(inquiries));
