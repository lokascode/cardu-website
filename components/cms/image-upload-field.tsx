'use client'

import { useRef, useState } from 'react'
import { uploadImage, type UploadBucket } from '@/lib/cms/upload'

export function ImageUploadField({
  bucket,
  value,
  onChange,
  name,
}: {
  bucket: UploadBucket
  value: string
  onChange: (url: string) => void
  /** Optional hidden input name so the URL submits with a plain form. */
  name?: string
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleFile(file: File) {
    setError(null)
    setUploading(true)
    try {
      const url = await uploadImage(file, bucket)
      onChange(url)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Image upload failed.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-2">
      {name ? <input type="hidden" name={name} value={value} /> : null}

      {value ? (
        <div className="relative border border-border">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value || '/placeholder.svg'} alt="Preview" className="max-h-full w-full object-cover" />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute right-2 top-2 bg-background/90 px-2 py-1 text-[0.65rem] font-mono-meta text-foreground hover:text-destructive"
          >
            Remove
          </button>
        </div>
      ) : null}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) handleFile(file)
          e.target.value = ''
        }}
      />

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="w-full border border-dashed border-input px-3 py-3 text-xs font-mono-meta text-muted-foreground transition-colors hover:border-ring hover:text-foreground disabled:opacity-50"
      >
        {uploading ? 'Uploading…' : value ? 'Replace image' : 'Upload image'}
      </button>

      {error ? (
        <p role="alert" className="text-xs text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  )
}
