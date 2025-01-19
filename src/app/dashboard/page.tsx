"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch("/api/auth/user");
      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else {
        // Redirect to signin if user is not authenticated
        router.push("/signin");
      }
      setLoading(false);
    };

    fetchUser();
  }, [router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return null; // Redirection handled by useEffect
  }

  return (
    <div>
      <h1>Welcome to your Dashboard, {user.email}!</h1>
    </div>
  );
}
