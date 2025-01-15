'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';

export default function SignInPage() {
  const [email, setEmail] = useState(''); // Ajout de l'état pour email
  const [password, setPassword] = useState(''); // Ajout de l'état pour password
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prévenir le comportement par défaut du formulaire
    setError('');

    try {
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.ok) {
        router.push('/profile'); // Redirection après connexion réussie
      } else {
        const errorData = await res.json();
        setError(errorData.message || 'Échec de la connexion.');
      }
    } catch (error) {
      console.error('Erreur lors de la connexion :', error);
      setError("Erreur interne. Veuillez réessayer plus tard.");
    }
  };

  return (
    <div className="bg-gradient-to-b from-purple-500 via-purple-600 to-purple-700 min-h-screen flex flex-col items-center justify-start px-4 pt-8">
      {/* Logo centré */}
      <div className="flex justify-center mb-4">
        <Image
          src="/ICO.png"
          alt="Logo"
          width={200}
          height={200}
          className="rounded-full"
        />
      </div>

      {/* Titre principal */}
      <h2 className="text-center text-2xl font-extrabold text-white mb-2">
        Ravie de vous revoir !
      </h2>
      <p className="text-center text-sm text-white mb-8">
        Connectez-vous et commencez votre voyage !
      </p>

      {/* Affichage des erreurs */}
      {error && (
        <div className="text-red-500 text-center mb-4 bg-white p-2 rounded-md shadow">
          {error}
        </div>
      )}

      {/* Formulaire de connexion */}
      <form
        onSubmit={handleSubmit} // Lien avec handleSubmit
        className="space-y-6 w-full max-w-md"
      >
        <div>
          <label htmlFor="email" className="block text-white">
            Adresse email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Lier le champ d'email à l'état
            className="w-full px-3 py-2 rounded"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-white">
            Mot de passe
          </label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Lier le champ de mot de passe à l'état
            className="w-full px-3 py-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded w-full"
        >
          Connexion
        </button>
      </form>

      {/* Conditions d'utilisation */}
      <div className="text-center mt-6 text-sm text-white">
        En cliquant sur Se connecter, vous acceptez{' '}
        <a href="/terms" className="text-white underline">
          nos conditions d’utilisation
        </a>.
      </div>
    </div>
  );
}
