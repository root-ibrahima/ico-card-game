import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(request: NextRequest) {
  try {
    const { email, password }: { email: string; password: string } =
      await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.session) {
      console.error("API /auth/signin: Supabase signin error", error);
      return NextResponse.json(
        { error: error?.message || "Authentication failed" },
        { status: 401 }
      );
    }

    const { session } = data;

    const response = NextResponse.json({
      message: "Login successful",
      access_token: session.access_token,
      refresh_token: session.refresh_token,
    });

    response.cookies.set("access_token", session.access_token, {
      maxAge: 7200, // 2 heures
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    response.cookies.set("refresh_token", session.refresh_token, {
      maxAge: 60 * 60 * 24 * 30, // 30 jours
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    return response;
  } catch (error) {
    console.error("API /auth/signin: Internal server error", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
