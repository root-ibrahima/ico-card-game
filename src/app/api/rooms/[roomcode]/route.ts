import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * 🔍 Gestion de la méthode GET pour récupérer une room spécifique.
 */
export async function GET(_: Request, { params }: { params: { roomId: string } }) {
  const { roomId } = params;

  if (!roomId) {
    return NextResponse.json({ error: "❌ Room ID manquant." }, { status: 400 });
  }

  try {
    const room = await prisma.room.findUnique({
      where: { id: roomId },
      include: { players: true }, // 🔥 Inclut les joueurs dans la réponse
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
 * ✏️ Gestion de la méthode PATCH pour mettre à jour une room spécifique.
 */
export async function PATCH(req: Request, { params }: { params: { roomId: string } }) {
  const { roomId } = params;

  if (!roomId) {
    return NextResponse.json({ error: "❌ Room ID manquant." }, { status: 400 });
  }

  try {
    const body = await req.json();

    // Vérifier si la room existe avant la mise à jour
    const existingRoom = await prisma.room.findUnique({ where: { id: roomId } });

    if (!existingRoom) {
      return NextResponse.json({ error: "❌ Room introuvable." }, { status: 404 });
    }

    // Mise à jour de la room
    const updatedRoom = await prisma.room.update({
      where: { id: roomId },
      data: body, // ✅ Assurez-vous que `body` contient des champs valides
    });

    return NextResponse.json(updatedRoom, { status: 200 });
  } catch (error) {
    console.error("❌ Erreur lors de la mise à jour de la room :", error);
    return NextResponse.json({ error: "Erreur interne du serveur." }, { status: 500 });
  }
}

/**
 * 🗑️ Gestion de la méthode DELETE pour supprimer une room spécifique.
 */
export async function DELETE(_: Request, { params }: { params: { roomId: string } }) {
  const { roomId } = params;

  if (!roomId) {
    return NextResponse.json({ error: "❌ Room ID manquant." }, { status: 400 });
  }

  try {
    // Vérifier si la room existe avant la suppression
    const existingRoom = await prisma.room.findUnique({ where: { id: roomId } });

    if (!existingRoom) {
      return NextResponse.json({ error: "❌ Room introuvable." }, { status: 404 });
    }

    // Suppression de la room
    await prisma.room.delete({ where: { id: roomId } });

    return NextResponse.json({ message: "✅ Room supprimée avec succès." }, { status: 200 });
  } catch (error) {
    console.error("❌ Erreur lors de la suppression de la room :", error);
    return NextResponse.json({ error: "Erreur interne du serveur." }, { status: 500 });
  }
}
