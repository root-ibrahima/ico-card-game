import { RoomEvent } from "@/types/index";

let socket: WebSocket | null = null;

/**
 * Connecte un utilisateur à une room spécifique et écoute les messages WebSocket.
 */
export const connectToRoom = (
  roomCode: string,
  username: string,
  onMessage: (data: RoomEvent & { players?: { username: string; avatar: string }[] }) => void
) => {
  const WS_URL = "ws://localhost:5000"; // ✅ Port mis à jour

  if (!WS_URL) {
    console.error("❌ WebSocket URL non définie.");
    return;
  }

  if (socket && socket.readyState === WebSocket.OPEN) {
    console.log("⚠️ WebSocket déjà connecté !");
    return;
  }

  socket = new WebSocket(WS_URL);

  socket.onopen = () => {
    console.log(`✅ WebSocket connecté pour la salle : ${roomCode}`);

    const avatar = `https://api.dicebear.com/7.x/adventurer/svg?seed=${username}`;

    socket?.send(
      JSON.stringify({
        type: "JOIN_ROOM",
        room: roomCode,
        username,
        avatar,
      })
    );
  };

  socket.onmessage = (event) => {
    try {
      const data: RoomEvent & { players?: { username: string; avatar: string }[] } = JSON.parse(event.data);
      console.log("📩 Message reçu du serveur :", data);
      onMessage(data);
    } catch (error) {
      console.error("❌ Erreur WebSocket :", error);
    }
  };

  socket.onerror = (error) => {
    console.error("⚠️ Erreur WebSocket :", error);
  };

  socket.onclose = () => {
    console.log("🛑 Connexion WebSocket fermée");
    socket = null;
  };
};

/**
 * Déconnecte le WebSocket proprement.
 */
export const disconnectSocket = () => {
  if (socket && (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING)) {
    console.log("🔌 Déconnexion du WebSocket...");
    socket.close();
    socket = null;
  }
};
