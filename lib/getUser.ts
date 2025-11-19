import { getSupabaseClient } from "./supabase";

export async function getUser() {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error("Error obteniendo el usuario:", error.message);
    return null;
  }

  return data.user;
}
