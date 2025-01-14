"use client";

import React from "react";

const ReglesDuJeu = () => {
  return (
    <div className="bg-gray-50 min-h-screen p-4">
      {/* Header */}
      <header className="text-center my-4">
        <h1 className="text-2xl font-bold text-gray-900">Règles du jeu</h1>
        <p className="text-gray-700 mt-2">
          ICO est un jeu de société numérique où pirates, marins et sirènes
          s’affrontent pour le contrôle d’un trésor en mer. Chaque équipe a un
          objectif différent : les pirates doivent gagner la confiance des
          marins et empoisonner l’équipage, tandis que les marins et la sirène
          doivent identifier les pirates et protéger le trésor.
        </p>
      </header>

      {/* Objectifs du jeu */}
      <section className="my-8">
        <h2 className="text-xl font-semibold text-gray-800">Objectifs du jeu</h2>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="p-4 bg-white shadow rounded-md">
            <div className="w-full h-32 bg-gray-200 rounded-md mb-4 flex items-center justify-center">
              {/* Placeholder pour l'image */}
              <span className="text-gray-500 text-sm">Image</span>
            </div>
            <h3 className="text-lg font-medium text-gray-800">
              Marins & Sirènes
            </h3>
            <p className="text-gray-700">
              Identifier les pirates et sécuriser le trésor.
            </p>
          </div>
          <div className="p-4 bg-white shadow rounded-md">
            <div className="w-full h-32 bg-gray-200 rounded-md mb-4 flex items-center justify-center">
              {/* Placeholder pour l'image */}
              <span className="text-gray-500 text-sm">Image</span>
            </div>
            <h3 className="text-lg font-medium text-gray-800">Pirates</h3>
            <p className="text-gray-700">
              Gagner la confiance des marins et empoisonner l’équipage sans se
              faire repérer.
            </p>
          </div>
        </div>
      </section>

     {/* Rôles du jeu */}
        <section className="my-8">
        <h2 className="text-xl font-semibold text-gray-800 text-center">Rôles du jeu</h2>
        {/* Conteneur principal */}
        <div className="flex justify-center mt-4">
            {/* Conteneur déroulant (scrollable sur mobile, centré sur PC) */}
            <div className="flex space-x-4 overflow-x-scroll md:overflow-x-auto md:justify-center pb-4 max-w-screen-lg">
            {/* Carte 1 */}
            <div className="flex-shrink-0 w-60 p-4 bg-white shadow rounded-md">
                <div className="w-full h-32 bg-gray-200 rounded-md mb-4 flex items-center justify-center">
                {/* Placeholder pour l'image */}
                <span className="text-gray-500 text-sm">Image</span>
                </div>
                <h3 className="text-lg font-medium text-gray-800">Pirates</h3>
                <p className="text-gray-700">
                Les pirates doivent empoisonner les marins et éviter d’être démasqués.
                </p>
            </div>
            {/* Carte 2 */}
            <div className="flex-shrink-0 w-60 p-4 bg-white shadow rounded-md">
                <div className="w-full h-32 bg-gray-200 rounded-md mb-4 flex items-center justify-center">
                {/* Placeholder pour l'image */}
                <span className="text-gray-500 text-sm">Image</span>
                </div>
                <h3 className="text-lg font-medium text-gray-800">Marins</h3>
                <p className="text-gray-700">
                Les marins doivent protéger le trésor en choisissant les bons équipages.
                </p>
            </div>
            {/* Carte 3 */}
            <div className="flex-shrink-0 w-60 p-4 bg-white shadow rounded-md">
                <div className="w-full h-32 bg-gray-200 rounded-md mb-4 flex items-center justify-center">
                {/* Placeholder pour l'image */}
                <span className="text-gray-500 text-sm">Image</span>
                </div>
                <h3 className="text-lg font-medium text-gray-800">Sirène</h3>
                <p className="text-gray-700">
                La sirène aide les marins à démasquer les pirates tout en restant secrète.
                </p>
            </div>
            </div>
        </div>
        </section>



      {/* Déroulement du jeu */}
      <section className="my-8">
        <h2 className="text-xl font-semibold text-gray-800">
          Déroulement du jeu
        </h2>
        <div className="mt-4 space-y-4">
          <div className="p-4 bg-white shadow rounded-md">
            <h3 className="text-lg font-medium text-gray-800">
              Choix de l’équipage
            </h3>
            <p className="text-gray-700">
              Le capitaine choisit un équipage de trois joueurs. Chaque joueur
              pose secrètement une carte et l’équipage est validé ou rejeté par
              un vote collectif.
            </p>
          </div>
          <div className="p-4 bg-white shadow rounded-md">
            <h3 className="text-lg font-medium text-gray-800">
              Vote pour l’équipage
            </h3>
            <p className="text-gray-700">
              Tous les joueurs votent pour accepter ou rejeter l’équipage. S’il
              est rejeté, un nouvel équipage est proposé.
            </p>
          </div>
          <div className="p-4 bg-white shadow rounded-md">
            <h3 className="text-lg font-medium text-gray-800">
              Utilisation des cartes bonus 
            </h3>
            <p className="text-gray-700">
            Les joueurs peuvent utiliser des cartes bonus pour modifier l’issue Voyage, Ces peuvent 
            avoir des effets puissants ! 
            </p>
          </div>
        </div>
      </section>
      {/* Cartes du jeu */}
        <section className="my-8">
        <h2 className="text-xl font-semibold text-gray-800">
            Cartes du jeu
        </h2>
        <div className="flex justify-center mt-4 space-x-4">
            {/* Carte 1 - Île */}
            <div className="w-40 bg-white shadow rounded-lg p-4 flex flex-col items-center">
            <div className="w-24 h-24 bg-gray-200 rounded-md mb-4 flex items-center justify-center">
                {/* Placeholder pour l'image */}
                <span className="text-gray-500 text-sm">Image</span>
            </div>
            <h3 className="text-lg font-medium text-gray-800">Île</h3>
            <p className="text-gray-700 text-center">
                Permet de sécuriser l’équipage et protéger le trésor.
            </p>
            </div>

            {/* Carte 2 - Poison */}
            <div className="w-40 bg-white shadow rounded-lg p-4 flex flex-col items-center">
            <div className="w-24 h-24 bg-gray-200 rounded-md mb-4 flex items-center justify-center">
                {/* Placeholder pour l'image */}
                <span className="text-gray-500 text-sm">Image</span>
            </div>
            <h3 className="text-lg font-medium text-gray-800">Poison</h3>
            <p className="text-gray-700 text-center">
                Permet de tenter d’empoisonner un membre de l’équipage.
            </p>
            </div>
        </div>
        </section>
      <section className="my-8">
      <h2 className="text-xl font-semibold text-gray-800">
        Conditions de victoire 
        </h2>
        <div className="mt-4 space-y-4">
          <div className="p-4 bg-white shadow rounded-md">
            <h3 className="text-lg font-medium text-gray-800">
             Marins & Sirènes 
            </h3>
            <div className="w-full h-32 bg-gray-200 rounded-md mb-4 flex items-center justify-center">
              {/* Placeholder pour l'image */}
              <span className="text-gray-500 text-sm">Image</span>
            </div>
            <p className="text-gray-700">
            Les marins doivent choisir les bons équipages 
            pour sécuriser le trésor et empêcher les pirates 
            de gagner. Ils n’ont pas connaissance des rôles 
            dos autres joueurs et doivent se fier aux 
            comportements et aux votes. 
            </p>
          </div>
          <div className="p-4 bg-white shadow rounded-md">
            <h3 className="text-lg font-medium text-gray-800">
             Pirates 
            </h3>
            <div className="w-full h-32 bg-gray-200 rounded-md mb-4 flex items-center justify-center">
              {/* Placeholder pour l'image */}
              <span className="text-gray-500 text-sm">Image</span>
            </div>
            <p className="text-gray-700">
                Les pirates gagnent en empoisonnant 
                l’équipage et en atteignant un certain nombre 
                de ils doivent ensuite 
                identifier la sirène pour gagner définitivement. 
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ReglesDuJeu;
