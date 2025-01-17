"use client";

import React from "react";
import HeaderGame from "../components/HeaderGame";
import FooterGame from "../components/FooterGame";
import PlayerCard from "./PlayerCard";

const SpectatorWaitingPage = () => {
  const captain = { id: "1", name: "Maxime", image: "/players/maxime.png" }; // Statique pour l'instant
  const crewMembers = [
    { id: "2", name: "Damien", image: "/players/damien.png" },
    { id: "3", name: "Ibrahima", image: "/players/ibrahima.png" },
    { id: "4", name: "Sebastian", image: "/players/sebastian.png" },
  ];

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100">
      {/* Header */}
      <HeaderGame />

      {/* Contenu principal */}
      <main className="flex-grow px-4 flex flex-col items-center text-center mt-10">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Son équipage</h1>
        <p className="text-base text-gray-600 mb-12">
          Le capitaine a sélectionné son équipage.
        </p>

        {/* Capitaine */}
        <div className="flex flex-col items-center mb-10">
          <PlayerCard player={captain} isCaptain={true} />
        </div>

        {/* Membres de l'équipage */}
        <div className="grid grid-cols-3 gap-4">
          {crewMembers.map((member) => (
            <PlayerCard key={member.id} player={member} />
          ))}
        </div>
      </main>

      {/* Footer */}
      <FooterGame />
    </div>
  );
};

export default SpectatorWaitingPage;
