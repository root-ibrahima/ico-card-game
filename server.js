const { WebSocketServer } = require("ws");
const crypto = require("crypto");

const port = 5000;
const wss = new WebSocketServer({ port });
const rooms = {};

console.log(`🚀 WebSocketServer démarré sur ws://localhost:${port}`);

wss.on("connection", (ws) => {
  console.log("🟢 Client connecté");

  ws.on("message", (message) => {
    try {
      const data = JSON.parse(message);
      console.log("📩 Message reçu du client :", data);

      let { type, roomCode, username, avatar, createNewRoom } = data;

      if (!username) {
        console.error("❌ Erreur : username est undefined !");
        return;
      }

      if (!avatar) {
        console.warn("⚠️ Aucun avatar fourni, génération automatique...");
        avatar = `https://api.dicebear.com/7.x/adventurer/svg?seed=${username}`;
      }

      if (type === "JOIN_ROOM") {
        if (createNewRoom) {
          roomCode = generateRoomCode();
          console.log(`🆕 Nouvelle salle créée : ${roomCode}`);
        } else {
          roomCode = roomCode || findExistingRoom() || generateRoomCode();
          console.log(`🔄 Salle attribuée à ${username} : ${roomCode}`);
        }

        if (!rooms[roomCode]) {
          rooms[roomCode] = [];
        }

        // Vérifier si le joueur est déjà présent dans la salle
        const playerIndex = rooms[roomCode].findIndex((p) => p.username === username);

        if (playerIndex !== -1) {
          rooms[roomCode][playerIndex].ws = ws;
          console.log(`🔄 Connexion mise à jour pour ${username} dans ${roomCode}`);
        } else {
          const playerId = crypto.randomBytes(3).toString("hex").toUpperCase();
          rooms[roomCode].push({ ws, playerId, username, avatar, role: null, isCaptain: false });
        }

        console.log(`👥 ${username} a rejoint la salle ${roomCode}`);

        // Liste des joueurs pour l'affichage côté client
        const playersList = rooms[roomCode].map((p) => ({
          username: p.username,
          avatar: p.avatar,
        }));

        // Envoyer la mise à jour de la salle
        broadcast(roomCode, { type: "ROOM_UPDATE", players: playersList });

        // Assigner les rôles si la salle atteint 7 joueurs
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
    cleanRooms();
  });
});

function generateRoomCode() {
  return crypto.randomBytes(3).toString("hex").toUpperCase();
}

function findExistingRoom() {
  for (const roomCode in rooms) {
    if (rooms[roomCode].length < 7) {
      return roomCode;
    }
  }
  return null;
}

function assignRoles(roomCode) {
  if (!rooms[roomCode] || rooms[roomCode].length !== 7) return;

  const roles = ["Marin", "Marin", "Marin", "Pirate", "Pirate", "Pirate", "Sirène"];
  const shuffledRoles = roles.sort(() => Math.random() - 0.5);

  rooms[roomCode].forEach((player, index) => {
    player.role = shuffledRoles[index];
  });

  const randomCaptainIndex = Math.floor(Math.random() * 7);
  rooms[roomCode][randomCaptainIndex].isCaptain = true;

  console.log(`🎭 Rôles assignés dans la salle ${roomCode}:`);
  rooms[roomCode].forEach((player) => {
    console.log(`   - ${player.username} → ${player.role} ${player.isCaptain ? "(⭐ Capitaine)" : ""}`);
  });

  broadcast(roomCode, {
    type: "GAME_START",
    players: rooms[roomCode].map(({ username, avatar }) => ({ username, avatar })),
  });

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

function broadcast(roomCode, message) {
  if (!rooms[roomCode]) return;
  rooms[roomCode].forEach(({ ws }) => {
    if (ws.readyState === ws.OPEN) {
      ws.send(JSON.stringify(message));
    }
  });
}

function cleanRooms() {
  Object.keys(rooms).forEach((roomCode) => {
    rooms[roomCode] = rooms[roomCode].filter((player) => player.ws.readyState === player.ws.OPEN);
    if (rooms[roomCode].length === 0) {
      delete rooms[roomCode];
    }
  });
}
