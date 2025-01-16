import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("access_token")?.value;
  const refreshToken = request.cookies.get("refresh_token")?.value;
  const pathname = request.nextUrl.pathname;

  console.log("Middleware - Pathname:", pathname);
  console.log("Middleware - Cookies présents :", request.cookies);
  console.log("Middleware - Access Token:", accessToken);
  console.log("Middleware - Refresh Token:", refreshToken);

  // Si aucun accessToken et aucun refreshToken, rediriger vers /auth/signin
  if (!accessToken && !refreshToken) {
    const response = NextResponse.redirect(new URL("/auth/signin", request.url));
    response.cookies.delete("access_token");
    response.cookies.delete("refresh_token");
    return response;
  }

  // Si un refreshToken est présent, essayer de rafraîchir l'accessToken
  if (!accessToken && refreshToken) {
    try {
      const { data, error } = await supabase.auth.refreshSession({
        refresh_token: refreshToken,
      });

      if (error || !data?.session) {
        console.error("Middleware - Refresh Token Error:", error);
        const response = NextResponse.redirect("/auth/signin");
        response.cookies.delete("access_token");
        response.cookies.delete("refresh_token");
        return response;
      }

      console.log("Middleware - Access Token refreshed");

      const response = NextResponse.next();
      response.cookies.set("access_token", data.session.access_token, {
        maxAge: 60 * 60 * 2, // 2 heures
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });
      return response;
    } catch (err) {
      console.error("Middleware - Error during token refresh:", err);
      const response = NextResponse.redirect("/auth/signin");
      response.cookies.delete("access_token");
      response.cookies.delete("refresh_token");
      return response;
    }
  }

  // Si un accessToken est présent, continuer vers la page demandée
  return NextResponse.next();
}

// Configuration du matcher
export const config = {
  matcher: "/:path*",
};
