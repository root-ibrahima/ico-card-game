"use client";

import React from "react";
import Image from "next/image";
import { sendMessageToRoom } from "@/lib/socket";

interface CaptainChoicePageProps {
  isCaptain: boolean; // Indique si l'utilisateur est le capitaine
  captainName: string; // Nom du capitaine
  username: string; // Nom de l'utilisateur
  roomCode: string; // Code de la room
}

const CaptainChoicePage: React.FC<CaptainChoicePageProps> = ({
  isCaptain,
  captainName,
  username,
  roomCode,
}) => {
  const confirmCaptainAction = () => {
    if (isCaptain) {
      sendMessageToRoom(username, roomCode, "CAPTAIN_ACTION_CONFIRMED");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100">
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          {isCaptain ? "Vous êtes le capitaine !" : `${captainName} est le capitaine !`}
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          {isCaptain
            ? "Sélectionnez les membres de votre équipage."
            : "Veuillez attendre que le capitaine sélectionne l’équipage."}
        </p>

        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-purple-500 shadow-lg mb-6">
          <Image
            src={`/avatars/${captainName}.png`} // Placez ici l'avatar réel du capitaine
            alt="Capitaine"
            width={128}
            height={128}
            className="w-full h-full object-cover"
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
      </main>
    </div>
  );
};

export default CaptainChoicePage;
