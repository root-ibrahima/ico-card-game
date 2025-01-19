"use client";

interface ActionCardProps {
    username: string;
    action: string;
}

const ActionCard = ({ username, action }: ActionCardProps) => {
    return (
        <div className="p-4 border rounded-lg shadow-md bg-white text-gray-800">
            <strong>{username}</strong> a choisi : {action}
        </div>
    );
};

export default ActionCard;
