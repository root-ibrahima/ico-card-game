"use client";

import React, { useEffect, useState } from "react";
import { connectToRoom, disconnectSocket } from "@/lib/socket";
import { Room, RoomEvent } from "@/types"; // Importez les types nécessaires.

const RoomPage: React.FC = () => {
  const [room, setRoom] = useState<Room | null>(null);
  const roomCode = window.location.pathname.split("/").pop() || "unknown";

  const handleRoomUpdate = (data: RoomEvent) => {
    if (data.type === "ROOM_UPDATE") {
      setRoom(data.payload);
    }
  };

  useEffect(() => {
    if (!roomCode) {
      console.warn("Code de salle invalide");
      return;
    }

    try {
      connectToRoom(roomCode, handleRoomUpdate);
    } catch (error) {
      console.error("Erreur lors de la connexion à la salle :", error);
    }

    // Déconnecter le socket lors du démontage
    return () => {
      disconnectSocket();
    };
  }, [roomCode]);

  if (!room) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-lg text-gray-600 font-medium">Chargement de la salle...</p>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen flex flex-col items-center bg-gradient-to-b from-blue-100 to-indigo-200 py-10">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Salle : {roomCode}</h1>
      <p className="text-lg text-gray-600 mb-8">Hôte : {room.host}</p>

      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Joueurs</h2>
        <ul>
          {room.players.map((player, index) => (
            <li
              key={index}
              className="text-gray-700 border-b last:border-none py-2"
            >
              {player.name} ({player.role})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RoomPage;
