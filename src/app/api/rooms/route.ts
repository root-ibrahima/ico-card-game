import { Server } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Interfaces pour étendre WebSocket et Server
interface ExtendedWebSocket extends WebSocket {
    roomCode?: string;
}

interface ExtendedServer extends Server {
    wss?: WebSocketServer;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "GET") {
        res.status(405).json({ error: "Method not allowed" });
        return;
    }

    const server = (res.socket as typeof res.socket & { server: ExtendedServer }).server;

    if (!server.wss) {
        server.wss = new WebSocketServer({ server });

        server.wss.on("connection", async (ws: ExtendedWebSocket) => {
            console.log("Client connecté via WebSocket");

            ws.on("message", async (message: string) => {
                try {
                    const data = JSON.parse(message);

                    if (data.type === "CREATE_ROOM") {
                        // Créer une nouvelle room dans Prisma
                        const newRoom = await prisma.room.create({
                            data: {
                                host: data.host,
                                status: "WAITING",
                            },
                        });

                        ws.roomCode = newRoom.id;
                        ws.send(JSON.stringify({ type: "ROOM_CREATED", payload: newRoom }));
                        console.log(`Room créée avec ID : ${newRoom.id}`);
                    }

                    if (data.type === "JOIN_ROOM") {
                        const room = await prisma.room.findUnique({
                            where: { id: data.roomCode },
                        });

                        if (!room) {
                            ws.send(JSON.stringify({ type: "ERROR", message: "Room not found" }));
                            return;
                        }

                        ws.roomCode = data.roomCode;

                        // Ajouter un joueur à la room
                        const newPlayer = await prisma.player.create({
                            data: {
                                name: data.username,
                                role: data.role || "participant",
                                roomId: data.roomCode,
                            },
                        });

                        ws.send(
                            JSON.stringify({
                                type: "JOINED_ROOM",
                                payload: { room, player: newPlayer },
                            })
                        );

                        console.log(`Joueur ajouté : ${data.username} à la room ${data.roomCode}`);
                    }

                    if (data.type === "SEND_MESSAGE") {
                        // Diffuser un message à tous les clients dans la même room
                        server.wss?.clients.forEach((client: ExtendedWebSocket) => {
                            if (client.roomCode === data.roomCode && client !== ws) {
                                client.send(
                                    JSON.stringify({
                                        type: "NEW_MESSAGE",
                                        payload: data.payload,
                                    })
                                );
                            }
                        });
                    }
                } catch (error) {
                    console.error("Erreur lors du traitement du message :", error);
                    ws.send(
                        JSON.stringify({
                            type: "ERROR",
                            message: "An error occurred while processing your request",
                        })
                    );
                }
            });

            ws.on("close", () => {
                console.log("Client déconnecté");
            });
        });

        console.log("WebSocket Server initialisé");
    }

    res.end();
};

export default handler;
