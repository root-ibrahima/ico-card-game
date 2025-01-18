"use client";

import { useEffect, useState } from "react";
import { connectToRoom, disconnectSocket } from "@/lib/socket";
import HeaderGame from "../components/HeaderGame";
import FooterGame from "../components/FooterGame";
import PlayerCard from "./PlayerCard";

const SelectCrewPage = () => {
  const [players, setPlayers] = useState<{ id: string; name: string; avatar: string }[]>([]);
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  useEffect(() => {
    // Récupérer la roomCode depuis l'URL
    const urlParams = new URLSearchParams(window.location.search);
    const roomCode = urlParams.get("room");

    const username = localStorage.getItem("username"); // Récupérer le pseudo stocké

    if (!roomCode || !username) {
      console.error("❌ RoomCode ou Username manquant !");
      return;
    }

    // Connexion à la WebSocket
    connectToRoom(roomCode, username, (data) => {
      if (data.type === "ROOM_UPDATE" && data.players) {
        setPlayers(data.players.map((player: { id?: string; username: string; name?: string; avatar: string }) => ({
          id: player.id || player.username, // Assuming 'id' can be 'username' if 'id' is not present
          name: player.name || player.username, // Assuming 'name' can be 'username' if 'name' is not present
          avatar: player.avatar
        })));
      }
    });

    return () => {
      disconnectSocket();
    };
  }, []);

  const toggleSelection = (playerId: string) => {
    if (selectedPlayers.includes(playerId)) {
      setSelectedPlayers((prev) => prev.filter((id) => id !== playerId));
    } else if (selectedPlayers.length < 3) {
      setSelectedPlayers((prev) => [...prev, playerId]);
      setAlertMessage(null);
    } else {
      setAlertMessage("Vous ne pouvez sélectionner que 3 membres maximum !");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100">
      {/* Header */}
      <HeaderGame />

      {/* Contenu principal */}
      <main className="flex-grow px-4 relative">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">
          Sélectionnez votre équipage
        </h1>
        <p className="text-base text-gray-600 text-center mb-6">
          Choisissez jusqu&apos;à 3 membres pour votre équipage.
        </p>

        {/* Alerte */}
        {alertMessage && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg text-center mb-4">
            {alertMessage}
          </div>
        )}

        {/* Liste des joueurs avec conteneur scrollable */}
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 max-h-96 overflow-y-auto">
          {players.map((player) => (
            <PlayerCard
              key={player.id}
              player={player}
              isSelected={selectedPlayers.includes(player.id)}
              selectionNumber={
                selectedPlayers.includes(player.id)
                  ? selectedPlayers.indexOf(player.id) + 1
                  : undefined
              }
              onClick={() => toggleSelection(player.id)}
            />
          ))}
        </div>

        {/* Bouton de validation */}
        <div className="mt-6 flex justify-center">
          <button
            className={`w-full max-w-xs py-3 rounded-lg text-white font-bold ${
              selectedPlayers.length === 3
                ? "bg-[#AAC2FF] hover:bg-[#88A8FF]"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={selectedPlayers.length !== 3}
            onClick={() =>
              alert("Équipage sélectionné : " + selectedPlayers.join(", "))
            }
          >
            Valider l&apos;équipage
          </button>
        </div>
      </main>

      {/* Footer */}
      <FooterGame />
    </div>
  );
};

export default SelectCrewPage;
