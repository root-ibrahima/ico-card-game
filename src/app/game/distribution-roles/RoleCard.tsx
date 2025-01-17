import Image from "next/image";

interface RoleCardProps {
  role: string; // Rôle à afficher (ex : "pirate", "marin", "sirene")
  description: string; // Description du rôle
}

const RoleCard: React.FC<RoleCardProps> = ({ role, description }) => {
  return (
    <div className="flex flex-col items-center">
      {/* Image du rôle */}
      <div className="w-48 h-48 mb-6">
        <Image
          src={`/cartes/roles/${role}.png`}
          alt={role}
          width={192}
          height={192}
          className="rounded-lg object-cover"
        />
      </div>

      {/* Texte descriptif */}
      <h2 className="text-3xl font-bold text-gray-800 mb-4 capitalize">
        {role}
      </h2>
      <p className="text-lg text-gray-600">{description}</p>
    </div>
  );
};

export default RoleCard;
