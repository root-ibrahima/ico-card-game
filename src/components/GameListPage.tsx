"use client";

import React, { useEffect, useState } from "react";
import { getGames } from "@/utils/gameApi";

interface Game {
  id: string;
  players: string[];
  status: "waiting" | "in-progress" | "finished";
}

const GameListPage: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      try {
        const gamesData = await getGames();
        setGames(gamesData);
      } catch (error) {
        console.error("Erreur lors de la récupération des parties :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  return (
    <div className="pt-16 min-h-screen flex flex-col items-center bg-gradient-to-b from-blue-100 to-indigo-200 py-10">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Liste des Parties Disponibles 🎮</h1>

      <div className="w-full max-w-4xl">
        {loading ? (
          <p className="text-center text-gray-600">Chargement...</p>
        ) : games.length === 0 ? (
          <p className="text-center text-gray-600">Aucune partie disponible.</p>
        ) : (
          <ul className="space-y-4">
            {games.map((game) => (
              <li key={game.id} className="bg-white shadow-lg rounded-lg p-4">
                <h2 className="text-xl font-bold text-blue-600">Partie #{game.id}</h2>
                <p className="text-gray-700">Joueurs : {game.players.join(", ")}</p>
                <p className="text-gray-500 italic">Statut : {game.status}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default GameListPage;
