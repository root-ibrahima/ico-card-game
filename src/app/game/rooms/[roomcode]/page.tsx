"use client";

import React, { useEffect, useState } from "react";
import { connectToRoom, disconnectSocket, sendMessageToRoom } from "@/lib/socket";
import { useRouter, usePathname } from "next/navigation";
import { RoomEvent } from "@/types";
import RoleDistribution from "./distribution-roles/page"; // Distribution des rôles
import FooterGame from "./components/FooterGame"; // Footer dynamique
import HeaderGame from "./components/HeaderGame"; // Header dynamique

interface Player {
  username: string;
  avatar: string;
}

const GameRoomPage: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [roomCode, setRoomCode] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null); // Stockage du rôle
  const [players, setPlayers] = useState<Player[]>([]);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [piratePoints, setPiratePoints] = useState<number>(0); // Points pirates
  const [marinPoints, setMarinPoints] = useState<number>(0); // Points marins
  const [mancheGagnees, setMancheGagnees] = useState<number>(0); // Manches gagnées

  // Récupération du code de salle depuis l'URL
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

  // Vérification de l'authentification
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

  // Gestion des événements WebSocket
  useEffect(() => {
    if (!username || !roomCode) return;

    const handleRoomEvent = (data: RoomEvent & { role?: string; players?: Player[]; piratePoints?: number; marinPoints?: number; mancheGagnees?: number }) => {
      switch (data.type) {
        case "YOUR_ROLE":
          if (data.role) {
            console.log(`🎭 Rôle reçu : ${data.role}`);
            setRole(data.role); // Rôle attribué au joueur
          }
          break;

        case "ROOM_UPDATE":
          if (data.players) setPlayers(data.players); // Mise à jour des joueurs
          break;

        case "GAME_START":
          setGameStarted(true); // La partie commence
          break;

        case "SCORE_UPDATE":
          if (data.piratePoints !== undefined) setPiratePoints(data.piratePoints);
          if (data.marinPoints !== undefined) setMarinPoints(data.marinPoints);
          if (data.mancheGagnees !== undefined) setMancheGagnees(data.mancheGagnees);
          break;

          case "ALL_ROLES_CONFIRMED":

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

  // Démarrage de la partie
  const startGame = () => {
    if (roomCode) {
      sendMessageToRoom(username, roomCode, "GAME_START");
    }
  };

  // Confirmation du rôle
  const confirmRole = () => {
    if (roomCode && username) {
      sendMessageToRoom(username, roomCode, "ROLE_CONFIRMED");
    }
  };

  if (loading) return <p className="text-white">Chargement...</p>;
  if (!username) return <p className="text-white">Non connecté</p>;

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden">
      {/* Affichage conditionnel selon l'état de la partie */}
      {gameStarted ? (
        <>
          {/* Affichage après le début de la partie */}
          <HeaderGame />
          <main className="flex-grow flex flex-col items-center justify-center bg-white overflow-hidden">
            {/* Vérification si le rôle est défini */}
            {role ? (
              <>
              <RoleDistribution role={role} username={username} roomCode={roomCode} />
                <button
                  onClick={confirmRole}
                  className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  J'ai compris mon rôle
                </button>
              </>
            ) : (
              <p className="text-center text-gray-500">Chargement de votre rôle...</p>
            )}
          </main>
          <FooterGame
            role={role || "marin"}
            piratePoints={piratePoints}
            marinPoints={marinPoints}
            mancheGagnees={mancheGagnees}
          />
        </>
      ) : (
        <>
          {/* Affichage de la salle d'attente avant le début de la partie */}
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

            {/* Liste des joueurs */}
            <div className="grid grid-cols-4 gap-4 mb-8">
              {players.map((player, index) => (
                <div
                  key={index}
                  className="bg-white text-black rounded-lg p-3 flex flex-col items-center shadow-md"
                >
                  <img
                    src={player.avatar}
                    alt={player.username}
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

            {/* Bouton pour commencer la partie */}
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
