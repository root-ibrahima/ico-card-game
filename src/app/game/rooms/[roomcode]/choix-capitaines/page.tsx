"use client";

import React from "react";
import Image from "next/image";
import { sendMessageToRoom } from "@/lib/socket";
import { Player } from "@/types/index";

interface CaptainChoicePageProps {
  captain: Player;      // L’objet du capitaine (username, avatar, etc.)
  username: string;     // Joueur courant
  roomCode: string;     // Salle
}

const CaptainChoicePage: React.FC<CaptainChoicePageProps> = ({
  captain,
  username,
  roomCode,
}) => {
  // Savoir si on est le capitaine
  const isCaptain = captain?.username === username;

  const confirmCaptainAction = () => {
    if (isCaptain) {
      sendMessageToRoom(username, roomCode, "CAPTAIN_ACTION_CONFIRMED");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center px-4 bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        {isCaptain
          ? "Vous êtes le capitaine !"
          : `${captain.username} est le capitaine !`}
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        {isCaptain
          ? "Sélectionnez les membres de votre équipage."
          : "Veuillez attendre que le capitaine sélectionne l’équipage."}
      </p>
      <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-purple-500 shadow-lg mb-6">
        <Image
          src={captain.avatar || "/default.png"}
          alt="Capitaine"
          width={128}
          height={128}
          className="object-cover w-full h-full"
          unoptimized
        />
      </div>
      {isCaptain && (
        <button
          onClick={confirmCaptainAction}
          className="mt-4 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          Confirmer
        </button>
      )}
    </div>
  );
};

export default CaptainChoicePage;
