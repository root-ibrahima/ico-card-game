"use client";

import React, { useState } from "react";
import HeaderGame from "../components/HeaderGame";
import FooterGame from "../components/FooterGame";
import PlayerCard from "./PlayerCard";

const SelectCrewPage = () => {
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);

  // Liste des joueurs (statique pour l'instant)
  const players = [
    { id: "1", name: "James", image: "/players/james.png" },
    { id: "2", name: "Ibrahima", image: "/players/ibrahima.png" },
    { id: "3", name: "Damien", image: "/players/damien.png" },
    { id: "4", name: "Alexandre", image: "/players/alexandre.png" },
    { id: "5", name: "Sebastian", image: "/players/sebastian.png" },
    { id: "6", name: "Valentin", image: "/players/valentin.png" },
    { id: "7", name: "Massessilia", image: "/players/massessilia.png" },
  ];

  const toggleSelection = (playerId: string) => {
    if (selectedPlayers.includes(playerId)) {
      // Supprime un joueur déjà sélectionné
      setSelectedPlayers((prev) => prev.filter((id) => id !== playerId));
    } else {
      if (selectedPlayers.length < 3) {
        // Ajoute un joueur si moins de 3 sont sélectionnés
        setSelectedPlayers((prev) => [...prev, playerId]);
      } else {
        alert("Vous ne pouvez sélectionner que 3 joueurs !");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100">
      {/* Header */}
      <HeaderGame />

      {/* Contenu principal */}
      <main className="flex-grow px-4">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">
          Sélectionnez votre équipage
        </h1>
        <p className="text-base text-gray-600 text-center mb-6">
          Choisissez les membres qui vous accompagneront.
        </p>

        {/* Liste des joueurs */}
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-4">
          {players.map((player) => (
            <PlayerCard
              key={player.id}
              player={player}
              isSelected={selectedPlayers.includes(player.id)}
              onClick={() => toggleSelection(player.id)}
            />
          ))}
        </div>

        {/* Bouton de validation */}
        <div className="mt-6 flex justify-center">
          <button
            className={`w-full max-w-xs py-3 rounded-lg text-white font-bold ${
              selectedPlayers.length === 3
                ? "bg-purple-500 hover:bg-purple-600"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={selectedPlayers.length !== 3}
            onClick={() => alert("Équipage sélectionné : " + selectedPlayers.join(", "))}
          >
            Valider l'équipage
          </button>
        </div>
      </main>

      {/* Footer */}
      <FooterGame />
    </div>
  );
};

export default SelectCrewPage;
