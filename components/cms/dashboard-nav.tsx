'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'

const links = [
  { href: '/dashboard', label: 'Overview' },
  { href: '/dashboard/articles', label: 'Investigations' },
  { href: '/dashboard/work-posts', label: 'News' },
  { href: '/dashboard/team', label: 'Team' },
]

export function DashboardNav({ email }: { email: string | null }) {
  const pathname = usePathname()
  const router = useRouter()

  async function signOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/auth/login')
    router.refresh()
  }

  return (
    <header className="border-b border-border">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <div className="flex items-center gap-8">
          <Link href="/dashboard" className="font-serif text-xl tracking-tight">
            CARDU
            <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              Editorial
            </span>
          </Link>
          <nav className="flex items-center gap-1">
            {links.map((link) => {
              const active =
                link.href === '/dashboard'
                  ? pathname === '/dashboard'
                  : pathname.startsWith(link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] transition-colors',
                    active
                      ? 'bg-foreground text-background'
                      : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground"
          >
            View site
          </Link>
          {email ? (
            <span className="hidden text-xs text-muted-foreground sm:inline">
              {email}
            </span>
          ) : null}
          <button
            type="button"
            onClick={signOut}
            className="border border-border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            Sign out
          </button>
        </div>
      </div>
    </header>
  )
}
