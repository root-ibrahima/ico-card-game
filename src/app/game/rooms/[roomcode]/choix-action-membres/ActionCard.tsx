"use client";

interface ActionCardProps {
    action: string;
    onSelect: (action: string) => void;
    selected: boolean;
}

const ActionCard = ({ action, onSelect, selected }: ActionCardProps) => {
    return (
        <button 
            className={`p-4 border rounded-lg shadow-md transition-all ${
                selected ? "bg-blue-500 text-white" : "bg-white text-gray-800"
            }`}
            onClick={() => onSelect(action)}
        >
            {action}
        </button>
    );
};

export default ActionCard;
