import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer"; // Import du composant Navbar

// Import des polices avec une gestion robuste
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", // Optimise le chargement des polices
});

"use client";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({ children }) {
  return (
    <SessionProvider>
      <html lang="fr">
        <body>{children}</body>
      </html>
    </SessionProvider>
  );
}


const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap", // Idem pour la seconde police
});

// Métadonnées du projet
export const metadata: Metadata = {
  title: "ICO Card Game",
  description: "Un jeu de cartes interactif et stratégique.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-gray-900`}
      >
        {/* Ajout de la barre de navigation */}
        

        {/* Contenu principal */}
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
