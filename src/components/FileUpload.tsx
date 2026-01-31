import React, { useState } from "react"
import type { DataResult } from "../lib/storage"

interface FileUploadProps {
  label: string
  value: string
  onChange: (url: string) => void
  accept: string
  uploadFn: (file: File) => Promise<DataResult<string>>
  validator?: (file: File) => { valid: boolean; error?: string }
}

function FileUpload({
  label,
  value,
  onChange,
  accept,
  uploadFn,
  validator,
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setError(null)

    if (validator) {
      const validation = validator(file)
      if (!validation.valid) {
        setError(validation.error || "Invalid file")
        return
      }
    }

    if (file.type.startsWith("image/")) {
      const previewUrl = URL.createObjectURL(file)
      setPreview(previewUrl)
    }

    setUploading(true)

    const result = await uploadFn(file)

    setUploading(false)

    if (result.error) {
      setError(result.error.message)
      setPreview(null)
    } else {
      onChange(result.data)
      setPreview(null)
      setError(null)
    }
  }

  const handleRemove = () => {
    onChange("")
    setPreview(null)
    setError(null)
  }

  const displayUrl = preview || value
  const isImage = displayUrl && displayUrl.match(/\.(jpg|jpeg|png|webp|gif)$/i)
  const isPdf = displayUrl && displayUrl.endsWith(".pdf")

  return (
    <div className="group space-y-4">
      <label className="text-[10px] font-bold tracking-widest text-refenti-gold uppercase transition-colors group-focus-within:text-refenti-charcoal">
        {label}
      </label>

      <div className="space-y-4">
        {displayUrl && (
          <div className="relative overflow-hidden rounded-3xl border-2 border-gray-100 bg-white shadow-sm">
            {isImage ? (
              <img
                src={displayUrl}
                alt={label}
                className="h-48 w-full object-cover"
              />
            ) : isPdf ? (
              <div className="flex h-48 items-center justify-center bg-gray-50">
                <div className="text-center">
                  <svg
                    className="mx-auto h-16 w-16 text-red-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="mt-2 text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                    PDF Document
                  </p>
                </div>
              </div>
            ) : null}
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-4 right-4 rounded-full bg-red-500 px-4 py-2 text-[9px] font-bold tracking-widest text-white uppercase shadow-lg transition-all hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        )}

        <div className="relative">
          <input
            type="file"
            accept={accept}
            onChange={handleFileChange}
            disabled={uploading}
            className="hidden"
            id={`file-${label.replace(/\s+/g, "-")}`}
          />
          <label
            htmlFor={`file-${label.replace(/\s+/g, "-")}`}
            className={`block cursor-pointer rounded-2xl border-2 border-dashed border-gray-200 bg-refenti-offwhite/50 px-8 py-6 text-center transition-all hover:border-refenti-gold hover:bg-white ${uploading ? "cursor-not-allowed opacity-50" : ""}`}
          >
            {uploading ? (
              <div className="flex items-center justify-center gap-3">
                <svg
                  className="h-5 w-5 animate-spin text-refenti-gold"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span className="text-[10px] font-bold tracking-widest text-refenti-gold uppercase">
                  Uploading...
                </span>
              </div>
            ) : (
              <div>
                <svg
                  className="mx-auto h-10 w-10 text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <p className="mt-2 text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                  {displayUrl ? "Replace File" : "Choose File"}
                </p>
                <p className="mt-1 text-[9px] text-gray-300">
                  {accept === ".pdf"
                    ? "PDF files up to 50MB"
                    : "JPEG, PNG, or WebP up to 50MB"}
                </p>
              </div>
            )}
          </label>
        </div>

        {error && (
          <p className="text-[10px] font-bold tracking-widest text-red-500">
            {error}
          </p>
        )}
      </div>
    </div>
  )
}

export default FileUpload
