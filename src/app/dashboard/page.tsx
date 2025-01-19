"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Sidebare } from "../../components/DashboardComponents/Sidebare";
import UserTable from "../../components/DashboardComponents/UserTable";

interface User {
  email: string;
  // Ajoute d'autres propriétés utilisateur si nécessaire
}

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/auth/user");
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          // Rediriger vers la page de connexion si l'utilisateur n'est pas authentifié
          router.push("/signin");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération de l'utilisateur :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  if (loading) {
    return <p>Chargement...</p>;
  }

  if (!user) {
    return null; // Redirection gérée par useEffect
  }

  return (
    <div className="flex">
      <Sidebare />
      <div className="flex-1 p-4">
        <h1 className="text-2xl mb-4">Gestion des Utilisateurs</h1>
        <UserTable />
      </div>
    </div>
  );
};

export default Dashboard;
