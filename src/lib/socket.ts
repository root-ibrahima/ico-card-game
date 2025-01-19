import { RoomEvent } from "@/types/index";

let socket: WebSocket | null = null;
let reconnectAttempts = 0;
const MAX_RECONNECT_ATTEMPTS = 5;

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
    reconnectAttempts = 0; // Réinitialisation des tentatives de reconnexion

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
    } catch (error) {
      console.error("❌ Erreur lors de l'envoi du message JOIN_ROOM :", error);
    }

    // Ajout d'un ping périodique pour maintenir la connexion WebSocket ouverte
    setInterval(() => {
      if (socket?.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ type: "PING" }));
      }
    }, 30000); // Envoi un ping toutes les 30 secondes
  };

  socket.onmessage = (event) => {
    try {
      const data: RoomEvent & { players?: { username: string; avatar: string }[] } = JSON.parse(event.data);
      console.log("📩 Message reçu du serveur :", data);

      if (data.type === "ROOM_UPDATE" && data.players) {
        console.log(`👥 Mise à jour des joueurs dans ${roomCode} :`, data.players);
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
    console.warn("🛑 Connexion WebSocket fermée");

    // Tentative de reconnexion en cas de déconnexion
    if (reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
      console.log(`🔄 Tentative de reconnexion (${reconnectAttempts + 1}/${MAX_RECONNECT_ATTEMPTS})...`);
      reconnectAttempts++;
      setTimeout(() => connectToRoom(roomCode, username, onMessage), 2000);
    } else {
      console.error("❌ Impossible de se reconnecter au WebSocket après plusieurs tentatives.");
      socket = null;
    }
  };
};

/**
 * 📨 Envoie un message dans la room via WebSocket.
 */
export const sendMessageToRoom = (
  username: string,
  roomCode: string,
  type: string,
  additionalData?: Record<string, unknown> 
) => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    try {
      const message = {
        type,
        username,
        roomCode,
        ...additionalData,
      };

      socket.send(JSON.stringify(message));
    } catch (error) {
      console.error("❌ Erreur lors de l'envoi du message :", error);
    }
  } else {
    console.error("❌ WebSocket non connecté, impossible d'envoyer le message.");
  }
};

/**
 * 🔌 Déconnecte proprement le WebSocket.
 */
export const disconnectSocket = () => {
  if (socket && (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING)) {
    console.log("🔌 Déconnexion du WebSocket...");
    socket.close();
    socket = null;
  }
};
