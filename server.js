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
  
      let { type, roomCode, username, avatar, createNewRoom, selectedCrew } = data;
  
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
          assignCaptain(roomCode); // Nouveau : Passe au choix du capitaine
        }
      }
  
      // Gestion du capitaine sélectionné
      if (type === "CAPTAIN_ACTION_CONFIRMED" && roomCode) {
        console.log(`✅ Le capitaine a confirmé son action pour la salle ${roomCode}`);
  
        const room = rooms[roomCode];
        if (!room) {
          console.error(`❌ Salle introuvable : ${roomCode}`);
          return;
        }
  
        const captain = room.find((p) => p.username === username);
        if (!captain) {
          console.error(`❌ Capitaine introuvable : ${username}`);
          return;
        }
  
        broadcast(roomCode, { type: "CREW_SELECTION_PHASE", captain: captain.username });
        console.log(`📤 Phase de sélection d'équipage commencée pour la salle ${roomCode}`);
      }
  
      // Gestion de la sélection de l'équipage
      console.log("📩 Roomcode :", roomCode);
      console.log("📩 Type :", type);
  
      if (type === "CREW_SELECTED" && roomCode) {
        console.log(`📤 Équipage sélectionné pour la salle ${roomCode}:`, selectedCrew);
  
        if (!rooms[roomCode]) {
          console.error(`❌ Salle introuvable : ${roomCode}`);
          return;
        }
  
        // Diffuser un ROOM_UPDATE si nécessaire pour synchroniser la liste des joueurs
        const playersList = rooms[roomCode].map(({ username, avatar }) => ({
          username,
          avatar,
        }));
        broadcast(roomCode, { type: "ROOM_UPDATE", players: playersList });
  
        // Diffuser CREW_SELECTED
        broadcast(roomCode, { type: "CREW_SELECTED", selectedCrew });
      }
  
      // Gestion du vote d'équipage
      if (type === "VOTE_CREW" && roomCode) {
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
  
        // Ajout du vote de l'utilisateur
        player.vote = data.vote; // "yes" ou "no"
        console.log(`🗳️ Vote reçu : ${username} a voté "${data.vote}"`);
  
        // Vérifie si tous les joueurs non membres de l'équipage ont voté
        const allVoted = room
          .filter((p) => !selectedCrew.includes(p.username)) // Exclure les membres de l'équipage
          .every((p) => p.vote !== undefined);
  
        if (allVoted) {
          // Compte des votes
          const votesYes = room.filter((p) => p.vote === "yes").length;
          const votesNo = room.filter((p) => p.vote === "no").length;
  
          console.log(`✅ Résultats du vote : Oui = ${votesYes}, Non = ${votesNo}`);
  
          // Diffuser les résultats à tous les joueurs
          broadcast(roomCode, {
            type: "VOTE_RESULTS",
            votesYes,
            votesNo,
            approved: votesYes > votesNo, // Approuvé si "yes" est majoritaire
          });
  
          // Réinitialiser les votes pour la prochaine phase
          room.forEach((p) => delete p.vote);
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
  if (!rooms[roomCode] || rooms[roomCode].length !== 5) {
    console.error(`❌ Impossible d'attribuer les rôles : salle ${roomCode} invalide ou incomplète.`);
    return;
  }

  const roles = ["Marin", "Marin", "Marin", "Pirate", "Pirate"].sort(() => Math.random() - 0.5);
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
 * 📡 Sélectionne un capitaine pour la salle
 */
function assignCaptain(roomCode) {
  const room = rooms[roomCode];
  if (!room || room.length === 0) {
    console.error(`❌ Pas de joueurs dans la salle ${roomCode}`);
    return;
  }

  if (!room.currentCaptainIndex) {
    room.currentCaptainIndex = 0; // Commence avec le premier joueur
  } else {
    room.currentCaptainIndex = (room.currentCaptainIndex + 1) % room.length; // Boucle circulaire
  }

  const currentCaptain = room[room.currentCaptainIndex];
  room.currentCaptain = currentCaptain.username;

  console.log(`👑 Nouveau capitaine : ${currentCaptain.username}`);
  broadcast(roomCode, {
    type: "CAPTAIN_SELECTED",
    captain: currentCaptain.username,
    avatar: currentCaptain.avatar,
  });
  console.log(`📤 Envoi de l'événement "CAPTAIN_SELECTED" pour la salle ${roomCode}`);
}

/**
 * 📡 Envoie un message à tous les joueurs d'une salle.
 */
function broadcast(roomCode, message) {
  if (!rooms[roomCode]) {
    console.warn(`⚠️ Aucune salle trouvée pour ${roomCode}`);
    return;
  }
  rooms[roomCode].forEach(({ ws }) => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(message));
    } else {
      console.warn(`⚠️ WebSocket non ouvert pour un client dans la salle ${roomCode}`);
    }
  });
  console.log(`📤 Message diffusé à la salle ${roomCode}:`, message);
}


/**
 * 🧹 Gère la déconnexion d'un joueur et nettoie les rooms.
 */
function handlePlayerDisconnection(ws) {
  Object.keys(rooms).forEach((roomCode) => {
    const room = rooms[roomCode];

    const updatedRoom = room.filter((player) => player.ws !== ws);

    if (updatedRoom.length === 0) {
      delete rooms[roomCode];
    } else {
      rooms[roomCode] = updatedRoom;
      const playersList = updatedRoom.map(({ username, avatar }) => ({
        username,
        avatar,
      }));
      broadcast(roomCode, { type: "ROOM_UPDATE", players: playersList });
    }
  });
}