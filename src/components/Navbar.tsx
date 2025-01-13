import React from "react";
import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">ICO Card Game</h1>
        <div className="flex space-x-4">
          <Link href="/">
            <a className="hover:underline">Accueil</a>
          </Link>
          <Link href="/game">
            <a className="hover:underline">Jeu</a>
          </Link>
          <Link href="/about">
            <a className="hover:underline">À propos</a>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
