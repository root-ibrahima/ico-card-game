import { useEffect, useState } from "react";
import { connectToRoom, sendMessage, disconnectSocket } from "@/lib/socket";
import { RoomEvent } from "@/types/index";

interface RoomProps {
  roomCode: string;
}

const Room = ({ roomCode }: RoomProps) => {
  const [messages, setMessages] = useState<RoomEvent[]>([]);

  useEffect(() => {
    // Fonction appelée lorsqu'un message WebSocket est reçu
    const handleMessage = (data: RoomEvent) => {
      console.log("Message reçu :", data);

      // Mise à jour des messages
      setMessages((prevMessages) => [...prevMessages, data]);
    };

    // Connexion au WebSocket
    connectToRoom(roomCode, handleMessage);

    // Déconnexion lors de la destruction du composant
    return () => {
      disconnectSocket();
    };
  }, [roomCode]);

  const handleSendMessage = () => {
    const message = "Bonjour à tous !";
    sendMessage(roomCode, message);
  };

  return (
    <div>
      <h1>Room : {roomCode}</h1>
      <button onClick={handleSendMessage}>Envoyer un message</button>
      <div>
        <h2>Messages</h2>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>
              <strong>{msg.type}</strong>: {JSON.stringify(msg.payload)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Room;
