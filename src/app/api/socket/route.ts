import { Server } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { NextApiRequest, NextApiResponse } from "next";

// Interfaces pour étendre les WebSocket et le serveur HTTP
interface ExtendedWebSocket extends WebSocket {
    roomCode?: string;
}

interface ExtendedServer extends Server {
    wss?: WebSocketServer;
}

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "GET") {
        res.status(405).json({ error: "Method not allowed" }); // Refuser les autres méthodes HTTP
        return;
    }

    if (!res.socket) {
        res.status(500).json({ error: "Socket not available" });
        return;
    }

    const server = (res.socket as typeof res.socket & { server: ExtendedServer }).server;

    if (!server.wss) {
        // Initialiser le WebSocketServer s'il n'existe pas déjà
        server.wss = new WebSocketServer({ server });

        server.wss.on("connection", (ws: ExtendedWebSocket) => {
            console.log("Client connecté via WebSocket");

            ws.on("message", (message: string) => {
                try {
                    const data = JSON.parse(message);
                    console.log("Message reçu :", data);

                    if (data.type === "JOIN_ROOM") {
                        ws.roomCode = data.roomCode;
                        console.log(`Client rejoint la salle : ${data.roomCode}`);
                    }

                    if (data.type === "SEND_MESSAGE") {
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
                    console.error("Erreur lors de l'analyse du message :", error);
                    ws.send(
                        JSON.stringify({
                            type: "ERROR",
                            message: "Invalid JSON format",
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
