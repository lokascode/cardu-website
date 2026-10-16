import { requireEditor } from '@/lib/cms/auth'
import { WorkPostForm } from '@/components/cms/work-post-form'

export const dynamic = 'force-dynamic'

export default async function NewWorkPostPage() {
  await requireEditor()
  return <WorkPostForm />
}
