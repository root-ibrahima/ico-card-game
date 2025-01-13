"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { connectToRoom, disconnectSocket } from "@app/api/utils/socket";

interface Player {
  name: string;
  role: string;
}

interface Room {
  host: string;
  players: Player[];
  status: "waiting" | "in-progress" | "finished";
}

interface RoomEvent {
  type: "PLAYER_JOINED" | "ROOM_UPDATE" | "PLAYER_LEFT";
  payload: Room;
}

const RoomPage: React.FC = () => {
  const params = useParams();
  const roomCode = params?.roomCode as string | undefined; // Vérifie si le paramètre est valide
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true); // Ajoute un état de chargement
  const [error, setError] = useState<string | null>(null); // Gestion des erreurs

  const handleRoomUpdate = (data: RoomEvent) => {
    if (data.type === "PLAYER_JOINED" || data.type === "ROOM_UPDATE") {
      setRoom(data.payload);
    }
  };

  useEffect(() => {
    if (!roomCode) {
      setError("Code de salle invalide. Veuillez vérifier l'URL.");
      setLoading(false);
      return;
    }

    // Connexion à la salle via WebSocket
    try {
      connectToRoom(roomCode, handleRoomUpdate);
      setLoading(false);
    } catch {
      setError("Erreur lors de la connexion à la salle.");
      setLoading(false);
    }

    // Déconnexion propre lors du démontage
    return () => {
      disconnectSocket();
    };
  }, [roomCode]);

  // Gestion des états
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-lg text-gray-600 font-medium">Chargement de la salle...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-lg text-red-500 font-medium">{error}</p>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-lg text-gray-600 font-medium">
          Aucune donnée de salle disponible. Veuillez réessayer plus tard.
        </p>
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
