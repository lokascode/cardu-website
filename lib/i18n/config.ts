export const locales = ['en', 'ku', 'ckb', 'ar'] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'

// Every locale except English is written in Arabic script, right-to-left.
export const rtlLocales: Locale[] = ['ku', 'ckb', 'ar']

export function isRtl(locale: Locale): boolean {
  return rtlLocales.includes(locale)
}

export function getDir(locale: Locale): 'rtl' | 'ltr' {
  return isRtl(locale) ? 'rtl' : 'ltr'
}

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value)
}

export function resolveLocale(value: string | undefined): Locale {
  if (value && isLocale(value)) return value
  return defaultLocale
}

export type LocaleMeta = {
  /** Name of the language, written in that language */
  native: string
  /** Name of the language in English */
  english: string
  /** Short label for the switcher */
  short: string
  dir: 'rtl' | 'ltr'
}

export const localeMeta: Record<Locale, LocaleMeta> = {
  en: { native: 'English', english: 'English', short: 'EN', dir: 'ltr' },
  ku: { native: 'کوردیی بادینی', english: 'Kurdish (Bahdini)', short: 'KU', dir: 'rtl' },
  ckb: { native: 'کوردیی سۆرانی', english: 'Kurdish (Sorani)', short: 'CKB', dir: 'rtl' },
  ar: { native: 'العربية', english: 'Arabic', short: 'AR', dir: 'rtl' },
}
