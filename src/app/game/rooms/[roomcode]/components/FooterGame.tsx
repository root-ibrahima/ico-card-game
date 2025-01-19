import Image from 'next/image';

interface FooterGameProps {
  role?: string; // Rôle de l'utilisateur (facultatif)
  piratePoints: number; // Points des pirates
  marinPoints: number; // Points des marins
  mancheGagnees: number; // Nombre de manches gagnées
}

const FooterGame: React.FC<FooterGameProps> = ({
  role = 'marin', // Fallback sur "marin" si le rôle est undefined
  piratePoints = 0,
  marinPoints = 0,
  mancheGagnees = 0,
}) => {
  const roleLowerCase = role?.toLowerCase() || 'marin'; // Assurez-vous que role est en minuscule et défini
  const footerColor =
    roleLowerCase === 'pirate'
      ? '#EF4B4B'
      : roleLowerCase === 'marin'
      ? '#3B60BC'
      : roleLowerCase === 'sirene'
      ? '#46CC4F'
      : '#000000'; // Fallback couleur si aucun rôle valide

  return (
    <footer
      className="text-white flex justify-between items-center p-4 rounded-t-lg relative"
      style={{ backgroundColor: footerColor }} // Couleur dynamique du footer
    >
      {/* Nombre de manches gagnées */}
      <div className="text-center">
        <p className="text-sm">MANCHE</p>
        <p className="text-lg font-bold">{mancheGagnees} / 10</p>
      </div>
      {/* Rôle de l'utilisateur */}
      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-white w-16 h-16 rounded-lg shadow-md flex items-center justify-center">
        <Image
          src={`/cartes/roles/Carte-${roleLowerCase}.png`} // Assurez-vous que le rôle est en minuscule
          alt={role}
          width={64}
          height={64}
          className="rounded-lg"
        />
      </div>
      {/* Points pour les pirates et marins */}
      <div className="text-center">
        <p className="text-sm">POINTS</p>
        <p className="text-lg font-bold">
          {piratePoints} 🏴‍☠️ | {marinPoints} ⚓
        </p>
      </div>
    </footer>
  );
};

export default FooterGame;