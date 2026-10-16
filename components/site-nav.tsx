'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useTheme } from '@/components/theme-provider'
import { LanguageSwitcher } from '@/components/language-switcher'
import { localizedHref, type Dictionary } from '@/lib/i18n'
import type { Locale } from '@/lib/i18n/config'
import { cn } from '@/lib/utils'

export function SiteNav({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  const navItems = dict.nav.items.filter(
    (item) => item.href !== '/forum' && item.href !== '/academy' && item.href !== '/submit',
  )

  // Path without the leading locale segment, for active-state matching.
  const localePath = pathname.replace(new RegExp(`^/${locale}`), '') || '/'

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  function isActive(href: string) {
    return href === '/' ? localePath === '/' : localePath.startsWith(href)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-[1600px] items-stretch justify-between px-5 md:px-10">
        <Link
          href={localizedHref(locale, '/')}
          className="flex h-full items-stretch"
          aria-label={dict.nav.home}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/CARDU-full-logo.svg" alt="CARDU" className="h-full w-auto" />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-8">
            {navItems.map((item) => {
              const active = isActive(item.href)
              return (
                <li key={item.href}>
                  <Link
                    href={localizedHref(locale, item.href)}
                    className={cn(
                      'group relative font-mono-meta text-xs text-foreground/80 transition-colors hover:text-foreground',
                      active && 'text-primary',
                    )}
                  >
                    {item.label}
                    <span
                      className={cn(
                        'absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100',
                        active && 'scale-x-100',
                      )}
                      aria-hidden
                    />
                  </Link>
                </li>
              )
            })}
          </ul>
          <LanguageSwitcher currentLocale={locale} />
          <button
            onClick={toggleTheme}
            className="flex h-8 w-8 items-center justify-center border border-border text-foreground transition-colors hover:bg-secondary hover:text-secondary-foreground"
            aria-label={dict.nav.toggleTheme}
          >
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>
        </div>

        <div className="flex items-center md:hidden">
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center border border-border text-foreground"
            aria-label={open ? dict.nav.closeMenu : dict.nav.openMenu}
            aria-expanded={open}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="fixed inset-x-0 top-16 bottom-0 z-[100] isolate min-h-[calc(100dvh-4rem)] flex-col overflow-y-auto border-t border-border bg-background opacity-100 shadow-2xl backdrop-blur-none md:hidden">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <LanguageSwitcher currentLocale={locale} />
            <button
              onClick={toggleTheme}
              className="flex h-9 w-9 items-center justify-center border border-border text-foreground"
              aria-label={dict.nav.toggleTheme}
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
          <ul className="flex flex-col border-t border-border">
            {navItems.map((item, i) => {
              const active = isActive(item.href)
              return (
                <li key={item.href} className="border-b border-border">
                  <Link
                    href={localizedHref(locale, item.href)}
                    className="flex items-baseline gap-4 px-5 py-6"
                  >
                    <span className="font-mono-meta text-xs text-primary">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={cn(
                        'font-serif text-4xl font-bold tracking-tight',
                        active ? 'text-primary' : 'text-foreground',
                      )}
                    >
                      {item.label}
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
          <div className="mt-auto px-5 py-8">
            <p className="font-mono-meta text-[10px] text-muted-foreground">
              {dict.nav.menuStrap}
            </p>
            <p className="mt-2 font-serif text-lg italic text-foreground">
              {dict.nav.tagline}
            </p>
          </div>
        </div>
      )}
    </header>
  )
}
