"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { connectToRoom, disconnectSocket, sendMessageToRoom } from "@/lib/socket";
import type { Player, RoomEvent } from "@/types/index";
import ActionCard from "./ActionCard";

interface ActionPageProps {
    currentUser: Player;
    roomCode: string;
    crewMembers: Player[];
}

const ActionPage = ({ currentUser, roomCode, crewMembers }: ActionPageProps) => {
    const [selectedAction, setSelectedAction] = useState<string | null>(null);
    const [actionsSent, setActionsSent] = useState<boolean>(false);
    const router = useRouter();

    const isCrewMember = crewMembers.some(member => member.username === currentUser.username);
    const availableActions = currentUser.role === "pirate" ? ["Île", "Attaque", "Sabotage"] : ["Île"];

    useEffect(() => {
        if (!roomCode || !currentUser) return;

        const handleRoomEvent = (data: RoomEvent) => {
            if (data.type === "ACTION_RESULTS") {
                router.push("/game/choix-action-revelation");
            }
        };

        connectToRoom(roomCode, currentUser.username, handleRoomEvent);

        return () => {
            disconnectSocket();
        };
    }, [roomCode, currentUser, router]);

    const handleActionSelection = (action: string) => {
        if (actionsSent) return;

        setSelectedAction(action);
        setActionsSent(true);

        sendMessageToRoom(currentUser.username, roomCode, "ACTION_SELECTION", {
            action,
        });
    };

    return (
        <div className="min-h-screen flex flex-col justify-between bg-gray-100">
            <h1 className="text-2xl font-bold text-gray-800 text-center">Sélection d&apos;action</h1>
            {isCrewMember ? (
                <div className="flex flex-col items-center">
                    <p className="text-lg text-gray-700">Choisissez une action :</p>
                    <div className="flex flex-wrap gap-4 mt-4">
                        {availableActions.map(action => (
                            <ActionCard 
                                key={action} 
                                action={action} 
                                onSelect={handleActionSelection} 
                                selected={selectedAction === action} 
                            />
                        ))}
                    </div>
                </div>
            ) : (
                <p className="text-lg text-center text-gray-700">🕒 En attente des décisions de l&apos;équipage...</p>
            )}
        </div>
    );
};

export default ActionPage;
