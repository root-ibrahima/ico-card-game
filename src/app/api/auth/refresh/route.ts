import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(request: Request) {
  try {
    const { refresh_token }: { refresh_token: string } = await request.json();

    if (!refresh_token) {
      return NextResponse.json(
        { error: "Refresh token is required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase.auth.refreshSession({ refresh_token });

    if (error || !data.session) {
      return NextResponse.json(
        { error: "Failed to refresh session" },
        { status: 401 }
      );
    }

    console.log("API /auth/refresh: Session rafraîchie avec succès", data);

    const response = NextResponse.json({
      message: "Session refreshed",
      access_token: data.session.access_token,
    });

    response.cookies.set("access_token", data.session.access_token, {
      maxAge: 7200,
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    return response;
  } catch (error) {
    console.error("API /auth/refresh: Erreur serveur", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
