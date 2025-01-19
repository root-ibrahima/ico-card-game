"use client";

import { useEffect, useState } from "react";
import RoleCard from "./RoleCard";
import { sendMessageToRoom } from "@/lib/socket";

const roleDescriptions: { [key: string]: string } = {
  marin: "Votre mission est de protéger le navire et de démasquer les pirates !",
  pirate: "Votre mission est de semer la confusion parmi les marins et de les empoisonner !",
  sirene: "Utilisez votre charme pour manipuler les joueurs et perturber le jeu !",
  captain: "Vous êtes le narrateur du jeu. Guidez les joueurs et annoncez les événements !",
};

interface RoleDistributionProps {
  role: string; // Le rôle est passé en tant qu'argument
  username: string; // Nom du joueur
  roomCode: string; // Code de la room
}

const RoleDistribution: React.FC<RoleDistributionProps> = ({ role, username, roomCode }) => {
  const confirmRole = () => {
    sendMessageToRoom(username, roomCode, "ROLE_CONFIRMED");
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100">
      {/* Contenu principal */}
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
        {/* Affichage dynamique du rôle */}
        <RoleCard role={role} description={roleDescriptions[role] || "Rôle inconnu"} />
        <p className="text-base text-gray-500 mt-6">
          Les autres joueurs ont également reçu leurs rôles.
        </p>
        <button
          onClick={confirmRole}
          className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Suivant
        </button>
      </main>
    </div>
  );
};

export default RoleDistribution;
