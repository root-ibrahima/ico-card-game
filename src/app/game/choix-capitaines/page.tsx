"use client";

import React, { useState } from "react";
import HeaderGame from "../components/HeaderGame";
import FooterGame from "../components/FooterGame";

const CaptainChoicePage = () => {
  const [isCaptain, setIsCaptain] = useState(true); // Remplacez par une logique réelle
  const captainName = isCaptain ? "Vous" : "Maxime"; // Statique pour l'instant
  const captainImage = "/profile.png"; // Remplacez par l'image réelle du capitaine

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100">
      {/* Header */}
      <HeaderGame />

      {/* Contenu principal */}
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          {isCaptain ? "Vous êtes le capitaine !" : "Le capitaine a été choisi !"}
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          {isCaptain
            ? "Préparez-vous à sélectionner les membres de votre équipage."
            : `${captainName} a été désigné comme capitaine.`}
        </p>

        {/* Photo du capitaine */}
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-purple-500 shadow-lg mb-6">
          <img
            src={captainImage}
            alt="Photo du capitaine"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Indication */}
        {!isCaptain && (
          <p className="text-base text-gray-500">
            Veuillez attendre que le capitaine sélectionne l’équipage.
          </p>
        )}
      </main>

      {/* Footer */}
      <FooterGame />
    </div>
  );
};

export default CaptainChoicePage;
