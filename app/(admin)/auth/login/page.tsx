import { Suspense } from 'react'
import type { Metadata } from 'next'
import { LoginForm } from '@/components/cms/login-form'

export const metadata: Metadata = {
  title: 'Editor Sign In — CARDU',
  robots: { index: false, follow: false },
}

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 py-16">
      <div className="w-full max-w-md">
        <div className="mb-10 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
            CARDU Editorial
          </p>
          <h1 className="mt-3 font-serif text-4xl text-foreground">Sign in</h1>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Access the editorial dashboard to manage investigations and the team.
          </p>
        </div>
        <Suspense fallback={null}>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  )
}
