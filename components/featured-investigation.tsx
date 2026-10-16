import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Investigation } from '@/lib/data'
import { localizedHref, type Dictionary } from '@/lib/i18n'
import type { Locale } from '@/lib/i18n/config'

export function FeaturedInvestigation({
  item,
  locale,
  dict,
}: {
  item: Investigation
  locale: Locale
  dict: Dictionary
}) {
  const href = localizedHref(locale, `/investigations/${item.slug}`)
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-[1600px] px-5 py-16 md:px-10 md:py-24">
        <div className="flex items-center gap-3">
          <span className="inline-block h-2 w-2 bg-primary" aria-hidden />
          <span className="font-mono-meta text-[11px] text-foreground">
            {dict.home.featuredLabel}
          </span>
          <span className="ms-auto font-mono-meta text-[11px] text-primary">
            {item.number}
          </span>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <Link
            href={href}
            className="group block overflow-hidden bg-muted lg:col-span-7"
          >
            <div className="aspect-[16/10] w-full overflow-hidden">
              <img
                src={item.image || '/placeholder.svg'}
                alt={item.title}
                className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-[1.02] group-hover:grayscale-0"
              />
            </div>
          </Link>

          <div className="flex flex-col justify-between lg:col-span-5">
            <div>
              <span className="font-mono-meta text-[10px] text-muted-foreground">
                {item.category}
              </span>
              <Link href={href}>
                <h2 className="hero-title mt-4 text-balance font-serif text-4xl font-bold leading-[0.95] tracking-tight transition-colors hover:text-primary md:text-6xl">
                  {item.title}
                </h2>
              </Link>
              <p className="mt-6 max-w-lg text-pretty font-serif text-xl leading-relaxed text-muted-foreground">
                {item.excerpt}
              </p>
            </div>

            <div className="mt-10">
              <dl className="grid grid-cols-2 gap-y-5 border-t border-border pt-6">
                <div>
                  <dt className="font-mono-meta text-[9px] text-muted-foreground">
                    {dict.common.author}
                  </dt>
                  <dd className="mt-1 font-serif text-lg">{item.author}</dd>
                </div>
                <div>
                  <dt className="font-mono-meta text-[9px] text-muted-foreground">
                    {dict.common.location}
                  </dt>
                  <dd className="mt-1 font-serif text-lg">{item.location}</dd>
                </div>
                <div>
                  <dt className="font-mono-meta text-[9px] text-muted-foreground">
                    {dict.common.published}
                  </dt>
                  <dd className="mt-1 font-serif text-lg">{item.date}</dd>
                </div>
              </dl>

              <Link
                href={href}
                className="group mt-8 inline-flex items-center gap-4 font-mono-meta text-xs text-foreground"
              >
                {dict.common.readInvestigation}
                <span className="flex h-9 w-9 items-center justify-center bg-primary text-primary-foreground transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
                  <ArrowRight size={16} className="rtl:-scale-x-100" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
