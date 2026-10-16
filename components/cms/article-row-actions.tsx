'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { deleteArticle, toggleStatus } from '@/app/(admin)/dashboard/articles/actions'

export function ArticleRowActions({
  id,
  slug,
  status,
}: {
  id: string
  slug: string
  status: 'draft' | 'published'
}) {
  const [confirming, setConfirming] = useState(false)
  const [isPending, startTransition] = useTransition()

  return (
    <div className="flex items-center gap-1 text-xs font-mono-meta">
      {status === 'published' ? (
        <Link
          href={`/en/investigations/${slug}`}
          target="_blank"
          className="px-2 py-1.5 text-muted-foreground transition-colors hover:text-foreground"
        >
          View
        </Link>
      ) : null}
      <Link
        href={`/dashboard/articles/${id}`}
        className="px-2 py-1.5 text-muted-foreground transition-colors hover:text-foreground"
      >
        Edit
      </Link>
      <form action={(fd) => startTransition(() => toggleStatus(fd))}>
        <input type="hidden" name="id" value={id} />
        <input
          type="hidden"
          name="next"
          value={status === 'published' ? 'draft' : 'published'}
        />
        <button
          type="submit"
          disabled={isPending}
          className="px-2 py-1.5 text-muted-foreground transition-colors hover:text-primary disabled:opacity-50"
        >
          {status === 'published' ? 'Unpublish' : 'Publish'}
        </button>
      </form>
      {confirming ? (
        <form action={(fd) => startTransition(() => deleteArticle(fd))}>
          <input type="hidden" name="id" value={id} />
          <button
            type="submit"
            disabled={isPending}
            className="px-2 py-1.5 text-destructive transition-colors hover:underline disabled:opacity-50"
          >
            Confirm
          </button>
          <button
            type="button"
            onClick={() => setConfirming(false)}
            className="px-2 py-1.5 text-muted-foreground hover:text-foreground"
          >
            Cancel
          </button>
        </form>
      ) : (
        <button
          type="button"
          onClick={() => setConfirming(true)}
          className="px-2 py-1.5 text-muted-foreground transition-colors hover:text-destructive"
        >
          Delete
        </button>
      )}
    </div>
  )
}
