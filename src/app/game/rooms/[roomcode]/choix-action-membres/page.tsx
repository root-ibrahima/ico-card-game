"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation"; // ✅ Utilisation de `useParams()`
import { connectToRoom, disconnectSocket, sendMessageToRoom } from "@/lib/socket";
import type { Player, RoomEvent } from "@/types/index";
import ActionCard from "./ActionCard";

const ActionPage = () => {
    const params = useParams(); // ✅ Récupération dynamique du `roomCode`
    const router = useRouter();
    const roomCode = params.roomcode as string; // ✅ Conversion en `string`
    
    // ✅ Gestion dynamique de l'utilisateur et de l'équipage
    const [currentUser, setCurrentUser] = useState<Player | null>(null);
    const [crewMembers, setCrewMembers] = useState<Player[]>([]);
    const [selectedAction, setSelectedAction] = useState<string | null>(null);
    const [actionsSent, setActionsSent] = useState<boolean>(false);

    useEffect(() => {
        // ✅ Récupérer le joueur depuis le localStorage
        const storedUser = localStorage.getItem("currentUser");
        if (storedUser) {
            setCurrentUser(JSON.parse(storedUser) as Player);
        }

        // ✅ Récupérer les membres d'équipage via API
        fetch(`/api/rooms/${roomCode}`)
            .then((res) => res.json())
            .then((data) => setCrewMembers(data.players || []))
            .catch((err) => console.error("Erreur récupération équipage:", err));
    }, [roomCode]);

    const isCrewMember = currentUser ? crewMembers.some(member => member.username === currentUser.username) : false;
    const availableActions = currentUser?.role === "pirate" ? ["Île", "Attaque", "Sabotage"] : ["Île"];

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
        if (actionsSent || !currentUser) return;

        setSelectedAction(action);
        setActionsSent(true);

        sendMessageToRoom(currentUser.username, roomCode, "ACTION_SELECTION", {
            action,
        });
    };

    if (!currentUser) {
        return <p className="text-lg text-center text-gray-700">Chargement...</p>;
    }

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
