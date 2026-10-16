import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getEditorSession } from '@/lib/cms/auth'
import { DashboardNav } from '@/components/cms/dashboard-nav'
import { NotAuthorized } from '@/components/cms/not-authorized'

export const metadata: Metadata = {
  title: 'Editorial Dashboard — CARDU',
  robots: { index: false, follow: false },
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getEditorSession()

  // Middleware already redirects unauthenticated users; this guards the
  // stricter "must be an authorized editor" rule.
  if (!session) {
    redirect('/auth/login?next=/dashboard')
  }

  if (!session.isEditor) {
    return <NotAuthorized email={session.email} />
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <DashboardNav email={session.email} />
      <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
    </div>
  )
}
