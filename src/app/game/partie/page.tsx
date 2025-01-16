import React from 'react';

const Partie: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4">
      {/* Header */}
      <header className="w-full flex justify-between items-center">
        <h1 className="text-lg font-semibold text-gray-800">
          Bon retour, <span className="text-purple-600">James</span> !
        </h1>
        <div className="w-8 h-8 bg-gray-200 rounded-md"></div>
      </header>

      {/* Main Actions */}
      <div className="mt-6 w-full space-y-4">
        <button className="w-full bg-purple-500 text-white py-3 rounded-lg shadow-sm text-lg">
          Démarrer une partie
        </button>
        <button className="w-full bg-gray-900 text-white py-3 rounded-lg shadow-sm text-lg">
          Rejoindre une partie
        </button>
      </div>

      {/* Stats Section */}
      <section className="mt-8 w-full bg-white p-4 rounded-lg shadow-sm">
        <h2 className="text-gray-800 text-lg font-medium mb-4">Mes statistiques</h2>
        <div className="flex justify-around">
          <div className="flex flex-col items-center">
            <div className="text-2xl font-bold">25</div>
            <div className="text-gray-500 text-sm">Parties jouées</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-2xl font-bold">17</div>
            <div className="text-gray-500 text-sm">Victoires</div>
          </div>
        </div>
      </section>

      {/* Bonus Cards */}
      <section className="mt-8 w-full bg-white p-4 rounded-lg shadow-sm">
        <h2 className="text-gray-800 text-lg font-medium mb-4">Cartes bonus gagnées</h2>
        <div className="grid grid-cols-2 gap-4">
          {/* Card 1 */}
          <div className="flex flex-col items-center bg-gray-100 p-4 rounded-lg">
            <div className="w-12 h-12 bg-gray-300 rounded-full mb-4"></div>
            <h3 className="font-medium text-gray-700">Double</h3>
            <p className="text-gray-500 text-sm text-center">
              Votre vote compte double pour cette manche...
            </p>
          </div>
          {/* Card 2 */}
          <div className="flex flex-col items-center bg-gray-100 p-4 rounded-lg">
            <div className="w-12 h-12 bg-gray-300 rounded-full mb-4"></div>
            <h3 className="font-medium text-gray-700">Leviathan</h3>
            <p className="text-gray-500 text-sm text-center">
              Vous pouvez annuler une carte bonus utilisée...
            </p>
          </div>
        </div>
      </section>

      {/* Rules Section */}
      <section className="mt-8 w-full bg-white p-4 rounded-lg shadow-sm">
        <h2 className="text-gray-800 text-lg font-medium mb-4">Règles du jeu</h2>
        <p className="text-gray-600 text-sm">
          ICO est un jeu de société numérique où pirates et sirènes s&apos;affrontent pour le contrôle...
        </p>
        <button className="mt-4 text-purple-600 font-medium">
          En savoir plus
        </button>
      </section>
    </div>
  );
};

export default Partie;
