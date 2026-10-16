"use client"

import Link from 'next/link'
import { NewsletterSignup } from '@/components/newsletter-signup'
import { localizedHref, type Dictionary } from '@/lib/i18n'
import type { Locale } from '@/lib/i18n/config'

import { useTheme } from '@/components/theme-provider'

export function SiteFooter({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const f = dict.footer
  const { theme } = useTheme()

  return (
    <footer className="border-t border-border bg-secondary text-secondary-foreground">
      <div className="mx-auto max-w-[1600px] px-5 py-16 md:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link
              href={localizedHref(locale, '/')}
              className="inline-block"
              aria-label="CARDU"
            >
              <img
                src={theme === 'dark' ? 'CARDU-text-logo-light.svg' : 'CARDU-text-logo-dark.svg'}
                alt="CARDU"
                className="h-12 w-auto md:h-14"
              />
            </Link>
            <p className="mt-6 font-serif text-2xl italic">{f.tagline}</p>
            <div className="mt-8 max-w-sm">
              <NewsletterSignup dict={dict} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
            {f.columns.map((col) => (
              <div key={col.title}>
                <h3 className="font-mono-meta text-[10px] text-primary">{col.title}</h3>
                <ul className="mt-4 flex flex-col gap-3">
                  {col.links
                    .filter((link) => !['/submit', '/forum', '/academy'].includes(link.href))
                    .map((link) => (
                    <li key={link.href}>
                      <Link
                        href={localizedHref(locale, link.href)}
                        className="font-serif text-base text-secondary-foreground/80 transition-colors hover:text-primary"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-border/40 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono-meta text-[10px] text-secondary-foreground/50">
            © {new Date().getFullYear()} CARDU — {f.rights}
          </p>
          <p className="font-mono-meta text-[10px] text-secondary-foreground/50">{f.strap}</p>
        </div>
      </div>
    </footer>
  )
}
