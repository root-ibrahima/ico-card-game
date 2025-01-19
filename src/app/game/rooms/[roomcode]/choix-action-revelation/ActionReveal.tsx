"use client";

import { useEffect, useState } from "react";
import { connectToRoom, disconnectSocket } from "@/lib/socket";
import type { RoomEvent } from "@/types/index";

const ActionReveal = ({ roomCode }: { roomCode: string }) => {
    const [actions, setActions] = useState<{ name: string; action: string }[]>([]);

    useEffect(() => {
        if (!roomCode) return;

        const handleRoomEvent = (data: RoomEvent) => {
            if (data.type === "ACTION_RESULTS") {
                setActions(data.payload.actions || []);
            }
        };

        connectToRoom(roomCode, "", handleRoomEvent);

        return () => {
            disconnectSocket();
        };
    }, [roomCode]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <h1 className="text-2xl font-bold text-gray-800">Révélation des actions</h1>
            <ul className="mt-4">
                {actions.map(({ name, action }) => (
                    <li key={name} className="text-lg text-gray-700">
                        {name} a choisi : <strong>{action}</strong>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ActionReveal;
