import 'server-only'
import { createClient } from '@/lib/supabase/server'
import type { Locale } from '@/lib/i18n/config'
import type { ArticleRow, CategoryRow, TeamMemberRow } from './types'
import { pick } from './types'
import type { Investigation } from '@/lib/data'

/**
 * Map a stored article row into the site's existing `Investigation` shape so
 * dynamic content renders through the same components as the static content.
 */
export function articleToInvestigation(
  row: ArticleRow,
  locale: Locale,
): Investigation {
  const dateStr = row.published_at ?? row.created_at
  const date = new Date(dateStr).toLocaleDateString(
    locale === 'en' ? 'en-GB' : locale === 'ar' ? 'ar' : 'ckb',
    { day: 'numeric', month: 'short', year: 'numeric' },
  )
  return {
    id: row.id,
    number: '',
    slug: row.slug,
    category: row.category,
    title: pick(row.title, locale),
    excerpt: pick(row.excerpt, locale),
    date,
    author: row.author ?? '',
    readingTime: row.read_time ?? '',
    location: '',
    image: row.cover_image ?? '/images/feature.png',
    featured: row.featured,
  }
}

/** All categories, ordered by localized slug. */
export async function getCategories(): Promise<CategoryRow[]> {
  const supabase = await createClient()
  const { data, error } = await supabase.from('categories').select('*').order('slug')
  if (error) {
    console.log('[v0] getCategories error:', error.message)
    return []
  }
  return (data ?? []) as CategoryRow[]
}

/** All published articles, newest first. */
export async function getPublishedArticles(): Promise<ArticleRow[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false, nullsFirst: false })
    .order('created_at', { ascending: false })

  if (error) {
    console.log('[v0] getPublishedArticles error:', error.message)
    return []
  }
  return (data ?? []) as ArticleRow[]
}

/** A single published article by slug, or null. */
export async function getPublishedArticleBySlug(
  slug: string,
): Promise<ArticleRow | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .maybeSingle()

  if (error) {
    console.log('[v0] getPublishedArticleBySlug error:', error.message)
    return null
  }
  return (data as ArticleRow) ?? null
}

/** Team members ordered by their editor-defined sort order. */
export async function getTeamMembers(): Promise<TeamMemberRow[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('team_members')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: true })

  if (error) {
    console.log('[v0] getTeamMembers error:', error.message)
    return []
  }
  return (data ?? []) as TeamMemberRow[]
}
