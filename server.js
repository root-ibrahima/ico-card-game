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

      // Gestion de la connexion à une salle
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
          rooms[roomCode].push({ ws, username, avatar, roleConfirmed: false });
        } else {
          console.log(`⚠️ ${username} est déjà dans la salle ${roomCode}`);
        }

        console.log(`👥 ${username} a rejoint la salle ${roomCode}`);
        const playersList = rooms[roomCode].map(({ username, avatar }) => ({
          username,
          avatar,
        }));
        broadcast(roomCode, { type: "ROOM_UPDATE", players: playersList });
      }

      // Début de la partie
      if (type === "GAME_START" && roomCode) {
        console.log(`🎮 La partie dans la salle ${roomCode} commence !`);

        if (!rooms[roomCode] || rooms[roomCode].length === 0) {
          console.error(`❌ Impossible de démarrer la partie : la salle ${roomCode} est vide.`);
          return;
        }

        const playersList = rooms[roomCode].map(({ username, avatar }) => ({
          username,
          avatar,
        }));
        broadcast(roomCode, { type: "GAME_START", players: playersList });

        console.log(`🚀 Partie démarrée pour la salle ${roomCode} avec les joueurs :`, playersList);
        assignRoles(roomCode);
      }

      // Confirmation du rôle par le joueur
      if (type === "ROLE_CONFIRMED" && roomCode) {
        const room = rooms[roomCode];
        if (!room) {
          console.error(`❌ Salle introuvable : ${roomCode}`);
          return;
        }

        const player = room.find((p) => p.username === username);
        if (!player) {
          console.error(`❌ Joueur introuvable dans la salle ${roomCode} : ${username}`);
          return;
        }

        player.roleConfirmed = true;
        console.log(`✅ ${username} a confirmé son rôle dans la salle ${roomCode}`);

        // Vérifie si tous les joueurs ont confirmé leur rôle
        const allConfirmed = room.every((p) => p.roleConfirmed);
        if (allConfirmed) {
          console.log(`🎉 Tous les joueurs ont confirmé leurs rôles dans la salle ${roomCode}`);
          broadcast(roomCode, { type: "ALL_ROLES_CONFIRMED" });
        }
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

function assignRoles(roomCode) {
  if (!rooms[roomCode] || rooms[roomCode].length !== 2) {
    console.error(`❌ Impossible d'attribuer les rôles : salle ${roomCode} invalide ou incomplète.`);
    return;
  }

  const roles = ["Marin", "Pirate"].sort(() => Math.random() - 0.5);
  console.log(`🎲 Rôles générés pour la salle ${roomCode} : ${roles.join(", ")}`);
  
  rooms[roomCode].forEach((player, index) => {
    const role = roles[index];
    player.role = role;

    if (player.ws.readyState === WebSocket.OPEN) {
      const message = {
        type: "YOUR_ROLE",
        role,
      };
      console.log(`📤 Envoi du rôle à ${player.username} :`, message);
      player.ws.send(JSON.stringify(message));
    } else {
      console.warn(`⚠️ Connexion WebSocket fermée pour ${player.username}, rôle non envoyé.`);
    }
    console.log(`🎭 Rôle attribué : ${player.username} → ${role}`);
  });

  console.log(`🎭 Rôles attribués avec succès dans la salle ${roomCode}`);
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
      const playersList = updatedRoom.map(({ username, avatar }) => ({
        username,
        avatar,
      }));
      broadcast(roomCode, { type: "ROOM_UPDATE", players: playersList });
    }
  });
}
