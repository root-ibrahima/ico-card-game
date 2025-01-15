import React from 'react';

const RejoindrePartie: React.FC = () => {
  return (
    <div className="min-h-screen bg-purple-500 flex flex-col items-center p-4 text-white">
      {/* Header */}
      <header className="w-full flex justify-between items-center mb-4">
        <button className="text-white font-medium">Retour</button>
        <h1 className="text-lg font-semibold">Rejoindre une partie</h1>
        <div className="w-8 h-8"></div>
      </header>

      {/* QR Code Section */}
      <section className="flex flex-col items-center">
        <div className="w-24 h-24 bg-white rounded-md flex items-center justify-center mb-4">
          <span className="text-purple-500 text-4xl">QR</span>
        </div>
        <p className="text-center text-sm mb-6">
          Scannez le QR Code de l&apos;hôte pour rejoindre la partie !
        </p>
      </section>
    </div>
  );
};

export default RejoindrePartie;
