import type {
  EventItem,
  Inquiry,
  NewsItem,
  Project,
  ProjectDetailSection,
} from "../types"
import {
  deleteEventImage,
  deleteNewsImage,
  deleteProjectImages,
} from "./storage"
import { supabase } from "./supabase"

// ============================================================================
// TYPES
// ============================================================================

export type DataResult<T> =
  | { data: T; error: null }
  | { data: null; error: { message: string; details?: unknown } }

type ProjectRow = {
  id: string
  name: string
  asset_class: string
  location: string
  image: string
  description: string
  status: string | null
  brochure_url: string | null
  intro_title: string | null
  intro_text: string | null
  intro_image: string | null
  project_features: string[] | null
  detail_sections: ProjectDetailSection[] | null
  created_at: string
  updated_at: string
}

type EventRow = {
  id: string
  title: string
  date: string
  location: string
  image: string
  details: string | null
  is_featured: boolean | null
  created_at: string
  updated_at: string
}

type NewsRow = {
  id: string
  category: string
  title: string
  date: string
  excerpt: string
  image: string
  content: string | null
  created_at: string
  updated_at: string
}

type InquiryRow = {
  id: string
  name: string
  email: string
  type: string
  message: string
  date: string
  created_at: string
}

// ============================================================================
// MAPPING UTILITIES
// ============================================================================

const toDbProject = (
  project: Project,
): Omit<ProjectRow, "created_at" | "updated_at"> => ({
  id: project.id,
  name: project.name,
  asset_class: project.assetClass,
  location: project.location,
  image: project.image,
  description: project.description,
  status: project.status || null,
  brochure_url: project.brochureUrl || null,
  intro_title: project.introTitle || null,
  intro_text: project.introText || null,
  intro_image: project.introImage || null,
  project_features: project.projectFeatures || null,
  detail_sections: project.detailSections || null,
})

const fromDbProject = (row: ProjectRow): Project => ({
  id: row.id,
  name: row.name,
  assetClass: row.asset_class as Project["assetClass"],
  location: row.location,
  image: row.image,
  description: row.description,
  status: row.status || undefined,
  brochureUrl: row.brochure_url || undefined,
  introTitle: row.intro_title || undefined,
  introText: row.intro_text || undefined,
  introImage: row.intro_image || undefined,
  projectFeatures: row.project_features || undefined,
  detailSections: row.detail_sections || undefined,
})

const toDbEvent = (
  event: EventItem,
): Omit<EventRow, "created_at" | "updated_at"> => ({
  id: event.id,
  title: event.title,
  date: event.date,
  location: event.location,
  image: event.image,
  details: event.details || null,
  is_featured: event.isFeatured || null,
})

const fromDbEvent = (row: EventRow): EventItem => ({
  id: row.id,
  title: row.title,
  date: row.date,
  location: row.location,
  image: row.image,
  details: row.details || undefined,
  isFeatured: row.is_featured || undefined,
})

const toDbNews = (
  news: NewsItem,
): Omit<NewsRow, "created_at" | "updated_at"> => ({
  id: news.id,
  category: news.category,
  title: news.title,
  date: news.date,
  excerpt: news.excerpt,
  image: news.image,
  content: news.content || null,
})

const fromDbNews = (row: NewsRow): NewsItem => ({
  id: row.id,
  category: row.category,
  title: row.title,
  date: row.date,
  excerpt: row.excerpt,
  image: row.image,
  content: row.content || undefined,
})

const toDbInquiry = (inquiry: Inquiry): Omit<InquiryRow, "created_at"> => ({
  id: inquiry.id,
  name: inquiry.name,
  email: inquiry.email,
  type: inquiry.type,
  message: inquiry.message,
  date: inquiry.date,
})

const fromDbInquiry = (row: InquiryRow): Inquiry => ({
  id: row.id,
  name: row.name,
  email: row.email,
  type: row.type,
  message: row.message,
  date: row.date,
})

// ============================================================================
// PROJECTS CRUD
// ============================================================================

export const getProjects = async (): Promise<DataResult<Project[]>> => {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false })

  if (error)
    return { data: null, error: { message: error.message, details: error } }

  return { data: (data || []).map(fromDbProject), error: null }
}

export const getProjectById = async (
  id: string,
): Promise<DataResult<Project>> => {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single()

  if (error) {
    return {
      data: null,
      error: {
        message:
          error.code === "PGRST116" ? "Project not found" : error.message,
        details: error,
      },
    }
  }

  return { data: fromDbProject(data), error: null }
}

export const createProject = async (
  project: Project,
): Promise<DataResult<Project>> => {
  const { data, error } = await supabase
    .from("projects")
    .insert(toDbProject(project))
    .select()
    .single()

  if (error)
    return { data: null, error: { message: error.message, details: error } }

  return { data: fromDbProject(data), error: null }
}

export const updateProject = async (
  id: string,
  updates: Partial<Project>,
): Promise<DataResult<Project>> => {
  const dbUpdates = toDbProject({ id, ...updates } as Project)
  const { data, error } = await supabase
    .from("projects")
    .update(dbUpdates)
    .eq("id", id)
    .select()
    .single()

  if (error)
    return { data: null, error: { message: error.message, details: error } }

  return { data: fromDbProject(data), error: null }
}

