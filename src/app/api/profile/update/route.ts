import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { createClient } from "@supabase/supabase-js";

const prisma = new PrismaClient();
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

/**
 * 🔄 PUT : Met à jour le profil utilisateur.
 */
export async function PUT(req: NextRequest) {
  try {
    const { id, name, email } = await req.json();

    if (!id || !name || !email) {
      return NextResponse.json({ error: "❌ Champs requis manquants." }, { status: 400 });
    }

    // Mise à jour dans Prisma
    const updatedProfile = await prisma.player.update({
      where: { id },
      data: { name },
    });

    // Mise à jour dans Supabase
    const { error } = await supabase
      .from("profiles")
      .update({ name, email })
      .eq("id", id);

    if (error) {
      throw error;
    }

    return NextResponse.json(updatedProfile, { status: 200 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "❌ Échec de la mise à jour du profil.";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
