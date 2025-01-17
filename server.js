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
          // ✅ FORCER LA CRÉATION D'UNE NOUVELLE ROOM SI DEMANDÉ
          roomCode = generateRoomCode();
          console.log(`🆕 Nouvelle salle créée : ${roomCode}`);
        } else {
          // ✅ SINON, UTILISER UNE ROOM EXISTANTE OU EN CRÉER UNE NOUVELLE SI AUCUNE N'EXISTE
          roomCode = roomCode || findExistingRoom() || generateRoomCode();
          console.log(`🔄 Salle attribuée à ${username} : ${roomCode}`);
        }

        if (!rooms[roomCode]) {
          rooms[roomCode] = [];
        }

        // Vérifier si le joueur est déjà présent dans la salle
        const playerIndex = rooms[roomCode].findIndex((p) => p.username === username);

        if (playerIndex === -1) {
          // Ajouter le joueur SEULEMENT s'il n'est pas déjà dans la salle
          rooms[roomCode].push({ ws, username, avatar, role: null, isCaptain: false });
        } else {
          console.log(`⚠️ ${username} est déjà dans la salle ${roomCode}, pas de duplication.`);
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

/**
 * 🔥 Génère un code de room aléatoire (ex: "XQ1P6R").
 */
function generateRoomCode() {
  return crypto.randomBytes(3).toString("hex").toUpperCase();
}

/**
 * 🔎 Recherche une salle existante qui n'a pas encore 7 joueurs.
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
 * 🎭 Assigne les rôles une fois que 7 joueurs sont dans la salle.
 */
function assignRoles(roomCode) {
  if (!rooms[roomCode] || rooms[roomCode].length !== 7) return;

  const roles = ["Marin", "Marin", "Marin", "Pirate", "Pirate", "Pirate", "Sirène"];
  const shuffledRoles = roles.sort(() => Math.random() - 0.5);

  rooms[roomCode].forEach((player, index) => {
    player.role = shuffledRoles[index];
  });

  // Sélectionner un capitaine au hasard
  const randomCaptainIndex = Math.floor(Math.random() * 7);
  rooms[roomCode][randomCaptainIndex].isCaptain = true;

  console.log(`🎭 Rôles assignés dans la salle ${roomCode}:`);
  rooms[roomCode].forEach((player) => {
    console.log(`${player.username} -> ${player.role}${player.isCaptain ? " (Capitaine)" : ""}`);
  });

  // Envoyer uniquement la liste des joueurs aux autres joueurs (sans rôle)
  broadcast(roomCode, {
    type: "GAME_START",
    players: rooms[roomCode].map(({ username, avatar }) => ({ username, avatar })),
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

/**
 * 📡 Envoie un message à tous les joueurs d'une salle.
 */
function broadcast(roomCode, message) {
  if (!rooms[roomCode]) return;
  rooms[roomCode].forEach(({ ws }) => {
    if (ws.readyState === ws.OPEN) {
      ws.send(JSON.stringify(message));
    }
  });
}

/**
 * 🧹 Nettoie les rooms des joueurs déconnectés.
 */
function cleanRooms() {
  Object.keys(rooms).forEach((roomCode) => {
    rooms[roomCode] = rooms[roomCode].filter((player) => player.ws.readyState === WebSocket.OPEN);
    if (rooms[roomCode].length === 0) {
      delete rooms[roomCode];
    }
  });
}
