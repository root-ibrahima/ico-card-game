import React from "react";

interface RoleCardProps {
  role: string;
  description: string;
  imageUrl: string;
}

const RoleCard: React.FC<RoleCardProps> = ({ role, description, imageUrl }) => {
  return (
    <div className="role-card">
      <img src={imageUrl} alt={role} />
      <h2>{role}</h2>
      <p>{description}</p>
    </div>
  );
};

export default RoleCard;