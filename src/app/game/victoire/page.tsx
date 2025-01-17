"use client";

import React from "react";

// Composant pour afficher le message
const VictoryMessage: React.FC<{ winner: string }> = ({ winner }) => {
  const messages = {
    pirate: "Les pirates remportent la victoire !",
    marin: "Les marins remportent la victoire !",
    siren: "La sirène remporte la victoire !",
  };

  const subMessages = {
    pirate: "Les pirates ont empoisonée l'équipage.",
    marin: "Les marins ont protégé le trésor avec succès.",
    siren: "La sirène a été correctement identifiée.",
  };

  return (
    <div className="text-center text-white mt-24">
      <h1 className="text-2xl font-bold">{messages.siren}</h1>
      <p className="text-lg mt-2">{subMessages.siren}</p>
    </div>
  );
};

// Composant pour afficher l'image du personnage
const CharacterImage: React.FC<{ winner: string }> = ({ winner }) => {
  const characterImages = {
    pirate: "/img/Pirate.png",
    marin: "/img/Marin.png",
    siren: "/img/Siren.png",
  };

  return (
    <img
      src={characterImages.siren}
      alt={winner}
      className="mt-6 w-40 h-auto"
    />
  );
};

// Composant pour le bouton "Terminer la partie"
const EndGameButton: React.FC = () => {
  const handleEndGame = () => {
    console.log("Partie terminée.");
  };

  return (
    <div className="mb-8">
      <button
        className="bg-blue-500 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-blue-600"
        onClick={handleEndGame}
      >
        Terminer la partie
      </button>
    </div>
  );
};

// Composant principal pour organiser les sous-composants
const VictoryDetails: React.FC<{ winner: string }> = ({ winner }) => {
  return (
    <div
      className="relative w-[] h-screen bg-cover bg-center flex flex-col items-center justify-between"
      style={{ backgroundImage: "url('/img/Endgame.png')" }}
    >
      {/* Contenu principal */}
      <VictoryMessage winner={winner} />
      <CharacterImage winner={winner} />
      <EndGameButton />
    </div>
  );
};

export default VictoryDetails;
