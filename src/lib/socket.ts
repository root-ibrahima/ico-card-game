import { RoomEvent } from "@/types/index";

// Déclare une variable socket pour une meilleure gestion du cycle de vie
let socket: WebSocket | null = null;

/**
 * Connecte l'utilisateur à une room spécifique et écoute les messages de cette room.
 * @param roomCode - Code de la room à rejoindre.
 * @param onMessage - Fonction de rappel appelée à chaque message reçu.
 */
export const connectToRoom = (roomCode: string, onMessage: (data: RoomEvent) => void) => {
  if (!process.env.NEXT_PUBLIC_WEBSOCKET_URL) {
    console.error("WebSocket URL non défini dans les variables d'environnement.");
    return;
  }

  // Instancie un nouveau WebSocket si non déjà connecté
  socket = new WebSocket(process.env.NEXT_PUBLIC_WEBSOCKET_URL);

  socket.onopen = () => {
    console.log(`WebSocket connecté pour la salle : ${roomCode}`);
    socket?.send(
      JSON.stringify({
        type: "JOIN_ROOM",
        room: roomCode, 
      })
    );
  };

  socket.onmessage = (event) => {
    try {
      const data: RoomEvent = JSON.parse(event.data);
      console.log("Message reçu :", data);
      onMessage(data);
    } catch (error) {
      console.error("Erreur lors de l'analyse du message WebSocket :", error);
    }
  };

  socket.onerror = (error) => {
    console.error("Erreur WebSocket :", error);
  };

  socket.onclose = () => {
    console.log("Connexion WebSocket fermée");
  };
};

/**
 * Envoie un message à une room spécifique.
 * @param roomCode - Code de la room cible.
 * @param message - Contenu du message (texte ou objet).
 */
export const sendMessageToRoom = (roomCode: string, message: string | object) => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(
      JSON.stringify({
        type: "SEND_ROOM_MESSAGE", 
        room: roomCode,
        message,
      })
    );
  } else {
    console.error("WebSocket non connecté. Impossible d'envoyer le message.");
  }
};

/**
 * Déconnecte le socket WebSocket.
 */
export const disconnectSocket = () => {
  if (socket && (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING)) {
    console.log("Déconnexion du WebSocket...");
    socket.close();
    socket = null; // Réinitialise la référence au socket
  }
};
