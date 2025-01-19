"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { connectToRoom, disconnectSocket, sendMessageToRoom } from "@/lib/socket";
import type { RoomEvent, Player } from "@/types/index";
import HeaderGame from "../components/HeaderGame";
import FooterGame from "../components/FooterGame";



interface IdentificationSireneProps {
  currentUser: {
    username: string;
    role: string;
    piratePoints?: number;
    marinPoints?: number;
    mancheGagnees?: number;
  };
  roomCode: string;
  players: Player[];
}


const IdentificationSirene = ({ currentUser, roomCode, players }: IdentificationSireneProps) => {
  const [votes, setVotes] = useState<{ [playerId: string]: number } | null>(null);
  const [identifiedSirene, setIdentifiedSirene] = useState<string | null>(null);
  const [voteSubmitted, setVoteSubmitted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!roomCode || !currentUser?.username) return;

    const handleRoomEvent = (data: RoomEvent) => {
      if (data.type === "SIRENE_VOTE_UPDATE") {
        setVotes(data.payload.votes || {});
      }

      if (data.type === "SIRENE_IDENTIFIED") {
        setIdentifiedSirene(data.payload.identifiedSirene || null);
        setTimeout(() => {
          router.push("/game/choix-action-membres");
        }, 3000);
      }
    };

    connectToRoom(roomCode, currentUser.username, handleRoomEvent);

    return () => {
      disconnectSocket();
    };
  }, [roomCode, currentUser?.username, router]);

  // Vérifier que `players` est défini pour éviter des erreurs d'affichage
  if (!players || players.length === 0) {
    return <p className="text-center text-red-500">🚨 Aucun joueur trouvé.</p>;
  }

  const handleVote = (playerId: string) => {
    if (!voteSubmitted) {
      sendMessageToRoom(currentUser.username, roomCode, "SIRENE_VOTE", {
        voteFor: playerId,
      });
      setVoteSubmitted(true);
    }
  };

  return (
    <>
      <HeaderGame />
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-2xl font-bold text-gray-800">🔍 Identification de la Sirène</h1>

        {currentUser.role === "sirene" ? (
          <p className="text-lg font-bold text-blue-600">🌊 Vous êtes la Sirène, restez discrète !</p>
        ) : (
          <p className="text-lg text-gray-700">Votez pour identifier la Sirène parmi les joueurs :</p>
        )}

        <ul className="mt-4">
          {players.map((player: Player) => (
            <li key={player.id} className="text-lg flex justify-between items-center gap-4">
              <span>
                {player.username} {votes && votes[player.id] ? `(${votes[player.id]} votes)` : ""}
              </span>
              {!voteSubmitted && currentUser.role !== "sirene" && (
                <button
                  onClick={() => handleVote(player.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg"
                >
                  🔎 Accuser
                </button>
              )}
            </li>
          ))}
        </ul>

        {identifiedSirene && (
          <p className="text-xl font-bold mt-4">
            {identifiedSirene === currentUser.username
              ? "😱 Vous avez été identifiée comme la Sirène !"
              : `✅ ${identifiedSirene} a été identifiée comme la Sirène !`}
          </p>
        )}
      </main>
      <FooterGame
        role={currentUser.role}
        piratePoints={currentUser.piratePoints || 0}
        marinPoints={currentUser.marinPoints || 0}
        mancheGagnees={currentUser.mancheGagnees || 0}
      />
    </>
  );
}

export default IdentificationSirene;