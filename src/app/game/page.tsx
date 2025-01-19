'use client';

import Image from 'next/image';
import Link from 'next/link';

const RoleDistribution = () => {
  const role = 'pirate'; // Exemple : rôle actuel, à remplacer par des données dynamiques
  const description =
    "Votre mission est de semer la confusion parmi les marins et de les empoisonner !";

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100">
      {/* Header */}
      <header className="flex justify-between items-center p-4">
        {/* Bouton quitter la partie */}
        <Link href="/">
          <button className="text-gray-700 hover:text-gray-900 text-sm font-semibold">
            Quitter la partie
          </button>
        </Link>

        {/* Photo de profil */}
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <Image
            src="" // Remplacez par le chemin réel de votre photo
            alt="Photo de profil"
            width={40}
            height={40}
          />
        </div>
      </header>

      {/* Contenu principal */}
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
        {/* Image du rôle */}
        <div className="w-48 h-48 mb-8">
          <Image
            src={`/cartes/bonus/Carte-${role}.png`} // Image basée sur le rôle
            alt={role}
            width={192}
            height={192}
            className="rounded-lg object-cover"
          />
        </div>

        {/* Titre et description */}
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Votre rôle : {role.charAt(0).toUpperCase() + role.slice(1)}
        </h2>
        <p className="text-lg text-gray-600 mb-8">{description}</p>

        {/* Indication */}
        <p className="text-base text-gray-500">
          Les autres joueurs ont également reçu leurs rôles.
        </p>
      </main>

    </div>
  );
};

export default RoleDistribution;