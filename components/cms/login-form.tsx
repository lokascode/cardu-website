'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Field, TextInput, StatusBanner } from '@/components/cms/admin-ui'

export function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const next = searchParams.get('next') ?? '/dashboard'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createClient()
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    })

    if (signInError) {
      // Genericize the credential/existence signal, but surface actionable
      // states (unconfirmed email, rate limits) the user must act on.
      const code = (signInError as { code?: string }).code
      if (code === 'email_not_confirmed') {
        setError('Please confirm your email address before signing in.')
      } else if (signInError.status === 429) {
        setError('Too many attempts. Please wait a moment and try again.')
      } else if (code === 'invalid_credentials' || signInError.status === 400) {
        setError('Invalid email or password.')
      } else {
        setError('Something went wrong. Please try again.')
        console.log('[v0] login error:', signInError.message)
      }
      setLoading(false)
      return
    }

    router.push(next)
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
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
        />
      </Field>
      <Button type="submit" disabled={loading} className="mt-2 w-full">
        {loading ? 'Signing in…' : 'Sign in'}
      </Button>
    </form>
  )
}
