'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { requireEditor } from '@/lib/cms/auth'
import { locales, defaultLocale } from '@/lib/i18n/config'
import type { LocalizedText, SocialLink } from '@/lib/cms/types'

export type TeamFormState = { error?: string } | undefined

function readLocalized(formData: FormData, field: string): LocalizedText {
  const out: LocalizedText = {}
  for (const l of locales) {
    const v = (formData.get(`${field}.${l}`) as string | null)?.trim()
    if (v) out[l] = v
  }
  return out
}

/** Parse repeated social label/url pairs into a clean array. */
function readSocials(formData: FormData): SocialLink[] {
  const labels = formData.getAll('social_label') as string[]
  const urls = formData.getAll('social_url') as string[]
  const out: SocialLink[] = []
  for (let i = 0; i < labels.length; i++) {
    const label = (labels[i] ?? '').trim()
    const url = (urls[i] ?? '').trim()
    if (label && url) out.push({ label, url })
  }
  return out
}

export async function saveTeamMember(
  _prev: TeamFormState,
  formData: FormData,
): Promise<TeamFormState> {
  await requireEditor()
  const supabase = await createClient()

  const id = (formData.get('id') as string | null) || null
  const name = readLocalized(formData, 'name')
  const role = readLocalized(formData, 'role')
  const bio = readLocalized(formData, 'bio')
  const socials = readSocials(formData)
  const photo = ((formData.get('photo') as string) || '').trim() || null

  if (!name[defaultLocale]) {
    return { error: `A name in ${defaultLocale.toUpperCase()} is required.` }
  }

  const payload = { name, role, bio, socials, photo }

  if (id) {
    const { error } = await supabase.from('team_members').update(payload).eq('id', id)
    if (error) return { error: 'Could not save the team member. Please try again.' }
  } else {
    // Append to the end of the current ordering.
    const { data: last } = await supabase
      .from('team_members')
      .select('sort_order')
      .order('sort_order', { ascending: false })
      .limit(1)
      .maybeSingle()
    const nextOrder = (last?.sort_order ?? -1) + 1
    const { error } = await supabase
      .from('team_members')
      .insert({ ...payload, sort_order: nextOrder })
    if (error) return { error: 'Could not create the team member. Please try again.' }
  }

  revalidatePath('/dashboard/team')
  revalidatePath('/', 'layout')
  redirect('/dashboard/team')
}

export async function deleteTeamMember(formData: FormData): Promise<void> {
  await requireEditor()
  const supabase = await createClient()
  const id = formData.get('id') as string
  if (!id) return
  await supabase.from('team_members').delete().eq('id', id)
  revalidatePath('/dashboard/team')
  revalidatePath('/', 'layout')
}

/** Swap sort_order with the neighbour in the given direction. */
export async function moveTeamMember(formData: FormData): Promise<void> {
  await requireEditor()
  const supabase = await createClient()
  const id = formData.get('id') as string
  const direction = formData.get('direction') as 'up' | 'down'
  if (!id || !direction) return

  const { data: rows } = await supabase
    .from('team_members')
    .select('id, sort_order')
    .order('sort_order', { ascending: true })

  if (!rows) return
  const index = rows.findIndex((r) => r.id === id)
  if (index === -1) return
  const swapIndex = direction === 'up' ? index - 1 : index + 1
  if (swapIndex < 0 || swapIndex >= rows.length) return

  const current = rows[index]
  const neighbour = rows[swapIndex]

  // Swap their sort_order values.
  await supabase
    .from('team_members')
    .update({ sort_order: neighbour.sort_order })
    .eq('id', current.id)
  await supabase
    .from('team_members')
    .update({ sort_order: current.sort_order })
    .eq('id', neighbour.id)

  revalidatePath('/dashboard/team')
  revalidatePath('/', 'layout')
}
