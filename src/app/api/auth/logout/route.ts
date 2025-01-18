import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST() {
    try {
        const { error } = await supabase.auth.signOut();

        if (error) {
            console.error("Error during logout:", error.message);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        const response = NextResponse.json({ message: "Logout successful" });

        response.cookies.delete("access_token");
        response.cookies.delete("refresh_token");

        return response;
    } catch (error) {
        console.error("Unexpected error during logout:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
