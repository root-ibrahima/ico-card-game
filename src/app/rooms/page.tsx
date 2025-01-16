"use client";

import { useState, useEffect } from "react";

import { RoomEvent } from "@/types";
import { connectToRoom, sendMessageToRoom, disconnectSocket } from "@/lib/socket";

const CreateRoomPage = () => {
  const [host, setHost] = useState("");
  const [room, setRoom] = useState<{ id: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fonction pour créer une salle
  const createRoom = async () => {
    if (!host.trim()) {
      setError("Le nom de l'hôte est requis.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/rooms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ host }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la création de la salle.");
      }

      const data = await response.json();
      setRoom(data);

      // Connecter au WebSocket après avoir créé la salle
      connectToRoom(data.id, (data: RoomEvent) => {
        console.log("Message reçu via WebSocket :", data);
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Une erreur est survenue.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour envoyer un message dans la salle
  const sendMessage = () => {
    if (room) {
      sendMessageToRoom(room.id, `Message de l'hôte (${host})`);
    } else {
      setError("Aucune salle active. Créez une salle pour envoyer un message.");
    }
  };

  // Déconnecter le WebSocket lorsqu'on quitte la page
  useEffect(() => {
    return () => {
      disconnectSocket();
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-100 to-indigo-200 py-10">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Créer une salle 🎮</h1>

      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <div className="mb-4">
          <label htmlFor="host" className="block text-gray-700 font-medium mb-2">
            Nom de l&apos;hôte
          </label>
          <input
            id="host"
            type="text"
            value={host}
            onChange={(e) => setHost(e.target.value)}
            placeholder="Entrez votre nom"
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <button
          onClick={createRoom}
          disabled={loading}
          className={`w-full px-4 py-2 text-white font-medium rounded-lg transition ${
            loading
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Création en cours..." : "Créer une salle"}
        </button>

        {error && (
          <p className="mt-4 text-sm text-red-500 font-medium">{error}</p>
        )}

        {room && (
          <div className="mt-6 bg-green-100 text-green-700 p-4 rounded-lg">
            <p className="font-bold">Salle créée avec succès !</p>
            <p>ID de la salle : <span className="font-mono">{room.id}</span></p>

            <button
              onClick={sendMessage}
              className="mt-4 w-full px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition"
            >
              Envoyer un message dans la salle
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateRoomPage;
