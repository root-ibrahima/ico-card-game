'use client';

import { useRouter, useSearchParams } from 'next/navigation'; // Importez useSearchParams
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams(); // Récupère les paramètres de l'URL

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Une erreur est survenue.');
        return;
      }

      // Récupérez le paramètre "redirect" ou utilisez "/dashboard" par défaut
      const redirectTo = searchParams.get('redirect') || '/dashboard';
      router.push(redirectTo); // Redirige vers la page souhaitée
    } catch (err) {
      console.error('Erreur lors de la connexion :', err);
      setError('Une erreur inattendue est survenue.');
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
          <Image
            src="/img/ICO_LOGO_1.png"
            alt="Logo ICO"
            width={240}
            height={60}
            className="w-60 h-auto"
          />
          <h1 className="text-white text-3xl font-bold">
            Ravis de vous revoir !
          </h1>
        </div>

        {/* White box */}
        <div className="w-full max-w-sm bg-white rounded-lg shadow-md p-6">
          {/* Welcome Text */}
          <h2 className="text-lg font-semibold text-center mb-4">
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
          <form onSubmit={handleSignIn}>
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
              S&apos;inscrire
            </Link>
          </div>

          <p className="text-xs text-center text-gray-500 mt-4">
            En vous connectant, vous acceptez nos{' '}
            <Link href="#" className="text-blue-500 hover:underline">
              conditions d&apos;utilisation
            </Link>
            .
          </p>
        </div> 
      </div>
  );
}