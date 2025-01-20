"use client";

import React, { useState } from "react";
import { sendMessageToRoom } from "@/lib/socket";
import PlayerCard from "./PlayerCard";
import { Player, VoteCrewPageProps } from "@/types/index";

const VoteCrewPage: React.FC<VoteCrewPageProps> = ({
  currentUser,
  roomCode,
  captain,
  crewMembers,
}) => {
  const [vote, setVote] = useState<"yes" | "no" | null>(null);

  // Déterminer si l'utilisateur courant est le capitaine
  const isCaptain = currentUser === captain.username;
  // Déterminer si l'utilisateur fait partie de l'équipage proposé
  const isCrewMember = crewMembers.some(
    (member: Player) => member.username === currentUser
  );

  /**
   * Gestion du vote
   * - Un joueur hors équipage (et pas capitaine) peut voter.
   * - Capitaine ou membre d’équipage : pas de vote.
   */
  const handleVote = (userVote: "yes" | "no") => {
    setVote(userVote);
    sendMessageToRoom(currentUser, roomCode, "VOTE_CREW", { vote: userVote });
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-[#FFF8F2]">
      {/* (Optionnel) Barre de navigation */}
      <div className="w-full flex items-center justify-between p-4">
        <button className="text-sm text-gray-600">⬅ Quitter la partie</button>
        <p className="text-sm text-gray-500">Vote en cours…</p>
      </div>

      {/* Contenu principal */}
      <main className="flex-grow px-4 flex flex-col items-center text-center pb-4">
        <h1 className="text-2xl font-bold text-gray-800 mt-2 mb-2">
          Votez pour l&apos;équipage
        </h1>
        <p className="text-base text-gray-600 mb-4">
          Voici l&apos;équipage proposé par le capitaine.
        </p>

        {/* Affichage du capitaine */}
        <div className="flex flex-col items-center mb-4">
          <PlayerCard
            player={captain}
            isCaptain={true}
          />
          <p className="text-sm text-gray-500 mt-1">Capitaine</p>
        </div>

        {/* Liste des membres de l'équipage avec scroll si nécessaire */}
        <div
          className="flex gap-4 mb-4 w-full max-w-md px-2 justify-center overflow-x-auto"
        >
          {crewMembers.map((member: Player) => (
            <div key={member.username} className="flex-shrink-0">
              <PlayerCard
                player={member}
                isSelected={false} // Pour marquer visuellement qu'ils sont dans l'équipage
              />
            </div>
          ))}
        </div>

        {/* Section de vote ou message d'attente */}
        {!isCaptain && !isCrewMember ? (
          // L'utilisateur peut voter
          <div
            className={`w-full max-w-md rounded-lg p-4 text-white text-center transition-colors ${
              vote === "yes"
                ? "bg-green-600"
                : vote === "no"
                ? "bg-red-600"
                : "bg-blue-600"
            }`}
          >
            <p className="text-lg font-bold mb-3">
              Acceptez-vous cet équipage&nbsp;?
            </p>

            {!vote ? (
              <div className="flex justify-around">
                <button
                  onClick={() => handleVote("yes")}
                  className="bg-white text-green-600 font-bold py-2 px-6 rounded-full hover:bg-green-100 transition"
                >
                  Oui ✅
                </button>
                <button
                  onClick={() => handleVote("no")}
                  className="bg-white text-red-600 font-bold py-2 px-6 rounded-full hover:bg-red-100 transition"
                >
                  Non ❌
                </button>
              </div>
            ) : (
              <p className="text-sm mt-2">
                {vote === "yes"
                  ? "Vote accepté ✅"
                  : "Vote rejeté ❌"}
              </p>
            )}
          </div>
        ) : (
          // Le capitaine et les membres d'équipage n'ont pas accès au vote
          <div className="w-full max-w-md rounded-lg p-4 text-white text-center bg-blue-400">
            <p className="text-lg font-bold">Les joueurs votent…</p>
            <p className="text-sm mt-2">
              Vous ne pouvez pas voter. Patientez pendant le vote.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default VoteCrewPage;
