'use server'

import { createAdminClient } from '@/lib/supabase/admin'

export type CreateAccountResult = { ok: true } | { ok: false; error: string }

/**
 * Creates an editor account server-side using the service-role admin API.
 * The user is created already email-confirmed and NO confirmation email is
 * sent, so the flow works regardless of the project's email configuration.
 *
 * The `handle_new_user_editor` trigger promotes the first-ever user to an
 * editor automatically; later users are created as regular (non-editor)
 * accounts that hit the "not authorized" screen until an editor adds them.
 */
export async function createAccount(
  email: string,
  password: string,
): Promise<CreateAccountResult> {
  const cleanEmail = email.trim().toLowerCase()

  if (!cleanEmail || !cleanEmail.includes('@')) {
    return { ok: false, error: 'Please enter a valid email address.' }
  }
  if (password.length < 6) {
    return { ok: false, error: 'Password must be at least 6 characters.' }
  }

  const admin = createAdminClient()

  const { error } = await admin.auth.admin.createUser({
    email: cleanEmail,
    password,
    email_confirm: true,
  })

  if (error) {
    // Surface the actionable "already exists" case; keep everything else generic.
    const message = error.message?.toLowerCase() ?? ''
    if (
      message.includes('already') ||
      message.includes('registered') ||
      (error as { code?: string }).code === 'email_exists'
    ) {
      return {
        ok: false,
        error: 'An account with this email already exists. Try signing in.',
      }
    }
    return { ok: false, error: 'Could not create the account. Please try again.' }
  }

  return { ok: true }
}
