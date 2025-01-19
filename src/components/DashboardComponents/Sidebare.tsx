import React, { useState } from "react";

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`bg-blue-900 text-white transition-all duration-300 ${
          isOpen ? "w-64" : "w-16"
        }`}
      >
        <div className="p-4">
          <button
            className="text-gray-200 hover:text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? "Fermer" : "Ouvrir"}
          </button>
        </div>
        <nav className="mt-4">
          <ul>
            <li className="p-2 hover:bg-blue-700">
              <a href="#">Dashboard</a>
            </li>
            <li className="p-2 hover:bg-blue-700">
              <a href="#">Utilisateurs</a>
            </li>
            <li className="p-2 hover:bg-blue-700">
              <a href="#">Gestion des cartes</a>
            </li>
            <li className="p-2 hover:bg-blue-700">
              <a href="#">Gestion des Règles</a>
            </li>
            <li className="p-2 hover:bg-blue-700">
              <a href="#">Statistiques</a>
            </li>
            <li className="p-2 hover:bg-blue-700">
              <a href="#">Bugs Reports</a>
            </li>
          </ul>
        </nav>
        <div className="absolute bottom-4 w-full text-center">
          <button className="p-2 w-full hover:bg-blue-700">Paramètres</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4">
        <h1 className="text-2xl">
          Dashboard - {isOpen ? "Menu Ouvert" : "Menu Fermé"}
        </h1>
        <p>Contenu principal ici.</p>
      </div>
    </div>
  );
};

export default Sidebar;
