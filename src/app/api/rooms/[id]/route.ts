import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Gestion de la méthode GET pour récupérer une room spécifique.
 */
export async function GET(req: Request, { params }: { params: { rooms: string[] } }) {
  const roomId = params.rooms[0];

  if (!roomId) {
    return NextResponse.json({ error: "Room ID manquant." }, { status: 400 });
  }

  try {
    const room = await prisma.room.findUnique({
      where: { id: roomId },
    });

    if (!room) {
      return NextResponse.json({ error: "Room introuvable." }, { status: 404 });
    }

    return NextResponse.json(room, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération de la room :", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur." },
      { status: 500 }
    );
  }
}

/**
 * Gestion de la méthode PATCH pour mettre à jour une room spécifique.
 */
export async function PATCH(req: Request, { params }: { params: { rooms: string[] } }) {
  const roomId = params.rooms[0];

  if (!roomId) {
    return NextResponse.json({ error: "Room ID manquant." }, { status: 400 });
  }

  try {
    const body = await req.json();

    // Mise à jour de la room
    const updatedRoom = await prisma.room.update({
      where: { id: roomId },
      data: body, // Supposons que le body contient des champs valides pour la mise à jour
    });

    return NextResponse.json(updatedRoom, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la room :", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur." },
      { status: 500 }
    );
  }
}

/**
 * Gestion de la méthode DELETE pour supprimer une room spécifique.
 */
export async function DELETE(req: Request, { params }: { params: { rooms: string[] } }) {
  const roomId = params.rooms[0];

  if (!roomId) {
    return NextResponse.json({ error: "Room ID manquant." }, { status: 400 });
  }

  try {
    // Suppression de la room
    await prisma.room.delete({
      where: { id: roomId },
    });

    return NextResponse.json({ message: "Room supprimée avec succès." }, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la suppression de la room :", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur." },
      { status: 500 }
    );
  }
}
