const { WebSocketServer } = require("ws");

const port = 5000;
const wss = new WebSocketServer({ port });
const rooms = {}; // Stocke les connexions par room

console.log(`🚀 WebSocketServer démarré sur ws://localhost:${port}`);

wss.on("connection", (ws) => {
  console.log("🟢 Client connecté");

  ws.on("message", (message) => {
    try {
      const data = JSON.parse(message);
      switch (data.type) {
        case "JOIN_ROOM":
          const roomCode = data.room;
          const username = data.username || `User-${Math.floor(Math.random() * 1000)}`;
          const avatar = data.avatar || `https://api.dicebear.com/7.x/adventurer/svg?seed=${username}`;

          if (!rooms[roomCode]) {
            rooms[roomCode] = [];
            console.log(`🆕 Nouvelle salle créée : ${roomCode} par ${username}`);
          } else {
            console.log(`👥 ${username} rejoint la salle existante : ${roomCode}`);
          }

          rooms[roomCode].push({ ws, username, avatar });

          // Informer tous les membres de la salle de l'arrivée du joueur
          rooms[roomCode].forEach((client) => {
            if (client.ws.readyState === ws.OPEN) {
              client.ws.send(
                JSON.stringify({
                  type: "PLAYER_JOINED",
                  message: `${username} a rejoint la salle.`,
                  username,
                  room: roomCode,
                  avatar,
                  players: rooms[roomCode].map(p => ({ username: p.username, avatar: p.avatar }))
                })
              );
            }
          });

          break;

        case "SEND_ROOM_MESSAGE":
          const { room, message } = data;
          console.log(`📢 Message dans ${room} : ${message.sender} -> ${message.message}`);

          if (rooms[room]) {
            rooms[room].forEach((client) => {
              if (client.ws.readyState === ws.OPEN) {
                client.ws.send(
                  JSON.stringify({
                    type: "NEW_MESSAGE",
                    sender: message.sender,
                    message: message.message,
                  })
                );
              }
            });
          }
          break;

        default:
          console.log("❓ Type de message inconnu reçu :", data);
          ws.send(
            JSON.stringify({
              type: "ERROR",
              message: "Type de message inconnu.",
            })
          );
      }
    } catch (error) {
      console.error("❌ Erreur lors de l'analyse du message :", message, error);
      ws.send(
        JSON.stringify({
          type: "ERROR",
          message: "Le message doit être un JSON valide.",
        })
      );
    }
  });

  ws.on("close", () => {
    console.log("🔴 Client déconnecté");
    Object.keys(rooms).forEach((roomCode) => {
      rooms[roomCode] = rooms[roomCode].filter((client) => client.ws !== ws);
      if (rooms[roomCode].length === 0) {
        delete rooms[roomCode];
        console.log(`🗑️ Salle supprimée : ${roomCode} (vide)`);
      }
    });
  });
});
