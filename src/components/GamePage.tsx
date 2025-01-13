import React, { useEffect, useState } from "react";
import { useGame } from "../context/GameContext";
import GameBoard from "@/components/GameBoard";
import type { Player } from "@/types/index";



// Liste des rôles disponibles
const ROLES = ["marin", "pirate", "sirène"] as const;
type Role = (typeof ROLES)[number]; // Type strict pour les rôles

const GamePage: React.FC = () => {
  const { state, dispatch } = useGame();

  // États locaux pour ajouter des joueurs
  const [newPlayerName, setNewPlayerName] = useState<string>("");
  const [newPlayerRole, setNewPlayerRole] = useState<Role>("marin");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Initialisation des joueurs via une API ou une source dynamique
  useEffect(() => {
    const fetchInitialPlayers = async () => {
      setIsLoading(true);
      try {
        // Simulez une requête vers une API ou une autre source de données
        const response = await fetch("/api/players"); // Remplacez par l'URL réelle de votre API
        const players: Player[] = await response.json();

        // Dispatch les joueurs obtenus
        players.forEach((player) => {
          dispatch({ type: "ADD_PLAYER", payload: player });
        });

        dispatch({ type: "NEXT_TURN" }); // Démarrer le premier tour
      } catch (error) {
        console.error("Erreur lors de la récupération des joueurs :", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (state.players.length === 0) {
      fetchInitialPlayers();
    }
  }, [state.players.length, dispatch]);

  // Ajouter un joueur
  const handleAddPlayer = () => {
    if (!newPlayerName.trim()) {
      alert("Veuillez entrer un nom pour le joueur.");
      return;
    }

    const newPlayer: Player = {
      id: (state.players.length + 1).toString(), // Convertir l'ID en chaîne de caractères
      name: newPlayerName.trim(),
      role: newPlayerRole,
      isCaptain: false,
    };

    dispatch({ type: "ADD_PLAYER", payload: newPlayer });
    setNewPlayerName(""); // Réinitialise l'entrée du nom
  };

  // Supprimer un joueur
  const handleRemovePlayer = (id: string) => {
    if (!id) {
      console.error("ID invalide pour le joueur :", id);
      return;
    }
    dispatch({ type: "REMOVE_PLAYER", payload: id });
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Tableau des joueurs</h1>

      {/* Affiche le tableau des joueurs */}
      {isLoading ? (
        <p>Chargement des joueurs...</p>
      ) : (
        <GameBoard players={state.players} />
      )}

      {/* Ajouter un joueur */}
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-4">Ajouter un joueur</h2>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newPlayerName}
            onChange={(e) => setNewPlayerName(e.target.value)}
            placeholder="Nom du joueur"
            className="border p-2 rounded w-full"
          />
          <select
            value={newPlayerRole}
            onChange={(e) => setNewPlayerRole(e.target.value as Role)}
            className="border p-2 rounded"
          >
            {ROLES.map((role) => (
              <option key={role} value={role}>
                {role.charAt(0).toUpperCase() + role.slice(1)} {/* Capitalise */}
              </option>
            ))}
          </select>
          <button
            onClick={handleAddPlayer}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Ajouter
          </button>
        </div>
      </div>

      {/* Supprimer un joueur */}
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-4">Supprimer un joueur</h2>
        {state.players.map((player) => (
          <div
            key={player.id}
            className="flex items-center justify-between mb-2"
          >
            <span>
              {player.name} ({player.role})
            </span>
            <button
              onClick={() => handleRemovePlayer(player.id)} // Assure que l'ID est une chaîne
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Supprimer
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GamePage;
