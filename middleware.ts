import { NextRequest, NextResponse } from 'next/server'
import { locales, defaultLocale, type Locale } from '@/lib/i18n/config'
import { updateSession } from '@/lib/supabase/proxy'

function getLocale(request: NextRequest): Locale {
  // 1. Cookie preference
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value
  if (cookieLocale && locales.includes(cookieLocale as Locale)) {
    return cookieLocale as Locale
  }

  // 2. Accept-Language header
  const accept = request.headers.get('accept-language')
  if (accept) {
    const preferred = accept
      .split(',')
      .map((part) => part.split(';')[0].trim().toLowerCase())
    for (const lang of preferred) {
      if (locales.includes(lang as Locale)) return lang as Locale
      const base = lang.split('-')[0]
      if (locales.includes(base as Locale)) return base as Locale
    }
  }

  return defaultLocale
}

// Routes that live OUTSIDE the localized public site: the editor dashboard and
// auth pages are English-only admin surfaces and must not be locale-prefixed.
function isNonLocalizedPath(pathname: string): boolean {
  return (
    pathname === '/dashboard' ||
    pathname.startsWith('/dashboard/') ||
    pathname === '/auth' ||
    pathname.startsWith('/auth/')
  )
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Always refresh the Supabase session so cookies stay in sync. This must run
  // on every request and its response cookies must be preserved.
  const { supabaseResponse, user } = await updateSession(request)

  // Gate the editor dashboard: unauthenticated users go to the login page.
  if (pathname === '/dashboard' || pathname.startsWith('/dashboard/')) {
    if (!user) {
      const url = request.nextUrl.clone()
      url.pathname = '/auth/login'
      url.searchParams.set('next', pathname)
      return NextResponse.redirect(url)
    }
    return supabaseResponse
  }

  // Auth pages are served as-is (no locale prefix).
  if (isNonLocalizedPath(pathname)) {
    return supabaseResponse
  }

  // ---- Existing i18n locale routing (public site) ----
  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  )
  if (hasLocale) return supabaseResponse

  const locale = getLocale(request)
  const url = request.nextUrl.clone()
  url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`
  const redirect = NextResponse.redirect(url)
  // Preserve any refreshed Supabase auth cookies on the redirect response.
  supabaseResponse.cookies.getAll().forEach((cookie) => {
    redirect.cookies.set(cookie.name, cookie.value)
  })
  return redirect
}

export const config = {
  // Skip Next internals, API routes, and files with an extension
  matcher: ['/((?!_next|api|.*\\..*).*)'],
}
