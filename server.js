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

        rooms[roomCode].push({ ws, username, avatar, role: null, isCaptain: false });

        console.log(`👥 ${username} a rejoint la salle ${roomCode}`);

        const playersList = rooms[roomCode].map((p) => ({
          username: p.username,
          avatar: p.avatar,
        }));

        // Envoyer la mise à jour à tous les joueurs sans leur rôle
        rooms[roomCode].forEach((client) => {
          if (client.ws.readyState === ws.OPEN) {
            client.ws.send(JSON.stringify({ type: "ROOM_UPDATE", players: playersList }));
          }
        });

        // Vérifier si nous avons 7 joueurs, et assigner les rôles
        if (rooms[roomCode].length === 7) {
          assignRoles(roomCode);
        }
      }
    } catch (error) {
      console.error("❌ Erreur WebSocket :", error);
    }
  });

  ws.on("close", () => {
    console.log("🔴 Client déconnecté");
  });
});

/**
 * Fonction pour assigner les rôles une fois que 7 joueurs sont dans la salle.
 */
function assignRoles(roomCode) {
  if (!rooms[roomCode] || rooms[roomCode].length !== 7) return;

  const roles = ["Marin", "Marin", "Marin", "Pirate", "Pirate", "Pirate", "Sirène"];
  const shuffledRoles = roles.sort(() => Math.random() - 0.5);

  // Assigner les rôles aléatoirement
  rooms[roomCode].forEach((player, index) => {
    player.role = shuffledRoles[index];
  });

  // Sélectionner aléatoirement un Capitaine parmi les 7 joueurs (il garde son rôle)
  const randomCaptainIndex = Math.floor(Math.random() * 7);
  rooms[roomCode][randomCaptainIndex].isCaptain = true; // ✅ Maintenant, il garde son rôle principal

  console.log(`🎭 Rôles assignés dans la salle ${roomCode}:`);
  rooms[roomCode].forEach((player) => {
    console.log(`${player.username} -> ${player.role}${player.isCaptain ? " (Capitaine)" : ""}`);
  });

  // Envoyer uniquement la liste des joueurs aux autres joueurs (sans rôle)
  rooms[roomCode].forEach((client) => {
    if (client.ws.readyState === client.ws.OPEN) {
      client.ws.send(
        JSON.stringify({
          type: "GAME_START",
          players: rooms[roomCode].map(({ username, avatar }) => ({
            username,
            avatar,
          })),
        })
      );
    }
  });

  // Envoyer à chaque joueur son propre rôle
  rooms[roomCode].forEach((player) => {
    if (player.ws.readyState === player.ws.OPEN) {
      player.ws.send(
        JSON.stringify({
          type: "YOUR_ROLE",
          role: player.role,
          isCaptain: player.isCaptain,
        })
      );
    }
  });
}
