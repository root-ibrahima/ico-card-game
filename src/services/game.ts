import api from "./api";

// Fonction pour créer une nouvelle partie
export const createGame = async (players: string[]) => {
  const response = await api.post("/game", { players });
  return response.data;
};

// Fonction pour récupérer la liste des parties
export const fetchGames = async () => {
  const response = await api.get("/game");
  return response.data;
};

// Fonction pour récupérer une partie spécifique
export const fetchGameById = async (gameId: string) => {
  const response = await api.get(`/game/${gameId}`);
  return response.data;
};
