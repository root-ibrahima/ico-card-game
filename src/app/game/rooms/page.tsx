"use client";

import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";

interface Room {
  id: string;
  host: string;
  status: string;
}

const RoomsPage = () => {
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    const fetchRooms = async () => {
      const { data, error } = await supabase.from("rooms").select("*");

      if (error) {
        console.error("Erreur lors de la récupération des salles :", error.message);
        return;
      }

      setRooms(data || []);
    };

    fetchRooms();
  }, []);

  return (
    <div className="pt-16 min-h-screen flex flex-col items-center bg-gradient-to-b from-blue-100 to-indigo-200 py-10">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Salles disponibles</h1>

      <div className="w-full max-w-4xl">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="bg-white shadow-lg rounded-lg p-4 mb-4"
          >
            <h2 className="text-xl font-bold text-blue-600">{room.host}</h2>
            <p className="text-gray-700">Statut : {room.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomsPage;
