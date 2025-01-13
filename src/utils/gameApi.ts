import axios from "axios";

const API_URL = "/api/game"; // Route pour accéder à l'API (app router)

interface Game {
  id: string;
  players: string[];
  status: "waiting" | "in-progress" | "finished";
}

// Créer une nouvelle partie
export const createGame = async (players: string[]): Promise<Game> => {
  const response = await axios.post(API_URL, { players });
  return response.data;
};

// Récupérer toutes les parties
export const getGames = async (): Promise<Game[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};
