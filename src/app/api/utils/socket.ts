import { Server } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { NextApiRequest, NextApiResponse } from "next";

interface ExtendedWebSocket extends WebSocket {
    roomCode?: string;
}

interface ExtendedServer extends Server {
    wss?: WebSocketServer;
}

interface Message {
    type: "JOIN_ROOM" | "SEND_MESSAGE" | "ERROR";
    roomCode?: string;
    payload?: string | object;
}

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "GET") {
        res.status(405).json({ error: "Method not allowed" });
        return;
    }

    if (!res.socket) {
        res.status(500).json({ error: "Socket not available" });
        return;
    }

    const server = (res.socket as typeof res.socket & { server: ExtendedServer }).server;

    if (!server.wss) {
        server.wss = new WebSocketServer({ server });

        server.wss.on("connection", (ws: ExtendedWebSocket) => {
            console.log("Client connecté via WebSocket");
            console.log(`Connexions actives : ${server.wss?.clients.size}`);

            const interval = setInterval(() => {
                if (ws.readyState === WebSocket.OPEN) {
                    ws.ping();
                } else {
                    clearInterval(interval);
                }
            }, 30000);

            ws.on("message", (message: string) => {
                try {
                    const data: Message = JSON.parse(message);
                    console.log("Message reçu :", data);

                    if (data.type === "JOIN_ROOM" && data.roomCode) {
                        ws.roomCode = data.roomCode;
                        console.log(`Client rejoint la salle : ${data.roomCode}`);
                    } else if (data.type === "SEND_MESSAGE" && data.roomCode) {
                        server.wss?.clients.forEach((client: ExtendedWebSocket) => {
                            if (client.roomCode === data.roomCode && client !== ws) {
                                client.send(JSON.stringify({ type: "NEW_MESSAGE", payload: data.payload }));
                            }
                        });
                    } else {
                        ws.send(JSON.stringify({ type: "ERROR", message: "Invalid message format" }));
                    }
                } catch (error) {
                    console.error("Erreur lors de l'analyse du message :", error);
                    ws.send(JSON.stringify({ type: "ERROR", message: "Invalid JSON format" }));
                }
            });

            ws.on("close", () => {
                console.log("Client déconnecté");
                console.log(`Connexions actives : ${server.wss?.clients.size}`);
                clearInterval(interval);
            });
        });

        console.log("WebSocket Server initialisé");
    }

    res.end();
};

export default handler;
