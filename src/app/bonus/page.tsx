import React from 'react';

const Bonus: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4">
      {/* Header */}
      <header className="w-full flex justify-between items-center">
        <h1 className="text-lg font-semibold text-gray-800">Cartes bonus</h1>
        <div className="w-8 h-8 bg-gray-200 rounded-md"></div>
      </header>

      {/* Stats Section */}
      <section className="mt-6 w-full bg-white p-4 rounded-lg shadow-sm">
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
        <div className="mt-4 w-full bg-gray-100 rounded-full h-6 relative">
          <div
            className="bg-purple-500 h-full rounded-full"
            style={{ width: '63%' }}
          ></div>
          <span className="absolute top-0 left-1/2 transform -translate-x-1/2 text-sm text-gray-800 font-medium">
            63 %
          </span>
        </div>
      </section>

      {/* Bonus Cards */}
      <section className="mt-8 w-full bg-white p-4 rounded-lg shadow-sm">
        <h2 className="text-gray-800 text-lg font-medium mb-4">Cartes bonus gagnées</h2>
        <div className="grid grid-cols-2 gap-4">
          {/* Card 1 */}
          <div className="flex flex-col items-center bg-gray-100 p-4 rounded-lg">
            <div className="w-12 h-12 bg-gray-300 rounded-full mb-4"></div>
            <h3 className="font-medium text-gray-700">Leviathan</h3>
            <p className="text-gray-500 text-sm text-center">
              Une carte rare qui...
            </p>
          </div>
          {/* Card 2 */}
          <div className="flex flex-col items-center bg-gray-100 p-4 rounded-lg">
            <div className="w-12 h-12 bg-gray-300 rounded-full mb-4"></div>
            <h3 className="font-medium text-gray-700">Méduse</h3>
            <p className="text-gray-500 text-sm text-center">
              Une carte rare qui...
            </p>
          </div>
          {/* Card 3 */}
          <div className="flex flex-col items-center bg-gray-100 p-4 rounded-lg">
            <div className="w-12 h-12 bg-gray-300 rounded-full mb-4"></div>
            <h3 className="font-medium text-gray-700">Typhon</h3>
            <p className="text-gray-500 text-sm text-center">
              Une carte rare qui...
            </p>
          </div>
          {/* Card 4 */}
          <div className="flex flex-col items-center bg-gray-100 p-4 rounded-lg">
            <div className="w-12 h-12 bg-gray-300 rounded-full mb-4"></div>
            <h3 className="font-medium text-gray-700">Solitaire</h3>
            <p className="text-gray-500 text-sm text-center">
              Une carte rare qui...
            </p>
          </div>
          {/* Locked Cards */}
          <div className="flex flex-col items-center bg-gray-200 p-4 rounded-lg">
            <div className="w-12 h-12 bg-gray-400 rounded-full mb-4"></div>
            <h3 className="font-medium text-gray-500">Double</h3>
            <p className="text-gray-400 text-sm text-center">Carte verrouillée</p>
          </div>
          <div className="flex flex-col items-center bg-gray-200 p-4 rounded-lg">
            <div className="w-12 h-12 bg-gray-400 rounded-full mb-4"></div>
            <h3 className="font-medium text-gray-500">Charlatan</h3>
            <p className="text-gray-400 text-sm text-center">Carte verrouillée</p>
          </div>
          <div className="flex flex-col items-center bg-gray-200 p-4 rounded-lg">
            <div className="w-12 h-12 bg-gray-400 rounded-full mb-4"></div>
            <h3 className="font-medium text-gray-500">Perroquet</h3>
            <p className="text-gray-400 text-sm text-center">Carte verrouillée</p>
          </div>
          <div className="flex flex-col items-center bg-gray-200 p-4 rounded-lg">
            <div className="w-12 h-12 bg-gray-400 rounded-full mb-4"></div>
            <h3 className="font-medium text-gray-500">Chameaux</h3>
            <p className="text-gray-400 text-sm text-center">Carte verrouillée</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Bonus;
