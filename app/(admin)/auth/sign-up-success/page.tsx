import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Check your email — CARDU',
  robots: { index: false, follow: false },
}

export default function SignUpSuccessPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 py-16">
      <div className="w-full max-w-md text-center">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
          CARDU Editorial
        </p>
        <h1 className="mt-3 font-serif text-4xl text-foreground">
          Check your email
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          We&apos;ve sent a confirmation link to your inbox. Confirm your email
          address, then return here to sign in to the editorial dashboard.
        </p>
        <Link
          href="/auth/login"
          className="mt-8 inline-block border border-border px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-foreground transition-colors hover:bg-foreground hover:text-background"
        >
          Go to sign in
        </Link>
      </div>
    </main>
  )
}
