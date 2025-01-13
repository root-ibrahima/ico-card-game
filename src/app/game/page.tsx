'use client';

import React from 'react';
import GameBoard from '@/components/GameBoard';

interface Player {
  id: number;
  name: string;
  role: 'marin' | 'pirate' | 'sirène' | undefined;
}

const GamePage: React.FC = () => {
  const players: Player[] = [
    { id: 1, name: 'Alice', role: 'marin' },
    { id: 2, name: 'Bob', role: 'pirate' },
  ];

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">Jeu ICO 🎮</h1>
      <GameBoard players={players} />
    </div>
  );
};

export default GamePage;
