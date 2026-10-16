'use client'

import { useActionState, useState } from 'react'
import { useFormStatus } from 'react-dom'
import Link from 'next/link'
import { locales, localeMeta, defaultLocale, type Locale } from '@/lib/i18n/config'
import { saveTeamMember, type TeamFormState } from '@/app/(admin)/dashboard/team/actions'
import { ImageUploadField } from '@/components/cms/image-upload-field'
import {
  AdminButton,
  AdminField,
  AdminInput,
  StatusBanner,
} from '@/components/cms/admin-ui'
import type { SocialLink, TeamMemberRow } from '@/lib/cms/types'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <AdminButton type="submit" disabled={pending}>
      {pending ? 'Saving…' : 'Save member'}
    </AdminButton>
  )
}

export function TeamForm({ member }: { member?: TeamMemberRow }) {
  const [state, formAction] = useActionState<TeamFormState, FormData>(
    saveTeamMember,
    undefined,
  )
  const [activeLocale, setActiveLocale] = useState<Locale>(defaultLocale)
  const [photo, setPhoto] = useState<string>(member?.photo ?? '')
  const [socials, setSocials] = useState<SocialLink[]>(
    () => member?.socials ?? [{ label: '', url: '' }],
  )

  return (
    <form action={formAction} className="pb-16">
      {member ? <input type="hidden" name="id" value={member.id} /> : null}

      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <Link
            href="/dashboard/team"
            className="text-xs font-mono-meta text-muted-foreground hover:text-foreground"
          >
            ← All team members
          </Link>
          <h1 className="mt-2 font-serif text-3xl">
            {member ? 'Edit team member' : 'Add team member'}
          </h1>
        </div>
        <SubmitButton />
      </div>

      {state?.error ? (
        <div className="mt-6">
          <StatusBanner tone="error">{state.error}</StatusBanner>
        </div>
      ) : null}

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_18rem]">
        <div className="order-2 space-y-8 lg:order-1">
          {/* Locale tabs */}
          <div>
            <div className="flex flex-wrap gap-1 border-b border-border">
              {locales.map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setActiveLocale(l)}
                  className={`px-3 py-2 text-xs font-mono-meta transition-colors ${
                    activeLocale === l
                      ? 'border-b-2 border-primary text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {localeMeta[l].short}
                  {l === defaultLocale ? ' *' : ''}
                </button>
              ))}
            </div>

            {locales.map((l) => {
              const dir = localeMeta[l].dir
              return (
                <div
                  key={l}
                  className={activeLocale === l ? 'mt-6 space-y-6' : 'hidden'}
                >
                  <AdminField
                    label={`Name (${localeMeta[l].english})`}
                    hint={l === defaultLocale ? 'Required' : undefined}
                  >
                    <AdminInput
                      name={`name.${l}`}
                      defaultValue={member?.name?.[l] ?? ''}
                      dir={dir}
                    />
                  </AdminField>
                  <AdminField label={`Role (${localeMeta[l].english})`}>
                    <AdminInput
                      name={`role.${l}`}
                      defaultValue={member?.role?.[l] ?? ''}
                      dir={dir}
                    />
                  </AdminField>
                  <AdminField label={`Bio (${localeMeta[l].english})`}>
                    <textarea
                      name={`bio.${l}`}
                      defaultValue={member?.bio?.[l] ?? ''}
                      dir={dir}
                      rows={4}
                      className="w-full border border-input bg-background px-3 py-2 font-serif text-sm outline-none focus:border-ring"
                    />
                  </AdminField>
                </div>
              )
            })}
          </div>

          {/* Social links */}
          <div>
            <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Social links
            </h2>
            <div className="mt-3 space-y-3">
              {socials.map((s, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    name="social_label"
                    defaultValue={s.label}
                    placeholder="Label (e.g. X, LinkedIn)"
                    className="w-40 border border-input bg-background px-3 py-2 text-sm outline-none focus:border-ring"
                  />
                  <input
                    name="social_url"
                    defaultValue={s.url}
                    placeholder="https://…"
                    className="flex-1 border border-input bg-background px-3 py-2 text-sm outline-none focus:border-ring"
                  />
                  <button
                    type="button"
                    onClick={() => setSocials((prev) => prev.filter((_, idx) => idx !== i))}
                    className="px-3 text-xs font-mono-meta text-muted-foreground hover:text-destructive"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setSocials((prev) => [...prev, { label: '', url: '' }])}
              className="mt-3 border border-dashed border-input px-3 py-2 text-xs font-mono-meta text-muted-foreground hover:border-ring hover:text-foreground"
            >
              Add link
            </button>
          </div>
        </div>

        {/* Photo sidebar */}
        <aside className="order-1 lg:order-2">
          <AdminField label="Photo">
            <ImageUploadField
              bucket="team-photos"
              value={photo}
              onChange={setPhoto}
              name="photo"
            />
          </AdminField>
        </aside>
      </div>
    </form>
  )
}
