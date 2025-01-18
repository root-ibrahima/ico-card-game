import { useState } from "react";
import Image from "next/image";

const HeaderGame: React.FC = () => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleQuit = () => {
    setShowConfirm(false); // Ferme le modal
    // Redirection ou toute autre logique pour quitter la partie
    window.location.href = "/";
  };

  return (
    <header className="relative flex justify-between items-center p-4 bg-white shadow-md">
      {/* Bouton quitter la partie */}
      <button
        onClick={() => setShowConfirm(true)}
        className="text-gray-700 hover:text-gray-900 text-sm font-semibold flex items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5 mr-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
        Quitter la partie
      </button>

      {/* Photo de profil */}
      <div className="w-10 h-10 rounded-full overflow-hidden">
        <Image
          src="/profile.png" // Chemin de l'image du profil
          alt="Photo de profil"
          width={40}
          height={40}
        />
      </div>

      {/* Modal de confirmation */}
      {showConfirm && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center">
            <h3 className="text-lg font-semibold mb-4">Quitter la partie ?</h3>
            <p className="text-gray-600 mb-6">
              Êtes-vous sûr(e) de vouloir quitter la partie ? Vous ne pourrez plus revenir.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleQuit}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Oui, quitter
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default HeaderGame;
