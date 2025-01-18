import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET(request: NextRequest) {
    try {
        const token = request.cookies.get("access_token")?.value;

        console.log("Debug: Token received in /api/auth/user:", token);

        if (!token) {
            return NextResponse.json({ error: "Token is missing" }, { status: 401 });
        }

        const { data, error } = await supabase.auth.getUser(token);

        console.log("Debug: Supabase response:", { data, error });

        if (error || !data?.user) {
            return NextResponse.json({ error: "Invalid token" }, { status: 401 });
        }

        return NextResponse.json(data.user, { status: 200 });
    } catch (error) {
        console.error("Debug: Error in /api/auth/user:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
