"use client";

import { Geist, Geist_Mono } from "next/font/google";
import { usePathname } from "next/navigation"; // Import du hook usePathname
import "./globals.css";
import Footer from "@/components/footer"; // Import du composant Footer

// Import des polices avec une gestion robuste
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", // Optimise le chargement des polices
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap", // Idem pour la seconde police
});

// Métadonnées du projet
// export const metadata: Metadata = {
//   title: "ICO Card Game",
//   description: "Un jeu de cartes interactif et stratégique.",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isNoFooterRoute = pathname.startsWith("/game") || pathname === "/signin" || pathname === "/register" || pathname === "/dashboard";

  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-gray-900`}
      >
        {/* Contenu principal */}
        <main>{children}</main>

        {/* Conditionnellement afficher le footer */}
        {!isNoFooterRoute && <Footer />}
      </body>
    </html>
  );
}
