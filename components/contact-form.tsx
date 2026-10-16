'use client'

import { useState } from 'react'
import type { Dictionary } from '@/lib/i18n'

export function ContactForm({ dict }: { dict: Dictionary }) {
  const c = dict.contact
  const [submitted, setSubmitted] = useState(false)

  if (submitted) {
    return (
      <div className="border border-border bg-card p-8">
        <h2 className="font-serif text-3xl leading-tight">{c.success}</h2>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-6 border border-border px-5 py-2 font-mono-meta text-xs uppercase tracking-widest transition-colors hover:bg-foreground hover:text-background"
        >
          {c.submit}
        </button>
      </div>
    )
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        setSubmitted(true)
      }}
      className="space-y-6"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="font-mono-meta text-xs uppercase tracking-widest">
            {c.nameLabel}
          </label>
          <input
            id="name"
            required
            type="text"
            className="mt-2 w-full border border-border bg-background px-4 py-3 font-serif text-lg outline-none transition-colors focus:border-primary"
          />
        </div>
        <div>
          <label htmlFor="email" className="font-mono-meta text-xs uppercase tracking-widest">
            {c.emailLabel}
          </label>
          <input
            id="email"
            required
            type="email"
            className="mt-2 w-full border border-border bg-background px-4 py-3 font-serif text-lg outline-none transition-colors focus:border-primary"
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="font-mono-meta text-xs uppercase tracking-widest">
          {c.subjectLabel}
        </label>
        <input
          id="subject"
          required
          type="text"
          className="mt-2 w-full border border-border bg-background px-4 py-3 font-serif text-lg outline-none transition-colors focus:border-primary"
        />
      </div>

      <div>
        <label htmlFor="message" className="font-mono-meta text-xs uppercase tracking-widest">
          {c.messageLabel}
        </label>
        <textarea
          id="message"
          required
          rows={7}
          className="mt-2 w-full resize-y border border-border bg-background px-4 py-3 leading-relaxed outline-none transition-colors focus:border-primary"
        />
      </div>

      <button
        type="submit"
        className="bg-primary px-8 py-4 font-mono-meta text-sm uppercase tracking-widest text-primary-foreground transition-opacity hover:opacity-90"
      >
        {c.submit}
      </button>
    </form>
  )
}
