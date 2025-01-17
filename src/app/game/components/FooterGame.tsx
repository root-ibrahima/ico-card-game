import Image from 'next/image';

interface FooterGameProps {
  role?: 'sirene' | 'marin' | 'pirate'; // Définir les rôles possibles
  piratePoints?: number;
  marinPoints?: number;
  mancheGagnees?: number;
}

const FooterGame: React.FC<FooterGameProps> = ({
    //a lier au BO 
  role = 'marin',
  piratePoints = 0,
  marinPoints = 0,
  mancheGagnees = 0,
}) => {
  return (
    <footer className="bg-[#EF4B4B] text-white flex justify-between items-center p-4 rounded-t-lg relative">
    {/* Nombre de manches gagnées */}
    <div className="text-center">
      <p className="text-sm">MANCHE</p>
      <p className="text-lg font-bold">{mancheGagnees} / 10</p>
    </div>
  
    {/* Votre rôle */}
<div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-white w-16 h-16 rounded-lg shadow-md flex items-center justify-center">
  <Image
    src={`/cartes/roles/${role}.png`} // Image basée sur le rôle
    alt={role}
    width={64} // Correspond à w-16 (16 * 4px = 64px)
    height={64} // Correspond à h-16 (16 * 4px = 64px)
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