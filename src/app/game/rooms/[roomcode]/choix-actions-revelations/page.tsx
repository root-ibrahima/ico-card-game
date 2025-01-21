"use client";
import React from "react";
import { Player } from "@/types";
import Image from "next/image";


interface ActionRevelation {
  username: string;
  action: "ile" | "poison";
}

interface ChoixActionsRevelationsPageProps {
  actions: ActionRevelation[]; // Liste des actions choisies
  players: Player[]; // Tous les joueurs (pour afficher les avatars)
  winningSide: "marins" | "pirates" | null; // Camp gagnant
}

const ChoixActionsRevelationsPage: React.FC<ChoixActionsRevelationsPageProps> = ({
  actions,
  players,
  winningSide,
}) => {
  return (
<main className="h-screen flex items-center justify-center">
  <div className="p-4 flex flex-col items-center" style={{ marginTop: "-9rem" }}>
    <h2 className="text-2xl font-bold mb-4">Choix des actions</h2>
      <p className="text-gray-600 mb-4">
        Les résultats sont maintenant révélés !
      </p>

      <div className="flex space-x-2">
        {actions.map((act, idx) => (
          <Image
            key={idx}
            src={`/cartes/actions/carte-${act.action}.png`} // Les images des cartes
            alt={act.action}
            width={120}
            height={120}
            className="w-20 h-20 object-cover hover:scale-105 transition-transform"
          />
        ))}
      </div>

      {winningSide && (
        <div className="mt-6 p-4 bg-yellow-100 text-center rounded shadow">
          {winningSide === "pirates" ? (
            <p className="text-red-600 font-bold text-lg">
              Une carte <span className="uppercase">poison</span> a été révélée !
              <br />
              Les pirates marquent un point.
            </p>
          ) : (
            <p className="text-blue-600 font-bold text-lg">
              Aucune carte poison révélée !
              <br />
              Les marins marquent un point.
            </p>
          )}
        </div>
      )}

            <div
            className="flex gap-2 mb-4 w-full max-w-md px-2 justify-center"
            >
            {players.map((player) => (
                <div
                key={player.username}
                className="flex flex-col items-center space-y-1"
                >
                <Image
                    src={player.avatar}
                    alt={player.username}
                    width={48} // Réduction de la taille
                    height={48}
                    unoptimized
                    className="rounded-full object-cover"
                />
                <p className="text-xs font-semibold text-center">{player.username}</p> {/* Taille réduite du texte */}
                </div>
            ))}
            </div>
    </div>
</main>
  );
};

export default ChoixActionsRevelationsPage;
