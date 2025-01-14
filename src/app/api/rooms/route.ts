import { supabase } from "@/lib/supabaseClient";
import { NextRequest, NextResponse } from "next/server";

// Créer une salle
export async function POST(req: NextRequest) {
  const { host } = await req.json();

  const { data, error } = await supabase
    .from("rooms")
    .insert([{ host }])
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data[0], { status: 201 });
}

// Récupérer toutes les salles
export async function GET() {
  const { data, error } = await supabase.from("rooms").select("*");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 200 });
}
