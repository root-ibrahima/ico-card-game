"use client";

import "./fonts.css";
import "./globals.css";
import { usePathname } from "next/navigation"; // Import du hook usePathname
import Footer from "@/components/footer"; // Import du composant Footer

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
  const isGameRoute = pathname.startsWith("/game");

  return (
    <html lang="fr">
      <body>
        {/* Contenu principal */}
        <main>{children}</main>

        {/* Conditionnellement afficher le footer */}
        {!isGameRoute && <Footer />}
      </body>
    </html>
  );
}
