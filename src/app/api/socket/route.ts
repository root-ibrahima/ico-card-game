import { WebSocketServer } from "ws";

const port = 4000;
const wss = new WebSocketServer({ port });

console.log(`WebSocketServer démarré sur ws://localhost:${port}`);

wss.on("connection", (ws, req) => {
    console.log("Client connecté depuis :", req.socket.remoteAddress);

    ws.on("message", (message) => {
        console.log("Message reçu :", message.toString());
    });

    ws.on("close", () => {
        console.log("Client déconnecté");
    });
});
