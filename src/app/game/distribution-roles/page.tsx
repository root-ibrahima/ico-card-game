"use client";

import FooterGame from "../components/FooterGame";
import HeaderGame from "../components/HeaderGame";
import RoleCard from "./RoleCard";

const roleDescriptions: { [key: string]: string } = {
  marin: "Votre mission est de protéger le navire et de démasquer les pirates !",
  pirate: "Votre mission est de semer la confusion parmi les marins et de les empoisonner !",
  sirene: "Utilisez votre charme pour manipuler les joueurs et perturber le jeu !",
  captain: "Vous êtes le narrateur du jeu. Guidez les joueurs et annoncez les événements !",
};
const role = "marin";
const RoleDistribution = () => {

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100">
      {/* Header */}
      <HeaderGame />

      {/* Contenu principal */}
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
        {/* Affichage dynamique du rôle */}
        <RoleCard role={role} description={roleDescriptions[role] || "Rôle inconnu"} />
        <p className="text-base text-gray-500 mt-6">
          Les autres joueurs ont également reçu leurs rôles.
        </p>
      </main>

      {/* Footer */}
      <FooterGame />
    </div>
  );
};

export default RoleDistribution;
