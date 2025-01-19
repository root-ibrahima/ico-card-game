"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Utilisé pour l'App Router
import { useGame } from "@/context/GameContext"; // Conserve l'utilisation du contexte si pertinent.

type User = {
  email: string;
};

const Home: React.FC = () => {
  const [roomCode, setRoomCode] = useState<string>(""); // Code de la salle
  const [user, setUser] = useState<User | null>(null); // Stocke les données utilisateur
  const [loading, setLoading] = useState<boolean>(true); // Indique le chargement
  const {} = useGame(); // Si le contexte est utile
  const router = useRouter();

  // Vérification de l'utilisateur connecté
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/user");
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          router.push("/signin?redirect=/");
        }
      } catch (error) {
        console.error("Erreur lors de la vérification de l'authentification :", error);
        router.push("/signin?redirect=/");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return <p>Chargement...</p>;
  }

  // Créer une nouvelle partie
  const handleJoinGame = () => {
    if (!roomCode.trim()) {
      alert("Veuillez entrer un code de salle !");
      return;
    }
    router.push(`game/rooms/${roomCode.trim().toUpperCase()}`);
  };
  
  const handleCreateGame = () => {
    const newRoomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    router.push(`game/rooms/${newRoomCode}`);
  };
  

  return (
    <div className="w-full max-w-sm mx-auto bg-white rounded-lg shadow-md p-5 mb-20 overflow-y-auto">
      {/* Affichage de l'utilisateur connecté */}
      {user && (
        <h1 className="text-2xl font-semibold mb-4">
          Bon retour, <span className=" text-[#3B60BC]">{user.email}</span> !
        </h1>
      )}

      {/* Champ pour entrer le code de la salle */}
      <input
        type="text"
        value={roomCode}
        onChange={(e) => setRoomCode(e.target.value)}
        placeholder="Code de la salle"
        className="w-full p-2 border border-gray-300 rounded-md mt-2"
      />

      {/* Boutons */}
      <div className="space-y-4 mt-4">
        <button
          className="w-full bg-[#3B60BC] text-white py-3 rounded-lg text-left px-4"
          onClick={handleCreateGame}
        >
          <span className="font-bold">Démarrer une partie</span>
          <p className="text-sm">Lancez une nouvelle aventure et défiez vos amis</p>
        </button>

        <button
          className="w-full bg-[#EF4B4B] text-white py-3 rounded-lg text-left px-4"
          onClick={handleJoinGame}
        >
          <span className="font-bold">Rejoindre une partie</span>
          <p className="text-sm">Entrez dans une partie existante et rejoignez l&apos;aventure</p>
        </button>
      </div>

      {/* Statistiques */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold">Mes statistiques</h3>
        <div className="flex justify-center mt-3">
          <div className="flex space-x-4 overflow-x-scroll md:overflow-x-auto md:justify-center pb-4 max-w-screen-lg">
            <div className="flex-shrink-0 w-60 p-4 bg-gray-100 shadow rounded-md text-center">
              <p className="text-xl font-bold">25</p>
              <p className="text-sm">Parties jouées</p>
            </div>
            <div className="flex-shrink-0 w-60 p-4 bg-gray-100 shadow rounded-md text-center">
              <p className="text-xl font-bold">17</p>
              <p className="text-sm">Victoires</p>
            </div>
          </div>
        </div>
      </div>

      {/* Cartes Bonus */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold">Cartes Bonus disponibles</h3>
        <div className="flex justify-center mt-3">
          <div className="flex space-x-4 overflow-x-scroll md:overflow-x-auto md:justify-center pb-4 max-w-screen-lg">
            {[
              "Voyage_express",
              "Antidote",
              "Charlatan",
              "Mal_de_mer",
              "Malandrin",
              "Medusa",
              "Mer_agite",
              "Observateur",
              "Perroquet",
              "Troc",
            ].map((card) => (
              <div key={card} className="flex-shrink-0 w-60 p-4 bg-gray-100 shadow rounded-md text-center">
                <Image src={`/cartes/bonus/Carte-${card}.png`} alt={card} width={160} height={128} className="w-full h-32 object-contain mb-2" />
                <h4 className="font-bold">{card.replace(/_/g, " ")}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Règles du jeu */}
      <div className="mt-6 pb-4">
        <h3 className="text-lg font-semibold">Règles du jeu</h3>
        <p className="text-sm mt-2">
          ICO est un jeu de société numérique où pirates, marins et sirènes s&apos;affrontent pour le contrôle
          d&apos;un trésor en mer. Chaque équipe a un objectif différent : les pirates doivent gagner la confiance
          des marins et empoisonner l&apos;équipage, tandis que les marins et la sirène doivent identifier les pirates
          et protéger le trésor.
        </p>
        <button className="w-full bg-[#3B60BC] text-white py-2 rounded-lg mt-4">En savoir plus</button>
      </div>
    </div>
  );
};

export default Home;
