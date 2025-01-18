import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

const prisma = new PrismaClient();

/**
 * Gère la création d'une nouvelle salle ou l'ajout d'un joueur existant à une salle.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, roomCode, createNewRoom } = body;

    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json({ error: "Le champ 'name' est requis." }, { status: 400 });
    }

    let roomId = roomCode;
    if (createNewRoom || !roomCode) {
      roomId = generateRoomCode();
    }

    // Vérifier si la salle existe
    let room = await prisma.room.findUnique({ where: { id: roomId } });

    // Créer une nouvelle salle si elle n'existe pas
    if (!room) {
      room = await prisma.room.create({
        data: {
          id: roomId,
          host: name,
          status: "WAITING",
        },
      });
    }

    // Vérifier si le joueur est déjà présent
    let player = await prisma.player.findFirst({
      where: { name, roomId: room.id },
    });

    if (!player) {
      player = await prisma.player.create({
        data: {
          name,
          role: "player",
          room: { connect: { id: room.id } },
        },
      });
    }

    return NextResponse.json({ room, player }, { status: 201 });
  } catch (error) {
    console.error("❌ Erreur lors de la création de la salle :", error);
    return NextResponse.json({ error: "Erreur interne du serveur." }, { status: 500 });
  }
}

/**
 * Récupère toutes les salles existantes.
 */
export async function GET() {
  try {
    const rooms = await prisma.room.findMany({
      include: { players: true },
    });

    return NextResponse.json(rooms, { status: 200 });
  } catch (error) {
    console.error("❌ Erreur lors de la récupération des salles :", error);
    return NextResponse.json({ error: "Erreur interne du serveur." }, { status: 500 });
  }
}

/**
 * Génère un code de salle aléatoire.
 */
function generateRoomCode(): string {
  return crypto.randomBytes(3).toString("hex").toUpperCase();
}
