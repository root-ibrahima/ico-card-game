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

      const { type, roomCode, username, avatar, currentUrl, createNewRoom } = data;

      if (type === "UPDATE_URL") {
        // Met à jour l'URL du client
        ws.urlPath = currentUrl;
        console.log(`🔄 URL mise à jour : ${ws.urlPath}`);
        return;
      }

      if (!username) {
        console.error("❌ Erreur : username est undefined !");
        return;
      }

      let finalRoomCode = roomCode;

      if (type === "JOIN_ROOM") {
        if (!finalRoomCode) {
          finalRoomCode = createNewRoom ? generateRoomCode() : findExistingRoom() || generateRoomCode();
        }

        if (!rooms[finalRoomCode]) {
          console.log(`📌 Création de la salle ${finalRoomCode}`);
          rooms[finalRoomCode] = [];
        }

        const playerIndex = rooms[finalRoomCode].findIndex((p) => p.username === username);

        if (playerIndex === -1) {
          rooms[finalRoomCode].push({ ws, username, avatar });
          console.log(`👥 ${username} a rejoint la salle ${finalRoomCode}`);
        } else {
          console.log(`⚠️ ${username} est déjà dans la salle ${finalRoomCode}`);
          rooms[finalRoomCode][playerIndex].ws = ws; // Mise à jour WebSocket
        }

        const playersList = rooms[finalRoomCode].map(({ username, avatar }) => ({ username, avatar }));
        broadcast(finalRoomCode, { type: "ROOM_UPDATE", players: playersList });

        if (rooms[finalRoomCode].length === 2) {
          assignRoles(finalRoomCode);
        }
      }
    } catch (error) {
      console.error("❌ Erreur WebSocket :", error);
    }
  });

  ws.on("close", () => {
    const activeRoom = Object.keys(rooms).find((roomCode) =>
      rooms[roomCode].some((player) => player.ws === ws)
    );
  
    if (activeRoom) {
      console.log(`🔴 Client déconnecté temporairement dans la salle ${activeRoom}`);
  
      // Ajoutez un délai pour permettre la reconnexion après redirection
      setTimeout(() => {
        const stillDisconnected = !rooms[activeRoom].some((player) => player.ws === ws);
        if (stillDisconnected) {
          console.log(`🧹 Suppression définitive du client dans la salle ${activeRoom}`);
          handlePlayerDisconnection(ws);
        } else {
          console.log(`🔄 Client reconnecté dans la salle ${activeRoom}`);
        }
      }, 10000); // Donne 10 secondes pour se reconnecter
    } else {
      console.log("🔴 Client déconnecté hors salle de jeu.");
    }
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
    if (rooms[roomCode].length < 2) {
      return roomCode;
    }
  }
  return null;
}

/**
 * 🎭 Assigne les rôles à deux joueurs (Marin et Pirate).
 */
function assignRoles(roomCode) {
  if (!rooms[roomCode] || rooms[roomCode].length !== 2) {
    console.error(`❌ Impossible d'attribuer les rôles : salle ${roomCode} invalide ou incomplète.`);
    return;
  }

  const roles = ["Marin", "Pirate"].sort(() => Math.random() - 0.5);

  console.log(`🎲 Rôles générés pour la salle ${roomCode} : ${roles.join(", ")}`);

  rooms[roomCode].forEach((player, index) => {
    player.role = roles[index];
    if (player.ws.readyState === WebSocket.OPEN) {
      const query = `?role=${roles[index].toLowerCase()}`;
      const message = {
        type: "YOUR_ROLE",
        role: roles[index],
        redirect: `/game/rooms/${roomCode}/distribution-roles${query}`,
      };

      console.log(`📤 Envoi du rôle à ${player.username} :`, message);

      player.ws.send(JSON.stringify(message));
    } else {
      console.warn(`⚠️ Connexion WebSocket fermée pour ${player.username}, rôle non envoyé.`);
    }
    console.log(`🎭 Rôle attribué : ${player.username} → ${roles[index]}`);
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

    const updatedRoom = room.filter((player) => player.ws !== ws);

    if (updatedRoom.length === 0) {
      console.log(`🧹 Suppression de la salle vide : ${roomCode}`);
      delete rooms[roomCode];
    } else {
      rooms[roomCode] = updatedRoom;
      console.log(`🔄 Mise à jour de la salle ${roomCode}`);

      const playersList = updatedRoom.map(({ username, avatar }) => ({ username, avatar }));
      broadcast(roomCode, { type: "ROOM_UPDATE", players: playersList });
    }
  });
}
