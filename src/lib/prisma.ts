import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

// Charger les variables d'environnement
dotenv.config();

declare global {
  // Déclare la variable globale `prisma` pour éviter plusieurs instances en développement
  // Note : La déclaration globale doit être uniquement dans le contexte de TypeScript
  // pour ne pas être répétée lors de l'exécution.
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Utilise l'instance existante de Prisma ou en crée une nouvelle
const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma; // Sauvegarde l'instance Prisma dans `global` en mode développement
}

export default prisma;
