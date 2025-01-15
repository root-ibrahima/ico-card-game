import { WebSocketServer, WebSocket } from "ws";

let wss: WebSocketServer | null = null;

export const config = {
    runtime: "nodejs", // Assurez-vous que le runtime est Node.js
};

export async function GET() {
    // Initialiser le WebSocketServer si nécessaire
    if (!wss) {
        console.log("Initialisation du WebSocketServer...");
        wss = new WebSocketServer({ noServer: true });

        wss.on("connection", (ws: WebSocket) => {
            console.log("Client connecté via WebSocket");

            ws.on("message", (message) => {
                console.log("Message reçu :", message.toString());
                ws.send(`Message reçu : ${message}`);
            });

            ws.on("close", () => {
                console.log("Client déconnecté");
            });
        });
    }

    // Répondre à la requête GET avec un statut 200
    return new Response("WebSocket endpoint is ready", { status: 200 });
}
