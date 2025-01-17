import React from "react";

interface PlayerCardProps {
  player: { id: string; name: string; image: string };
  isCaptain?: boolean; // Indique si le joueur est capitaine
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player, isCaptain = false }) => {
  return (
    <div
      className={`relative cursor-default p-2 rounded-lg shadow-md text-center bg-white ${
        isCaptain ? "w-24 h-28" : "w-20 h-24"
      }`}
    >
      {/* Image du joueur */}
      <img
        src={player.image}
        alt={player.name}
        className={`${
          isCaptain ? "w-24 h-24" : "w-20 h-20"
        } object-cover rounded-lg mx-auto mb-2 transition`}
      />

      {/* Nom du joueur */}
      <h3 className="text-sm font-bold">{player.name}</h3>
    </div>
  );
};

export default PlayerCard;
