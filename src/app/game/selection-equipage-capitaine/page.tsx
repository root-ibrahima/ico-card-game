"use client";

import { useEffect, useState } from "react";
import { connectToRoom, disconnectSocket } from "@/lib/socket";
import { RoomEvent, Player } from "@/types/index";
import HeaderGame from "../components/HeaderGame";
import FooterGame from "../components/FooterGame";
import PlayerCard from "./PlayerCard";

const SelectCrewPage = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const roomCode = urlParams.get("room");
    const username = localStorage.getItem("username");

    if (!roomCode || !username) {
      console.error("❌ RoomCode ou Username manquant !");
      return;
    }

    console.log(`🔗 Connexion à la WebSocket - Room: ${roomCode}, Username: ${username}`);

    connectToRoom(roomCode, username, (data: RoomEvent & { players?: Player[] }) => {
      console.log("📩 Message reçu du serveur :", data);

      if (data.type === "ROOM_UPDATE" && data.players) {
        console.log("👥 Mise à jour des joueurs :", data.players);
        setPlayers(data.players);
      }
    });

    return () => {
      console.log("🔌 Déconnexion WebSocket...");
      disconnectSocket();
    };
  }, []);

  const toggleSelection = (playerId: string) => {
    setSelectedPlayers((prev) => {
      if (prev.includes(playerId)) {
        return prev.filter((id) => id !== playerId);
      } else if (prev.length < 3) {
        setAlertMessage(null);
        return [...prev, playerId];
      } else {
        setAlertMessage("Vous ne pouvez sélectionner que 3 membres maximum !");
        return prev;
      }
    });
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100">
      <HeaderGame />

      <main className="flex-grow px-4 relative">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">
          Sélectionnez votre équipage
        </h1>
        <p className="text-base text-gray-600 text-center mb-6">
          Choisissez jusqu&apos;à 3 membres pour votre équipage.
        </p>

        {alertMessage && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg text-center mb-4">
            {alertMessage}
          </div>
        )}

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

      <FooterGame />
    </div>
  );
};

export default SelectCrewPage;
