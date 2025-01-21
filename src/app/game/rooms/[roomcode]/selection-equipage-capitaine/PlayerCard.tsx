import React from "react";
import Image from "next/image";

interface PlayerCardProps {
  player: { username: string; avatar: string };
  isSelected: boolean;
  selectionNumber?: number;
  onClick: () => void;
}

const PlayerCard: React.FC<PlayerCardProps> = ({
  player,
  isSelected,
  selectionNumber,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`relative cursor-pointer w-28 h-auto flex flex-col items-center p-2 
        rounded-xl shadow-sm text-center 
        transition-all duration-300 
        ${
          isSelected
            ? "bg-blue-100 scale-105" // Fond bleu pâle quand sélectionné
            : "bg-[#FFF8F2]"         // Fond crème par défaut
        }`}
    >
      {/* Avatar joueur */}
      <div className="relative w-12 h-12 mb-2">
        <Image
          src={player.avatar}
          alt={player.username}
          width={64}
          height={64}
          unoptimized
          className="rounded-full object-cover"
        />
      </div>

      {/* Nom du joueur */}
      <h3 className="text-sm font-semibold text-gray-800">{player.username}</h3>

      {/* Indicateur d'ordre de sélection */}
      {isSelected && (
        <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
          {selectionNumber}
        </div>
      )}
    </div>
  );
};

export default PlayerCard;
