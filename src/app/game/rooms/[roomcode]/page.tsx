"use client";

import React, { useEffect, useState } from "react";
import { connectToRoom, disconnectSocket, sendMessageToRoom } from "@/lib/socket";
import { useRouter, usePathname } from "next/navigation";
import { RoomEvent, Player } from "@/types/index";

import RoleDistribution from "./distribution-roles/page";
import CaptainChoicePage from "./choix-capitaines/page";
import SelectCrewPage from "./selection-equipage-capitaine/page";
import VoteCrewPage from "./vote-equipage/page";
import FooterGame from "./components/FooterGame";
import HeaderGame from "./components/HeaderGame";
import Image from "next/image";

const GameRoomPage: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  // States
  const [roomCode, setRoomCode] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [currentCaptain, setCurrentCaptain] = useState<string | null>(null);
  const [isCaptain, setIsCaptain] = useState(false);
  const [players, setPlayers] = useState<Player[]>([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [crewSelectionPhase, setCrewSelectionPhase] = useState(false);
  const [votePhase, setVotePhase] = useState(false);
  const [voteResult, setVoteResult] = useState<boolean | null>(null);
  const [crewMembers, setCrewMembers] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Récupération du code salle
  useEffect(() => {
    const segments = pathname.split("/");
    const codeIndex = segments.indexOf("rooms") + 1;
    const code = segments[codeIndex] || null;
    if (code) setRoomCode(code);
    else router.push("/");
  }, [pathname, router]);

  // Vérification d'auth
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const resp = await fetch("/api/auth/user");
        if (!resp.ok) throw new Error("Non authentifié");
        const userData = await resp.json();
        setUsername(userData.email);
      } catch {
        router.push(`/auth/signin?redirect=/game/rooms/${roomCode}`);
      } finally {
        setLoading(false);
      }
    };
    if (roomCode) checkAuth();
  }, [roomCode, router]);

  // Connexion WebSocket + gestion events
  useEffect(() => {
    if (!username || !roomCode) return;

    const handleRoomEvent = (data: RoomEvent) => {
      console.log("📩 Message reçu :", data);

      switch (data.type) {
        case "YOUR_ROLE":
          if (data.role) {
            setRole(data.role);
          }
          break;

        case "ROOM_UPDATE":
          if (data.players) {
            setPlayers(data.players);
          }
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

          if (data.approved) {
            // Avancer à l’étape suivante, 3s plus tard
            setTimeout(() => setVoteResult(null), 3000);
          } else {
            // Rejeter l’équipage, 3s plus tard
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

  // Fonctions d’envoi
  const startGame = () => {
    if (roomCode && username) {
      sendMessageToRoom(username, roomCode, "GAME_START");
    }
  };

  const confirmRole = () => {
    if (roomCode && username) {
      sendMessageToRoom(username, roomCode, "ROLE_CONFIRMED");
    }
  };

  // Affichage
  if (loading) return <p className="text-white">Chargement...</p>;
  if (!username) return <p className="text-white">Non connecté</p>;

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden">
      {gameStarted ? (
        <>
          <HeaderGame
          avatar={players.find((p) => p.username === username)?.avatar || ""}
          />
          <main className="flex-grow flex flex-col items-center justify-center bg-white">
            {/* Écrans de jeu selon la phase */}
            {voteResult !== null ? (
              voteResult ? (
                <div className="w-full max-w-md p-6 text-white text-center bg-green-500">
                  <p className="text-lg font-bold">Équipage accepté !</p>
                </div>
              ) : (
                <div className="w-full max-w-md p-6 text-white text-center bg-red-500">
                  <p className="text-lg font-bold">Équipage rejeté !</p>
                  <p className="text-sm mt-2">Un nouveau capitaine sera sélectionné.</p>
                </div>
                )
              ) : crewSelectionPhase && isCaptain ? (
                <SelectCrewPage
                players={players.filter((p) => p.username !== username)}
                roomCode={roomCode || ""}
                username={username || ""}
                captainAvatar={players.find((p) => p.username === currentCaptain)?.avatar || ""}
                />
              ) : crewSelectionPhase ? (
              <p className="text-center text-gray-600">
                En attente que le capitaine sélectionne son équipage...
              </p>
            ) : votePhase ? (
              <VoteCrewPage
                currentUser={username || ""}
                roomCode={roomCode || ""}
                captain={
                  players.find((p) => p.username === currentCaptain) || {
                    id: "",
                    username: "",
                    role: "marin",
                    avatar: "",
                    isCaptain: false,
                    roomCode: "",
                  }
                }
                crewMembers={
                  crewMembers.map((m) => players.find((p) => p.username === m)) as Player[]
                }
                allPlayers={players}
                handleVote={() => {}}
              />
            ) : currentCaptain ? (
              <CaptainChoicePage
                captain={
                  players.find((p) => p.username === currentCaptain) || {
                    id: "",
                    username: "",
                    role: "marin",
                    avatar: "",
                    isCaptain: false,
                    roomCode: "",
                  }
                }
                username={username || ""}
                roomCode={roomCode || ""}
              />
            ) : role ? (
              <RoleDistribution
                role={role || ""}
                username={username || ""}
                roomCode={roomCode || ""}
                onConfirmRole={confirmRole}
              />
            ) : (
              <p className="text-center text-gray-500">
                Chargement de votre rôle...
              </p>
            )}
          </main>
          <FooterGame
            role={role || "marin"}
            piratePoints={0}
            marinPoints={0}
            mancheGagnees={0}
          />
        </>
      ) : (
        // Écran avant que la partie ne démarre
        <>
          <div className="w-full bg-blue-600 text-white px-4 py-4 flex items-center justify-between fixed top-0">
            <button onClick={() => router.back()} className="font-medium">
              ⬅ Retour
            </button>
            <h1 className="text-xl font-bold text-center">
              Lancement de la partie
            </h1>
            <div />
          </div>
          <main className="flex-grow flex flex-col items-center justify-center bg-blue-600 text-white px-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">{roomCode || "CODE"}</h2>
              <p>Préparez-vous à embarquer !</p>
            </div>
            <div className="grid grid-cols-4 gap-4 mb-8">
              {players.map((player, i) => (
                <div
                  key={i}
                  className="bg-white text-black p-3 flex flex-col items-center shadow-md rounded-lg"
                >
                  <Image
                    src={player.avatar}
                    alt={player.username}
                    width={64}
                    height={64}
                    unoptimized
                    className="rounded-full mb-2"
                  />
                  <p
                    className={`text-sm font-semibold ${
                      username === player.username ? "text-blue-600" : ""
                    }`}
                  >
                    {player.username}
                    {username === player.username && " (vous)"}
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
