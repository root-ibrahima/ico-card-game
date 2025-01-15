import React from 'react';

const CreationPartie: React.FC = () => {
  return (
    <div className="min-h-screen bg-purple-500 flex flex-col items-center p-4 text-white">
      {/* Header */}
      <header className="w-full flex justify-between items-center mb-4">
        <button className="text-white font-medium">Retour</button>
        <h1 className="text-lg font-semibold">Lancement de la partie</h1>
        <div className="w-8 h-8"></div>
      </header>

      {/* QR Code Section */}
      <section className="flex flex-col items-center">
        <div className="w-24 h-24 bg-white rounded-md flex items-center justify-center mb-4">
          <span className="text-purple-500 text-4xl">QR</span>
        </div>
        <p className="text-center text-sm mb-6">
          Les autres joueurs peuvent scanner ce QR code pour rejoindre cette partie !
        </p>
      </section>

      {/* Players Section */}
      <section className="grid grid-cols-4 gap-4 w-full mb-6">
        <div className="w-full h-16 bg-gray-300 rounded-lg flex items-center justify-center">
          Ibrahima
        </div>
        <div className="w-full h-16 bg-gray-300 rounded-lg flex items-center justify-center">
          Damien
        </div>
        <div className="w-full h-16 bg-gray-300 rounded-lg flex items-center justify-center">
          Alexandre
        </div>
        <div className="w-full h-16 bg-gray-300 rounded-lg flex items-center justify-center">
          Sebastian
        </div>
        <div className="w-full h-16 bg-gray-300 rounded-lg flex items-center justify-center">
          Maxime
        </div>
        <div className="w-full h-16 bg-gray-300 rounded-lg flex items-center justify-center">
          Valentin
        </div>
        <div className="w-full h-16 bg-gray-300 rounded-lg flex items-center justify-center">
          Massessilia
        </div>
        <div className="w-full h-16 bg-purple-700 rounded-lg flex items-center justify-center">
          ...
        </div>
      </section>

      {/* Start Button */}
      <button className="w-full bg-white text-purple-500 py-3 rounded-lg font-medium">
        Commencer la partie
      </button>
    </div>
  );
};

export default CreationPartie;
