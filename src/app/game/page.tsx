"use client";

import React, { useState } from "react";
import GameBoard from "@/components/GameBoard";

interface Player {
  id: string;
  name: string;
  role: "marin" | "pirate" | "sirène"; // Suppression du type `undefined` pour plus de sécurité
  isCaptain: boolean;
}

const GamePage: React.FC = () => {
  // État local pour les joueurs
  const [players] = useState<Player[]>([
    { id: "1", name: "Alice", role: "marin", isCaptain: false },
    { id: "2", name: "Bob", role: "pirate", isCaptain: false },
    { id: "3", name: "Charlie", role: "sirène", isCaptain: false },
  ]);

  return (
    <div className="pt-16 min-h-screen flex flex-col items-center bg-gradient-to-b from-blue-50 to-indigo-100 py-10">
      {/* Titre Principal */}
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8 tracking-tight">
        Tableau des Joueurs 🎮
      </h1>

      {/* Section GameBoard */}
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
        <GameBoard players={players} />
      </div>

      {/* Infos Supplémentaires */}
      <div className="mt-10">
        <p className="text-lg text-gray-600 italic">
          Chaque joueur a un rôle. Qui remportera la partie ?
        </p>
      </div>
    </div>
  );
};

export default GamePage;
