import { WebSocketServer, WebSocket } from "ws";

const port = 5000;
const wss = new WebSocketServer({ port });
const connections = new Map<WebSocket, { path?: string }>(); // Stocke les connexions actives

console.log(`WebSocketServer démarré sur ws://localhost:${port}`);

// Étendre le type WebSocket pour inclure une propriété personnalisée
interface CustomWebSocket extends WebSocket {
  urlPath?: string;
}

wss.on("connection", (ws: CustomWebSocket, req) => {
  const clientAddress = req.socket.remoteAddress;
  console.log("🟢 Client connecté depuis :", clientAddress);

  // Ajouter l'URL dans le WebSocket pour garder une trace du chemin
  ws.urlPath = req.url; // Assure-toi que le client inclut l'URL dans sa requête WebSocket
  connections.set(ws, { path: req.url });

  ws.on("message", (message) => {
    console.log("📩 Message reçu :", message.toString());
  });

  ws.on("close", () => {
    const clientPath = connections.get(ws)?.path;

    if (clientPath && clientPath.startsWith("/game/rooms/")) {
      console.log("🎮 Connexion WebSocket maintenue car le client est dans /game/rooms");
      return;
    }

    console.log("🔴 Client déconnecté :", clientAddress);
    connections.delete(ws);
  });
});
