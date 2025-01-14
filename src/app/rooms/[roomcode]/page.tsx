// src/app/rooms/[roomCode]/page.tsx (App Router)
"use client";

import React, { useEffect, useState } from "react";
import { connectToRoom, sendMessage, disconnectSocket } from "@/lib/socket";

interface Player {
  id: string;
  name: string;
  role: string;
}

interface Room {
  host: string;
  players: Player[];
  status: "waiting" | "in-progress" | "finished";
}

const RoomPage: React.FC = () => {
  const [room, setRoom] = useState<Room | null>(null);

  useEffect(() => {
    const roomCode = window.location.pathname.split("/").pop() || "unknown";

    connectToRoom(roomCode, (data: any) => {
      if (data.type === "ROOM_UPDATE") {
        setRoom(data.payload);
      }
    });

    return () => {
      disconnectSocket();
    };
  }, []);

  const handleStartGame = () => {
    sendMessage(room?.host || "unknown", { action: "start-game" });
  };

  if (!room) {
    return <p>Chargement de la salle...</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Salle : {room.host}</h1>
      <ul>
        {room.players.map((player) => (
          <li key={player.id}>
            {player.name} - {player.role}
          </li>
        ))}
      </ul>
      <button onClick={handleStartGame} className="mt-4 bg-blue-500 text-white p-2 rounded">
        Démarrer la partie
      </button>
    </div>
  );
};

export default RoomPage;
