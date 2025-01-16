"use client";

import React, { useEffect, useState } from "react";
import { connectToRoom, disconnectSocket } from "@/lib/socket";
import { RoomEvent } from "@/types";

interface GameRoomPageProps {
  params: { roomCode: string };
}

interface Player {
  username: string;
  avatar: string;
}

const EMOJIS = ["😃", "🎉", "🚀", "🔥", "💥", "🌟", "🤩", "🎮", "👾", "🦄"];

const GameRoomPage: React.FC<GameRoomPageProps> = ({ params }) => {
  const roomCode = params.roomCode;
  const [username, setUsername] = useState<string | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);

  // Générer un username unique et le stocker dans localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUsername = localStorage.getItem("username");
      if (!storedUsername) {
        const newUsername = `User-${Math.floor(Math.random() * 1000)}`;
        localStorage.setItem("username", newUsername);
        setUsername(newUsername);
      } else {
        setUsername(storedUsername);
      }
    }
  }, []);

  useEffect(() => {
    if (!username) return; // Attendre que le username soit défini

    const handleRoomEvent = (data: RoomEvent & { username?: string; players?: Player[] }) => {
      console.log("🎮 Log reçu :", data);

      if (data.type === "ROOM_UPDATE" && data.players) {
        // Met à jour la liste des joueurs déjà présents
        setPlayers(
          data.players.map((player) => ({
            username: player.username,
            avatar: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
          }))
        );
      }

      if (data.type === "PLAYER_JOINED" && data.username) {
        setPlayers((prev) => {
          const alreadyExists = prev.some((p) => p.username === data.username);
          if (!alreadyExists) {
            return [
              ...prev,
              {
                username: data.username,
                avatar: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
              },
            ];
          }
          return prev;
        });
      }
    };

    connectToRoom(roomCode, handleRoomEvent);

    return () => {
      disconnectSocket();
    };
  }, [roomCode, username]);

  if (!username) return <p>Chargement...</p>;

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-blue-500 to-indigo-600 text-white">
      <h1 className="text-5xl font-extrabold mb-6">Salle : {roomCode}</h1>
      <p className="text-lg text-gray-200">En attente des joueurs...</p>

      <div className="flex flex-wrap justify-center mt-10 space-x-6">
        {players.map((player, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-white text-black px-4 py-2 rounded-lg shadow-lg transform transition-all duration-500 scale-100 hover:scale-110"
          >
            <p className="text-6xl">{player.avatar}</p>
            <p className="text-lg font-semibold mt-2">{player.username}</p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default GameRoomPage;
