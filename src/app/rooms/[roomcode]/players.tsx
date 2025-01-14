import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { roomCode } = req.query;
    const { name, role } = req.body;

    const player = await prisma.player.create({
      data: {
        name,
        role,
        room: { connect: { id: roomCode as string } },
      },
    });

    res.status(201).json(player);
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
