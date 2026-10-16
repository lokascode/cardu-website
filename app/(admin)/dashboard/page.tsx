import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

async function getCounts() {
  const supabase = await createClient()
  const [articles, published, team, workPosts] = await Promise.all([
    supabase.from('articles').select('id', { count: 'exact', head: true }),
    supabase
      .from('articles')
      .select('id', { count: 'exact', head: true })
      .eq('status', 'published'),
    supabase.from('team_members').select('id', { count: 'exact', head: true }),
    supabase.from('work_posts').select('id', { count: 'exact', head: true }),
  ])
  return {
    total: articles.count ?? 0,
    published: published.count ?? 0,
    team: team.count ?? 0,
    workPosts: workPosts.count ?? 0,
  }
}

export default async function DashboardHome() {
  const counts = await getCounts()

  const stats = [
    { label: 'Investigations', value: counts.total, href: '/dashboard/articles' },
    { label: 'Published', value: counts.published, href: '/dashboard/articles' },
    { label: 'Team members', value: counts.team, href: '/dashboard/team' },
    { label: 'Our Work posts', value: counts.workPosts, href: '/dashboard/work-posts' },
  ]

  return (
    <div>
      <header className="mb-10">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Dashboard
        </p>
        <h1 className="mt-2 font-serif text-4xl text-foreground">
          Editorial overview
        </h1>
      </header>

      <div className="grid gap-px border border-border bg-border sm:grid-cols-3">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="group bg-background p-6 transition-colors hover:bg-muted"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              {stat.label}
            </span>
            <span className="mt-3 block font-serif text-5xl text-foreground">
              {stat.value}
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/dashboard/articles/new"
          className="bg-primary px-5 py-3 font-mono text-xs uppercase tracking-[0.2em] text-primary-foreground transition-opacity hover:opacity-90"
        >
          New investigation
        </Link>
        <Link
          href="/dashboard/team"
          className="border border-border px-5 py-3 font-mono text-xs uppercase tracking-[0.2em] text-foreground transition-colors hover:bg-foreground hover:text-background"
        >
          Manage team
        </Link>
        <Link
          href="/dashboard/work-posts"
          className="border border-border px-5 py-3 font-mono text-xs uppercase tracking-[0.2em] text-foreground transition-colors hover:bg-foreground hover:text-background"
        >
          Manage Our Work
        </Link>
      </div>
    </div>
  )
}
