"use client"; 
import React from "react";
import RoleCard from "./RoleCard";
import { RoleDistributionProps } from "@/types";


// Exemple de description pour chaque rôle
const roleDescriptions: Record<string, string> = {
  marin: "Votre mission est de protéger le navire et de démasquer les pirates !",
  pirate: "Votre mission est de semer la confusion parmi les marins et de les empoisonner !",
  sirene: "Utilisez votre charme pour manipuler les joueurs et perturber le jeu !",
  captain: "Vous êtes le narrateur du jeu. Guidez les joueurs et annoncez les événements !",
};

const RoleDistribution: React.FC<RoleDistributionProps> = ({
  role,
  username,
  roomCode,
  onConfirmRole,
}) => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center px-4">
      {/* Affiche la carte du rôle */}
      <RoleCard
        role={role}
        description={roleDescriptions[role.toLowerCase()] || "Rôle inconnu"}
      />

      <p className="text-base text-gray-500 mt-6">
        Bonjour <strong>{username}</strong>, vous êtes dans la salle <strong>{roomCode}</strong>.
      </p>
      <p className="text-base text-gray-500 mt-2">
        Les autres joueurs ont également reçu leurs rôles.
      </p>

      <button
        onClick={onConfirmRole}
        className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        ✅ J'ai compris mon rôle
      </button>
    </div>
  );
};

export default RoleDistribution;
