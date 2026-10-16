import type { Metadata, Viewport } from 'next'
import '../globals.css'

export const metadata: Metadata = {
  title: 'CARDU — Website Update in Progress',
  description: 'The CARDU website is currently being updated.',
  generator: 'v0.app',
  icons: {
    icon: '/images/favicon-32.png',
    apple: '/images/favicon-32.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8f7f3' },
    { media: '(prefers-color-scheme: dark)', color: '#0d0d0d' },
  ],
}

// The <html>/<body> shell is rendered in [locale]/layout.tsx so `lang` and
// `dir` can be set per-locale. This group root layout is a pass-through.
export default function SiteRootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children
}
