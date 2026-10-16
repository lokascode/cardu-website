import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Account Creation Unavailable — CARDU',
  robots: { index: false, follow: false },
}

export default function SignUpPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 py-16">
      <div className="w-full max-w-md text-center">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
          CARDU Editorial
        </p>
        <h1 className="mt-3 font-serif text-4xl text-foreground">
          Account creation is temporarily disabled
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          Please contact the editorial administrator if you need access.
        </p>
      </div>
    </main>
  )
}
