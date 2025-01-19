"use client";

import React, { useState, useEffect } from "react";
import { connectToRoom, sendMessageToRoom, disconnectSocket } from "@/lib/socket";
import PlayerCard from "./PlayerCard";

const SelectCrewPage = () => {
  const [players, setPlayers] = useState<{ username: string; avatar: string }[]>([]);
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  useEffect(() => {
    // ✅ Extract the roomCode from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const roomCode = urlParams.get("room");
    const username = localStorage.getItem("username");

    if (!roomCode || !username) {
      console.error("❌ RoomCode ou Username manquant !");
      return;
    }

    // ✅ Connect to WebSocket room and retrieve players
    connectToRoom(roomCode, username, (data) => {
      if (data.type === "ROOM_UPDATE" && data.players) {
        console.log("📡 Mise à jour des joueurs :", data.players);
        setPlayers(
          data.players.map((player: { username: string; avatar: string }) => ({
            username: player.username,
            avatar: player.avatar,
          }))
        );
      }
    });

    return () => {
      disconnectSocket();
    };
  }, []);

  const toggleSelection = (playerUsername: string) => {
    if (selectedPlayers.includes(playerUsername)) {
      setSelectedPlayers((prev) => prev.filter((name) => name !== playerUsername));
    } else if (selectedPlayers.length < 3) {
      setSelectedPlayers((prev) => [...prev, playerUsername]);
      setAlertMessage(null);
    } else {
      setAlertMessage("Vous ne pouvez sélectionner que 3 membres maximum !");
    }
  };

  const validateSelection = () => {
    if (selectedPlayers.length === 3) {
      console.log("✅ Équipage sélectionné :", selectedPlayers);
      const urlParams = new URLSearchParams(window.location.search);
      const roomCode = urlParams.get("room");
      const username = localStorage.getItem("username");

      if (roomCode && username) {
        sendMessageToRoom(username, roomCode, "CREW_SELECTED", { selectedCrew: selectedPlayers });
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100">
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
              key={player.username}
              player={player}
              isSelected={selectedPlayers.includes(player.username)}
              selectionNumber={
                selectedPlayers.includes(player.username)
                  ? selectedPlayers.indexOf(player.username) + 1
                  : undefined
              }
              onClick={() => toggleSelection(player.username)}
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
            onClick={validateSelection}
          >
            Valider l&apos;équipage
          </button>
        </div>
      </main>
    </div>
  );
};

export default SelectCrewPage;
