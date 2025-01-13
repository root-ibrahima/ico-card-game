import React from "react";
import type { Player } from "@/types/index";

type GameBoardProps = {
  players: Player[];
};

const GameBoard: React.FC<GameBoardProps> = ({ players }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {players.map((player) => (
        <div
          key={player.id}
          className="bg-gray-200 dark:bg-gray-800 p-4 rounded-lg shadow-lg"
        >
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">
            {player.name}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Rôle : {player.role}
          </p>
        </div>
      ))}
    </div>
  );
};

export default GameBoard;
