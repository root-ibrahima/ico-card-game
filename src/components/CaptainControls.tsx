import React from 'react';

type CaptainControlsProps = {
  onStartGame: () => void; // Fonction appelée pour démarrer la partie
  onPauseGame: () => void; // Fonction appelée pour mettre la partie en pause
  onEndGame: () => void; // Fonction appelée pour terminer la partie
  gameStatus: 'en attente' | 'en cours' | 'en pause' | 'terminé'; // Statut actuel du jeu
};

const CaptainControls: React.FC<CaptainControlsProps> = ({
  onStartGame,
  onPauseGame,
  onEndGame,
  gameStatus,
}) => {
  return (
    <div className="bg-gray-200 dark:bg-gray-700 p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">
        Contrôles du Capitaine
      </h2>
      <p className="text-gray-600 dark:text-gray-400">Statut : {gameStatus}</p>
      <div className="flex space-x-4 mt-4">
        {/* Bouton pour démarrer la partie */}
        <button
          onClick={onStartGame}
          disabled={gameStatus !== 'en attente'}
          className={`px-4 py-2 rounded text-white shadow ${
            gameStatus === 'en attente'
              ? 'bg-green-500 hover:bg-green-600'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          Démarrer
        </button>

        {/* Bouton pour mettre en pause la partie */}
        <button
          onClick={onPauseGame}
          disabled={gameStatus !== 'en cours'}
          className={`px-4 py-2 rounded text-white shadow ${
            gameStatus === 'en cours'
              ? 'bg-yellow-500 hover:bg-yellow-600'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          Pause
        </button>

        {/* Bouton pour terminer la partie */}
        <button
          onClick={onEndGame}
          disabled={gameStatus === 'en attente' || gameStatus === 'terminé'}
          className={`px-4 py-2 rounded text-white shadow ${
            gameStatus !== 'en attente' && gameStatus !== 'terminé'
              ? 'bg-red-500 hover:bg-red-600'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          Terminer
        </button>
      </div>
    </div>
  );
};

export default CaptainControls;
