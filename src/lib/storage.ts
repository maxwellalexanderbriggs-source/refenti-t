import { supabase } from "./supabase"

export type DataResult<T> =
  | { data: T; error: null }
  | { data: null; error: { message: string; details?: unknown } }

// Validation helpers
export const validateImageFile = (
  file: File,
): { valid: boolean; error?: string } => {
  const validTypes = ["image/jpeg", "image/png", "image/webp"]
  const maxSize = 50 * 1024 * 1024 // 50MB

  if (!validTypes.includes(file.type)) {
    return { valid: false, error: "Must be JPEG, PNG, or WebP" }
  }
  if (file.size > maxSize) {
    return { valid: false, error: "File must be under 50MB" }
  }
  return { valid: true }
}

export const validatePdfFile = (
  file: File,
): { valid: boolean; error?: string } => {
  const maxSize = 50 * 1024 * 1024 // 50MB

  if (file.type !== "application/pdf") {
    return { valid: false, error: "Must be a PDF file" }
  }
  if (file.size > maxSize) {
    return { valid: false, error: "File must be under 50MB" }
  }
  return { valid: true }
}

// Helper to get file extension
const getFileExtension = (file: File): string => {
  const parts = file.name.split(".")
  return parts[parts.length - 1].toLowerCase()
}

