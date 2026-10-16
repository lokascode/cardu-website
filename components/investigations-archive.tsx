'use client'

import { useMemo, useState } from 'react'
import { InvestigationCard } from '@/components/investigation-card'
import type { Investigation } from '@/lib/data'
import { type Dictionary } from '@/lib/i18n'
import type { Locale } from '@/lib/i18n/config'
import { cn } from '@/lib/utils'

export function InvestigationsArchive({
  items: all,
  locale,
  dict,
}: {
  items: Investigation[]
  locale: Locale
  dict: Dictionary
}) {
  const filters = [
    { key: 'all', label: dict.investigations.filterAll },
    { key: 'latest', label: dict.investigations.latTitle },
    { key: 'featured', label: dict.investigations.featTitle },
  ] as const
  const [active, setActive] = useState<string>('all')

  const items = useMemo(() => {
    if (active === 'featured') return all.filter((i) => i.featured)
    if (active === 'latest') return all.slice(0, 4)
    return all
  }, [active, all])

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 border-y border-border py-4">
        <span className="me-4 font-mono-meta text-[10px] text-muted-foreground">
          {dict.investigations.filterLabel}
        </span>
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setActive(f.key)}
            className={cn(
              'border border-border px-4 py-2 font-mono-meta text-[10px] transition-colors',
              active === f.key
                ? 'bg-primary text-primary-foreground'
                : 'text-foreground hover:bg-secondary hover:text-secondary-foreground',
            )}
          >
            {f.label}
          </button>
        ))}
        <span className="ms-auto font-mono-meta text-[10px] text-muted-foreground">
          {items.length}
        </span>
      </div>

      {items.length === 0 ? (
        <p className="mt-14 font-serif text-xl text-muted-foreground">
          {dict.investigations.empty}
        </p>
      ) : (
        <div className="mt-14 grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <InvestigationCard key={item.id} item={item} locale={locale} />
          ))}
        </div>
      )}
    </div>
  )
}
