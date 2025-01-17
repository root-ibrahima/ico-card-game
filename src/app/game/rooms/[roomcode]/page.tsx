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

const GameRoomPage: React.FC<GameRoomPageProps> = ({ params }) => {
  const roomCode = params.roomCode;
  const [username, setUsername] = useState<string | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [newUsername, setNewUsername] = useState<string>("");
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [role, setRole] = useState<string | null>(null);
  const [isCaptain, setIsCaptain] = useState<boolean>(false);

  // Demande le pseudo avant d'entrer
  const handleJoinRoom = () => {
    if (newUsername.trim() === "") return;
    localStorage.setItem("username", newUsername);
    setUsername(newUsername);
  };

  useEffect(() => {
    if (!username) return;

    const handleRoomEvent = (data: RoomEvent & { players?: Player[]; role?: string; isCaptain?: boolean }) => {
      console.log("🎮 Log reçu :", data);

      if (data.type === "ROOM_UPDATE" && data.players) {
        setPlayers(data.players);
      }

      if (data.type === "GAME_START" && data.players) {
        setPlayers(data.players);
        setGameStarted(true);
      }

      if (data.type === "YOUR_ROLE") {
        setRole(data.role || "Inconnu");
        setIsCaptain(data.isCaptain || false);
      }
    };

    connectToRoom(roomCode, username, handleRoomEvent);

    return () => {
      disconnectSocket();
    };
  }, [roomCode, username]);

  if (!username) {
    return (
      <div className="min-h-screen bg-purple-500 flex flex-col items-center text-white p-4">
        <h1 className="text-3xl font-bold mb-6">Entrez votre pseudo</h1>
        <input type="text" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} />
        <button onClick={handleJoinRoom}>Rejoindre</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-purple-500 flex flex-col items-center text-white">
      <h1>Salle : {roomCode}</h1>

      {/* Affichage des joueurs */}
      <section className="grid grid-cols-4 gap-4 w-full">
        {players.map((player, index) => (
          <div key={index} className="bg-gray-300 rounded-lg p-2 flex flex-col items-center">
            <img src={player.avatar} alt={player.username} className="w-10 h-10 rounded-full" />
            <p>{player.username}</p>
          </div>
        ))}
      </section>

      {/* Affichage du rôle du joueur */}
      {gameStarted && role && (
        <div className="mt-6 p-4 bg-gray-700 text-white font-bold rounded-lg">
          🎭 Ton rôle : {role}
          {isCaptain && " (Capitaine)"}
        </div>
      )}

      {/* Message de début de partie */}
      {gameStarted ? (
        <h2 className="text-2xl font-bold mt-6">🎲 La partie a commencé ! Bonne chance !</h2>
      ) : (
        <h2 className="text-2xl font-bold mt-6">⏳ En attente de 7 joueurs...</h2>
      )}
    </div>
  );
};

export default GameRoomPage;
