interface Player {
  id: number;
  name: string;
  role?: 'marin' | 'pirate' | 'sirène';
}

interface GameBoardProps {
  players: Player[];
}

const GameBoard: React.FC<GameBoardProps> = ({ players }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {players.map((player) => (
        <div key={player.id} className="border p-4 text-center rounded shadow">
          <h3>{player.name}</h3>
          <p>{player.role || 'Inconnu'}</p>
        </div>
      ))}
    </div>
  );
};

export default GameBoard;
