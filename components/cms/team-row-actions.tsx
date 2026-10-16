'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { ChevronUp, ChevronDown } from 'lucide-react'
import { deleteTeamMember, moveTeamMember } from '@/app/(admin)/dashboard/team/actions'

export function TeamRowActions({
  id,
  isFirst,
  isLast,
}: {
  id: string
  isFirst: boolean
  isLast: boolean
}) {
  const [confirming, setConfirming] = useState(false)
  const [isPending, startTransition] = useTransition()

  return (
    <div className="flex items-center gap-1 text-xs font-mono-meta">
      <form action={(fd) => startTransition(() => moveTeamMember(fd))} className="flex">
        <input type="hidden" name="id" value={id} />
        <input type="hidden" name="direction" value="up" />
        <button
          type="submit"
          disabled={isFirst || isPending}
          aria-label="Move up"
          className="p-1.5 text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30"
        >
          <ChevronUp className="h-4 w-4" />
        </button>
      </form>
      <form action={(fd) => startTransition(() => moveTeamMember(fd))} className="flex">
        <input type="hidden" name="id" value={id} />
        <input type="hidden" name="direction" value="down" />
        <button
          type="submit"
          disabled={isLast || isPending}
          aria-label="Move down"
          className="p-1.5 text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30"
        >
          <ChevronDown className="h-4 w-4" />
        </button>
      </form>

      <Link
        href={`/dashboard/team/${id}`}
        className="px-2 py-1.5 text-muted-foreground transition-colors hover:text-foreground"
      >
        Edit
      </Link>

      {confirming ? (
        <form action={(fd) => startTransition(() => deleteTeamMember(fd))}>
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
