import { RoomEvent } from "@/types/index";

let socket: WebSocket | null = null;

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

    socket?.send(
      JSON.stringify({
        type: "JOIN_ROOM",
        roomCode, // ✅ Assurer que la room est bien celle de l'URL
        username,
        avatar,
      })
    );
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
    console.log("🛑 Connexion WebSocket fermée");
    socket = null;
  };
};

/**
 * 📨 Envoie un message dans la room via WebSocket.
 */
export const sendMessageToRoom = (roomCode: string, message: string) => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(
      JSON.stringify({
        type: "NEW_MESSAGE",
        roomCode,
        message,
      })
    );
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
