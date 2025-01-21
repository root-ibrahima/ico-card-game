import React from "react";
import Image from "next/image";
import { FooterGameProps } from "@/types/index";


const FooterGame: React.FC<FooterGameProps> = ({
  role = "marin",
  piratePoints = 0,
  marinPoints = 0,
  mancheGagnees = 0,
}) => {
  // On met en minuscule pour pointer vers la bonne image ou la bonne couleur
  const roleLowerCase = (role ?? "marin").toLowerCase();
  // Couleur de fond en fonction du rôle
  const footerColor =
    roleLowerCase === "pirate"
      ? "#EF4B4B"
      : roleLowerCase === "marin"
      ? "#3B60BC"
      : roleLowerCase === "sirene"
      ? "#46CC4F"
      : "#000000"; // fallback

  return (
    <footer
      // Position : fixed pour être toujours visible
      className="fixed bottom-0 left-0 w-full z-50 flex justify-between items-center p-4"
      style={{ backgroundColor: footerColor }}
    >
      {/* Nombre de manches gagnées */}
      <div className="text-center text-white">
        <p className="text-sm">MANCHE</p>
        <p className="text-lg font-bold">{mancheGagnees} / 10</p>
      </div>

      {/* Container de la carte du rôle */}
      <div className="relative">
        {/* On peut mettre une image de “carte de rôle”, ou juste un texte */}
        <Image
          src={`/cartes/roles/Carte-${roleLowerCase}.png`}
          alt={`Rôle: ${roleLowerCase}`}
          width={64}
          height={64}
          className="rounded-lg"
          unoptimized
        />
        {/* ou <p className="text-white text-lg font-bold">{roleLowerCase}</p> */}
      </div>

      {/* Points pirates / marins */}
      <div className="text-center text-white">
        <p className="text-sm">POINTS</p>
        <p className="text-lg font-bold">
          {piratePoints} 🏴‍☠️ | {marinPoints} ⚓
        </p>
      </div>
    </footer>
  );
};

export default FooterGame;
