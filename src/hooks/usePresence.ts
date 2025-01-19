import { useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

const usePresence = () => {
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const updateStatus = async (status: string) => {
        const { error } = await supabase
          .from("users")
          .update({ status })
          .eq("id", user.id);

        if (error) {
          console.error("Error updating status:", error.message);
        }
      };

      // Marquer l'utilisateur comme "online"
      updateStatus("online");

      // Écouter les déconnexions (fermeture de l'onglet ou actualisation)
      const handleBeforeUnload = () => {
        updateStatus("offline");
      };
      window.addEventListener("beforeunload", handleBeforeUnload);

      // Cleanup
      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
        updateStatus("offline");
      };
    };
    
    getUser();
  }, []);
};

export default usePresence;
