import { requireEditor } from '@/lib/cms/auth'
import { TeamForm } from '@/components/cms/team-form'

export const dynamic = 'force-dynamic'

export default async function NewTeamMemberPage() {
  await requireEditor()
  return <TeamForm />
}
