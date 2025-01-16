"use client";

import React, { useEffect, useState } from "react";
import { connectToRoom, sendMessageToRoom, disconnectSocket, RoomEvent } from "@/lib/socket";

interface GameRoomPageProps {
  params: { roomCode: string };
}

const GameRoomPage: React.FC<GameRoomPageProps> = ({ params }) => {
  const roomCode = params.roomCode || "Inconnu";
  const [messages, setMessages] = useState<string[]>([]);
  const [messageInput, setMessageInput] = useState<string>("");

  useEffect(() => {
    // Connexion WebSocket à la room
    connectToRoom(roomCode, (data: RoomEvent & { sender?: string }) => {
      if (data.type === "PLAYER_JOINED") {
        if ('username' in data) {
          setMessages((prev) => [...prev, `${data.username} a rejoint la salle.`]);
        }
      } else if (data.type === "NEW_MESSAGE") {
        setMessages((prev) => [...prev, `${data.sender}: ${data.message}`]);
      }
    });

    return () => {
      disconnectSocket();
    };
  }, [roomCode]);

  const handleSendMessage = () => {
    if (messageInput.trim() === "") return;
    sendMessageToRoom(roomCode, { sender: "Moi", message: messageInput });
    setMessages((prev) => [...prev, `Moi: ${messageInput}`]);
    setMessageInput("");
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gray-100 px-4">
      <h1 className="text-4xl font-bold mb-4">Salle : {roomCode}</h1>
      <p className="text-gray-700">Préparez-vous à jouer !</p>

      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-4 mt-6">
        <div className="h-64 overflow-y-auto border p-2">
          {messages.map((msg, index) => (
            <div key={index} className="text-gray-800 text-sm">
              {msg}
            </div>
          ))}
        </div>

        <div className="mt-4 flex">
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder="Écrire un message..."
            className="w-full border rounded-md px-3 py-2 text-gray-700"
          />
          <button
            onClick={handleSendMessage}
            className="ml-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Envoyer
          </button>
        </div>
      </div>
    </main>
  );
};

export default GameRoomPage;
