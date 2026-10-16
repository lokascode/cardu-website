import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { requireEditor } from '@/lib/cms/auth'
import { defaultLocale } from '@/lib/i18n/config'
import { AdminButton } from '@/components/cms/admin-ui'
import { ArticleRowActions } from '@/components/cms/article-row-actions'
import type { ArticleRow } from '@/lib/cms/types'

export const dynamic = 'force-dynamic'

export default async function ArticlesPage() {
  await requireEditor()
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .order('updated_at', { ascending: false })

  const articles = (data ?? []) as ArticleRow[]

  return (
    <div>
      <div className="flex items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <h1 className="font-serif text-3xl">Articles</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Create, edit, publish, and delete editorial content across all languages.
          </p>
        </div>
        <Link href="/dashboard/articles/new">
          <AdminButton>New article</AdminButton>
        </Link>
      </div>

      {error ? (
        <p className="mt-8 border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
          Could not load articles. Please refresh the page.
        </p>
      ) : articles.length === 0 ? (
        <div className="mt-16 flex flex-col items-center gap-4 text-center">
          <p className="font-serif text-xl text-muted-foreground">No articles yet</p>
          <p className="max-w-sm text-sm text-muted-foreground">
            Your published stories will appear on the public site. Start by creating your first
            article.
          </p>
          <Link href="/dashboard/articles/new">
            <AdminButton>Create your first article</AdminButton>
          </Link>
        </div>
      ) : (
        <ul className="mt-6 divide-y divide-border border border-border">
          {articles.map((a) => {
            const title = a.title?.[defaultLocale] || a.title?.en || '(untitled)'
            return (
              <li
                key={a.id}
                className="flex flex-wrap items-center justify-between gap-4 px-5 py-4"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-3">
                    <span
                      className={`inline-block px-2 py-0.5 text-[0.65rem] font-mono-meta ${
                        a.status === 'published'
                          ? 'bg-primary/15 text-primary'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {a.status}
                    </span>
                    {a.featured ? (
                      <span className="text-[0.65rem] font-mono-meta text-muted-foreground">
                        Featured
                      </span>
                    ) : null}
                    <span className="text-[0.65rem] font-mono-meta text-muted-foreground">
                      {a.category}
                    </span>
                  </div>
                  <Link
                    href={`/dashboard/articles/${a.id}`}
                    className="mt-1 block truncate font-serif text-lg hover:text-primary"
                  >
                    {title}
                  </Link>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">/{a.slug}</p>
                </div>
                <ArticleRowActions id={a.id} slug={a.slug} status={a.status} />
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
