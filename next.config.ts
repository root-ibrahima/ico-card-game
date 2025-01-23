import type { NextConfig } from "next";
import dotenv from "dotenv";

// Charger les variables d'environnement
dotenv.config();

const nextConfig: NextConfig = {
  env: {
    EMAIL_APP_PASSWORD: process.env.EMAIL_APP_PASSWORD, // Ajoute la variable ici
  },
};

export default nextConfig;
