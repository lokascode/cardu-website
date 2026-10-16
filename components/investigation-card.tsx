import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { Investigation } from '@/lib/data'
import { localizedHref } from '@/lib/i18n'
import type { Locale } from '@/lib/i18n/config'

export function InvestigationCard({
  item,
  locale,
}: {
  item: Investigation
  locale: Locale
}) {
  return (
    <Link
      href={localizedHref(locale, `/investigations/${item.slug}`)}
      className="group flex h-full flex-col border-t border-border pt-5"
    >
      <div className="flex items-center justify-between">
        <span className="font-mono-meta text-[11px] text-primary">
          {item.number}
        </span>
        <span className="font-mono-meta text-[10px] text-muted-foreground">
          {item.category}
        </span>
      </div>

      <div className="mt-5 aspect-[4/3] w-full overflow-hidden bg-muted">
        <img
          src={item.image || '/placeholder.svg'}
          alt={item.title}
          className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:scale-[1.03] group-hover:grayscale-0"
        />
      </div>

      <h3 className="mt-5 flex items-start justify-between gap-2 text-balance font-serif text-2xl font-bold leading-tight tracking-tight transition-colors group-hover:text-primary md:text-3xl">
        {item.title}
        <ArrowUpRight
          size={20}
          className="mt-1 shrink-0 text-muted-foreground transition-colors group-hover:text-primary rtl:-scale-x-100"
        />
      </h3>

      <p className="mt-3 flex-1 font-serif text-base leading-relaxed text-muted-foreground">
        {item.excerpt}
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-border pt-3">
        <span className="font-mono-meta text-[10px] text-muted-foreground">
          {item.date}
        </span>
        <span className="font-mono-meta text-[10px] text-muted-foreground">
          {item.location}
        </span>
      </div>
    </Link>
  )
}
