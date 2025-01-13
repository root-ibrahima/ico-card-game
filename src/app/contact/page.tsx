"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createGame } from "@/utils/gameApi";

const CreateGamePage: React.FC = () => {
  const [playerNames, setPlayerNames] = useState<string[]>([""]); // Liste des joueurs
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAddPlayer = () => {
    setPlayerNames([...playerNames, ""]);
  };

  const handlePlayerNameChange = (index: number, name: string) => {
    const updatedNames = [...playerNames];
    updatedNames[index] = name;
    setPlayerNames(updatedNames);
  };

  const handleCreateGame = async () => {
    if (playerNames.some((name) => name.trim() === "")) {
      alert("Tous les noms des joueurs doivent être remplis.");
      return;
    }

    setLoading(true);
    try {
      const newGame = await createGame(playerNames);
      router.push(`/game/${newGame.id}`); // Rediriger vers la page de la partie
    } catch (error) {
      console.error("Erreur lors de la création de la partie :", error);
      alert("Impossible de créer la partie.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-16 min-h-screen flex flex-col items-center bg-gradient-to-b from-blue-100 to-indigo-200 py-10">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Créer une Nouvelle Partie 🎮</h1>

      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Joueurs</h2>

        {playerNames.map((name, index) => (
          <div key={index} className="mb-4">
            <input
              type="text"
              value={name}
              onChange={(e) => handlePlayerNameChange(index, e.target.value)}
              placeholder={`Nom du joueur ${index + 1}`}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
        ))}

        <button
          onClick={handleAddPlayer}
          className="w-full px-4 py-2 mb-4 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition duration-300"
        >
          Ajouter un joueur
        </button>

        <button
          onClick={handleCreateGame}
          disabled={loading}
          className={`w-full px-4 py-2 text-white font-medium rounded-md ${
            loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          } transition duration-300`}
        >
          {loading ? "Création en cours..." : "Créer la partie"}
        </button>
      </div>
    </div>
  );
};

export default CreateGamePage;
