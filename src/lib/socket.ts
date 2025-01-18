import { RoomEvent } from "@/types/index";

let socket: WebSocket | null = null;

/**
 * Vérifie si l'utilisateur est sur une page /game/rooms/... pour maintenir la connexion WebSocket.
 */
const isInGameRoom = (): boolean => window.location.pathname.startsWith("/game/rooms/");

/**
 * 📡 Connecte un utilisateur à une room spécifique et écoute les messages WebSocket.
 */
export const connectToRoom = (
  roomCode: string,
  username: string,
  onMessage: (data: RoomEvent & { players?: { username: string; avatar: string }[] }) => void
) => {
  const WS_URL = process.env.NEXT_PUBLIC_WEBSOCKET_URL || "ws://localhost:5000";

  if (socket && socket.readyState === WebSocket.OPEN) {
    console.warn("⚠️ WebSocket déjà connecté !");
    return;
  }

  socket = new WebSocket(WS_URL);

  socket.onopen = () => {
    console.log(`✅ WebSocket connecté pour la salle : ${roomCode}`);

    const avatar = `https://api.dicebear.com/7.x/adventurer/svg?seed=${username}`;

    try {
      socket?.send(
        JSON.stringify({
          type: "JOIN_ROOM",
          roomCode,
          username,
          avatar,
        })
      );

      // Envoi périodique de l'URL pour vérifier la position du client
      setInterval(() => {
        if (socket && socket.readyState === WebSocket.OPEN) {
          socket.send(
            JSON.stringify({
              type: "UPDATE_URL",
              currentUrl: window.location.pathname,
            })
          );
        }
      }, 5000); // Envoi toutes les 5 secondes
    } catch (error) {
      console.error("❌ Erreur lors de l'envoi du message JOIN_ROOM :", error);
    }
  };

  socket.onmessage = (event) => {
    try {
      const data: RoomEvent & { players?: { username: string; avatar: string }[]; redirect?: string; role?: string } =
        JSON.parse(event.data);
  
      console.log("📩 Message WebSocket brut reçu :", event.data);
      console.log("📩 Message WebSocket traité :", data);
  
      if (data.type === "ROOM_UPDATE" && data.players) {
        console.log(`👥 Mise à jour des joueurs dans ${roomCode} :`, data.players);
      }
  
      if (data.type === "YOUR_ROLE" && data.redirect) {
        console.log(`🔄 Redirection détectée vers : ${data.redirect}`);
  
        // Stockez les informations nécessaires dans localStorage pour reconnexion
        localStorage.setItem("roomCode", roomCode);
        localStorage.setItem("username", username);
  
        // Attendez 1 seconde avant la redirection pour éviter de fermer WebSocket
        setTimeout(() => {
          window.location.href = data.redirect;
        }, 1000);
      }
  
      onMessage(data);
    } catch (error) {
      console.error("❌ Erreur lors du traitement du message WebSocket :", error);
    }
  };
  

  socket.onerror = (event) => {
    console.error("⚠️ Erreur WebSocket :", event);
  };

  socket.onclose = () => {
    if (isInGameRoom()) {
      console.log("🎮 Connexion WebSocket maintenue car l'utilisateur est dans une salle de jeu.");

      // Tentative de reconnexion après une fermeture inattendue
      setTimeout(() => {
        console.log("🔄 Tentative de reconnexion au WebSocket...");
        connectToRoom(roomCode, username, onMessage);
      }, 3000); // Reconnexion après 3 secondes
    } else {
      console.log("🛑 Connexion WebSocket fermée.");
      socket = null;
    }
  };
};

/**
 * 📨 Envoie un message dans la room via WebSocket.
 */
export const sendMessageToRoom = (roomCode: string, message: string) => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    try {
      socket.send(
        JSON.stringify({
          type: "NEW_MESSAGE",
          roomCode,
          message,
        })
      );
    } catch (error) {
      console.error("❌ Erreur lors de l'envoi du message :", error);
    }
  } else {
    console.error("❌ WebSocket non connecté, impossible d'envoyer le message.");
  }
};

/**
 * 🔌 Déconnecte proprement le WebSocket si l'utilisateur quitte une salle.
 */
export const disconnectSocket = () => {
  if (!isInGameRoom() && socket && (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING)) {
    console.log("🔌 Déconnexion du WebSocket...");
    socket.close();
    socket = null;
  } else {
    console.log("🎮 Connexion WebSocket maintenue car l'utilisateur est dans une salle de jeu.");
  }
};
