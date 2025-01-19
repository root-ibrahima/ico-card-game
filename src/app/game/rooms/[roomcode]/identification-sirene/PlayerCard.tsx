"use client";

import React from "react";
import Image from "next/image";

interface PlayerCardProps {
  id: string;
  name: string;
  avatar: string;
  votes?: number;
  canVote?: boolean;
  onVote?: () => void;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ name, avatar, votes = 0, canVote = false, onVote }) => {
  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md w-full max-w-md">
      {/* Avatar du joueur */}
      <Image src={avatar} alt={name} className="w-12 h-12 rounded-full border border-gray-300" />

      {/* Nom et nombre de votes */}
      <div className="flex-1 ml-4">
        <p className="text-lg font-bold">{name}</p>
        <p className="text-sm text-gray-600">Votes : {votes}</p>
      </div>

      {/* Bouton Accuser (si applicable) */}
      {canVote && (
        <button
          onClick={onVote}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          🔎 Accuser
        </button>
      )}
    </div>
  );
};

export default PlayerCard;
