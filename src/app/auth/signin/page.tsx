'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import AuthenticatorCards from '@/components/AuthenticatorCards';

export default function SignInPage() {
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (email: string, password: string) => {
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError(result.error);
    } else {
      router.push('/profile'); // Redirection après connexion réussie
    }
  };

  return (
    <div className="bg-gradient-to-b from-purple-500 via-purple-600 to-purple-700 min-h-screen flex flex-col items-center justify-start px-4 pt-8">
      {/* Logo centré */}
      <div className="flex justify-center mb-4"> {/* Ajustement de l'espacement ici */}
        <Image
          src="/ICO.png" // Remplacez par le chemin de votre logo
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

      {/* Authenticator Cards */}
      <AuthenticatorCards />

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
