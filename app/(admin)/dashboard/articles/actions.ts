'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { requireEditor } from '@/lib/cms/auth'
import { locales, defaultLocale } from '@/lib/i18n/config'
import type { LocalizedText, LocalizedDoc } from '@/lib/cms/types'

export type ArticleFormState = { error?: string } | undefined
export type CategoryFormState = { error?: string; success?: string } | undefined

/** Localized map from FormData keys like `title.en`, `title.ar`. */
function readLocalized(formData: FormData, field: string): LocalizedText {
  const out: LocalizedText = {}
  for (const l of locales) {
    const v = (formData.get(`${field}.${l}`) as string | null)?.trim()
    if (v) out[l] = v
  }
  return out
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export async function createCategory(
  _prev: CategoryFormState,
  formData: FormData,
): Promise<CategoryFormState> {
  const user = await requireEditor()
  const supabase = await createClient()
  const name = readLocalized(formData, 'name')
  const englishName = name[defaultLocale]
  if (!englishName) return { error: 'An English category name is required.' }

  const slug = slugify((formData.get('slug') as string | null) || englishName)
  if (!slug) return { error: 'A valid category slug is required.' }

  const { error } = await supabase.from('categories').insert({
    slug,
    name,
    created_by: user.userId,
  })
  if (error) {
    if (error.code === '23505') return { error: 'That category already exists.' }
    return { error: 'Could not create the category.' }
  }
  revalidatePath('/dashboard/articles/new')
  revalidatePath('/dashboard/articles')
  return { success: 'Category added.' }
}

export async function saveArticle(
  _prev: ArticleFormState,
  formData: FormData,
): Promise<ArticleFormState> {
  await requireEditor()
  const supabase = await createClient()

  const id = (formData.get('id') as string | null) || null

  const title = readLocalized(formData, 'title')
  const excerpt = readLocalized(formData, 'excerpt')

  // Tiptap JSON per locale arrives as serialized strings.
  const body: LocalizedDoc = {}
  for (const l of locales) {
    const raw = formData.get(`body.${l}`) as string | null
    if (raw) {
      try {
        const parsed = JSON.parse(raw)
        if (parsed && typeof parsed === 'object') body[l] = parsed
      } catch {
        // ignore malformed body for a locale
      }
    }
  }

  // Validation: the default locale title is required as the canonical label.
  if (!title[defaultLocale]) {
    return { error: `A title in ${defaultLocale.toUpperCase()} is required.` }
  }

  let slug = ((formData.get('slug') as string | null) || '').trim()
  if (!slug) slug = slugify(title[defaultLocale] || '')
  else slug = slugify(slug)
  if (!slug) return { error: 'A valid slug is required.' }

  const status = (formData.get('status') as string) === 'published' ? 'published' : 'draft'
  const featured = formData.get('featured') === 'on'
  const categoryId = ((formData.get('category_id') as string) || '').trim() || null
  const coverImage = ((formData.get('cover_image') as string) || '').trim() || null
  const author = ((formData.get('author') as string) || '').trim() || null
  const readTime = ((formData.get('read_time') as string) || '').trim() || null

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const payload = {
    slug,
    category_id: categoryId,
    status,
    featured,
    cover_image: coverImage,
    author,
    read_time: readTime,
    title,
    excerpt,
    body,
    published_at: status === 'published' ? new Date().toISOString() : null,
  }

  if (id) {
    // Preserve original published_at when already published.
    const { data: existing } = await supabase
      .from('articles')
      .select('published_at, status')
      .eq('id', id)
      .single()
    if (existing?.status === 'published' && status === 'published' && existing.published_at) {
      payload.published_at = existing.published_at
    }
    const { error } = await supabase.from('articles').update(payload).eq('id', id)
    if (error) {
      if (error.code === '23505') return { error: 'That slug is already in use.' }
      return { error: 'Could not save the article. Please try again.' }
    }
  } else {
    const { error } = await supabase
      .from('articles')
      .insert({ ...payload, created_by: user?.id ?? null })
    if (error) {
      if (error.code === '23505') return { error: 'That slug is already in use.' }
      return { error: 'Could not create the article. Please try again.' }
    }
  }

  revalidatePath('/dashboard/articles')
  revalidatePath('/', 'layout')
  redirect('/dashboard/articles')
}

export async function deleteArticle(formData: FormData): Promise<void> {
  await requireEditor()
  const supabase = await createClient()
  const id = formData.get('id') as string
  if (!id) return
  await supabase.from('articles').delete().eq('id', id)
  revalidatePath('/dashboard/articles')
  revalidatePath('/', 'layout')
}

export async function toggleStatus(formData: FormData): Promise<void> {
  await requireEditor()
  const supabase = await createClient()
  const id = formData.get('id') as string
  const next = (formData.get('next') as string) === 'published' ? 'published' : 'draft'
  if (!id) return
  await supabase
    .from('articles')
    .update({
      status: next,
      published_at: next === 'published' ? new Date().toISOString() : null,
    })
    .eq('id', id)
  revalidatePath('/dashboard/articles')
  revalidatePath('/', 'layout')
}
