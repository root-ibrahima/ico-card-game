'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.ok) {
        router.push('/profile');
      } else {
        const errorData = await res.json();
        setError(errorData.message || "Erreur lors de la connexion.");
      }
    } catch (error) {
      setError("Une erreur est survenue.");
    }
  };

  return (
    <div className="relative w-full h-screen">
      {/* Background with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('./img/Carte_Fond_Connexion 1.png')" }}
      />
      <div className="absolute inset-0 bg-black opacity-40" />

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center">
        {/* Logo outside white box */}
        <div className="flex flex-col items-center mb-7">
          <img
            src="./img/ICO_LOGO 1.png"
            alt="Logo ICO"
            className="w-60 h-auto"
          />
          <h1 className="text-white text-3xl font-bold">
            Ravis de vous revoir !
          </h1>
        </div>

        {/* White box */}
        <div className="w-full max-w-sm bg-white rounded-lg shadow-md p-6">
          {/* Welcome Text */}
          <h2 className="text-lg text-center mb-4 font-bold">
            Connectez-vous !
          </h2>
          <h4 className="text-sm text-center text-gray-500 mb-3">
            et commencez votre voyage !
          </h4>

          {/* Error Message */}
          {error && (
            <div className="mb-4 text-red-500 text-sm text-center">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label 
                className="block text-gray-600 text-sm mb-2" 
                htmlFor="email"
              >
                Adresse e-mail
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Adresse e-mail"
                />
                <span className="absolute left-3 top-3 text-gray-400">
                  📧
                </span>
              </div>
            </div>

            <div className="mb-4">
              <label 
                className="block text-gray-600 text-sm mb-2" 
                htmlFor="password"
              >
                Mot de passe
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Mot de passe"
                />
                <span className="absolute left-3 top-3 text-gray-400">
                  🔒
                </span>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Mot de passe oublié ?
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg text-sm font-semibold hover:bg-blue-600"
            >
              Se connecter
            </button>
          </form>

          <div className="text-center text-sm mt-4">
            Pas encore de compte ?{' '}
            <Link href="/register" className="text-blue-500 hover:underline">
              S'inscrire
            </Link>
          </div>

          <p className="text-xs text-center text-gray-500 mt-4">
            En vous connectant, vous acceptez nos{' '}
            <Link href="#" className="text-blue-500 hover:underline">
              conditions d'utilisation
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}