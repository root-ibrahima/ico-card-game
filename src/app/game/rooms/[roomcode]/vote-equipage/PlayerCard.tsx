"use client";

import React from "react";
import Image from "next/image";

interface Player {
  username: string; // Identifiant unique
  avatar: string;
}

interface PlayerCardProps {
  player: Player;
  isCaptain?: boolean; // Indique si le joueur est le capitaine
  isCrewMember?: boolean; // Indique si le joueur est un membre d'équipage
  isSelected?: boolean; // Indique si le joueur est sélectionné
  selectionNumber?: number; // Position du joueur dans la sélection
}

const PlayerCard: React.FC<PlayerCardProps> = ({
  player,
  isCaptain = false,
  isCrewMember = false,
  isSelected = false,
  selectionNumber,
}) => {
  return (
    <div
      className={`relative p-4 rounded-lg shadow-md text-center ${
        isSelected ? "bg-blue-200" : "bg-white"
      }`}
    >
      {/* Avatar du joueur */}
      <Image
        src={player.avatar}
        alt={player.username}
        width={80}
        height={80}
        className="object-cover rounded-full mx-auto mb-2"
      />

      {/* Nom du joueur */}
      <h3 className={`text-sm font-bold ${isCaptain ? "text-blue-600" : ""}`}>
        {player.username}
        {isCaptain && " (Capitaine)"}
      </h3>

      {/* Badge pour indiquer la sélection */}
      {isSelected && selectionNumber !== undefined && (
        <div className="absolute bottom-2 right-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          {selectionNumber}
        </div>
      )}

      {/* Badge pour un membre d'équipage */}
      {isCrewMember && !isCaptain && (
        <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          Équipage
        </div>
      )}
    </div>
  );
};

export default PlayerCard;