// Upload utilities for Projects
export const uploadProjectHero = async (
  projectId: string,
  file: File,
): Promise<DataResult<string>> => {
  const validation = validateImageFile(file)
  if (!validation.valid) {
    return { data: null, error: { message: validation.error! } }
  }

  const ext = getFileExtension(file)
  const path = `projects/${projectId}/hero-${Date.now()}.${ext}`

  const { error: uploadError } = await supabase.storage
    .from("refenti-media")
    .upload(path, file)

  if (uploadError) {
    return { data: null, error: { message: uploadError.message } }
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("refenti-media").getPublicUrl(path)

  return { data: publicUrl, error: null }
}

export const uploadProjectIntro = async (
  projectId: string,
  file: File,
): Promise<DataResult<string>> => {
  const validation = validateImageFile(file)
  if (!validation.valid) {
    return { data: null, error: { message: validation.error! } }
  }

  const ext = getFileExtension(file)
  const path = `projects/${projectId}/intro-${Date.now()}.${ext}`

  const { error: uploadError } = await supabase.storage
    .from("refenti-media")
    .upload(path, file)

  if (uploadError) {
    return { data: null, error: { message: uploadError.message } }
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("refenti-media").getPublicUrl(path)

  return { data: publicUrl, error: null }
}

export const uploadProjectBrochure = async (
  projectId: string,
  file: File,
): Promise<DataResult<string>> => {
  const validation = validatePdfFile(file)
  if (!validation.valid) {
    return { data: null, error: { message: validation.error! } }
  }

  const ext = getFileExtension(file)
  const path = `projects/${projectId}/brochure-${Date.now()}.${ext}`

  const { error: uploadError } = await supabase.storage
    .from("refenti-media")
    .upload(path, file)

  if (uploadError) {
    return { data: null, error: { message: uploadError.message } }
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("refenti-media").getPublicUrl(path)

  return { data: publicUrl, error: null }
}

export const uploadProjectDetailImage = async (
  projectId: string,
  sectionIndex: number,
  file: File,
): Promise<DataResult<string>> => {
  const validation = validateImageFile(file)
  if (!validation.valid) {
    return { data: null, error: { message: validation.error! } }
  }

  const ext = getFileExtension(file)
  const path = `projects/${projectId}/detail-${sectionIndex}-${Date.now()}.${ext}`

  const { error: uploadError } = await supabase.storage
    .from("refenti-media")
    .upload(path, file)

  if (uploadError) {
    return { data: null, error: { message: uploadError.message } }
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("refenti-media").getPublicUrl(path)

  return { data: publicUrl, error: null }
}

// Upload utilities for Events
export const uploadEventImage = async (
  eventId: string,
  file: File,
): Promise<DataResult<string>> => {
  const validation = validateImageFile(file)
  if (!validation.valid) {
    return { data: null, error: { message: validation.error! } }
  }

  const ext = getFileExtension(file)
  const path = `events/${eventId}-${Date.now()}.${ext}`

  const { error: uploadError } = await supabase.storage
    .from("refenti-media")
    .upload(path, file)

  if (uploadError) {
    return { data: null, error: { message: uploadError.message } }
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("refenti-media").getPublicUrl(path)

  return { data: publicUrl, error: null }
}

// Upload utilities for News
export const uploadNewsImage = async (
  newsId: string,
  file: File,
): Promise<DataResult<string>> => {
  const validation = validateImageFile(file)
  if (!validation.valid) {
    return { data: null, error: { message: validation.error! } }
  }

  const ext = getFileExtension(file)
  const path = `news/${newsId}-${Date.now()}.${ext}`

  const { error: uploadError } = await supabase.storage
    .from("refenti-media")
    .upload(path, file)

  if (uploadError) {
    return { data: null, error: { message: uploadError.message } }
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("refenti-media").getPublicUrl(path)

  return { data: publicUrl, error: null }
}

// Delete utilities
export const deleteProjectImages = async (
  projectId: string,
): Promise<DataResult<void>> => {
  const { data: files, error: listError } = await supabase.storage
    .from("refenti-media")
    .list(`projects/${projectId}`)

  if (listError) {
    return {
      data: null,
      error: { message: listError.message, details: listError },
    }
  }

  if (!files || files.length === 0) {
    return { data: undefined as void, error: null }
  }

  const filePaths = files.map((file) => `projects/${projectId}/${file.name}`)

  const { error: deleteError } = await supabase.storage
    .from("refenti-media")
    .remove(filePaths)

  if (deleteError) {
    return {
      data: null,
      error: { message: deleteError.message, details: deleteError },
    }
  }

  return { data: undefined as void, error: null }
}

export const deleteEventImage = async (
  eventId: string,
): Promise<DataResult<void>> => {
  const { data: files, error: listError } = await supabase.storage
    .from("refenti-media")
    .list("events")

  if (listError) {
    return {
      data: null,
      error: { message: listError.message, details: listError },
    }
  }

  if (!files || files.length === 0) {
    return { data: undefined as void, error: null }
  }

  const matchingFiles = files.filter((file) => file.name.startsWith(eventId))
  if (matchingFiles.length === 0) {
    return { data: undefined as void, error: null }
  }

  const filePaths = matchingFiles.map((file) => `events/${file.name}`)

  const { error: deleteError } = await supabase.storage
    .from("refenti-media")
    .remove(filePaths)

  if (deleteError) {
    return {
      data: null,
      error: { message: deleteError.message, details: deleteError },
    }
  }

  return { data: undefined as void, error: null }
}

export const deleteNewsImage = async (
  newsId: string,
): Promise<DataResult<void>> => {
  const { data: files, error: listError } = await supabase.storage
    .from("refenti-media")
    .list("news")

  if (listError) {
    return {
      data: null,
      error: { message: listError.message, details: listError },
    }
  }

  if (!files || files.length === 0) {
    return { data: undefined as void, error: null }
  }

  const matchingFiles = files.filter((file) => file.name.startsWith(newsId))
  if (matchingFiles.length === 0) {
    return { data: undefined as void, error: null }
  }

  const filePaths = matchingFiles.map((file) => `news/${file.name}`)

  const { error: deleteError } = await supabase.storage
    .from("refenti-media")
    .remove(filePaths)

  if (deleteError) {
    return {
      data: null,
      error: { message: deleteError.message, details: deleteError },
    }
  }

  return { data: undefined as void, error: null }
}

export const deleteImageByUrl = async (
  url: string,
): Promise<DataResult<void>> => {
  if (!url || !url.includes("refenti-media")) {
    return { data: undefined as void, error: null }
  }

  try {
    const urlObj = new URL(url)
    const pathParts = urlObj.pathname.split("/storage/v1/object/public/")
    if (pathParts.length < 2) {
      return { data: undefined as void, error: null }
    }

    const fullPath = pathParts[1]
    const path = fullPath.replace("refenti-media/", "")

    const { error: deleteError } = await supabase.storage
      .from("refenti-media")
      .remove([path])

    if (deleteError) {
      return {
        data: null,
        error: { message: deleteError.message, details: deleteError },
      }
    }

    return { data: undefined as void, error: null }
  } catch (e) {
    return {
      data: null,
      error: { message: "Invalid URL format", details: e },
    }
  }
}
