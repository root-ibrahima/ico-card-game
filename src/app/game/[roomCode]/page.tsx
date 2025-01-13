import { NextApiRequest } from "next";
import React from "react";

interface GameRoomPageProps {
  params: { roomCode: NextApiRequest["query"]["roomCode"] };
}

const GameRoomPage: React.FC<GameRoomPageProps> = ({ params }) => {
  const roomCode = params.roomCode || "Inconnu";

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gray-100 px-4">
      <h1 className="text-4xl font-bold mb-4">Salle : {roomCode}</h1>
      <p className="text-gray-700">Préparez-vous à jouer !</p>
    </main>
  );
};

export default GameRoomPage;
