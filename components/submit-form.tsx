'use client'

import { useState } from 'react'
import { Lock, ShieldCheck } from 'lucide-react'
import type { Dictionary } from '@/lib/i18n'

export function SubmitForm({ dict }: { dict: Dictionary }) {
  const s = dict.submit
  const [submitted, setSubmitted] = useState(false)
  const [category, setCategory] = useState('')

  if (submitted) {
    return (
      <div className="border border-border bg-card p-8">
        <ShieldCheck className="h-8 w-8 text-primary" strokeWidth={1.5} />
        <h2 className="mt-4 font-serif text-3xl leading-tight">{s.success}</h2>
        <p className="mt-3 max-w-prose leading-relaxed text-muted-foreground">
          {s.successNote}
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-6 border border-border px-5 py-2 font-mono-meta text-xs uppercase tracking-widest transition-colors hover:bg-foreground hover:text-background"
        >
          {s.submit}
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
      className="border border-border bg-card"
    >
      <div className="flex items-center gap-2 border-b border-border bg-secondary px-5 py-3">
        <Lock className="h-4 w-4 text-primary" strokeWidth={1.75} />
        <span className="font-mono-meta text-xs uppercase tracking-widest text-muted-foreground">
          {s.label}
        </span>
      </div>

      <div className="space-y-6 p-6 md:p-8">
        <div>
          <label htmlFor="name" className="font-mono-meta text-xs uppercase tracking-widest">
            {s.nameLabel}
          </label>
          <input
            id="name"
            type="text"
            placeholder={s.namePlaceholder}
            className="mt-2 w-full border border-border bg-background px-4 py-3 font-serif text-lg outline-none transition-colors focus:border-primary"
          />
        </div>

        <div>
          <span className="font-mono-meta text-xs uppercase tracking-widest">{s.categoryLabel}</span>
          <div className="mt-2 flex flex-wrap gap-2">
            {s.categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                className={`border px-4 py-2 font-mono-meta text-xs uppercase tracking-widest transition-colors ${
                  category === c
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border hover:border-foreground'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="details" className="font-mono-meta text-xs uppercase tracking-widest">
            {s.messageLabel}
          </label>
          <textarea
            id="details"
            required
            rows={8}
            placeholder={s.messagePlaceholder}
            className="mt-2 w-full resize-y border border-border bg-background px-4 py-3 leading-relaxed outline-none transition-colors focus:border-primary"
          />
        </div>

        <div>
          <label htmlFor="contact" className="font-mono-meta text-xs uppercase tracking-widest">
            {s.emailLabel}
          </label>
          <input
            id="contact"
            type="text"
            placeholder={s.emailPlaceholder}
            className="mt-2 w-full border border-border bg-background px-4 py-3 font-serif text-lg outline-none transition-colors focus:border-primary"
          />
        </div>

        <p className="border-s-2 border-primary ps-4 text-sm leading-relaxed text-muted-foreground">
          {s.securityText}
        </p>

        <button
          type="submit"
          className="w-full bg-primary px-6 py-4 font-mono-meta text-sm uppercase tracking-widest text-primary-foreground transition-opacity hover:opacity-90"
        >
          {s.submit}
        </button>
      </div>
    </form>
  )
}
