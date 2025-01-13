import React from 'react';
import { Player } from '@/utils/roleUtils';

type PlayerListProps = {
  players: Player[];
};

const PlayerList: React.FC<PlayerListProps> = ({ players }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {players.map((player) => (
        <div key={player.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">{player.name}</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Rôle : <span className="font-semibold">{player.role}</span>
          </p>
          {player.isCaptain && (
            <p className="text-blue-600 dark:text-blue-400 font-semibold">Capitaine 🎖️</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default PlayerList;
