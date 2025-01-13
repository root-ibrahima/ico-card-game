import React from "react";

interface RoleCardProps {
  role: string;
  description: string;
  imageUrl: string;
}

const RoleCard: React.FC<RoleCardProps> = ({ role, description, imageUrl }) => {
  return (
    <div className="border rounded-lg shadow-md p-4 text-center">
      <img src={imageUrl} alt={`Rôle: ${role}`} className="w-full h-32 object-cover rounded" />
      <h2 className="font-bold text-xl mt-4">{role}</h2>
      <p className="text-gray-600 mt-2">{description}</p>
    </div>
  );
};

export default RoleCard;
