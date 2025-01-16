import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET(request: Request) {
  try {
    const accessToken = request.headers.get("Authorization")?.split(" ")[1];

    if (!accessToken) {
      console.error("API /auth/user: Access token manquant");
      return NextResponse.json({ error: "Access token missing" }, { status: 401 });
    }

    const { data, error } = await supabase.auth.getUser(accessToken);

    if (error || !data?.user) {
      console.error("API /auth/user: Token invalide ou expiré", error);
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    console.log("API /auth/user: Utilisateur récupéré avec succès", data.user);
    return NextResponse.json({ user: data.user }, { status: 200 });
  } catch (error) {
    console.error("API /auth/user: Erreur serveur", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
