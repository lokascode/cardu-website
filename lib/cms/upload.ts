import { createClient } from '@/lib/supabase/client'

export type UploadBucket = 'article-images' | 'team-photos'

const MAX_BYTES = 8 * 1024 * 1024 // 8 MB
const ALLOWED = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif']

/**
 * Upload an image to a public Supabase Storage bucket and return its public URL.
 * Throws a user-friendly Error on any failure so callers can surface it.
 */
export async function uploadImage(
  file: File,
  bucket: UploadBucket,
): Promise<string> {
  if (!ALLOWED.includes(file.type)) {
    throw new Error('Unsupported file type. Use JPG, PNG, WebP, GIF, or AVIF.')
  }
  if (file.size > MAX_BYTES) {
    throw new Error('Image is too large. Maximum size is 8 MB.')
  }

  const supabase = createClient()
  const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg'
  const path = `${crypto.randomUUID()}.${ext}`

  const { error } = await supabase.storage.from(bucket).upload(path, file, {
    cacheControl: '3600',
    upsert: false,
    contentType: file.type,
  })

  if (error) {
    // RLS violations come back as an authorization error.
    if (/row-level security|not authorized|permission/i.test(error.message)) {
      throw new Error('You are not authorized to upload images.')
    }
    throw new Error('Image upload failed. Please try again.')
  }

  const { data } = supabase.storage.from(bucket).getPublicUrl(path)
  if (!data?.publicUrl) {
    throw new Error('Could not resolve the uploaded image URL.')
  }
  return data.publicUrl
}
