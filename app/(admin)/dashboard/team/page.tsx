import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { requireEditor } from '@/lib/cms/auth'
import { defaultLocale } from '@/lib/i18n/config'
import { pick, type TeamMemberRow } from '@/lib/cms/types'
import { AdminButton } from '@/components/cms/admin-ui'
import { TeamRowActions } from '@/components/cms/team-row-actions'

export const dynamic = 'force-dynamic'

export default async function TeamPage() {
  await requireEditor()
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('team_members')
    .select('*')
    .order('sort_order', { ascending: true })

  const members = (data ?? []) as TeamMemberRow[]

  return (
    <div>
      <div className="flex items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <h1 className="font-serif text-3xl">Team</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Add, edit, reorder, and remove the people shown on the public Our Team page.
          </p>
        </div>
        <Link href="/dashboard/team/new">
          <AdminButton>Add member</AdminButton>
        </Link>
      </div>

      {error ? (
        <p className="mt-8 border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
          Could not load team members. Please refresh the page.
        </p>
      ) : members.length === 0 ? (
        <div className="mt-16 flex flex-col items-center gap-4 text-center">
          <p className="font-serif text-xl text-muted-foreground">No team members yet</p>
          <p className="max-w-sm text-sm text-muted-foreground">
            Add the people behind your newsroom. They will appear on the public Our Team page in
            the order shown here.
          </p>
          <Link href="/dashboard/team/new">
            <AdminButton>Add your first member</AdminButton>
          </Link>
        </div>
      ) : (
        <ul className="mt-6 divide-y divide-border border border-border">
          {members.map((m, i) => {
            const name = pick(m.name, defaultLocale) || '(unnamed)'
            const role = pick(m.role, defaultLocale)
            return (
              <li key={m.id} className="flex items-center gap-4 px-5 py-4">
                <div className="h-12 w-12 shrink-0 overflow-hidden border border-border bg-muted">
                  {m.photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={m.photo || '/placeholder.svg'} alt="" className="h-full w-full object-cover" />
                  ) : null}
                </div>
                <div className="min-w-0 flex-1">
                  <Link
                    href={`/dashboard/team/${m.id}`}
                    className="block truncate font-serif text-lg hover:text-primary"
                  >
                    {name}
                  </Link>
                  {role ? (
                    <p className="truncate text-xs text-muted-foreground">{role}</p>
                  ) : null}
                </div>
                <TeamRowActions
                  id={m.id}
                  isFirst={i === 0}
                  isLast={i === members.length - 1}
                />
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
