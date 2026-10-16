import { dictionaries, type Dictionary } from './dictionaries'
import { locales, defaultLocale, isLocale, resolveLocale, type Locale } from './config'

export function getDictionary(locale: string): Dictionary {
  return dictionaries[resolveLocale(locale)]
}

/** Prefix an internal href with the active locale, e.g. localizedHref('en', '/about') -> '/en/about' */
export function localizedHref(locale: Locale, href: string): string {
  if (href === '/') return `/${locale}`
  return `/${locale}${href}`
}

export type { Dictionary }
export { locales, defaultLocale, isLocale, resolveLocale, type Locale }
