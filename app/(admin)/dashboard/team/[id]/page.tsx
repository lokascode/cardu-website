import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { requireEditor } from '@/lib/cms/auth'
import { TeamForm } from '@/components/cms/team-form'
import type { TeamMemberRow } from '@/lib/cms/types'

export const dynamic = 'force-dynamic'

export default async function EditTeamMemberPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  await requireEditor()
  const { id } = await params
  const supabase = await createClient()
  const { data } = await supabase.from('team_members').select('*').eq('id', id).single()
  if (!data) notFound()
  return <TeamForm member={data as TeamMemberRow} />
}
