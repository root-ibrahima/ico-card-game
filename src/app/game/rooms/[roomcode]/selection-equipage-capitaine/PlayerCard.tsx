import React from "react";

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
      className={`relative cursor-pointer p-4 rounded-lg shadow-md text-center transition ${
        isSelected ? "bg-blue-200" : "bg-white"
      }`}
    >
      <img
        src={player.avatar}
        alt={player.username}
        className="w-20 h-20 object-cover rounded-full mx-auto mb-2"
      />
      <h3 className="text-sm font-bold">{player.username}</h3>
      {isSelected && (
        <div className="absolute bottom-2 right-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          {selectionNumber}
        </div>
      )}
    </div>
  );
};

export default PlayerCard;
