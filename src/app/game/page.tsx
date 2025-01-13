"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import GameBoard from "@/components/GameBoard";

interface Player {
  id: string;
  name: string;
  role: "marin" | "pirate" | "sirène";
  isCaptain: boolean;
}

const GameModesPage: React.FC = () => {
  const [currentMode, setCurrentMode] = useState<"modes" | "game">("modes"); // Contrôle de la vue
  const router = useRouter();

  const players: Player[] = [
    { id: "1", name: "Alice", role: "marin", isCaptain: false },
    { id: "2", name: "Bob", role: "pirate", isCaptain: false },
    { id: "3", name: "Charlie", role: "sirène", isCaptain: false },
  ];

  const handleModeSelection = (mode: string) => {
    if (mode === "multiplayer" || mode === "custom") {
      // Redirection vers une page spécifique si besoin
      router.push(`/game/modes/${mode}`);
    } else {
      setCurrentMode("game"); // Afficher la liste des joueurs
    }
  };

  return (
    <div className="pt-16 min-h-screen flex flex-col items-center bg-gradient-to-b from-blue-100 to-indigo-200 py-10">
      {currentMode === "modes" ? (
        <>
          {/* Vue des Modes */}
          <h1 className="text-4xl font-bold text-gray-800 mb-8">Choisissez un Mode de Jeu 🎮</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
            {/* Mode Multijoueur */}
            <div
              className="bg-white shadow-lg rounded-lg p-6 cursor-pointer hover:bg-gray-100 transition transform hover:-translate-y-1"
              onClick={() => handleModeSelection("multiplayer")}
            >
              <h2 className="text-2xl font-bold text-green-600 mb-4">Mode Multijoueur</h2>
              <p className="text-gray-700">
                Rejoignez des amis ou des joueurs aléatoires pour une partie en ligne.
              </p>
            </div>

            {/* Mode Personnalisé */}
            <div
              className="bg-white shadow-lg rounded-lg p-6 cursor-pointer hover:bg-gray-100 transition transform hover:-translate-y-1"
              onClick={() => handleModeSelection("custom")}
            >
              <h2 className="text-2xl font-bold text-purple-600 mb-4">Mode Personnalisé</h2>
              <p className="text-gray-700">
                Configurez vos propres règles et invitez des joueurs spécifiques.
              </p>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Vue du Tableau des Joueurs */}
          <h1 className="text-4xl font-extrabold text-gray-800 mb-8 tracking-tight">
            Tableau des Joueurs 🎮
          </h1>

          <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
            <GameBoard players={players} />
          </div>

          {/* Bouton Retour */}
          <div className="mt-10">
            <button
              onClick={() => setCurrentMode("modes")}
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md shadow hover:bg-blue-700 transition duration-300"
            >
              Retour aux Modes
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default GameModesPage;
