'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export function NotAuthorized({ email }: { email: string | null }) {
  const router = useRouter()

  async function signOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/auth/login')
    router.refresh()
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 py-16">
      <div className="w-full max-w-md text-center">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
          Access denied
        </p>
        <h1 className="mt-3 font-serif text-4xl text-foreground">
          Not an editor
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          {email ? (
            <>
              You&apos;re signed in as{' '}
              <span className="text-foreground">{email}</span>, but this account
              is not authorized to manage editorial content.
            </>
          ) : (
            'This account is not authorized to manage editorial content.'
          )}
        </p>
        <button
          type="button"
          onClick={signOut}
          className="mt-8 inline-block border border-border px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-foreground transition-colors hover:bg-foreground hover:text-background"
        >
          Sign out
        </button>
      </div>
    </main>
  )
}
