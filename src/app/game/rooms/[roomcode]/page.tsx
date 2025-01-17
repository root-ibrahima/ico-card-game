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
  const [isHost] = useState<boolean>(false);

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
      <div className="min-h-screen bg-gradient-to-b from-indigo-600 to-purple-700 flex flex-col items-center justify-center text-white p-4">
        <h1 className="text-4xl font-bold mb-6">Entrez votre pseudo</h1>
        <input
          type="text"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
          className="w-80 px-4 py-2 rounded-lg text-black focus:outline-none"
          placeholder="Votre pseudo..."
        />
        <button
          onClick={handleJoinRoom}
          className="mt-4 bg-white text-purple-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-200 transition"
        >
          Rejoindre la partie
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-600 to-purple-700 flex flex-col items-center p-6 text-white">
      {/* Header */}
      <header className="w-full flex justify-between items-center mb-6 px-4">
        <button className="text-white font-medium">⬅ Retour</button>
        <h1 className="text-3xl font-extrabold">Salle : {roomCode}</h1>
        <div className="w-8 h-8"></div>
      </header>

      {/* Liste des joueurs */}
      <section className="grid grid-cols-4 gap-4 w-full max-w-3xl">
        {players.map((player, index) => (
          <div
            key={index}
            className="bg-white text-black rounded-lg p-3 flex flex-col items-center shadow-lg transform transition-all duration-300 hover:scale-110"
          >
            <img src={player.avatar} alt={player.username} className="w-16 h-16 rounded-full" />
            <p className="mt-2 font-semibold">{player.username}</p>
          </div>
        ))}
        <div className="bg-purple-800 rounded-lg p-3 flex items-center justify-center text-xl font-bold text-white">
          +++
        </div>
      </section>

      {/* Affichage du rôle du joueur (uniquement pour lui) */}
      {gameStarted && role && (
        <div className="mt-6 p-4 bg-gray-800 text-white font-bold rounded-lg shadow-lg">
          🎭 Ton rôle : {role}
          {isCaptain && " (Capitaine)"}
        </div>
      )}

      {/* Démarrage de la partie */}
      {gameStarted ? (
        <h2 className="text-2xl font-bold mt-6">🎲 La partie a commencé ! Bonne chance !</h2>
      ) : (
        <div className="mt-8 flex flex-col items-center">
          <h2 className="text-xl">⏳ En attente de 7 joueurs...</h2>
          {isHost && (
            <button className="mt-4 px-6 py-3 bg-green-500 text-white rounded-lg text-lg font-semibold shadow-md hover:bg-green-600 transition">
              Démarrer la partie 🚀
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default GameRoomPage;
