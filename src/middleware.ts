import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const accessToken = request.cookies.get("access_token")?.value;
    const pathname = request.nextUrl.pathname;

    console.log("Middleware Debug: Pathname:", pathname);

    const publicRoutes = ["/signin", "/register"];
    const protectedRoutes = ["/dashboard", "/profile"];

    if (publicRoutes.includes(pathname)) {
        if (accessToken) {
            console.log("Middleware Debug: User is authenticated. Redirecting to /.");
            return NextResponse.redirect(new URL("/", request.url));
        }
        return NextResponse.next();
    }

    if (protectedRoutes.includes(pathname)) {
        if (!accessToken) {
            console.log("Middleware Debug: User is not authenticated. Redirecting to /signin.");
            const url = new URL("/signin", request.url);
            url.searchParams.set("redirect", pathname);
            return NextResponse.redirect(url);
        }
        return NextResponse.next();
    }

    console.log("Middleware Debug: No redirection. Proceeding as default.");
    return NextResponse.next();
}



// Configurer le matcher pour toutes les routes
export const config = {
    matcher: "/:path*",
};
