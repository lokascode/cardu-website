import Image from 'next/image'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { requireEditor } from '@/lib/cms/auth'
import { deleteWorkPost, toggleWorkPostStatus } from './actions'

export const dynamic = 'force-dynamic'

export default async function WorkPostsPage() {
  await requireEditor()
  const supabase = await createClient()
  const { data: posts } = await supabase.from('work_posts').select('*').order('created_at', { ascending: false })

  return (
    <div>
      <header className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">Editorial</p>
          <h1 className="mt-2 font-serif text-4xl text-foreground">Our Work posts</h1>
        </div>
        <Link href="/dashboard/work-posts/new" className="bg-primary px-5 py-3 font-mono text-xs uppercase tracking-[0.2em] text-primary-foreground">New work post</Link>
      </header>
      <div className="space-y-4">
        {(posts ?? []).map((post) => {
          const title = (post.title as Record<string, string>)?.en || Object.values(post.title as Record<string, string>)[0] || 'Untitled'
          return (
            <article key={post.id} className="grid gap-5 border-t border-border py-5 sm:grid-cols-[160px_1fr_auto] sm:items-center">
              <Image src={post.image_url} alt="" width={160} height={100} className="h-24 w-40 object-cover" unoptimized />
              <div>
                <h2 className="font-serif text-2xl text-foreground">{title}</h2>
                <p className="mt-1 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">{post.status}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Link href={`/dashboard/work-posts/${post.id}/edit`} className="border border-border px-3 py-2 font-mono text-[10px] uppercase tracking-[0.15em] text-foreground">Edit</Link>
                <form action={toggleWorkPostStatus}>
                  <input type="hidden" name="id" value={post.id} />
                  <input type="hidden" name="next" value={post.status === 'published' ? 'draft' : 'published'} />
                  <button className="border border-border px-3 py-2 font-mono text-[10px] uppercase tracking-[0.15em] text-foreground">{post.status === 'published' ? 'Unpublish' : 'Publish'}</button>
                </form>
                <form action={deleteWorkPost}>
                  <input type="hidden" name="id" value={post.id} />
                  <button className="border border-destructive px-3 py-2 font-mono text-[10px] uppercase tracking-[0.15em] text-destructive">Delete</button>
                </form>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
