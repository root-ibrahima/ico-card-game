"use client";

import React, { useState } from "react";
import PlayerCard from "./PlayerCard";
import { sendMessageToRoom } from "@/lib/socket";

interface Player {
  username: string;
  avatar: string;
}

interface VoteCrewPageProps {
  currentUser: string;
  roomCode: string;
  captain: Player;
  crewMembers: Player[]; // ✅ Correction : stocker des objets `Player`
}

const VoteCrewPage: React.FC<VoteCrewPageProps> = ({
  currentUser,
  roomCode,
  captain,
  crewMembers,
}) => {
  const [vote, setVote] = useState<"yes" | "no" | null>(null);

  const handleVote = (userVote: "yes" | "no") => {
    setVote(userVote);
    sendMessageToRoom(currentUser, roomCode, "VOTE_CREW", { vote: userVote });
  };

  const isCaptain = currentUser === captain.username;
  const isCrewMember = crewMembers.some((member) => member.username === currentUser); // ✅ Vérification correcte

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100">
      <main className="flex-grow px-4 flex flex-col items-center text-center mt-10">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Votez pour l&apos;équipage</h1>
        <p className="text-base text-gray-600 mb-8">
          Voici les membres de l’équipage proposés par le capitaine.
        </p>

        <div className="flex flex-col items-center mb-8">
          <PlayerCard player={captain} isCaptain={true} />
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          {crewMembers.map((member) => (
            <PlayerCard key={member.username} player={member} isCrewMember={true} />
          ))}
        </div>

        {!isCaptain && !isCrewMember ? (
          <div
            className={`w-full max-w-md rounded-lg p-6 text-white text-center ${
              vote === "yes"
                ? "bg-green-500"
                : vote === "no"
                ? "bg-red-500"
                : "bg-blue-500"
            }`}
          >
            <p className="text-lg font-bold mb-2">Acceptez-vous cet équipage ?</p>
            {!vote ? (
              <div className="flex justify-around">
                <button
                  onClick={() => handleVote("yes")}
                  className="bg-white text-green-500 font-bold py-2 px-6 rounded-full hover:bg-green-100"
                >
                  ✅ Oui
                </button>
                <button
                  onClick={() => handleVote("no")}
                  className="bg-white text-red-500 font-bold py-2 px-6 rounded-full hover:bg-red-100"
                >
                  ❌ Non
                </button>
              </div>
            ) : (
              <p className="text-sm mt-4">
                {vote === "yes" ? "Vote accepté ✅" : "Vote rejeté ❌"}
              </p>
            )}
          </div>
        ) : (
          <div className="w-full max-w-md rounded-lg p-6 text-white text-center bg-blue-500">
            <p className="text-lg font-bold">Les joueurs votent...</p>
            <p className="text-sm mt-2">
              Vous ne pouvez pas voter, attendez les autres joueurs.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default VoteCrewPage;
