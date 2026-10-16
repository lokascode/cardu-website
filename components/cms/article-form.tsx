'use client'

import { useActionState, useState } from 'react'
import { useFormStatus } from 'react-dom'
import Link from 'next/link'
import { locales, localeMeta, defaultLocale, type Locale } from '@/lib/i18n/config'
import {
  saveArticle,
  createCategory,
  type ArticleFormState,
} from '@/app/(admin)/dashboard/articles/actions'
import { RichTextEditor } from '@/components/cms/rich-text-editor'
import { ImageUploadField } from '@/components/cms/image-upload-field'
import { AdminButton, AdminField, AdminInput } from '@/components/cms/admin-ui'
import type { ArticleRow, CategoryRow } from '@/lib/cms/types'
import { pick } from '@/lib/cms/types'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <AdminButton type="submit" disabled={pending}>
      {pending ? 'Saving…' : 'Save article'}
    </AdminButton>
  )
}

export function ArticleForm({
  article,
  categories,
}: {
  article?: ArticleRow
  categories: CategoryRow[]
}) {
  const [state, formAction] = useActionState<ArticleFormState, FormData>(saveArticle, undefined)
  const [categoryState, categoryAction] = useActionState(createCategory, undefined)
  const [activeLocale, setActiveLocale] = useState<Locale>(defaultLocale)
  const [showCategoryForm, setShowCategoryForm] = useState(false)

  // Tiptap body JSON per locale, serialized into hidden inputs on change.
  const [bodies, setBodies] = useState<Record<string, unknown>>(
    () => (article?.body as Record<string, unknown>) ?? {},
  )
  const [cover, setCover] = useState<string>(article?.cover_image ?? '')

  return (
    <div className="pb-16">
      <form action={formAction}>
      {article ? <input type="hidden" name="id" value={article.id} /> : null}

      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <Link
            href="/dashboard/articles"
            className="text-xs font-mono-meta text-muted-foreground hover:text-foreground"
          >
            ← All articles
          </Link>
          <h1 className="mt-2 font-serif text-3xl">
            {article ? 'Edit article' : 'New article'}
          </h1>
        </div>
        <SubmitButton />
      </div>

      {state?.error ? (
        <p
          role="alert"
          className="mt-6 border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive"
        >
          {state.error}
        </p>
      ) : null}

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_20rem]">
        {/* Localized content */}
        <div className="order-2 lg:order-1">
          {/* Locale tabs */}
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

          {/* One panel per locale; keep all mounted so inputs submit. */}
          {locales.map((l) => {
            const dir = localeMeta[l].dir
            return (
              <div key={l} className={activeLocale === l ? 'block' : 'hidden'}>
                <div className="mt-6 space-y-6">
                  <AdminField
                    label={`Title (${localeMeta[l].english})`}
                    hint={l === defaultLocale ? 'Required — canonical title' : undefined}
                  >
                    <AdminInput
                      name={`title.${l}`}
                      defaultValue={article?.title?.[l] ?? ''}
                      dir={dir}
                      placeholder="Headline"
                    />
                  </AdminField>

                  <AdminField label={`Excerpt (${localeMeta[l].english})`}>
                    <textarea
                      name={`excerpt.${l}`}
                      defaultValue={article?.excerpt?.[l] ?? ''}
                      dir={dir}
                      rows={3}
                      className="w-full border border-input bg-background px-3 py-2 font-serif text-sm outline-none focus:border-ring"
                      placeholder="Short standfirst shown in listings"
                    />
                  </AdminField>

                  <AdminField label={`Body (${localeMeta[l].english})`}>
                    <RichTextEditor
                      value={(bodies[l] as Record<string, unknown> | undefined) ?? null}
                      dir={dir}
                      onChange={(json) => setBodies((prev) => ({ ...prev, [l]: json }))}
                    />
                    <input
                      type="hidden"
                      name={`body.${l}`}
                      value={bodies[l] ? JSON.stringify(bodies[l]) : ''}
                    />
                  </AdminField>
                </div>
              </div>
            )
          })}
        </div>

        {/* Metadata sidebar */}
        <aside className="order-1 space-y-6 lg:order-2">
          <AdminField label="Status">
            <select
              name="status"
              defaultValue={article?.status ?? 'draft'}
              className="w-full border border-input bg-background px-3 py-2 text-sm outline-none focus:border-ring"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </AdminField>

          <AdminField label="Slug" hint="URL path; auto-generated from the title if left blank">
            <AdminInput name="slug" defaultValue={article?.slug ?? ''} placeholder="the-silent-ledger" />
          </AdminField>

          <AdminField label="Category">
            <select
              name="category_id"
              defaultValue={article?.category_id ?? ''}
              className="w-full border border-input bg-background px-3 py-2 text-sm outline-none focus:border-ring"
            >
              <option value="">Uncategorized</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {pick(category.name, activeLocale) || category.slug}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => setShowCategoryForm((visible) => !visible)}
              className="mt-2 text-xs text-primary underline underline-offset-4"
            >
              {showCategoryForm ? 'Cancel' : '+ Add new category'}
            </button>
          </AdminField>



          <AdminField label="Cover image">
            <ImageUploadField
              bucket="article-images"
              value={cover}
              onChange={setCover}
              name="cover_image"
            />
          </AdminField>

          <AdminField label="Author">
            <AdminInput name="author" defaultValue={article?.author ?? ''} placeholder="Byline" />
          </AdminField>

          <AdminField label="Read time">
            <AdminInput
              name="read_time"
              defaultValue={article?.read_time ?? ''}
              placeholder="8 min read"
            />
          </AdminField>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="featured"
              defaultChecked={article?.featured ?? false}
              className="h-4 w-4 accent-primary"
            />
            Feature this article
          </label>
        </aside>
      </div>
      </form>

    {showCategoryForm ? (
      <div className="mt-6 border border-border p-4 lg:ml-auto lg:w-80">
        <p className="mb-3 text-xs text-muted-foreground">
          Add the category name in each language. English is required.
        </p>
        <form action={categoryAction} className="space-y-3">
          {locales.map((l) => (
            <AdminInput
              key={l}
              name={`name.${l}`}
              dir={localeMeta[l].dir}
              placeholder={`${localeMeta[l].english} name`}
              aria-label={`${localeMeta[l].english} category name`}
            />
          ))}
          {categoryState?.error ? <p role="alert" className="text-xs text-destructive">{categoryState.error}</p> : null}
          {categoryState?.success ? <p role="status" className="text-xs text-primary">{categoryState.success}</p> : null}
          <AdminButton type="submit" variant="ghost">Add category</AdminButton>
        </form>
      </div>
    ) : null}
    </div>
  )
}
