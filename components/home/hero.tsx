import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { localizedHref, type Dictionary } from '@/lib/i18n'
import type { Locale } from '@/lib/i18n/config'

export function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const h = dict.home
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="grid grid-cols-1 gap-0 lg:grid-cols-12">
          <div className="flex flex-col justify-between py-12 lg:col-span-7 lg:border-e lg:border-border lg:py-20 lg:pe-12">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="inline-block h-2 w-2 bg-primary" aria-hidden />
                <span className="font-mono-meta text-[11px] text-foreground">
                  {h.heroKicker}
                </span>
              </div>
              <span className="hidden font-serif text-lg italic text-muted-foreground sm:inline">
                {h.heroTagline}
              </span>
            </div>

            <h1 className="hero-title mt-14 text-balance font-serif text-6xl font-bold leading-[0.9] tracking-tight sm:text-7xl md:text-8xl lg:mt-20 lg:text-[8.5rem]">
              {h.heroTitle}
            </h1>

            <p className="mt-10 max-w-xl text-pretty font-serif text-xl leading-relaxed text-muted-foreground md:text-2xl">
              {h.heroLead}
            </p>

            <div className="mt-12 flex flex-col gap-4 sm:flex-row">
              <Link
                href={localizedHref(locale, '/investigations')}
                className="group inline-flex items-center justify-between gap-6 bg-primary px-6 py-4 font-mono-meta text-xs text-primary-foreground transition-opacity hover:opacity-90"
              >
                {h.heroCta}
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1"
                />
              </Link>

            </div>
          </div>

          <div className="relative lg:col-span-5">
            <div className="h-72 w-full overflow-hidden bg-muted sm:h-96 lg:h-full">
              <img
                src="/images/hero.png"
                alt="A dimly lit archive of documents"
                className="h-full w-full object-cover grayscale"
              />
            </div>
            <div className="absolute bottom-0 start-0 bg-secondary px-4 py-3">
              <span className="font-mono-meta text-[10px] text-secondary-foreground">
                {h.heroKicker}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
