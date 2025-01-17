"use client";

import FooterGame from "../components/FooterGame";
import HeaderGame from "../components/HeaderGame";
import RoleCard from "./RoleCard";

const RoleDistribution = () => {
  
  const role = "pirate"; // Exemple statique
  const description =
    "Votre mission est de semer la confusion parmi les marins et de les empoisonner !";

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100">
      {/* Header */}
      <HeaderGame />

      {/* Contenu principal */}
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
        {/* Utilisation du RoleCard */}
        <RoleCard role={role} description={description} />
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
