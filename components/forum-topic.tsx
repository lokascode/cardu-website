import { MessageSquare } from 'lucide-react'
import type { ForumTopic as ForumTopicType } from '@/lib/data'
import type { Dictionary } from '@/lib/i18n'

export function ForumTopic({
  topic,
  dict,
}: {
  topic: ForumTopicType
  dict: Dictionary
}) {
  return (
    <article className="group grid grid-cols-1 gap-4 border-b border-border py-6 transition-colors hover:bg-muted/40 md:grid-cols-12 md:items-center md:gap-6 md:px-4">
      <div className="md:col-span-7">
        <span className="font-mono-meta text-[9px] text-primary">
          {topic.category}
        </span>
        <h3 className="mt-1 font-serif text-2xl font-bold leading-tight tracking-tight transition-colors group-hover:text-primary">
          {topic.title}
        </h3>
        <p className="mt-1 font-mono-meta text-[10px] text-muted-foreground">
          {dict.common.by} {topic.author}
        </p>
      </div>
      <div className="flex items-center gap-8 md:col-span-5 md:justify-end">
        <div className="flex items-center gap-2">
          <MessageSquare size={14} className="text-muted-foreground" />
          <span className="font-serif text-xl font-bold">{topic.replies}</span>
          <span className="font-mono-meta text-[9px] text-muted-foreground">
            {dict.forum.repliesLabel}
          </span>
        </div>
        <div className="text-start">
          <p className="font-mono-meta text-[9px] text-muted-foreground">
            {dict.forum.lastActivity}
          </p>
          <p className="font-serif text-base">{topic.lastActivity}</p>
        </div>
      </div>
    </article>
  )
}
