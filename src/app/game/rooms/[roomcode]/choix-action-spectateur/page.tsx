"use client";

import { useEffect, useState } from "react";
import { connectToRoom, disconnectSocket } from "@/lib/socket";
import type { RoomEvent } from "@/types/index";
import ActionCard from "./ActionCard";

const SpectatorPage = ({ roomCode }: { roomCode: string }) => {
    const [actions, setActions] = useState<{ username: string; action: string }[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!roomCode) return;

        const handleRoomEvent = (data: RoomEvent) => {
            if (data.type === "ACTION_RESULTS") {
                const formattedActions = (data.payload.actions || []).map(action => ({
                    username: action.name, // ✅ Correction ici : 'name' devient 'username'
                    action: action.action,
                }));
                setActions(formattedActions);
                setLoading(false);
            }
        };

        connectToRoom(roomCode, "", handleRoomEvent);

        return () => {
            disconnectSocket();
        };
    }, [roomCode]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <h1 className="text-2xl font-bold text-gray-800">Observation des actions</h1>

            {loading ? (
                <p className="text-lg text-gray-600">⏳ En attente des résultats...</p>
            ) : actions.length > 0 ? (
                <ul className="mt-4">
                    {actions.map(({ username, action }) => (
                        <ActionCard key={username} username={username} action={action} />
                    ))}
                </ul>
            ) : (
                <p className="text-lg text-gray-600">Aucune action effectuée.</p>
            )}
        </div>
    );
};

export default SpectatorPage;
