import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

type User = {
  id: string;
  name: string;
  email: string;
  status: string;
};

const UserTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Récupérer les données utilisateur
      const { data, error } = await supabase
        .from("users") // Assurez-vous que la table est correcte
        .select("id, name, email, status");

      if (error) {
        throw error;
      }

      setUsers(data || []);
    } catch (err: any) {
      setError(err.message);
      console.error("Error fetching users:", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();

    // Abonnement Realtime
    const subscription = supabase
      .from("users") // Nom de la table
      .on("postgres_changes", { event: "UPDATE", schema: "public" }, (payload) => {
        console.log("Realtime update:", payload);
        const updatedUser = payload.new;
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === updatedUser.id ? { ...user, status: updatedUser.status } : user
          )
        );
      })
      .subscribe();

    // Cleanup
    return () => {
      supabase.removeSubscription(subscription);
    };
  }, []);

  if (isLoading) {
    return <div>Chargement des utilisateurs...</div>;
  }

  if (error) {
    return <div className="text-red-500">Erreur: {error}</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b-2">Nom</th>
            <th className="px-6 py-3 border-b-2">Email</th>
            <th className="px-6 py-3 border-b-2">Statut</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="px-6 py-4 border-b">{user.name || "N/A"}</td>
              <td className="px-6 py-4 border-b">{user.email}</td>
              <td className="px-6 py-4 border-b">{user.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
