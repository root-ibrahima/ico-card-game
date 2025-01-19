import type { NextConfig } from "next";
import dotenv from "dotenv";

// Charger les variables d'environnement
dotenv.config();

const nextConfig: NextConfig = {
  reactStrictMode: true, // Active le mode strict de React

  images: {
    domains: ["api.dicebear.com"], // ✅ Autorise les images externes depuis Dicebear
  },

  env: {
    NEXT_PUBLIC_EMAIL_APP_PASSWORD: process.env.EMAIL_APP_PASSWORD, // ✅ Ajout pour le client
  },
};

export default nextConfig;
