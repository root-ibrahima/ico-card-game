"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { connectToRoom, disconnectSocket, sendMessageToRoom } from "@/lib/socket";
import type { RoomEvent, Player } from "@/types/index";
import HeaderGame from "../components/HeaderGame";
import FooterGame from "../components/FooterGame";

interface VoteProps {
    currentUser: Player;
    roomCode: string;
    captain: Player;
    crewMembers: Player[];
}

const EquipageVote = ({ currentUser, roomCode, captain, crewMembers }: VoteProps) => {
    const [approved, setApproved] = useState<boolean | null>(null);
    const [newCaptain, setNewCaptain] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        if (!roomCode || !currentUser) return;

        const handleRoomEvent = (data: RoomEvent) => {
            try {
                console.log("📩 Événement reçu :", data);

                switch (data.type) {
                    case "VOTE_RESULTS":
                        setLoading(true);
                        setApproved(data.payload.approved ?? null);

                        console.log("🔎 Vote approuvé :", data.payload.approved);

                        setTimeout(() => {
                            router.push(data.payload.approved ? "/game/choix-action-membres" : `/game/rooms/${roomCode}`);
                        }, 3000);
                        break;

                    case "CAPTAIN_CHANGE":
                        setNewCaptain(data.payload.newCaptain ?? null);
                        console.log("👑 Nouveau capitaine :", data.payload.newCaptain);

                        setTimeout(() => {
                            router.push(`/game/rooms/${roomCode}`);
                        }, 2000);
                        break;

                    default:
                        console.warn("⚠️ Événement WebSocket inconnu :", data);
                        break;
                }
            } catch (error) {
                console.error("❌ Erreur WebSocket :", error);
            }
        };

        connectToRoom(roomCode, currentUser.name, handleRoomEvent);

        return () => {
            disconnectSocket();
        };
    }, [roomCode, currentUser, router]);

    const handleVote = (vote: "yes" | "no") => {
        console.log(`🗳️ ${currentUser.name} vote :`, vote);

        sendMessageToRoom(currentUser.name, roomCode, "VOTE_CREW", {
            vote,
            selectedCrew: crewMembers.map((c) => ({
                id: c.id,
                name: c.name,
                role: c.role,
                avatar: c.avatar,
                isCaptain: c.isCaptain,
                roomCode: c.roomCode,
                piratePoints: c.piratePoints,
                marinPoints: c.marinPoints,
                mancheGagnees: c.mancheGagnees,
            })),
        });
    };

    return (
        <div className="min-h-screen flex flex-col justify-between bg-gray-100">
            <HeaderGame />
            <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-2xl font-bold text-gray-800">Vote sur l&apos;équipage</h1>
                <p className="text-lg text-gray-700">Capitaine : {captain.name}</p>

                {loading ? (
                    <p className="text-lg font-bold text-blue-600">Calcul des votes en cours...</p>
                ) : (
                    <>
                        <div className="mt-4">
                            <button
                                onClick={() => handleVote("yes")}
                                className="bg-green-500 text-white px-4 py-2 rounded-lg m-2"
                            >
                                ✅ Accepter
                            </button>
                            <button
                                onClick={() => handleVote("no")}
                                className="bg-red-500 text-white px-4 py-2 rounded-lg m-2"
                            >
                                ❌ Refuser
                            </button>
                        </div>

                        {approved !== null && (
                            <p className={`text-xl font-bold mt-4 ${approved ? "text-green-600" : "text-red-600"}`}>
                                {approved ? "✅ Équipage accepté !" : "❌ Équipage refusé !" }
                            </p>
                        )}

                        {newCaptain && <p className="text-lg font-bold mt-4">👑 Nouveau capitaine : {newCaptain}</p>}
                    </>
                )}
            </main>

            <FooterGame 
                role={currentUser?.role || "marin"} 
                piratePoints={currentUser?.piratePoints || 0} 
                marinPoints={currentUser?.marinPoints || 0} 
                mancheGagnees={currentUser?.mancheGagnees || 0} 
            />
        </div>
    );
};

export default EquipageVote;