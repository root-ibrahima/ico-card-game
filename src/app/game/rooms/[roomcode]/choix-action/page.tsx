// src/app/game/rooms/[roomcode]/choix-actions/page.tsx

"use client";

import React, { useState } from "react";
import ActionCard from "../components/ActionsCard";
import { sendMessageToRoom } from "@/lib/socket";
import { Player } from "@/types";

interface ChoixActionsPageProps {
  currentUser: string;
  crewMembers: Player[];
  role: string; // Rôle du currentUser
  roomCode: string;
}

const ChoixActionsPage: React.FC<ChoixActionsPageProps> = ({
  currentUser,
  crewMembers,
  role,
  roomCode,
}) => {
  const [actionSent, setActionSent] = useState<boolean>(false);

  // Vérifie si l'utilisateur est dans l'équipage
  console.log("crewMembers", crewMembers);
  const isInCrew = crewMembers.some((p) => p.username === currentUser);

  const handleActionSelect = (action: "ile" | "poison") => {
    console.log(">>> [Front] handleActionSelect, envoi de ACTION_SUBMITTED :", {
      currentUser,
      roomCode,
      action,
    });
    sendMessageToRoom(currentUser, roomCode, "ACTION_SUBMITTED", { action });
    setActionSent(true);
  };
  

  if (!isInCrew) {
    // Les non-membres de l'équipage ne font rien
    return (
      <div className="p-4 text-center">
        <p className="text-gray-600">
          En attente que les membres de l’équipage choisissent leurs actions...
        </p>
      </div>
    );
  }

  // Si le joueur est dans l'équipage
  if (actionSent) {
    return (
      <div className="p-4 text-center">
        <p className="text-green-600">Votre action a bien été envoyée !</p>
        <p>En attente des autres membres...</p>
      </div>
    );
  }

  return (
    <div className="p-4 flex flex-col items-center">
      <h2 className="text-xl font-bold mb-4">Choisissez votre action</h2>
      <ActionCard role={role} onActionSelect={handleActionSelect} />
    </div>
  );
};

export default ChoixActionsPage;
