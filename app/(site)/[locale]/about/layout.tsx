import { PageShell } from '@/components/page-shell'
import { SectionSubnav } from '@/components/section-subnav'
import { getDictionary } from '@/lib/i18n'
import type { Locale } from '@/lib/i18n/config'

export default async function AboutLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const dict = getDictionary(locale)
  const links = [
    { label: dict.common.overview, href: '/about' },
    ...dict.about.sections,
  ]
  return (
    <PageShell>
      <SectionSubnav links={links} locale={locale as Locale} />
      <div className="mt-12">{children}</div>
    </PageShell>
  )
}
