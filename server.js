const { WebSocketServer } = require("ws");

const port = 4000;
const wss = new WebSocketServer({ port });

console.log(`WebSocketServer démarré sur ws://localhost:${port}`);

wss.on("connection", (ws) => {
    console.log("Client connecté");

    ws.on("message", (message) => {
        console.log("Message reçu :", message.toString());
        ws.send(`Message reçu : ${message}`);
    });

    ws.on("close", () => {
        console.log("Client déconnecté");
    });
});
