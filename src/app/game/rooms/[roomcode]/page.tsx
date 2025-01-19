"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { connectToRoom, disconnectSocket, sendMessageToRoom } from "@/lib/socket";
import { useRouter, usePathname } from "next/navigation";
import { RoomEvent } from "@/types";
import RoleDistribution from "./distribution-roles/page";
import CaptainChoicePage from "./choix-capitaines/page";
import SelectCrewPage from "./selection-equipage-capitaine/page";
import VoteCrewPage from "./vote-equipage/page";
import FooterGame from "./components/FooterGame";
import HeaderGame from "./components/HeaderGame";

interface Player {
  username: string;
  avatar: string;
  bio?: string;
  score?: number;
}

const GameRoomPage: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [roomCode, setRoomCode] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [currentCaptain, setCurrentCaptain] = useState<string | null>(null);
  const [isCaptain, setIsCaptain] = useState<boolean>(false);
  const [players, setPlayers] = useState<Player[]>([]);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [crewSelectionPhase, setCrewSelectionPhase] = useState<boolean>(false);
  const [votePhase, setVotePhase] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const segments = pathname.split("/");
    const codeIndex = segments.indexOf("rooms") + 1;
    const code = segments[codeIndex] || null;
    if (code) {
      setRoomCode(code);
    } else {
      router.push("/");
    }
  }, [pathname, router]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/user");
        if (!response.ok) throw new Error("Non authentifié");

        const userData = await response.json();
        setUsername(userData.email);
      } catch {
        router.push(`/auth/signin?redirect=/game/rooms/${roomCode}`);
      } finally {
        setLoading(false);
      }
    };

    if (roomCode) {
      checkAuth();
    }
  }, [roomCode, router]);

  useEffect(() => {
    if (!username || !roomCode) return;

    const handleRoomEvent = (
      data: RoomEvent & {
        role?: string;
        players?: Player[];
        captain?: string;
        selectedCrew?: string[];
      }
    ) => {
      console.log("📩 Message reçu :", data);

      switch (data.type) {
        case "YOUR_ROLE":
          if (data.role) setRole(data.role);
          break;
        case "ROOM_UPDATE":
          if (data.players) setPlayers(data.players);
          break;
        case "GAME_START":
          setGameStarted(true);
          break;
        case "CAPTAIN_SELECTED":
          setCurrentCaptain(data.captain || null);
          setIsCaptain(data.captain === username);
          break;
        case "CREW_SELECTION_PHASE":
          setCrewSelectionPhase(true);
          break;
        case "CREW_SELECTED":
          if (data.selectedCrew) {

            setCrewMembers(data.selectedCrew);
            setCrewSelectionPhase(false);
            setVotePhase(true);
          }
          break;
        case "VOTE_RESULTS":
          setVotePhase(false);
          setVoteResult(data.approved || false);

          // Si accepté, avancer à la prochaine étape après 3 secondes
          if (data.approved) {
            setTimeout(() => {
              setVoteResult(null); // Réinitialiser
              // Avancer à l'étape suivante
            }, 3000);
          } else {
            // Si rejeté, relancer la phase de sélection
            setTimeout(() => {
              setVoteResult(null);
              setCrewSelectionPhase(true);
            }, 3000);
          }
          break;
        default:
          console.warn("⚠️ Événement inattendu :", data);
      }
    };

    connectToRoom(roomCode, username, handleRoomEvent);

    return () => {
      disconnectSocket();
    };
  }, [username, roomCode]);

  const startGame = () => {
    if (username && roomCode) {
      sendMessageToRoom(username, roomCode, "GAME_START");
    }
  };

  const confirmRole = () => {
    if (username && roomCode) {
      sendMessageToRoom(username, roomCode, "ROLE_CONFIRMED");
    }
  };


  if (loading) return <p className="text-white">Chargement...</p>;
  if (!username) return <p className="text-white">Non connecté</p>;

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden">
      {gameStarted ? (
        <>
          <HeaderGame />
          <main className="flex-grow flex flex-col items-center justify-center bg-white overflow-hidden">
            ) : crewSelectionPhase ? (
              <p className="text-center text-gray-600">
                En attente que le capitaine sélectionne son équipage...
              </p>
            ) : votePhase ? (
              <VoteCrewPage
                currentUser={username || ""}
                roomCode={roomCode || ""}
                captain={players.find((p) => p.username === currentCaptain) || { username: "", avatar: "" }}
                crewMembers={crewMembers}
                allPlayers={players}
              />
            ) : currentCaptain ? (
              <CaptainChoicePage
                isCaptain={isCaptain}
                captainName={currentCaptain}
                username={username || ""}
                roomCode={roomCode || ""}
              />
            ) : role ? (
              <>
                <RoleDistribution role={role} username={username || ""} roomCode={roomCode || ""} />
                <button
                  onClick={confirmRole}
                  className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  J&apos;ai compris mon rôle
                </button>
              </>
            ) : (
              <>
                <p className="text-center text-gray-500">Chargement de votre rôle...</p>
                <FooterGame role={role || undefined} piratePoints={0} marinPoints={0} mancheGagnees={0} />
              </>
            )}
          </main>
          <FooterGame role={role || undefined} piratePoints={0} marinPoints={0} mancheGagnees={0} />
        </>
      ) : (
        <>
          <div className="w-full bg-blue-600 text-white px-4 py-4 flex items-center justify-between fixed top-0">
            <button onClick={() => router.back()} className="font-medium">
              ⬅ Retour
            </button>
            <h1 className="text-xl font-bold text-center">Lancement de la partie</h1>
            <div />
          </div>

          <main className="flex-grow flex flex-col items-center justify-center bg-blue-600 text-white px-6 overflow-hidden">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">{roomCode || "CODE"}</h2>
              <p>Préparez-vous à embarquer !</p>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-8">
              {players.map((player, index) => (
                <div
                  key={index}
                  className="bg-white text-black rounded-lg p-3 flex flex-col items-center shadow-md"
                >
                  <Image
                    src={player.avatar}
                    alt={player.username}
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-full mb-2"
                  />
                  <p className={`text-sm font-semibold ${username === player.username ? "text-blue-600" : ""}`}>
                    {player.username} {username === player.username && "(vous)"}
                  </p>
                </div>
              ))}
            </div>

            <p className="text-sm text-white mb-6">
              Les autres joueurs peuvent entrer ce code pour rejoindre la partie.
            </p>

            <button
              onClick={startGame}
              className="bg-white text-blue-600 font-bold py-3 px-6 rounded-full shadow-lg"
            >
              Commencer la partie
            </button>
          </main>
        </>
      )}
    </div>
  );
};

export default GameRoomPage;
