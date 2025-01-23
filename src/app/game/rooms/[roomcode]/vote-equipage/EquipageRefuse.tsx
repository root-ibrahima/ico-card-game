"use client";

import { useRouter } from "next/navigation";
import HeaderGame from "../components/HeaderGame";
import FooterGame from "../components/FooterGame";

const EquipageRefuse = ({ roomCode }: { roomCode: string }) => {
  const router = useRouter();

  const handleRetry = () => {
    router.push(`/game/rooms/${roomCode}`);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100">
      <HeaderGame />
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-2xl font-bold text-red-600">❌ Équipage Refusé !</h1>
        <p className="text-lg text-gray-700">Un autre équipage devra être sélectionné.</p>
        <button
          onClick={handleRetry}
          className="mt-4 px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-800"
        >
          Réessayer
        </button>
      </main>
      <FooterGame role="someRole" piratePoints={0} marinPoints={0} mancheGagnees={0} />
    </div>
  );
};

export default EquipageRefuse;
