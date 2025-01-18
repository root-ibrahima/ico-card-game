const { WebSocketServer, WebSocket } = require("ws");
const crypto = require("crypto");

const port = 5000;
const wss = new WebSocketServer({ port });
const rooms = {}; // Stockage des rooms et des joueurs

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
        if (roomCode) {
          console.log(`🔗 Code de salle reçu de l'URL : ${roomCode}`);
          if (!rooms[roomCode]) {
            console.log(`📌 Création de la salle ${roomCode}...`);
            rooms[roomCode] = [];
          }
        } else if (createNewRoom) {
          roomCode = generateRoomCode();
          console.log(`🆕 Nouvelle salle forcée : ${roomCode}`);
          rooms[roomCode] = [];
        } else {
          roomCode = findExistingRoom() || generateRoomCode();
          console.log(`🔄 Salle trouvée/attribuée à ${username} : ${roomCode}`);
          if (!rooms[roomCode]) {
            rooms[roomCode] = [];
          }
        }

        if (!rooms[roomCode]) {
          console.error(`❌ Erreur : La salle ${roomCode} n'a pas pu être créée.`);
          return;
        }

        const playerIndex = rooms[roomCode].findIndex((p) => p.username === username);

        if (playerIndex === -1) {
          rooms[roomCode].push({ ws, username, avatar });
        } else {
          console.log(`⚠️ ${username} est déjà dans la salle ${roomCode}`);
        }

        console.log(`👥 ${username} a rejoint la salle ${roomCode}`);
        const playersList = rooms[roomCode].map(({ username, avatar }) => ({ username, avatar }));
        broadcast(roomCode, { type: "ROOM_UPDATE", players: playersList });
      }
    } catch (error) {
      console.error("❌ Erreur WebSocket :", error);
    }
  });

  ws.on("close", () => {
    console.log("🔴 Client déconnecté");
    handlePlayerDisconnection(ws);
  });
});

/**
 * 🔥 Génère un code de room aléatoire.
 */
function generateRoomCode() {
  return crypto.randomBytes(3).toString("hex").toUpperCase();
}

/**
 * 🔎 Recherche une salle existante.
 */
function findExistingRoom() {
  for (const roomCode in rooms) {
    if (rooms[roomCode].length < 7) {
      return roomCode;
    }
  }
  return null;
}

/**
 * 📡 Envoie un message à tous les joueurs d'une salle.
 */
function broadcast(roomCode, message) {
  if (!rooms[roomCode]) return;
  rooms[roomCode].forEach(({ ws }) => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(message));
    }
  });
}

/**
 * 🧹 Gère la déconnexion d'un joueur et nettoie les rooms.
 */
function handlePlayerDisconnection(ws) {
  Object.keys(rooms).forEach((roomCode) => {
    const room = rooms[roomCode];

    // Trouve et supprime le joueur correspondant au WebSocket déconnecté
    const updatedRoom = room.filter((player) => player.ws !== ws);

    if (updatedRoom.length === 0) {
      console.log(`🧹 Suppression de la salle vide : ${roomCode}`);
      delete rooms[roomCode];
    } else {
      rooms[roomCode] = updatedRoom;
      console.log(`🔄 Mise à jour des joueurs dans la salle ${roomCode}`);

      // Diffuse la mise à jour de la salle aux joueurs restants
      const playersList = updatedRoom.map(({ username, avatar }) => ({ username, avatar }));
      broadcast(roomCode, { type: "ROOM_UPDATE", players: playersList });
    }
  });
}
