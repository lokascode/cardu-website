'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { createAccount } from '@/app/(admin)/auth/actions'
import { Button } from '@/components/ui/button'
import { Field, TextInput, StatusBanner } from '@/components/cms/admin-ui'

export function SignUpForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    setLoading(true)

    // Create the account server-side (confirmed immediately, no email sent).
    const result = await createAccount(email, password)
    if (!result.ok) {
      setError(result.error)
      setLoading(false)
      return
    }

    // Establish a session right away and go to the dashboard.
    const supabase = createClient()
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    })

    if (signInError) {
      // Account exists but auto sign-in failed — send them to the login page.
      router.push('/auth/login')
      return
    }

    router.push('/dashboard')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {error ? <StatusBanner tone="error">{error}</StatusBanner> : null}
      <Field label="Email">
        <TextInput
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@newsroom.org"
        />
      </Field>
      <Field label="Password">
        <TextInput
          type="password"
          autoComplete="new-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="At least 6 characters"
        />
      </Field>
      <Field label="Confirm password">
        <TextInput
          type="password"
          autoComplete="new-password"
          required
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          placeholder="Repeat your password"
        />
      </Field>
      <Button type="submit" disabled={loading} className="mt-2 w-full">
        {loading ? 'Creating account…' : 'Create account'}
      </Button>
      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link
          href="/auth/login"
          className="text-foreground underline underline-offset-4 hover:text-primary"
        >
          Sign in
        </Link>
      </p>
    </form>
  )
}
