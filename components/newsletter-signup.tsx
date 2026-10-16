'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import type { Dictionary } from '@/lib/i18n'

export function NewsletterSignup({ dict }: { dict: Dictionary }) {
  const n = dict.newsletter
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <p className="font-serif text-base italic text-secondary-foreground/80">
        {n.success}
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <label
        htmlFor="newsletter-email"
        className="font-mono-meta text-[10px] text-secondary-foreground/60"
      >
        {n.heading}
      </label>
      <div className="mt-3 flex items-center border-b border-secondary-foreground/40 focus-within:border-primary">
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={n.placeholder}
          className="w-full bg-transparent py-2 font-serif text-lg text-secondary-foreground placeholder:text-secondary-foreground/40 focus:outline-none"
        />
        <button
          type="submit"
          aria-label={n.button}
          className="flex h-9 w-9 shrink-0 items-center justify-center text-secondary-foreground transition-colors hover:text-primary"
        >
          <ArrowRight size={18} className="rtl:rotate-180" />
        </button>
      </div>
    </form>
  )
}
