import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "POST") {
      // Créer une nouvelle salle
      const { host } = req.body;

      if (!host) {
        return res.status(400).json({ error: "Le champ 'host' est requis." });
      }

      const newRoom = await prisma.room.create({
        data: {
          host,
          status: "WAITING",
        },
      });
      return res.status(201).json(newRoom);
    }

    if (req.method === "GET") {
      // Récupérer toutes les salles
      const rooms = await prisma.room.findMany();
      return res.status(200).json(rooms);
    }

    // Si la méthode n'est pas prise en charge
    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).json({ error: `Méthode ${req.method} non autorisée.` });
  } catch (error) {
    console.error("Erreur API Rooms:", error);
    return res.status(500).json({ error: "Erreur interne du serveur." });
  }
}
