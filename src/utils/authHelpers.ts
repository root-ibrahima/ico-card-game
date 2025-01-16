import { supabase } from "@/lib/supabaseClient";

export async function checkSession() {
  const { data, error } = await supabase.auth.getSession();
  if (error || !data?.session) {
    console.log("Pas de session active :", error || "Session manquante");
    return false;
  }
  return data.session;
}
