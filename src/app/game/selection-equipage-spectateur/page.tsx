"use client";

import React from "react";
import HeaderGame from "../rooms/[roomcode]/components/HeaderGame";
import FooterGame from "../rooms/[roomcode]/components/FooterGame";
import PlayerCard from "./PlayerCard";

const SpectatorWaitingPage = () => {
  const captain = { id: "1", name: "Maxime", image: "/players/maxime.png" }; // Statique pour l'instant
  const emptyCrewSlots = Array(3).fill(null); // 3 emplacements vides

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100">
      {/* Header */}
      <HeaderGame />

      {/* Contenu principal */}
      <main className="flex-grow px-4 flex flex-col items-center text-center mt-10">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Son équipage</h1>
        <p className="text-base text-gray-600 mb-12">
          Le capitaine va maintenant sélectionner un équipage.
        </p>

        {/* Capitaine */}
        <div className="flex flex-col items-center mb-8">
          <PlayerCard player={captain} />
        </div>

        {/* Emplacements pour les membres */}
        <div className="grid grid-cols-3 gap-4">
          {emptyCrewSlots.map((_, index) => (
            <div
              key={index}
              className="w-20 h-20 rounded-lg bg-white flex items-center justify-center shadow-md"
            >
              <span className="text-gray-500 text-2xl font-bold">...</span>
            </div>
          ))}
        </div>

        {/* Message d'attente */}
        <p className="text-sm text-gray-500 mt-6">
          Le capitaine sélectionne les membres de l'équipage...
        </p>
      </main>

      {/* Footer */}
      <FooterGame />
    </div>
  );
};

export default SpectatorWaitingPage;
