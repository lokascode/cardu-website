import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { requireEditor } from '@/lib/cms/auth'
import { ArticleForm } from '@/components/cms/article-form'
import { getCategories } from '@/lib/cms/queries'
import type { ArticleRow } from '@/lib/cms/types'

export const dynamic = 'force-dynamic'

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  await requireEditor()
  const { id } = await params
  const supabase = await createClient()
  const { data } = await supabase.from('articles').select('*').eq('id', id).single()
  if (!data) notFound()
  const categories = await getCategories()
  return <ArticleForm article={data as ArticleRow} categories={categories} />
}
