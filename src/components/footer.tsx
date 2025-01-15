"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Footer: React.FC = () => {
  const pathname = usePathname(); // Récupère la route active

  return (
    <footer className="bg-white shadow-lg fixed bottom-0 w-full z-50 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Bouton Accueil */}
          <Link
            href="/"
            className="flex flex-col items-center text-gray-600 hover:text-gray-800 transition duration-300"
          >
            <Image
              src={
                pathname === "/"
                  ? "/navbar/press/home.png"
                  : "/navbar/nopress/home.png"
              }
              alt="Accueil"
              width={pathname === "/" ? 30 : 30}
              height={pathname === "/" ? 30 : 30}
            />
            <span className="sr-only">Accueil</span>
          </Link>

          {/* Bouton Règles */}
          <Link
            href="/regles"
            className="flex flex-col items-center text-gray-600 hover:text-gray-800 transition duration-300"
          >
            <Image
              src={
                pathname === "/regles"
                  ? "/navbar/press/rules.png"
                  : "/navbar/nopress/rules.png"
              }
              alt="Règles"
              width={pathname === "/regles" ? 30 : 30}
              height={pathname === "/regles" ? 30 : 30}
            />
            <span className="sr-only">Règles</span>
          </Link>

          {/* Bouton Bonus */}
          <Link
            href="/bonus"
            className="flex flex-col items-center text-gray-600 hover:text-gray-800 transition duration-300"
          >
            <Image
              src={
                pathname === "/bonus"
                  ? "/navbar/press/bonus.png"
                  : "/navbar/nopress/bonus.png"
              }
              alt="Bonus"
              width={pathname === "/bonus" ? 30 : 30}
              height={pathname === "/bonus" ? 30 : 30}
            />
            <span className="sr-only">Bonus</span>
          </Link>

          {/* Bouton Profil */}
          <Link
            href="/profil"
            className="flex flex-col items-center text-gray-600 hover:text-gray-800 transition duration-300"
          >
            <Image
              src={
                pathname === "/profil"
                  ? "/navbar/press/profil.png"
                  : "/navbar/nopress/profil.png"
              }
              alt="Profil"
              width={pathname === "/profil" ? 24 : 24}
              height={pathname === "/profil" ? 24 : 24}
            />
            <span className="sr-only">Profil</span>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
