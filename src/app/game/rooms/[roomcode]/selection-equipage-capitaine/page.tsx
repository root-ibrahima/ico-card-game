import Image from 'next/image';
import React from 'react';

interface PlayerCardProps {
  player: { username: string; avatar: string };
  isSelected: boolean;
  selectionNumber?: number;
  onClick: () => void;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player, isSelected, selectionNumber, onClick }) => {
  return (
    <div
      className={`p-4 border rounded-lg cursor-pointer ${isSelected ? 'border-blue-500' : 'border-gray-300'}`}
      onClick={onClick}
    >
      <div className="relative w-full h-32 mb-2">
        <Image src={player.avatar} alt={player.username} layout="fill" className="object-cover rounded-lg" />
      </div>
      <h2 className="text-center text-lg font-bold">{player.username}</h2>
      {isSelected && (
        <div className="text-center text-sm text-blue-500">
          Sélectionné {selectionNumber}
        </div>
      )}
    </div>
  );
};

export default PlayerCard;
