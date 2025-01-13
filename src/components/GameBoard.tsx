import React from "react";
import type { Player } from "@/types/index";

interface GameBoardProps {
  players: Player[]; // Liste des joueurs à afficher
}

const GameBoard: React.FC<GameBoardProps> = ({ players }) => {
  return (
    <div className="p-4 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Liste des joueurs</h2>
      {players.length === 0 ? (
        <p className="text-gray-500">Aucun joueur n&apos;est encore inscrit.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2 text-left">#</th>
              <th className="border border-gray-300 p-2 text-left">Nom</th>
              <th className="border border-gray-300 p-2 text-left">Rôle</th>
              <th className="border border-gray-300 p-2 text-left">Capitaine</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player) => (
              <tr key={player.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 p-2">{player.id}</td>
                <td className="border border-gray-300 p-2">{player.name}</td>
                <td className="border border-gray-300 p-2 capitalize">
                  {player.role}
                </td>
                <td className="border border-gray-300 p-2">
                  {player.isCaptain ? "Oui" : "Non"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default GameBoard;
