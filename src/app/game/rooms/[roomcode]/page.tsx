"use client";

import React, { useEffect, useState } from "react";
import { connectToRoom, disconnectSocket } from "@/lib/socket";
import { useRouter, usePathname } from "next/navigation";
import { RoomEvent } from "@/types";

interface Player {
  username: string;
  avatar: string;
}

const GameRoomPage: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname(); // Pour extraire roomCode depuis l'URL
  const [roomCode, setRoomCode] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [role, setRole] = useState<string | null>(null);
  const [isCaptain, setIsCaptain] = useState<boolean>(false);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  // Récupérer le code de la salle depuis l'URL
  useEffect(() => {
    const segments = pathname.split("/");
    const code = segments[segments.indexOf("rooms") + 1]; // Récupère le segment suivant "rooms"
    if (code) {
      setRoomCode(code);
    } else {
      console.error("❌ Aucun code de salle trouvé dans l'URL !");
      router.push("/"); // Redirige vers la page d'accueil si aucun code n'est trouvé
    }
  }, [pathname, router]);

  // Vérifie l'authentification avant de rejoindre une salle
  useEffect(() => {
    const checkAuth = async () => {
      console.log("Debug: Checking authentication...");
      try {
        const response = await fetch("/api/auth/user");

        if (response.ok) {
          const userData = await response.json();
          console.log("Debug: User authenticated:", userData);
          setUsername(userData.email);
        } else {
          console.log("Debug: User not authenticated. Redirecting...");
          router.push(`/auth/signin?redirect=/game/rooms/${roomCode}`);
        }
      } catch (error) {
        console.error("❌ Debug: Error during authentication check:", error);
        router.push(`/auth/signin?redirect=/game/rooms/${roomCode}`);
      } finally {
        setLoading(false);
      }
    };

    if (roomCode) {
      checkAuth();
    }
  }, [router, roomCode]);

  // Connecte le joueur à la salle via WebSocket
  useEffect(() => {
    if (!username || !roomCode) return;

    const handleRoomEvent = (data: RoomEvent & { players?: Player[]; role?: string; isCaptain?: boolean }) => {
      console.log("🎮 Log reçu :", data);

      if (data.type === "ROOM_UPDATE" && data.players) {
        setPlayers(data.players);
      }

      if (data.type === "GAME_START" && data.players) {
        setPlayers(data.players);
        setGameStarted(true);
      }

      if (data.type === "YOUR_ROLE") {
        setRole(data.role || "Inconnu");
        setIsCaptain(data.isCaptain || false);
      }
    };

    connectToRoom(roomCode, username, handleRoomEvent);

    return () => {
      disconnectSocket();
    };
  }, [roomCode, username]);

  if (loading) {
    return <p className="text-white">Chargement...</p>;
  }

  if (!username) {
    return <p className="text-white">Non connecté</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-600 to-purple-700 flex flex-col items-center p-6 text-white">
      <header className="w-full flex justify-between items-center mb-6 px-4">
        <button onClick={() => router.back()} className="text-white font-medium">⬅ Retour</button>
        <h1 className="text-3xl font-extrabold">Salle : {roomCode}</h1>
        <div className="w-8 h-8"></div>
      </header>

      <section className="grid grid-cols-4 gap-4 w-full max-w-3xl">
        {players.map((player, index) => (
          <div
            key={index}
            className="bg-white text-black rounded-lg p-3 flex flex-col items-center shadow-lg transform transition-all duration-300 hover:scale-110"
          >
            <img src={player.avatar} alt={player.username} className="w-16 h-16 rounded-full" />
            <p className="mt-2 font-semibold">{player.username}</p>
          </div>
        ))}
      </section>

      {gameStarted && role && (
        <div className="mt-6 p-4 bg-gray-800 text-white font-bold rounded-lg shadow-lg">
          🎭 Ton rôle : {role}
          {isCaptain && " (Capitaine)"}
        </div>
      )}
    </div>
  );
};

export default GameRoomPage;