export const deleteProject = async (id: string): Promise<DataResult<void>> => {
  await deleteProjectImages(id)

  const { error } = await supabase.from("projects").delete().eq("id", id)

  if (error)
    return { data: null, error: { message: error.message, details: error } }

  return { data: undefined as void, error: null }
}

// ============================================================================
// EVENTS CRUD
// ============================================================================

export const getEvents = async (): Promise<DataResult<EventItem[]>> => {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("created_at", { ascending: false })

  if (error)
    return { data: null, error: { message: error.message, details: error } }

  return { data: (data || []).map(fromDbEvent), error: null }
}

export const getEventById = async (
  id: string,
): Promise<DataResult<EventItem>> => {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("id", id)
    .single()

  if (error) {
    return {
      data: null,
      error: {
        message: error.code === "PGRST116" ? "Event not found" : error.message,
        details: error,
      },
    }
  }

  return { data: fromDbEvent(data), error: null }
}

export const createEvent = async (
  event: EventItem,
): Promise<DataResult<EventItem>> => {
  const { data, error } = await supabase
    .from("events")
    .insert(toDbEvent(event))
    .select()
    .single()

  if (error)
    return { data: null, error: { message: error.message, details: error } }

  return { data: fromDbEvent(data), error: null }
}

export const updateEvent = async (
  id: string,
  updates: Partial<EventItem>,
): Promise<DataResult<EventItem>> => {
  const dbUpdates = toDbEvent({ id, ...updates } as EventItem)
  const { data, error } = await supabase
    .from("events")
    .update(dbUpdates)
    .eq("id", id)
    .select()
    .single()

  if (error)
    return { data: null, error: { message: error.message, details: error } }

  return { data: fromDbEvent(data), error: null }
}

export const deleteEvent = async (id: string): Promise<DataResult<void>> => {
  await deleteEventImage(id)

  const { error } = await supabase.from("events").delete().eq("id", id)

  if (error)
    return { data: null, error: { message: error.message, details: error } }

  return { data: undefined as void, error: null }
}

// ============================================================================
// NEWS CRUD
// ============================================================================

export const getNews = async (): Promise<DataResult<NewsItem[]>> => {
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .order("created_at", { ascending: false })

  if (error)
    return { data: null, error: { message: error.message, details: error } }

  return { data: (data || []).map(fromDbNews), error: null }
}

export const getNewsById = async (
  id: string,
): Promise<DataResult<NewsItem>> => {
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .eq("id", id)
    .single()

  if (error) {
    return {
      data: null,
      error: {
        message:
          error.code === "PGRST116" ? "News item not found" : error.message,
        details: error,
      },
    }
  }

  return { data: fromDbNews(data), error: null }
}

export const createNews = async (
  news: NewsItem,
): Promise<DataResult<NewsItem>> => {
  const { data, error } = await supabase
    .from("news")
    .insert(toDbNews(news))
    .select()
    .single()

  if (error)
    return { data: null, error: { message: error.message, details: error } }

  return { data: fromDbNews(data), error: null }
}

export const updateNews = async (
  id: string,
  updates: Partial<NewsItem>,
): Promise<DataResult<NewsItem>> => {
  const dbUpdates = toDbNews({ id, ...updates } as NewsItem)
  const { data, error } = await supabase
    .from("news")
    .update(dbUpdates)
    .eq("id", id)
    .select()
    .single()

  if (error)
    return { data: null, error: { message: error.message, details: error } }

  return { data: fromDbNews(data), error: null }
}

export const deleteNews = async (id: string): Promise<DataResult<void>> => {
  await deleteNewsImage(id)

  const { error } = await supabase.from("news").delete().eq("id", id)

  if (error)
    return { data: null, error: { message: error.message, details: error } }

  return { data: undefined as void, error: null }
}

// ============================================================================
// INQUIRIES CRUD
// ============================================================================

export const getInquiries = async (): Promise<DataResult<Inquiry[]>> => {
  const { data, error } = await supabase
    .from("inquiries")
    .select("*")
    .order("created_at", { ascending: false })

  if (error)
    return { data: null, error: { message: error.message, details: error } }

  return { data: (data || []).map(fromDbInquiry), error: null }
}

export const getInquiryById = async (
  id: string,
): Promise<DataResult<Inquiry>> => {
  const { data, error } = await supabase
    .from("inquiries")
    .select("*")
    .eq("id", id)
    .single()

  if (error) {
    return {
      data: null,
      error: {
        message:
          error.code === "PGRST116" ? "Inquiry not found" : error.message,
        details: error,
      },
    }
  }

  return { data: fromDbInquiry(data), error: null }
}

export const createInquiry = async (
  inquiry: Inquiry,
): Promise<DataResult<void>> => {
  const { error } = await supabase
    .from("inquiries")
    .insert(toDbInquiry(inquiry))

  if (error)
    return { data: null, error: { message: error.message, details: error } }

  return { data: undefined as void, error: null }
}

export const deleteInquiry = async (id: string): Promise<DataResult<void>> => {
  const { error } = await supabase.from("inquiries").delete().eq("id", id)

  if (error)
    return { data: null, error: { message: error.message, details: error } }

  return { data: undefined as void, error: null }
}
