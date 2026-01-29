export interface ProjectDetailSection {
  title: string
  text: string
  image: string
}

export interface Project {
  id: string
  name: string
  assetClass: "Residential" | "Mixed-Use" | "Commercial" | "Hospitality"
  location: string
  image: string
  description: string
  brochureUrl?: string
  introTitle?: string
  introText?: string
  introImage?: string
  projectFeatures?: string[]
  detailSections?: ProjectDetailSection[]
}

export interface EventItem {
  id: string
  title: string
  date: string
  location: string
  image: string
  details?: string
  isFeatured?: boolean
}

export interface NewsItem {
  id: string
  category: string
  title: string
  date: string
  excerpt: string
  image: string
  content?: string
}

export interface Inquiry {
  id: string
  name: string
  email: string
  type: string
  message: string
  date: string
}
