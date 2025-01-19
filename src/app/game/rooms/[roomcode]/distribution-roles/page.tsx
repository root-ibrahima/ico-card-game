"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { connectToRoom, disconnectSocket, sendMessageToRoom } from "@/lib/socket";
import type { RoomEvent } from "@/types/index";
import RoleCard from "@/components/RoleCard";

const roleDescriptions: { [key: string]: string } = {
  marin: "Votre mission est de protéger le navire et de démasquer les pirates !",
  pirate: "Votre mission est de semer la confusion parmi les marins et de les empoisonner !",
  sirene: "Utilisez votre charme pour manipuler les joueurs et perturber le jeu !",
  captain: "Vous êtes le narrateur du jeu. Guidez les joueurs et annoncez les événements !",
};

interface RoleDistributionProps {
  params: { roomcode: string };
}

const RoleDistribution = ({ params }: RoleDistributionProps) => {
  const router = useRouter();
  const roomCode = params.roomcode;

  const [username] = useState<string | null>("defaultUsername");
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  /** 🔍 Récupérer le username de l'utilisateur connecté */
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/auth/user");
        if (!response.ok) throw new Error("Non authentifié");

        await response.json();
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
        router.push(`/auth/signin?redirect=/game/rooms/${roomCode}`);
        router.push(`/auth/signin?redirect=/game/rooms/${roomCode}`);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [roomCode, router]);

  /** 🎧 Se connecter au WebSocket pour récupérer le rôle */
  useEffect(() => {
    if (!username || !roomCode) return;

    const handleRoomEvent = (data: RoomEvent) => {
      if (data.type === "YOUR_ROLE" && data.payload.role) {
        setRole(data.payload.role);
      }
    };

    connectToRoom(roomCode, username, handleRoomEvent);

    return () => {
      disconnectSocket();
    };
  }, [username, roomCode]);

  /** 📩 Confirmation du rôle et passage à l'étape suivante */
  const confirmRole = () => {
    if (username && roomCode) {
      sendMessageToRoom(username, roomCode, "ROLE_CONFIRMED");
      router.push(`/game/rooms/${roomCode}/choix-capitaines`);
    }
  };

  if (error) return <p className="text-center text-red-500">❌ {error}</p>;
  if (loading) return <p className="text-center text-gray-500">⏳ Chargement...</p>;

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100">
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
        {role ? (
          <>
            <RoleCard 
              role={role} 
              description={roleDescriptions[role] || "Rôle inconnu"} 
              imageUrl={`/images/roles/${role}.png`} 
            />
            <p className="text-base text-gray-500 mt-6">
              Les autres joueurs ont également reçu leurs rôles.
            </p>
            <button
              onClick={confirmRole}
              className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              ✅ Suivant
            </button>
          </>
        ) : (
          <p className="text-lg text-gray-600">🔄 En attente de l&apos;attribution des rôles...</p>
        )}
      </main>
    </div>
  );
};


export default RoleDistribution;
