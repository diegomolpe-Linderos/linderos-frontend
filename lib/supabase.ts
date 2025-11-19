import { createClient } from "@supabase/supabase-js";

/**
 * Inicializa y devuelve el cliente Supabase.
 * Nota: Lo exportamos como función para que se inicialice solo cuando es llamado,
 * asegurando que las variables de entorno se carguen correctamente.
 */
export function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Faltan variables de entorno de Supabase.");
    throw new Error("Faltan variables de entorno de Supabase.");
  }

  return createClient(supabaseUrl, supabaseAnonKey);
}
