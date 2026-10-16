'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { requireEditor } from '@/lib/cms/auth'
import { locales, defaultLocale } from '@/lib/i18n/config'

function readLocalized(formData: FormData, field: string) {
  const value: Record<string, string> = {}
  for (const locale of locales) {
    const text = String(formData.get(`${field}.${locale}`) || '').trim()
    if (text) value[locale] = text
  }
  return value
}

export type WorkPostFormState = { error?: string }

export async function saveWorkPost(
  _previous: WorkPostFormState,
  formData: FormData,
): Promise<WorkPostFormState> {
  const user = await requireEditor()
  const supabase = await createClient()
  const title = readLocalized(formData, 'title')
  const explanation = readLocalized(formData, 'explanation')
  const imageUrls = formData.getAll('image_urls').map((value) => String(value).trim()).filter(Boolean)
  const status = formData.get('status') === 'published' ? 'published' : 'draft'
  const id = String(formData.get('id') || '').trim()

  if (!title[defaultLocale]) return { error: `A title in ${defaultLocale.toUpperCase()} is required.` }
  if (!explanation[defaultLocale]) return { error: `An explanation in ${defaultLocale.toUpperCase()} is required.` }
  if (imageUrls.length === 0 || imageUrls.some((url) => !/^https?:\/\//i.test(url))) return { error: 'Add at least one valid photo.' }

  const values = {
    title,
    explanation,
    image_url: imageUrls[0],
    image_urls: imageUrls,
    status,
    published_at: status === 'published' ? new Date().toISOString() : null,
  }
  const query = id
    ? supabase.from('work_posts').update(values).eq('id', id)
    : supabase.from('work_posts').insert({ ...values, created_by: user.userId })
  const { error } = await query

  if (error) return { error: 'Could not save the work post. Please try again.' }

  revalidatePath('/dashboard/work-posts')
  revalidatePath('/about/our-work', 'layout')
  redirect('/dashboard/work-posts')
}

export async function deleteWorkPost(formData: FormData) {
  await requireEditor()
  const supabase = await createClient()
  const id = String(formData.get('id') || '')
  if (!id) return
  await supabase.from('work_posts').delete().eq('id', id)
  revalidatePath('/dashboard/work-posts')
  revalidatePath('/about/our-work', 'layout')
}

export async function toggleWorkPostStatus(formData: FormData) {
  await requireEditor()
  const supabase = await createClient()
  const id = String(formData.get('id') || '')
  const status = formData.get('next') === 'published' ? 'published' : 'draft'
  if (!id) return
  await supabase.from('work_posts').update({
    status,
    published_at: status === 'published' ? new Date().toISOString() : null,
  }).eq('id', id)
  revalidatePath('/dashboard/work-posts')
  revalidatePath('/about/our-work', 'layout')
}
