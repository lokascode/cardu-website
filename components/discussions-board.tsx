'use client'

import { useState } from 'react'
import { ForumTopic } from '@/components/forum-topic'
import type { ForumTopic as ForumTopicType } from '@/lib/data'
import type { Dictionary } from '@/lib/i18n'
import { cn } from '@/lib/utils'

export function DiscussionsBoard({
  topics,
  categories,
  dict,
}: {
  topics: ForumTopicType[]
  categories: string[]
  dict: Dictionary
}) {
  const allLabel = dict.investigations.filterAll
  const [active, setActive] = useState<string>(allLabel)
  const cats = [allLabel, ...categories]
  const items =
    active === allLabel ? topics : topics.filter((t) => t.category === active)

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 border-y border-border py-4">
        <span className="me-4 font-mono-meta text-[10px] text-muted-foreground">
          {dict.forum.discussionsLabel}
        </span>
        {cats.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={cn(
              'border border-border px-4 py-2 font-mono-meta text-[10px] transition-colors',
              active === c
                ? 'bg-primary text-primary-foreground'
                : 'text-foreground hover:bg-secondary hover:text-secondary-foreground',
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {items.map((topic) => (
          <ForumTopic key={topic.title} topic={topic} dict={dict} />
        ))}
      </div>
    </div>
  )
}
