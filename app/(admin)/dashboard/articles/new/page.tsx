import { requireEditor } from '@/lib/cms/auth'
import { ArticleForm } from '@/components/cms/article-form'
import { getCategories } from '@/lib/cms/queries'

export const dynamic = 'force-dynamic'

export default async function NewArticlePage() {
  await requireEditor()
  const categories = await getCategories()
  return <ArticleForm categories={categories} />
}
