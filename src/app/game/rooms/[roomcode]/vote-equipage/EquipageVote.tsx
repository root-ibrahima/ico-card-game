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
    const router = useRouter();

    useEffect(() => {
        if (!roomCode || !currentUser) return;

        const handleRoomEvent = (data: RoomEvent) => {
            if (data.type === "VOTE_RESULTS") {
                setVotesYes(data.payload.votesYes || 0);
                setApproved(data.payload.approved || false);

                setTimeout(() => {
                    router.push(data.payload.approved ? "/game/EquipageAccepte" : "/game/EquipageRefuse");
                }, 3000);
            }
        };

        connectToRoom(roomCode, currentUser.name, handleRoomEvent);

        return () => {
            disconnectSocket();
        };
    }, [roomCode, currentUser, router]);

    const handleVote = (vote: "yes" | "no") => {
        sendMessageToRoom(currentUser.name, roomCode, "VOTE_CREW", {
            vote,
            selectedCrew: crewMembers.map((c) => c.name),
        });
    };

    return (
        <div className="min-h-screen flex flex-col justify-between bg-gray-100">
            <HeaderGame />
            <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-2xl font-bold text-gray-800">Vote sur l&apos;équipage</h1>
                <p className="text-lg text-gray-700">Capitaine : {captain.name}</p>
                <p className="text-lg text-gray-700">Membres d&apos;équipage :</p>
                <ul>
                    {crewMembers.map((member, index) => (
                        <li key={index} className="text-lg">{member.name}</li>
                    ))}
                </ul>

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
            </main>

            <FooterGame role="someRole" piratePoints={0} marinPoints={0} mancheGagnees={0} />
    
        </div>
    );
};

export default EquipageVote;
function setVotesYes(arg0: number) {
    throw new Error("Function not implemented.");
}

