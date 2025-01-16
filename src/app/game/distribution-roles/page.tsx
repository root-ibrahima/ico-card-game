import React from 'react';

const DistributionRoles: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4 text-black">
      {/* Header */}
      <header className="w-full flex justify-between items-center mb-4">
        <button className="text-black font-medium">Quitter la partie</button>
        <h1 className="text-lg font-semibold">Distribution des rôles</h1>
        <div className="w-8 h-8 bg-gray-200 rounded-md"></div>
      </header>

      {/* Role Section */}
      <section className="flex flex-col items-center mb-6">
        <div className="w-40 h-40 bg-gray-300 rounded-lg flex items-center justify-center mb-4"></div>
        <h2 className="text-lg font-bold mb-2">Pirate</h2>
        <p className="text-center text-sm text-gray-600">
          Votre mission est de semer la confusion parmi les marins et de les empoisonner !
        </p>
        <p className="text-center text-sm text-gray-500 mt-2">
          Les autres joueurs ont également reçu leurs rôles.
        </p>
      </section>

      {/* Footer Section */}
      <footer className="w-full bg-white p-4 flex justify-between items-center border-t">
        <div className="text-sm text-gray-600">
          Manche <span className="font-bold">0 / 10</span>
        </div>
        <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white">
          <span className="text-lg">⚓</span>
        </div>
        <div className="text-sm text-gray-600">
          Points <span className="font-bold">0 / 0</span>
        </div>
      </footer>
    </div>
  );
};

export default DistributionRoles;
