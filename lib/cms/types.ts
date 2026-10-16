import type { Locale } from '@/lib/i18n/config'

/** A localized string map keyed by locale. Partial: not every locale need be filled. */
export type LocalizedText = Partial<Record<Locale, string>>

/** Tiptap document JSON, stored per locale. */
export type TiptapDoc = Record<string, unknown>
export type LocalizedDoc = Partial<Record<Locale, TiptapDoc>>

export type ArticleStatus = 'draft' | 'published'

export type CategoryRow = {
  id: string
  slug: string
  name: LocalizedText
  created_by: string | null
  created_at: string
  updated_at: string
}

/** Social link on a team member. */
export type SocialLink = {
  label: string
  url: string
}

/** Raw article row as stored in Supabase. */
export type ArticleRow = {
  id: string
  slug: string
  category: string
  category_id: string | null
  status: ArticleStatus
  featured: boolean
  cover_image: string | null
  author: string | null
  read_time: string | null
  title: LocalizedText
  excerpt: LocalizedText
  body: LocalizedDoc
  created_by: string | null
  published_at: string | null
  created_at: string
  updated_at: string
}

/** Raw team member row as stored in Supabase. */
export type TeamMemberRow = {
  id: string
  name: LocalizedText
  role: LocalizedText
  bio: LocalizedText
  photo: string | null
  socials: SocialLink[]
  sort_order: number
  created_at: string
  updated_at: string
}

/** Resolve a localized value for a specific locale, falling back to English then any. */
export function pick(value: LocalizedText | undefined, locale: Locale): string {
  if (!value) return ''
  return value[locale] ?? value.en ?? Object.values(value)[0] ?? ''
}
