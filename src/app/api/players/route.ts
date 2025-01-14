import { supabase } from "@/lib/supabaseClient";
import { NextRequest, NextResponse } from "next/server";

// Ajouter un joueur à une salle
export async function POST(req: NextRequest) {
  const { name, role, room_id } = await req.json();

  const { data, error } = await supabase
    .from("players")
    .insert([{ name, role, room_id }])
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data[0], { status: 201 });
}

// Récupérer les joueurs d'une salle
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const room_id = searchParams.get("room_id");

  const { data, error } = await supabase
    .from("players")
    .select("*")
    .eq("room_id", room_id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 200 });
}
