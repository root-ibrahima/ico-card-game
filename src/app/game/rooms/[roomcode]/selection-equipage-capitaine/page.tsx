import Image from 'next/image';
import React from 'react';

interface PlayerCardProps {
  player: { username: string; avatar: string; bio?: string; score?: number };
  isSelected: boolean;
  selectionNumber?: number;
  onClick: () => void;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player, isSelected, selectionNumber, onClick }) => {
  return (
    <div
      className={`p-4 border rounded-lg cursor-pointer transform transition-transform duration-300 ${isSelected ? 'border-blue-500 scale-105' : 'border-gray-300'}`}
      onClick={onClick}
    >
      <div className="relative w-full h-32 mb-2">
        <Image src={player.avatar} alt={player.username} layout="fill" className="object-cover rounded-lg" />
      </div>
      <h2 className="text-center text-lg font-bold">{player.username}</h2>
      {player.bio && <p className="text-center text-sm text-gray-600">{player.bio}</p>}
      {player.score !== undefined && <p className="text-center text-sm text-gray-600">Score: {player.score}</p>}
      {isSelected && (
        <div className="text-center text-sm text-blue-500">
          Sélectionné {selectionNumber}
        </div>
      )}
    </div>
  );
};

export default PlayerCard;
