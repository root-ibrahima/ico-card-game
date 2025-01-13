import React from "react";

interface Player {
  id: string;
  name: string;
  role: "marin" | "pirate" | "sirène";
}

interface GameBoardProps {
  players: Player[];
}

const GameBoard: React.FC<GameBoardProps> = ({ players }) => {
  return (
    <div className="w-full max-w-md border rounded-lg p-4 bg-white shadow-md">
      <h2 className="text-xl font-bold mb-4">Liste des joueurs</h2>
      {players.length === 0 ? (
        <p className="text-gray-500">Aucun joueur pour le moment.</p>
      ) : (
        <ul className="space-y-2">
          {players.map((player) => (
            <li
              key={player.id}
              className="flex justify-between items-center border-b pb-2"
            >
              <span>
                <strong>{player.name}</strong> ({player.role})
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GameBoard;
