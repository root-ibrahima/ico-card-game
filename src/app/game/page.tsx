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
  ]);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">Jeu ICO 🎮</h1>
      <GameBoard players={players} /> {/* Passez les joueurs à GameBoard */}
    </div>
  );
};

export default GamePage;
