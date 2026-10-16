'use client'

import { useActionState, useState } from 'react'
import { saveWorkPost, type WorkPostFormState } from '@/app/(admin)/dashboard/work-posts/actions'
import { ImageGalleryUploadField } from '@/components/cms/image-gallery-upload-field'
import { AdminField, AdminInput } from '@/components/cms/admin-ui'
import { locales, localeMeta, defaultLocale, type Locale } from '@/lib/i18n/config'

const languages = locales.map((key) => ({ key, label: localeMeta[key].english }))

type WorkPost = {
  id?: string
  title?: Record<string, string>
  explanation?: Record<string, string>
  image_urls?: string[]
  image_url?: string
  status?: string
}

export function WorkPostForm({ post }: { post?: WorkPost }) {
  const [state, action, pending] = useActionState<WorkPostFormState, FormData>(saveWorkPost, {})
  const [activeLocale, setActiveLocale] = useState<Locale>(defaultLocale)
  const [images, setImages] = useState<string[]>(post?.image_urls?.length ? post.image_urls : post?.image_url ? [post.image_url] : [])


  return (
    <form action={action} className="max-w-4xl space-y-10">
      {post?.id ? <input type="hidden" name="id" value={post.id} /> : null}
      <div className="border-b border-border pb-6">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">Our Work</p>
        <h1 className="mt-2 font-serif text-4xl text-foreground">{post ? 'Edit work post' : 'New work post'}</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">Add a photo and explanation, then publish it manually to the Our Work section.</p>
      </div>

      <AdminField label="Photos">
        <p className="mb-3 text-sm text-muted-foreground">Select multiple photos at once to create an album post.</p>
        <ImageGalleryUploadField bucket="article-images" values={images} onChange={setImages} name="image_urls" />
      </AdminField>

      <div className="flex flex-wrap gap-1 border-b border-border">
        {languages.map((language) => (
          <button key={language.key} type="button" onClick={() => setActiveLocale(language.key as Locale)} className={`px-3 py-2 text-xs font-mono-meta ${activeLocale === language.key ? 'border-b-2 border-primary text-foreground' : 'text-muted-foreground'}`}>
            {language.label}{language.key === defaultLocale ? ' *' : ''}
          </button>
        ))}
      </div>
      {languages.map((language) => (
        <fieldset key={language.key} className={activeLocale === language.key ? 'space-y-4 pt-6' : 'hidden'}>
          <legend className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">{language.label}</legend>
          <AdminInput name={`title.${language.key}`} defaultValue={post?.title?.[language.key] ?? ''} dir={localeMeta[language.key].dir} placeholder={`Headline — ${language.label}`} />
          <textarea name={`explanation.${language.key}`} defaultValue={post?.explanation?.[language.key] ?? ''} dir={localeMeta[language.key].dir} placeholder={`News sections — ${language.label}\n\nStart each new section with a blank line`} rows={8} className="w-full border border-input bg-background px-3 py-2 font-serif text-lg leading-relaxed text-foreground outline-none focus:border-ring" />
          <p className="text-xs leading-relaxed text-muted-foreground">Separate sections with a blank line. Each section will appear as its own justified paragraph below the photos.</p>
        </fieldset>
      ))}

      <div className="flex items-center gap-4 border-t border-border pt-6">
        <select name="status" defaultValue={post?.status ?? 'draft'} className="border border-border bg-background px-4 py-3 text-foreground">
          <option value="draft">Save draft</option>
          <option value="published">Publish now</option>
        </select>
        <button type="submit" disabled={pending} className="bg-primary px-5 py-3 font-mono text-xs uppercase tracking-[0.2em] text-primary-foreground disabled:opacity-50">
          {pending ? 'Saving…' : 'Save work post'}
        </button>
      </div>
      {state?.error ? <p role="alert" className="text-sm text-destructive">{state.error}</p> : null}
    </form>
  )
}
