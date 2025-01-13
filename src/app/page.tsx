"use client";

import React, { useState } from "react";
import { useGame } from "@/context/GameContext";
import { useRouter } from "next/navigation"; // Import correct pour App Router

const HomePage: React.FC = () => {
  const [roomCode, setRoomCode] = useState<string>(""); // État pour le code de la salle
  const { dispatch } = useGame(); // Utilisation du GameContext
  const router = useRouter(); // App Router nécessite `next/navigation`

  // Fonction pour créer une nouvelle partie
  const handleCreateGame = () => {
    const newRoomCode = Math.random().toString(36).substring(2, 8).toUpperCase(); // Génère un code aléatoire
    dispatch({ type: "UPDATE_STATUS", payload: "active" }); // Met à jour le statut du jeu
    router.push(`/game/${newRoomCode}`); // Redirige vers la salle
  };

  // Fonction pour rejoindre une partie existante
  const handleJoinGame = () => {
    if (!roomCode.trim()) {
      alert("Veuillez entrer un code de salle !");
      return;
    }
    router.push(`/game/${roomCode.trim().toUpperCase()}`); // Redirige vers la salle
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gray-100 px-4">
      <h1 className="text-4xl font-bold mb-4">Bienvenue dans ICO 🎮</h1>
      <p className="text-gray-700 mb-8">Rejoignez une partie ou créez-en une !</p>

      {/* Section pour créer une partie */}
      <button
        onClick={handleCreateGame}
        className="bg-blue-500 text-white px-6 py-3 rounded shadow mb-4 hover:bg-blue-600"
      >
        Créer une partie
      </button>

      {/* Section pour rejoindre une partie */}
      <div className="flex flex-col items-center gap-4">
        <input
          type="text"
          value={roomCode}
          onChange={(e) => setRoomCode(e.target.value)}
          placeholder="Entrez le code de la salle"
          className="border p-3 rounded w-64 text-center"
        />
        <button
          onClick={handleJoinGame}
          className="bg-green-500 text-white px-6 py-3 rounded shadow hover:bg-green-600"
        >
          Rejoindre une partie
        </button>
      </div>
    </main>
  );
};

export default HomePage;
