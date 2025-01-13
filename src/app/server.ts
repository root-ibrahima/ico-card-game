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

      ws.on("message", (message: string) => {
        try {
          const data: Message = JSON.parse(message);
          console.log("Message reçu :", data);

          if (data.type === "JOIN_ROOM" && data.roomCode) {
            ws.roomCode = data.roomCode;
            console.log(`Client rejoint la salle : ${data.roomCode}`);
          }
        } catch (error) {
          console.error("Erreur lors de l'analyse du message :", error);
        }
      });
    });

    console.log("WebSocket Server initialisé");
  }

  res.end();
};

export default handler;
