"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type User = {
  email: string;
};

const Profile = () => {
  const [user, setUser] = useState<User | null>(null); // État pour l'utilisateur
  const [loading, setLoading] = useState<boolean>(true); // État pour le chargement
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      console.log("Debug: Checking authentication...");
      try {
        const response = await fetch("/api/auth/user");

        if (response.ok) {
          const userData = await response.json();
          console.log("Debug: User authenticated:", userData);
          setUser(userData);
        } else {
          console.log(
            "Debug: User not authenticated. Redirecting to /auth/signin."
          );
          router.push("/auth/signin?redirect=/profile");
        }
      } catch (error) {
        console.error("Debug: Error during authentication check:", error);
        router.push("/auth/signin?redirect=/profile");
      } finally {
        setLoading(false); // Fin du chargement
      }
    };

    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", { method: "POST" });

      if (response.ok) {
        router.push("/signin");
      } else {
        alert("Erreur lors de la déconnexion.");
      }
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
      alert("Erreur lors de la déconnexion.");
    }
  };

  if (loading) {
    return <p>Chargement...</p>; // Affiche un indicateur de chargement pendant la vérification
  }

  if (!user) {
    return <p>Non connecté</p>; // Affiche un message si aucun utilisateur n'est authentifié
  }

  return (
    <div className="w-full max-w-sm mx-auto bg-white rounded-lg shadow-md p-5">
      <h2 className="text-2xl font-semibold mb-4">Profil</h2>

      {/* Avatar & Info */}
      <div className="flex flex-col items-center">
        <div className="w-20 h-20 bg-gray-300 rounded-full"></div>
        <h3 className="text-lg font-semibold mt-3">Nom Pseudo</h3>
        <p className="text-gray-500 text-sm">{user.email}</p>
      </div>

      {/* Modifier le profil */}
      <button className="w-full bg-purple-600 text-white py-2 rounded-lg mt-4">
        Modifier le profil
      </button>

      {/* Sections */}
      <div className="mt-6">
        <Section
          title="Compte"
          items={["Identifiant", "E-mail", "Mot de passe"]}
        />
        <Section
          title="Notifications"
          items={["Notifications Push", "Notifications E-mail"]}
        />
        <Section title="Langue" items={["Francais"]} />
        <Section title="Theme" items={["Mode clair"]} />
        <Section title="Accessibilité" items={[]} />
      </div>

      {/* Déconnexion */}
      <button
        onClick={handleLogout}
        className="w-full bg-gray-100 text-purple-600 py-2 rounded-lg mt-6 flex items-center justify-center"
      >
        <span className="mr-2">🔌</span> Se déconnecter
      </button>
    </div>
  );
};

const Section = ({ title, items }) => {
  return (
    <div className="mb-4 border-b border-gray-200 pb-2">
      <h4 className="text-lg font-semibold mb-2">{title}</h4>
      {items.map((item, index) => (
        <div key={index} className="flex justify-between py-1 text-gray-600">
          {item}
          <span className="text-gray-400">&gt;</span>
        </div>
      ))}
    </div>
  );
};

export default Profile;
