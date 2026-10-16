'use client'

import { useRef, useState } from 'react'
import { uploadImage, type UploadBucket } from '@/lib/cms/upload'

export function ImageGalleryUploadField({
  bucket,
  values,
  onChange,
  name,
}: {
  bucket: UploadBucket
  values: string[]
  onChange: (urls: string[]) => void
  name: string
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleFiles(files: FileList) {
    setError(null)
    setUploading(true)
    try {
      const urls = await Promise.all(Array.from(files).map((file) => uploadImage(file, bucket)))
      onChange([...values, ...urls])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Image upload failed.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-3">
      {values.map((url, index) => (
        <div key={url} className="group relative overflow-hidden border border-border">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={url} alt={`Photo ${index + 1}`} className="aspect-[3/2] w-full object-cover" />
          <button
            type="button"
            onClick={() => onChange(values.filter((_, imageIndex) => imageIndex !== index))}
            className="absolute right-2 top-2 bg-background/90 px-2 py-1 text-[0.65rem] font-mono-meta text-foreground hover:text-destructive"
          >
            Remove
          </button>
          <input type="hidden" name={name} value={url} />
        </div>
      ))}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
        multiple
        className="hidden"
        onChange={(event) => {
          if (event.target.files?.length) void handleFiles(event.target.files)
          event.target.value = ''
        }}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="w-full border border-dashed border-input px-3 py-4 text-xs font-mono-meta text-muted-foreground transition-colors hover:border-ring hover:text-foreground disabled:opacity-50"
      >
        {uploading ? 'Uploading photos…' : values.length ? 'Add more photos' : 'Select photos'}
      </button>
      <p className="text-xs text-muted-foreground">Select multiple photos at once to create an album.</p>
      {error ? <p role="alert" className="text-xs text-destructive">{error}</p> : null}
    </div>
  )
}
