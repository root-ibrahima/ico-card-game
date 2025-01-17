const { WebSocketServer } = require("ws");

const port = 5000;
const wss = new WebSocketServer({ port });
const rooms = {};

console.log(`🚀 WebSocketServer démarré sur ws://localhost:${port}`);

wss.on("connection", (ws) => {
  console.log("🟢 Client connecté");

  ws.on("message", (message) => {
    try {
      const data = JSON.parse(message);

      if (data.type === "JOIN_ROOM") {
        const roomCode = data.room;
        const username = data.username;
        const avatar = data.avatar;

        if (!rooms[roomCode]) {
          rooms[roomCode] = [];
        }

        rooms[roomCode].push({ ws, username, avatar });

        console.log(`👥 ${username} a rejoint la salle ${roomCode}`);

        const playersList = rooms[roomCode].map((p) => ({
          username: p.username,
          avatar: p.avatar,
        }));

        rooms[roomCode].forEach((client) => {
          if (client.ws.readyState === ws.OPEN) {
            client.ws.send(JSON.stringify({ type: "ROOM_UPDATE", players: playersList }));
          }
        });
      }
    } catch (error) {
      console.error("❌ Erreur WebSocket :", error);
    }
  });

  ws.on("close", () => {
    console.log("🔴 Client déconnecté");
  });
});
