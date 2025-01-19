import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * 🔍 GET : Récupérer une room spécifique
 */
export async function GET(_: Request, { params }: { params: { roomcode: string } }) {
  const { roomcode } = params;

  if (!roomcode) {
    return NextResponse.json({ error: "❌ Room code manquant." }, { status: 400 });
  }

  try {
    const room = await prisma.room.findUnique({
      where: { id: roomcode }, // Utilisation de roomcode au lieu de roomId
      include: { players: true },
    });

    if (!room) {
      return NextResponse.json({ error: "❌ Room introuvable." }, { status: 404 });
    }

    return NextResponse.json(room, { status: 200 });
  } catch (error) {
    console.error("❌ Erreur lors de la récupération de la room :", error);
    return NextResponse.json({ error: "Erreur interne du serveur." }, { status: 500 });
  }
}

/**
 * ✏️ PATCH : Mettre à jour une room
 */
export async function PATCH(req: Request, { params }: { params: { roomcode: string } }) {
  const { roomcode } = params;

  if (!roomcode) {
    return NextResponse.json({ error: "❌ Room code manquant." }, { status: 400 });
  }

  try {
    const body = await req.json();

    const existingRoom = await prisma.room.findUnique({ where: { id: roomcode } });

    if (!existingRoom) {
      return NextResponse.json({ error: "❌ Room introuvable." }, { status: 404 });
    }

    const updatedRoom = await prisma.room.update({
      where: { id: roomcode },
      data: body,
    });

    return NextResponse.json(updatedRoom, { status: 200 });
  } catch (error) {
    console.error("❌ Erreur lors de la mise à jour de la room :", error);
    return NextResponse.json({ error: "Erreur interne du serveur." }, { status: 500 });
  }
}

/**
 * 🗑️ DELETE : Supprimer une room
 */
export async function DELETE(_: Request, { params }: { params: { roomcode: string } }) {
  const { roomcode } = params;

  if (!roomcode) {
    return NextResponse.json({ error: "❌ Room code manquant." }, { status: 400 });
  }

  try {
    const existingRoom = await prisma.room.findUnique({ where: { id: roomcode } });

    if (!existingRoom) {
      return NextResponse.json({ error: "❌ Room introuvable." }, { status: 404 });
    }

    await prisma.room.delete({ where: { id: roomcode } });

    return NextResponse.json({ message: "✅ Room supprimée avec succès." }, { status: 200 });
  } catch (error) {
    console.error("❌ Erreur lors de la suppression de la room :", error);
    return NextResponse.json({ error: "Erreur interne du serveur." }, { status: 500 });
  }
}
