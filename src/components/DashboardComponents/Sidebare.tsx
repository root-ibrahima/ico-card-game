import React, { useState } from "react";
import UserTable from "./UserTable"; // Import du composant utilisateurs
import Image from 'next/image';

export const Sidebare: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeContent, setActiveContent] = useState<string>("Dashboard"); // State pour le contenu actif

  const menuItems = [
    { name: "Dashboard", icon: "/NavbarDashboard/Home.png" },
    { name: "Utilisateurs", icon: "/NavbarDashboard/Gestion des Utilisateurs.png" },
    { name: "Gestion des cartes", icon: "/NavbarDashboard/Festionnaire des cartes.png" },
    { name: "Gestion des Règles", icon: "/NavbarDashboard/Gestion Regles.png" },
    { name: "Statistiques", icon: "/NavbarDashboard/Options Statistiques.png" },
    { name: "Bugs Reports", icon: "/NavbarDashboard/Options Bugs Feedback.png" },
  ];

  const renderContent = () => {
    switch (activeContent) {
      case "Dashboard":
        return <p>Bienvenue sur le Dashboard !</p>;
      case "Utilisateurs":
        return <UserTable />; // Affiche le composant UserTable pour les utilisateurs
      case "Gestion des cartes":
        return (
          <div>
            <h2 className="text-lg font-bold">Gestion des cartes</h2>
            <p>Gérez les cartes du jeu.</p>
          </div>
        );
      case "Gestion des Règles":
        return (
          <div>
            <h2 className="text-lg font-bold">Gestion des règles</h2>
            <p>Définissez et modifiez les règles du jeu.</p>
          </div>
        );
      case "Statistiques":
        return (
          <div>
            <h2 className="text-lg font-bold">Statistiques</h2>
            <p>Affichez les statistiques des joueurs et des parties.</p>
          </div>
        );
      case "Bugs Reports":
        return <p>Signalez et gérez les bugs ici.</p>;
      case "Paramètres":
        return <p>Paramètres du système.</p>;
      default:
        return <p>Sélectionnez un élément du menu.</p>;
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`bg-blue-900 text-white transition-all duration-300 ${
          isOpen ? "w-64 items-start" : "w-16 items-center"
        } flex flex-col justify-between`}
      >
        <div>
          <div className="p-4 flex items-center justify-center">
            <button
              className="text-gray-200 hover:text-white"
              onClick={() => setIsOpen(!isOpen)}
            >
              <Image
                src={isOpen ? "/NavbarDashboard/ArrowLeft.png" : "/NavbarDashboard/ArrowRight.png"}
                alt="Toggle Menu"
                className="h-6 w-6"
              />
            </button>
          </div>
          <nav className="mt-4">
            <ul className={`flex flex-col gap-4 ${isOpen ? "items-start pl-4" : "items-center"}`}>
              {menuItems.map((item, index) => (
                <li
                  key={index}
                  onClick={() => setActiveContent(item.name)}
                  className={`flex items-center gap-4 p-2 w-full cursor-pointer transition-opacity duration-300 ${
                    activeContent === item.name
                      ? "bg-blue-700 text-white opacity-100"
                      : "hover:bg-blue-700 opacity-75"
                  } ${isOpen ? "justify-start" : "justify-center"}`}
                >
                  <Image src={item.icon} alt={item.name} className="h-6 w-6" />
                  {isOpen && <span className="whitespace-nowrap">{item.name}</span>}
                </li>
              ))}
              <li>
                <button
                  className={`flex items-center gap-4 w-full hover:bg-blue-700 p-2 justify-center ${
                    activeContent === "Paramètres" ? "bg-blue-700 text-white" : ""
                  }`}
                  onClick={() => setActiveContent("Paramètres")}
                >
                  <Image
                    src="/NavbarDashboard/Options.png"
                    alt="Paramètres"
                    width={24}
                    height={24}
                    className="h-6 w-6"
                  />
                  {isOpen && <span>Paramètres</span>}
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 transition-all duration-300">
        <h1 className="text-2xl transition-opacity duration-300 opacity-100">
          {activeContent}
        </h1>
        <div className="mt-4 transition-opacity duration-300 opacity-100">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};