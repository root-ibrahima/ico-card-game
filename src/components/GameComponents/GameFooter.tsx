import Image from 'next/image';

interface FooterGameProps {
  role?: 'sirene' | 'marin' | 'pirate';
  piratePoints?: number;
  marinPoints?: number;
  mancheGagnees?: number;
}

const FooterGame: React.FC<FooterGameProps> = ({
  role = 'pirate',
  piratePoints = 0,
  marinPoints = 0,
  mancheGagnees = 0,
}) => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 w-full bg-[#EF4B4B] text-white flex justify-between items-center p-4 rounded-t-lg">
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
