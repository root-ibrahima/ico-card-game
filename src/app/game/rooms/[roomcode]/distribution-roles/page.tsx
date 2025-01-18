"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import FooterGame from "../components/FooterGame";
import HeaderGame from "../components/HeaderGame";
import RoleCard from "./RoleCard";

const roleDescriptions: { [key: string]: string } = {
  marin: "Votre mission est de protéger le navire et de démasquer les pirates !",
  pirate: "Votre mission est de semer la confusion parmi les marins et de les empoisonner !",
  sirene: "Utilisez votre charme pour manipuler les joueurs et perturber le jeu !",
  captain: "Vous êtes le narrateur du jeu. Guidez les joueurs et annoncez les événements !",
};

const RoleDistribution: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Vérification de l'authentification
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/user");
        if (!response.ok) {
          router.push(`/auth/signin?redirect=${encodeURIComponent(window.location.pathname + window.location.search)}`);
        }
      } catch (error) {
        console.error("❌ Erreur lors de la vérification de l'authentification :", error);
        router.push(`/auth/signin?redirect=${encodeURIComponent(window.location.pathname + window.location.search)}`);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  // Récupération du rôle depuis la query string
  useEffect(() => {
    const roleQuery = searchParams.get("role");
    if (roleQuery && Object.keys(roleDescriptions).includes(roleQuery)) {
      setRole(roleQuery);
    } else {
      console.error("❌ Rôle invalide ou non spécifié dans l'URL.");
      router.push("/"); // Redirige si le rôle est invalide
    }
  }, [searchParams, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg text-gray-500">Chargement...</p>
      </div>
    );
  }

  if (!role) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg text-red-500">Erreur : rôle introuvable.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100">
      {/* Header */}
      <HeaderGame />

      {/* Contenu principal */}
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
        {/* Affichage dynamique du rôle */}
        <RoleCard role={role} description={roleDescriptions[role] || "Rôle inconnu"} />
        <p className="text-base text-gray-500 mt-6">
          Les autres joueurs ont également reçu leurs rôles.
        </p>
      </main>

      {/* Footer */}
      <FooterGame />
    </div>
  );
};

export default RoleDistribution;
