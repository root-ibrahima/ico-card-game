"use client";

import React, { useState } from "react";
import HeaderGame from "../rooms/[roomcode]/components/HeaderGame";
import FooterGame from "../rooms/[roomcode]/components/FooterGame";
import PlayerCard from "./PlayerCard";

const SelectCrewPage = () => {
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  // Liste des joueurs (statique pour l'instant, augmentée pour tester le scroll)
  const players = [
    { id: "1", name: "James", image: "/players/james.png" },
    { id: "2", name: "Ibrahima", image: "/players/ibrahima.png" },
    { id: "3", name: "Damien", image: "/players/damien.png" },
    { id: "4", name: "Alexandre", image: "/players/alexandre.png" },
    { id: "5", name: "Sebastian", image: "/players/sebastian.png" },
    { id: "6", name: "Valentin", image: "/players/valentin.png" },
    { id: "7", name: "Massessilia", image: "/players/massessilia.png" },
    { id: "8", name: "Léa", image: "/players/lea.png" },
    { id: "9", name: "Thomas", image: "/players/thomas.png" },
    { id: "10", name: "Sarah", image: "/players/sarah.png" },
    { id: "11", name: "Emma", image: "/players/emma.png" },
    { id: "12", name: "Lucas", image: "/players/lucas.png" },
  ];

  const toggleSelection = (playerId: string) => {
    if (selectedPlayers.includes(playerId)) {
      // Supprime si déjà sélectionné
      setSelectedPlayers((prev) => prev.filter((id) => id !== playerId));
    } else if (selectedPlayers.length < 3) {
      // Ajoute si non sélectionné et limite à 3
      setSelectedPlayers((prev) => [...prev, playerId]);
      setAlertMessage(null); // Réinitialise l'alerte si valide
    } else {
      // Affiche une alerte si on dépasse la limite
      setAlertMessage("Vous ne pouvez sélectionner que 3 membres maximum !");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100">
      {/* Header */}
      <HeaderGame />

      {/* Contenu principal */}
      <main className="flex-grow px-4 relative">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">
          Sélectionnez votre équipage
        </h1>
        <p className="text-base text-gray-600 text-center mb-6">
          Choisissez jusqu'à 3 membres pour votre équipage.
        </p>

        {/* Alerte */}
        {alertMessage && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg text-center mb-4">
            {alertMessage}
          </div>
        )}

        {/* Liste des joueurs avec conteneur scrollable */}
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 max-h-96 overflow-y-auto">
          {players.map((player) => (
            <PlayerCard
              key={player.id}
              player={player}
              isSelected={selectedPlayers.includes(player.id)}
              selectionNumber={
                selectedPlayers.includes(player.id)
                  ? selectedPlayers.indexOf(player.id) + 1
                  : undefined
              }
              onClick={() => toggleSelection(player.id)}
            />
          ))}
        </div>

        {/* Bouton de validation */}
        <div className="mt-6 flex justify-center">
          <button
            className={`w-full max-w-xs py-3 rounded-lg text-white font-bold ${
              selectedPlayers.length === 3
                ? "bg-[#AAC2FF] hover:bg-[#88A8FF]"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={selectedPlayers.length !== 3}
            onClick={() =>
              alert("Équipage sélectionné : " + selectedPlayers.join(", "))
            }
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
