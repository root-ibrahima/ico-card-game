"use client";

import React, { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import ThemeSwitcher from "./ThemeSwitcher";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 shadow-lg fixed w-full z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-3xl font-extrabold text-white tracking-wide hover:text-gray-200 transition"
            >
              ICO Card Game
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/game"
              className="text-lg text-white font-medium hover:text-gray-200 hover:underline transition duration-300"
            >
              Jeu
            </Link>
            <Link
              href="/about"
              className="text-lg text-white font-medium hover:text-gray-200 hover:underline transition duration-300"
            >
              À propos
            </Link>
            <Link
              href="/contact"
              className="text-lg text-white font-medium hover:text-gray-200 hover:underline transition duration-300"
            >
              Contact
            </Link>
          
            {/* Boutons d'Action */}
            <div className="flex items-center space-x-4">
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-medium text-blue-600 bg-white rounded-md shadow hover:bg-gray-100 transition duration-300"
              >
                Se connecter
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md shadow hover:bg-green-600 transition duration-300"
              >
                S&apos;inscrire
              </Link>
              {/* Theme Switcher */}
              <ThemeSwitcher />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              aria-expanded={isOpen}
              aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
              className="text-white hover:text-gray-200 focus:outline-none"
            >
              {isOpen ? (
                <XMarkIcon
                  className="h-8 w-8 transform transition-transform duration-300 rotate-180"
                  aria-hidden="true"
                />
              ) : (
                <Bars3Icon
                  className="h-8 w-8 transform transition-transform duration-300 rotate-0"
                  aria-hidden="true"
                />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`${
            isOpen ? "scale-y-100" : "scale-y-0"
          } transform transition-transform duration-500 origin-top md:hidden`}
        >
          <div className="flex flex-col mt-2 space-y-2 bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 p-4 rounded-lg shadow-lg">
            <Link
              href="/game"
              className="text-lg text-white font-medium hover:bg-blue-700 px-4 py-2 rounded-md transition"
              onClick={toggleMenu}
            >
              Jeu
            </Link>
            <Link
              href="/about"
              className="text-lg text-white font-medium hover:bg-blue-700 px-4 py-2 rounded-md transition"
              onClick={toggleMenu}
            >
              À propos
            </Link>
            <Link
              href="/contact"
              className="text-lg text-white font-medium hover:bg-blue-700 px-4 py-2 rounded-md transition"
              onClick={toggleMenu}
            >
              Contact
            </Link>
            
          
            {/* Boutons d'Action Mobile */}
            <div className="mt-4 flex flex-col space-y-2">
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-medium text-blue-600 bg-white rounded-md shadow hover:bg-gray-100 transition duration-300"
                onClick={toggleMenu}
              >
                Se connecter
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md shadow hover:bg-green-600 transition duration-300"
                onClick={toggleMenu}
              >
                S&apos;inscrire
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
