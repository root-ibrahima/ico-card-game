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

  // Demande à l'utilisateur son pseudo avant d'entrer dans la salle
  const handleJoinRoom = () => {
    if (newUsername.trim() === "") return;
    localStorage.setItem("username", newUsername);
    setUsername(newUsername);
  };

  useEffect(() => {
    if (!username) return; // Attendre que le username soit défini

    const handleRoomEvent = (data: RoomEvent & { players?: Player[] }) => {
      console.log("🎮 Log reçu :", data);

      if (data.type === "ROOM_UPDATE" && data.players) {
        setPlayers(data.players);
      }

      if (data.type === "PLAYER_JOINED" && data.players) {
        setPlayers(data.players);
      }
    };

    connectToRoom(roomCode, username, handleRoomEvent);

    return () => {
      disconnectSocket();
    };
  }, [roomCode, username]);

  // Écran de saisie du pseudo avant d'entrer dans la salle
  if (!username) {
    return (
      <div className="min-h-screen bg-purple-500 flex flex-col items-center justify-center text-white p-4">
        <h1 className="text-3xl font-bold mb-6">Entrez votre pseudo</h1>
        <input
          type="text"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
          placeholder="Votre pseudo..."
          className="w-80 px-4 py-2 rounded-lg text-black focus:outline-none"
        />
        <button
          onClick={handleJoinRoom}
          className="mt-4 bg-white text-purple-500 px-6 py-2 rounded-lg font-medium"
        >
          Rejoindre la partie
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-purple-500 flex flex-col items-center p-4 text-white">
      {/* Header */}
      <header className="w-full flex justify-between items-center mb-4">
        <button className="text-white font-medium">Retour</button>
        <h1 className="text-lg font-semibold">Lancement de la partie</h1>
        <div className="w-8 h-8"></div>
      </header>

      {/* QR Code Section */}
      <section className="flex flex-col items-center">
        <div className="w-24 h-24 bg-white rounded-md flex items-center justify-center mb-4">
          <span className="text-purple-500 text-4xl">QR</span>
        </div>
        <p className="text-center text-sm mb-6">
          Les autres joueurs peuvent scanner ce QR code pour rejoindre cette partie !
        </p>
      </section>

      {/* Players Section */}
      <section className="grid grid-cols-4 gap-4 w-full mb-6">
        {players.map((player, index) => (
          <div
            key={index}
            className="w-full h-16 bg-gray-300 rounded-lg flex flex-col items-center justify-center p-2"
          >
            <img src={player.avatar} alt={player.username} className="w-10 h-10 rounded-full" />
            <p className="text-xs mt-1">{player.username}</p>
          </div>
        ))}
        <div className="w-full h-16 bg-purple-700 rounded-lg flex items-center justify-center">
          ...
        </div>
      </section>

      {/* Start Button */}
      <button className="w-full bg-white text-purple-500 py-3 rounded-lg font-medium">
        Commencer la partie
      </button>
    </div>
  );
};

export default GameRoomPage;
