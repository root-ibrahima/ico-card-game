import axios from "axios";

// Crée une instance d'Axios
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Exemple de fonction pour créer une partie
export const createGame = async (players: string[]) => {
  const response = await api.post("/game", { players });
  return response.data;
};

// Exemple de fonction pour récupérer les parties
export const fetchGames = async () => {
  const response = await api.get("/game");
  return response.data;
};

export default api;
