"use client";

import { useRouter } from "next/navigation";
import HeaderGame from "../components/HeaderGame";
import FooterGame from "../components/FooterGame";

const EquipageAccepte = ({ roomCode }: { roomCode: string }) => {
  const router = useRouter();

  const handleContinue = () => {
    router.push(`/game/rooms/${roomCode}`);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100">
      <HeaderGame />
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-2xl font-bold text-green-600">✅ Équipage Accepté !</h1>
        <p className="text-lg text-gray-700">L’équipage a été validé et part en mission.</p>
        <button
          onClick={handleContinue}
          className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Continuer
        </button>
      </main>
      <FooterGame role="someRole" piratePoints={0} marinPoints={0} mancheGagnees={0} />
    </div>
  );
};

export default EquipageAccepte;
