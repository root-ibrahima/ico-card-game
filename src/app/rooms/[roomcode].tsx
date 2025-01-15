import { RoomEvent } from "@/types/index";

const socket = new WebSocket(process.env.NEXT_PUBLIC_WEBSOCKET_URL || "");

export const connectToRoom = (roomCode: string, onMessage: (data: RoomEvent) => void) => {
  socket.onopen = () => {
    console.log(`WebSocket connecté pour la salle : ${roomCode}`);
    socket.send(
      JSON.stringify({
        type: "JOIN_ROOM",
        roomCode,
      })
    );
  };

  socket.onmessage = (event) => {
    try {
      const data: RoomEvent = JSON.parse(event.data);
      onMessage(data);
    } catch (error) {
      console.error("Erreur lors de l'analyse du message WebSocket :", error);
    }
  };

  socket.onerror = (error) => {
    console.error("WebSocket Error:", error);
  };

  socket.onclose = () => {
    console.log("WebSocket connection closed");
  };
};

export const sendMessage = (roomCode: string, message: string | object) => {
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(
      JSON.stringify({
        type: "SEND_MESSAGE",
        roomCode,
        payload: message,
      })
    );
  } else {
    console.error("WebSocket not connected. Impossible d'envoyer le message.");
  }
};

export const disconnectSocket = () => {
  if (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING) {
    console.log("Déconnexion du WebSocket...");
    socket.close();
  }
};
