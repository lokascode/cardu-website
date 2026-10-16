import 'server-only'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export type EditorSession = {
  userId: string
  email: string | null
  isEditor: boolean
}

/**
 * Resolve the current user and whether they are an authorized editor.
 * Returns null when there is no authenticated user at all.
 */
export async function getEditorSession(): Promise<EditorSession | null> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  const { data: editor } = await supabase
    .from('editors')
    .select('id')
    .eq('id', user.id)
    .maybeSingle()

  return {
    userId: user.id,
    email: user.email ?? null,
    isEditor: Boolean(editor),
  }
}

/**
 * Guard for editor-only pages and server actions. Redirects unauthenticated
 * users to login and non-editors to the dashboard (which renders the
 * "not authorized" screen). Returns the session when the user is an editor.
 */
export async function requireEditor(): Promise<EditorSession> {
  const session = await getEditorSession()
  if (!session) redirect('/auth/login?next=/dashboard')
  if (!session.isEditor) redirect('/dashboard')
  return session
}
