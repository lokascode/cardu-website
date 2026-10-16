'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { localizedHref } from '@/lib/i18n'
import type { Locale } from '@/lib/i18n/config'
import { cn } from '@/lib/utils'

export function SectionSubnav({
  links,
  locale,
}: {
  links: readonly { readonly label: string; readonly href: string }[]
  locale: Locale
}) {
  const pathname = usePathname()
  const localePath = pathname.replace(new RegExp(`^/${locale}`), '') || '/'
  return (
    <nav className="flex flex-wrap gap-2 border-b border-border pb-6">
      {links.map((link) => {
        const active = localePath === link.href
        return (
          <Link
            key={link.href}
            href={localizedHref(locale, link.href)}
            className={cn(
              'border border-border px-4 py-2 font-mono-meta text-[10px] transition-colors',
              active
                ? 'bg-primary text-primary-foreground'
                : 'text-foreground hover:bg-secondary hover:text-secondary-foreground',
            )}
          >
            {link.label}
          </Link>
        )
      })}
    </nav>
  )
}
