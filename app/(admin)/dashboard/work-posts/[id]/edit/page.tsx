import { notFound } from 'next/navigation'
import { requireEditor } from '@/lib/cms/auth'
import { createClient } from '@/lib/supabase/server'
import { WorkPostForm } from '@/components/cms/work-post-form'

export const dynamic = 'force-dynamic'

export default async function EditWorkPostPage({ params }: { params: Promise<{ id: string }> }) {
  await requireEditor()
  const { id } = await params
  const supabase = await createClient()
  const { data: post } = await supabase.from('work_posts').select('id, title, explanation, image_url, image_urls, status').eq('id', id).single()
  if (!post) notFound()
  return <WorkPostForm post={post} />
}
