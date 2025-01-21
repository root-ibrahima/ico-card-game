"use client";
import React from "react";
import Image from "next/image";


interface ActionCardProps {
  role: string; // "marin", "pirate", "sirene", etc.
  onActionSelect: (action: "ile" | "poison") => void;
}

const ActionCard: React.FC<ActionCardProps> = ({ role, onActionSelect }) => {
  // Vérifie si le joueur a le droit de choisir Poison
  const canChoosePoison = role.toLowerCase() === "pirate";


  const handleClick = (action: "ile" | "poison") => {
    if (action === "poison" && !canChoosePoison) {
      alert("Vous ne pouvez pas choisir le poison !");
      return;
    }
    onActionSelect(action);
  };

  return (
    <div className="flex gap-4">
      {/* Carte Île */}
      <div
        className="cursor-pointer"
        onClick={() => handleClick("ile")}
      >
        <Image
          src={`/cartes/actions/Carte-ile.png`}
          alt="Carte Île"
          width={120}
          height={120}
          className="w-36 h-36 object-cover hover:scale-105 transition-transform"
        />
      </div>

      {/* Carte Poison */}
      <div
        className={canChoosePoison ? "cursor-pointer" : "cursor-not-allowed"}
        onClick={() => handleClick("poison")}
      >
        <Image
          src="/cartes/actions/carte-poison.png"
          alt="Carte Poison"
          width={120}
          height={120}
          className={`w-36 h-36 object-cover hover:scale-105 transition-transform ${
            canChoosePoison ? "" : "opacity-50"
          }`}
        />
      </div>
    </div>
  );
};

export default ActionCard;
