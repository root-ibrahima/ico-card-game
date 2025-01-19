import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { z } from "zod"; // ✅ Ajout pour valider les données entrantes

const prisma = new PrismaClient();

/**
 * 📌 Schéma de validation pour les mises à jour de room
 */
const updateRoomSchema = z.object({
  name: z.string().optional(),
  status: z.enum(["waiting", "in-progress", "finished"]).optional(),
});

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
      where: { id: roomcode },
      include: { players: true }, // ✅ Vérifie que `players` est bien défini dans le modèle Prisma
    });

    if (!room) {
      return NextResponse.json({ error: "❌ Room introuvable." }, { status: 404 });
    }

    return NextResponse.json(room, { status: 200 });
  } catch (error) {
    console.error("❌ Erreur lors de la récupération de la room :", error);
    return NextResponse.json({ error: "Erreur interne du serveur." }, { status: 500 });
  } finally {
    await prisma.$disconnect(); // ✅ Ferme la connexion à Prisma proprement
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
    const parsedData = updateRoomSchema.safeParse(body);

    if (!parsedData.success) {
      return NextResponse.json({ error: "❌ Données invalides." }, { status: 400 });
    }

    const existingRoom = await prisma.room.findUnique({ where: { id: roomcode } });

    if (!existingRoom) {
      return NextResponse.json({ error: "❌ Room introuvable." }, { status: 404 });
    }

    const updatedRoom = await prisma.room.update({
      where: { id: roomcode },
      data: {
        ...parsedData.data,
        status: parsedData.data.status?.replace("IN-PROGRESS", "IN_PROGRESS").toUpperCase() as "WAITING" | "IN_PROGRESS" | "FINISHED",
      },
    });

    return NextResponse.json(updatedRoom, { status: 200 });
  } catch (error) {
    console.error("❌ Erreur lors de la mise à jour de la room :", error);
    return NextResponse.json({ error: "Erreur interne du serveur." }, { status: 500 });
  } finally {
    await prisma.$disconnect(); // ✅ Ferme la connexion après l'opération
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

    await prisma.room.delete({
      where: { id: roomcode },
    });

    return NextResponse.json({ message: "✅ Room supprimée avec succès." }, { status: 200 });
  } catch (error) {
    console.error("❌ Erreur lors de la suppression de la room :", error);

    if ((error as { code: string }).code === "P2003") {
      return NextResponse.json({ error: "❌ Impossible de supprimer la room car elle est liée à d'autres données." }, { status: 409 });
    }

    return NextResponse.json({ error: "Erreur interne du serveur." }, { status: 500 });
  } finally {
    await prisma.$disconnect(); // ✅ Fermeture propre de Prisma
  }
}
