import React, { useState } from "react";

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const menuItems = [
    { name: "Dashboard", icon: "/NavbarDashboard/Home.png" },
    { name: "Utilisateurs", icon: "/NavbarDashboard/Gestion des Utilisateurs.png" },
    { name: "Gestion des cartes", icon: "/NavbarDashboard/Festionnaire des cartes.png" },
    { name: "Gestion des Règles", icon: "/NavbarDashboard/Gestion Regles.png" },
    { name: "Statistiques", icon: "/NavbarDashboard/Options Statistiques.png" },
    { name: "Bugs Reports", icon: "/NavbarDashboard/Options Bugs Feedback.png" },
    { name: "Paramètres", icon: "/NavbarDashboard/Options.png" },
  ];

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
              <img
                src={isOpen ? "/NavbarDashboard/ArrowLeft.png" : "/NavbarDashboard/ArrowRight.png"}
                alt="Toggle Menu"
                className="h-6 w-6"
              />
            </button>
          </div>
          <nav className="mt-4">
            <ul className={`flex flex-col gap-4 ${isOpen ? "items-start pl-4" : "items-center"}`}>
              {menuItems.slice(0, -1).map((item, index) => (
                <li
                  key={index}
                  className={`flex items-center gap-4 p-2 hover:bg-blue-700 w-full ${
                    isOpen ? "justify-start" : "justify-center"
                  }`}
                >
                  <img
                    src={item.icon}
                    alt={item.name}
                    className="h-6 w-6"
                  />
                  {isOpen && <span className="whitespace-nowrap">{item.name}</span>}
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div
          className={`p-4 w-full flex ${
            isOpen ? "justify-start pl-4" : "justify-center"
          }`}
        >
          <button className="flex items-center gap-4 p-2 w-full hover:bg-blue-700">
            <img
              src="/NavbarDashboard/Options.png"
              alt="Settings"
              className="h-6 w-6"
            />
            {isOpen && <span>Paramètres</span>}
          </button>
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
