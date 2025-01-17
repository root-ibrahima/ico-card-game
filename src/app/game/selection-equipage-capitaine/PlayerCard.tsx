import React from "react";

interface PlayerCardProps {
  player: { id: string; name: string; image: string };
  isSelected: boolean;
  onClick: () => void;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player, isSelected, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer p-2 rounded-lg shadow-md text-center ${
        isSelected ? "border-4 border-purple-500" : "border"
      }`}
    >
      <img
        src={player.image}
        alt={player.name}
        className="w-20 h-20 object-cover rounded-full mx-auto mb-2"
      />
      <h3 className="text-sm font-bold">{player.name}</h3>
    </div>
  );
};

export default PlayerCard;
