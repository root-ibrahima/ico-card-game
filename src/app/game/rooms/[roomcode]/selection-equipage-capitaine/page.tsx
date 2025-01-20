"use client";

import React, { useState } from "react";
import { sendMessageToRoom } from "@/lib/socket";
import { SelectCrewPageProps } from "@/types/index";
import PlayerCard from "./PlayerCard";
import Image from "next/image";


const SelectCrewPage: React.FC<SelectCrewPageProps> = ({
  players,
  roomCode,
  username,
  captainAvatar,
  maxCrewSize = 3,
}) => {
  const [selectedCrew, setSelectedCrew] = useState<string[]>([]);

  const toggleSelectPlayer = (playerUsername: string) => {
    setSelectedCrew((prev) => {
      if (prev.includes(playerUsername)) {
        return prev.filter((u) => u !== playerUsername);
      } else {
        if (prev.length >= maxCrewSize) return prev;
        return [...prev, playerUsername];
      }
    });
  };
  console.log("Capitaine actuel :", captainAvatar);

  const confirmCrew = () => {
    sendMessageToRoom(username, roomCode, "CREW_SELECTED", { selectedCrew });
    // On peut désactiver le bouton ou afficher un message d'attente...
  };

  return (
    <div className="min-h-screen w-full bg-[#FFF8F2] flex flex-col items-center px-4 py-6">

      {/* Titre et sous-titre */}
      <h1 className="text-2xl font-bold text-gray-800 mb-1">Votre équipage</h1>
      <p className="text-sm text-gray-600 mb-4">
        En tant que capitaine, sélectionnez votre équipage&nbsp;!
      </p>

      {/* Avatar du capitaine */}
      <div className="mb-4">
        <div className="w-20 h-20 relative mx-auto rounded-full overflow-hidden mb-2">
          <Image
            src={captainAvatar || "/default-avatar.png"}
            alt={username}
            width={96}
            height={96}
            className="object-cover"
            unoptimized
          />
        </div>
        <p className="text-center text-gray-800 font-semibold">Vous</p>
      </div>

      {/* Grille des joueurs */}
      <div className="grid grid-cols-3 md:grid-cols-4 gap-4 mb-6 w-full max-w-md overflow-x-auto">
        {players.map((player, index) => {
          const isSelected = selectedCrew.includes(player.username);
          const selectionNumber = isSelected
            ? selectedCrew.indexOf(player.username) + 1
            : undefined;

          return (
            <PlayerCard
              key={index}
              player={{
                username: player.username,
                avatar: player.avatar,
              }}
              isSelected={isSelected}
              selectionNumber={selectionNumber}
              onClick={() => toggleSelectPlayer(player.username)}
            />
          );
        })}
      </div>

      {/* Bouton de validation */}
      <button
        onClick={confirmCrew}
        disabled={selectedCrew.length === 0}
        className={`px-8 py-3 rounded-full font-bold text-white transition-colors ${
          selectedCrew.length === 0
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        Valider
      </button>
    </div>
  );
};

export default SelectCrewPage;
