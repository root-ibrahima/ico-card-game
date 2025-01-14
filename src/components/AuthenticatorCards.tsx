"use client";

import Link from "next/link";
import Image from "next/image";

const AuthenticatorCards: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md mx-auto">
      <h3 className="text-center text-xl font-bold text-gray-900 mb-2">
        Connectez-vous
      </h3>
      <p className="text-center text-sm text-gray-600 mb-6">
        et commencez votre voyage !
      </p>
      <form className="space-y-4">
        {/* Champ Adresse e-mail */}
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Image
              src="/icon/email.png" // Remplacez par l'icône appropriée
              alt="Icône Email"
              width={20}
              height={20}
            />
          </span>
          <input
            type="email"
            placeholder="Adresse e-mail"
            className="pl-10 py-2 px-3 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:outline-none text-sm text-gray-900"
          />
        </div>

        {/* Champ Mot de passe */}
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Image
              src="/icon/password.png"// Remplacez par l'icône appropriée
              alt="Icône Mot de passe"
              width={20}
              height={20}
            />
          </span>
          <input
            type="password"
            placeholder="Mot de passe"
            className="pl-10 py-2 px-3 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:outline-none text-sm text-gray-900"
          />
        </div>

        <div className="text-right">
          <Link href="" className="text-sm text-purple-600 hover:underline">
            Mot de passe oublié ?
          </Link>
        </div>

        {/* Bouton Connexion */}
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-3 rounded-lg text-lg font-medium hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:outline-none"
        >
          Se connecter
        </button>

        {/* Lien pour s'inscrire */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Nouvel utilisateur ?{' '}
            <Link href="/auth/register" className="text-purple-600 font-bold hover:underline">
              S’inscrire
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default AuthenticatorCards;
