"use client";

import React, { useEffect, useState } from "react";
import { connectToRoom, disconnectSocket, sendMessageToRoom } from "@/lib/socket";
import { useRouter, usePathname } from "next/navigation";
import { RoomEvent, Player } from "@/types/index";

import RoleDistribution from "./distribution-roles/page";
import CaptainChoicePage from "./choix-capitaines/page";
import SelectCrewPage from "./selection-equipage-capitaine/page";
import VoteCrewPage from "./vote-equipage/page";
import ChoixActionsPage from "./choix-action/page";
import ChoixActionsRevelationsPage from "./choix-actions-revelations/page";
import FooterGame from "./components/FooterGame";
import HeaderGame from "./components/HeaderGame";
import Image from "next/image";

/**
 * Page principale de gestion d'une salle de jeu.
 */
const GameRoomPage: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  // --- States ---

  const [roomCode, setRoomCode] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  const [players, setPlayers] = useState<Player[]>([]);
  const [gameStarted, setGameStarted] = useState(false);

  // Capitaine et phases
  const [currentCaptain, setCurrentCaptain] = useState<string | null>(null);
  const [isCaptain, setIsCaptain] = useState(false);
  const [crewSelectionPhase, setCrewSelectionPhase] = useState(false);
  const [crewMembers, setCrewMembers] = useState<string[]>([]);
  

  // Votes
  const [votePhase, setVotePhase] = useState(false);
  const [voteResult, setVoteResult] = useState<boolean | null>(null);

  //Choix des actions
  const [actionSelectionPhase, setActionSelectionPhase] = useState(false);
  const [actionsRevealed, setActionsRevealed] = useState<
    { username: string; action: "ile" | "poison" }[]
  >([]);
  const [winningSide, setWinningSide] = useState<"pirates" | "marins" | null>(null);
  const [totalPiratePoints, setTotalPiratePoints] = useState(0);  
  const [totalMarinPoints,  setTotalMarinPoints] = useState(0); 

  // Fin de partie
  // const [gameOver, setGameOver] = useState(false);
  // const [finalScores, setFinalScores] = useState<{
  //   pirates: number;
  //   marins: number;
  //   winner: "pirates" | "marins";
  // } | null>(null);

  // Chargement ou non de la page
  const [loading, setLoading] = useState(true);

  // --- useEffect : récupération du code salle depuis l'URL ---
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

  // --- useEffect : vérification d'authentification ---
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
    if (roomCode) {
      checkAuth();
    }
  }, [roomCode, router]);

  // --- useEffect : connexion WebSocket et réception des événements ---
  useEffect(() => {
    if (!username || !roomCode) return;

    const handleRoomEvent = (data: RoomEvent) => {
      console.log("📩 Message reçu :", data);

      switch (data.type) {
        case "YOUR_ROLE": {
          if (data.role) {
            setRole(data.role);
          }
          break;
        }

        case "ROOM_UPDATE": {
          if (data.players) {
            setPlayers(data.players);
          }
          break;
        }

        case "GAME_START": {
          setGameStarted(true);
          break;
        }

        case "CAPTAIN_SELECTED":
          setCurrentCaptain(data.captain || null);
          setIsCaptain(data.captain === username);

          // On sort de l’écran de révélations en réinitialisant
          setActionsRevealed([]); 
          setWinningSide(null);

          // Éventuellement, on réinitialise voteResult, etc.
          setVoteResult(null);

          break;


        case "CREW_SELECTION_PHASE": {
          // Une fois que le capitaine a confirmé son statut,
          // on passe à la phase de sélection d’équipage
          setCrewSelectionPhase(true);
          setVoteResult(null);
          setVotePhase(false); 
          break;
        }

        case "CREW_SELECTED": {
          // Le capitaine a choisi son équipage, on démarre la phase de vote
          if (data.selectedCrew) {
            setCrewMembers(data.selectedCrew);
            setCrewSelectionPhase(false);
            setVotePhase(true);
          }
          break;
        }

        case "VOTE_RESULTS": {
          // Fin de la phase de vote
          setVotePhase(false);
          setVoteResult(data.approved || false);
          break;
        }
        case "ACTION_SELECTION_PHASE":
        setVoteResult(null);
        setActionSelectionPhase(true);
        break;

        case "ACTIONS_REVEALED":
        setActionSelectionPhase(false);
        setActionsRevealed(data.actions || []);
        setWinningSide(data.winningSide || null);
        setTotalMarinPoints(data.marinsScore || 0);
        setTotalPiratePoints(data.piratesScore || 0);
        break;

        // case "GAME_END":
        // // Afficher la page de victoire
        // setGameOver(true);
        // setFinalScores({
        //   pirates: data.piratesScore ?? 0,
        //   marins: data.marinsScore ?? 0,
        //   winner: data.winner as "pirates" | "marins",
        // });
        // break;



        default:
          console.warn("⚠️ Événement inattendu :", data);
      }
    };

    connectToRoom(roomCode, username, handleRoomEvent);

    return () => {
      disconnectSocket();
    };
  }, [username, roomCode]);

  // --- Fonctions d’envoi simplifiées ---
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




  // --- Rendu ---
  if (loading) return <p className="text-white">Chargement...</p>;
  if (!username) return <p className="text-white">Non connecté</p>;

  console.log("Capitaine =", currentCaptain);
  console.log("crewSelectionPhase =", crewSelectionPhase);
  console.log("voteResult =", voteResult);
  console.log("actionSelectionPhase =", actionSelectionPhase);
  console.log("actionsRevealed =", players.filter((p) => p.isCrewMember));

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden">
      {gameStarted ? (
        <>
          <HeaderGame
            avatar={players.find((p) => p.username === username)?.avatar || ""}
          />

          <main className="flex-grow flex flex-col items-center justify-center bg-white">
            {voteResult !== null ? (
              voteResult ? (
                <div className="w-full max-w-md p-6 text-white text-center bg-green-500">
                  <p className="text-lg font-bold">Équipage accepté !</p>
                </div>
              ) : (
                <div className="w-full max-w-md p-6 text-white text-center bg-red-500">
                  <p className="text-lg font-bold">Équipage rejeté !</p>
                  <p className="text-sm mt-2">
                    Un nouveau capitaine sera sélectionné.
                  </p>
                </div>
              )
            ) : actionsRevealed.length > 0 ? (
              // Phase : révélation des actions
              <ChoixActionsRevelationsPage
              actions={actionsRevealed}
              players={players.filter((player) => player.isCrewMember)} // Ne transmettre que les membres de l'équipage
              winningSide={winningSide}
              />

            ) : actionSelectionPhase ? (
              // Phase : sélection d'actions (uniquement pour les membres de l'équipage)
              <ChoixActionsPage
                currentUser={username}
                crewMembers={players.filter((p) => p.isCrewMember)}
                role={role || "marin"}
                roomCode={roomCode || ""}
              />
            ) : currentCaptain && !crewSelectionPhase && !votePhase ? (
              // Phase : le capitaine doit valider son statut
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
                username={username}
                roomCode={roomCode || ""}
              />
            ) : crewSelectionPhase && isCaptain ? (
              // Phase : capitaine sélectionne l’équipage
              <SelectCrewPage
                players={players.filter((p) => p.username !== username)}
                roomCode={roomCode || ""}
                username={username}
                captainAvatar={
                  players.find((p) => p.username === currentCaptain)?.avatar || ""
                }
              />
            ) : crewSelectionPhase ? (
              // Phase : autre joueur attend que le capitaine sélectionne l’équipage
              <p className="text-center text-gray-600">
                En attente que le capitaine sélectionne son équipage...
              </p>
            ) : votePhase ? (
              // Phase : vote de l’équipage proposé
              <VoteCrewPage
                currentUser={username}
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
                  crewMembers.map((m) =>
                    players.find((p) => p.username === m),
                  ) as Player[]
                }
                allPlayers={players}
                handleVote={() => {}} // géré en interne dans VoteCrewPage
              />
            ) : role ? (
              // Phase : distribution de rôle (attente confirmation ?)
              <RoleDistribution
                role={role}
                username={username}
                roomCode={roomCode || ""}
                onConfirmRole={confirmRole}
              />
            ) : (
              // Phase : on attend encore le rôle ?
              <p className="text-center text-gray-500">
                Chargement de votre rôle...
              </p>
            )}
          </main>

          <FooterGame
           role={role || "marin"}
           piratePoints={totalPiratePoints}
           marinPoints={totalMarinPoints}
           mancheGagnees={0}
          />
        </>
      ) : (
        // Écran d’accueil (lobby) avant le lancement de la partie
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
            disabled={players.length < 7} // Désactiver si moins de 7 joueurs
            className={`font-bold py-3 px-6 rounded-full shadow-lg ${
              players.length < 7
                ? "bg-gray-400 text-gray-700 cursor-not-allowed" // Style grisé
                : "bg-white text-blue-600 cursor-pointer" // Style normal
            }`}
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
