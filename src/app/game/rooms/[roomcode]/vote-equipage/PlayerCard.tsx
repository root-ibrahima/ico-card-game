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
  isSelected = false,
  selectionNumber,
}) => {
  return (
    <div
      className={`relative p-1 rounded-lg shadow-md text-center w-20 h-28 ${
        isSelected ? "bg-blue-200" : "bg-white"
      }`}
    >
      {/* Avatar du joueur */}
      <div className="w-12 h-12 mx-auto mb-1 rounded-full overflow-hidden">
        <Image
          src={player.avatar}
          alt={player.username}
          width={56} // Taille réduite pour les images
          height={56}
          unoptimized
          className="rounded-full object-cover"
        />
      </div>

      {/* Nom du joueur */}
      <h3 className={`text-xs font-semibold truncate ${isCaptain ? "text-blue-600" : ""}`}>
        {player.username}
        {isCaptain && " (Cap.)"}
      </h3>

      {/* Badge pour indiquer la sélection */}
      {isSelected && selectionNumber !== undefined && (
        <div className="absolute bottom-1 right-1 bg-blue-500 text-white text-[10px] font-bold px-1 py-0.5 rounded-full">
          {selectionNumber}
        </div>
      )}
    </div>
  );
};

export default PlayerCard;
