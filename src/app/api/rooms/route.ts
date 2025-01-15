import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Gestion de la méthode POST pour créer un hôte.
 */
export async function POST(req: Request) {
    try {
        const body = await req.json();

        // Validation des données
        if (!body || typeof body.name !== "string" || !body.name.trim()) {
            console.error("Le body de la requête est invalide :", body);
            return NextResponse.json(
                { error: "Le champ 'name' est requis et doit être une chaîne non vide." },
                { status: 400 }
            );
        }

        const { name, roomId } = body;

        // Si roomId n'est pas fourni, utilisez une valeur par défaut ou générez-en une
        const roomIdentifier = roomId || "defaultRoomId";

        // Créer un nouvel hôte et associer une room
        const newHost = await prisma.player.create({
            data: {
                name,
                role: "host", // Par défaut, l'utilisateur est un hôte
                room: {
                    connectOrCreate: {
                        where: { id: roomIdentifier },
                        create: { id: roomIdentifier, host: name, status: "WAITING" },
                    },
                },
            },
        });

        return NextResponse.json(newHost, { status: 201 });
    } catch (error) {
        console.error("Erreur lors de la création de l'hôte :", error);
        return NextResponse.json(
            {
                error: "Erreur interne du serveur.",
                details: error instanceof Error ? error.message : "Erreur inconnue",
            },
            { status: 500 }
        );
    }
}

/**
 * Gestion de la méthode GET pour lister les hôtes.
 */
export async function GET() {
    try {
        // Récupérer tous les hôtes et leurs rooms associées
        const hosts = await prisma.player.findMany({
            include: {
                room: true, // Inclure les détails de la room associée
            },
        });

        return NextResponse.json(hosts, { status: 200 });
    } catch (error) {
        console.error("Erreur lors de la récupération des hôtes :", error);
        return NextResponse.json(
            { error: "Erreur interne du serveur." },
            { status: 500 }
        );
    }
}
