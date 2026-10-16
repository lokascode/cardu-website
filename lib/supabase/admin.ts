import 'server-only'
import { createClient } from '@supabase/supabase-js'

/**
 * Service-role Supabase client for privileged server-side operations.
 *
 * IMPORTANT: never import this into client code — the service role key
 * bypasses Row Level Security. Used here only to create editor accounts
 * that are confirmed immediately, so sign-up does not depend on the
 * built-in email service (which cannot deliver to arbitrary addresses and
 * is heavily rate-limited).
 */
export function createAdminClient() {
  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceKey) {
    throw new Error('Supabase service credentials are not configured.')
  }

  return createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
}
