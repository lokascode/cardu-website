'use client'

import { useState, useRef, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { ChevronDown, Check } from 'lucide-react'
import { locales, localeMeta, type Locale } from '@/lib/i18n/config'
import { cn } from '@/lib/utils'

export function LanguageSwitcher({
  currentLocale,
  className,
}: {
  currentLocale: Locale
  className?: string
}) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  function switchTo(locale: Locale) {
    // Replace the leading locale segment
    const segments = pathname.split('/')
    segments[1] = locale
    const next = segments.join('/') || `/${locale}`
    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000; samesite=lax`
    setOpen(false)
    router.push(next)
    router.refresh()
  }

  return (
    <div ref={ref} className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 border border-border px-3 py-1.5 font-mono-meta text-[11px] uppercase tracking-wide text-foreground transition-colors hover:bg-foreground hover:text-background"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Select language"
      >
        <span>{localeMeta[currentLocale].short}</span>
        <ChevronDown className="h-3 w-3" aria-hidden />
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute end-0 z-50 mt-1 w-44 border border-border bg-background py-1 shadow-lg"
        >
          {locales.map((locale) => (
            <li key={locale} role="option" aria-selected={locale === currentLocale}>
              <button
                type="button"
                onClick={() => switchTo(locale)}
                className={cn(
                  'flex w-full items-center justify-between gap-2 px-3 py-2 text-start text-sm transition-colors hover:bg-secondary hover:text-primary',
                  locale === currentLocale && 'font-semibold',
                )}
              >
                <span className="flex flex-col">
                  <span>{localeMeta[locale].native}</span>
                  <span className="font-mono-meta text-[10px] uppercase text-muted-foreground">
                    {localeMeta[locale].english}
                  </span>
                </span>
                {locale === currentLocale && <Check className="h-3.5 w-3.5" aria-hidden />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
