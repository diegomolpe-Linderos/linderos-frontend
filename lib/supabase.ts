import { createBrowserClient } from '@supabase/ssr'

let client: ReturnType<typeof createBrowserClient> | null = null

export function createClient() {
  // Singleton pattern: solo crea el cliente una vez
  if (client) return client

  client = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  return client
}

// Alias para compatibilidad con código existente
export function getSupabaseClient() {
  return createClient()
}

