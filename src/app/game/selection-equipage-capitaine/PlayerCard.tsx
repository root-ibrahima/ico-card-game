import React from "react";

interface PlayerCardProps {
  player: { id: string; name: string; image: string };
  isSelected: boolean;
  selectionNumber?: number; // Numéro de sélection (1/3, 2/3, ...)
  onClick: () => void;
}

const PlayerCard: React.FC<PlayerCardProps> = ({
  player,
  isSelected,
  selectionNumber,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="relative cursor-pointer p-2 rounded-lg shadow-md text-center transition"
      style={{
        background: isSelected ? "rgba(173, 216, 230, 0.6)" : "white", // Filtre bleu clair
        backdropFilter: isSelected ? "blur(4px)" : "none", // Blur léger
        WebkitBackdropFilter: isSelected ? "blur(4px)" : "none",
      }}
    >
      {/* Image du joueur */}
      <img
        src={player.image}
        alt={player.name}
        className="w-20 h-20 object-cover rounded-full mx-auto mb-2 transition"
      />

      {/* Nom du joueur */}
      <h3 className="text-sm font-bold">{player.name}</h3>

      {/* Numéro de sélection (en bas à droite si sélectionné) */}
      {isSelected && selectionNumber !== undefined && (
        <div className="absolute bottom-2 right-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          {selectionNumber}/3
        </div>
      )}
    </div>
  );
};

export default PlayerCard;
