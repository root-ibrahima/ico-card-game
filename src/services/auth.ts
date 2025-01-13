import api from "./api";

interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
  };
}

// Fonction pour s'inscrire
export const register = async (email: string, password: string) => {
  const response = await api.post<AuthResponse>("/auth/register", {
    email,
    password,
  });
  localStorage.setItem("token", response.data.token);
  return response.data.user;
};

// Fonction pour se connecter
export const login = async (email: string, password: string) => {
  const response = await api.post<AuthResponse>("/auth/login", {
    email,
    password,
  });
  localStorage.setItem("token", response.data.token);
  return response.data.user;
};

// Fonction pour se déconnecter
export const logout = () => {
  localStorage.removeItem("token");
};

// Fonction pour vérifier l'authentification
export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem("token");
  return !!token;
};

// Fonction pour récupérer l'utilisateur actuel
export const fetchUser = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Utilisateur non authentifié");

  const response = await api.get("/auth/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
