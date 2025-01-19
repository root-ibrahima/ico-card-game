'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import React from "react";
import Image from 'next/image';

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (password.length < 8) {
            setError('Le mot de passe doit comporter au moins 8 caractères.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Les mots de passe ne correspondent pas.');
            return;
        }

        try {
            setIsLoading(true);
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (res.ok) {
                router.push('/signin');
            } else {
                const errorData = await res.json();
                setError(errorData.message || "Erreur lors de l'inscription. Veuillez réessayer.");
            }
        } catch (error) {
            console.error('Erreur lors de l\'inscription :', error);
            setError("Erreur interne. Veuillez réessayer plus tard.");
        } finally {
            setIsLoading(false);
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
                    <Image
                        src="/img/ICO_LOGO 1.png"
                        alt="Logo ICO"
                        width={240}
                        height={240}
                    />
                    <h1 className="text-white text-3xl font-bold">
                        Rejoignez l&apos;aventure ICO !
                    </h1>
                </div>

                {/* White box */}
                <div className="w-full max-w-sm bg-white rounded-lg shadow-md p-6">
                    {/* Welcome Text */}
                    <h2 className="text-lg font-semibold text-center mb-4">
                        Créez votre compte
                    </h2>
                    <h4 className="text-sm text-center text-gray-500 mb-3">
                        pour commencer à jouer
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
                                htmlFor="username"
                            >
                                Identifiant
                            </label>
                            <div className="relative">
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    required
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg p-3 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Identifiant"
                                />
                                <span className="absolute left-3 top-3 text-gray-400">
                                    👤
                                </span>
                            </div>
                        </div>

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
                                    inputMode="email"
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
                                    autoComplete="new-password"
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
                        </div>

                        <div className="mb-4">
                            <label 
                                className="block text-gray-600 text-sm mb-2" 
                                htmlFor="confirm-password"
                            >
                                Confirmer le mot de passe
                            </label>
                            <div className="relative">
                                <input
                                    id="confirm-password"
                                    name="confirm-password"
                                    type="password"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg p-3 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Confirmer le mot de passe"
                                />
                                <span className="absolute left-3 top-3 text-gray-400">
                                    🔒
                                </span>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className={`w-full py-3 rounded-lg text-sm font-semibold ${isLoading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Inscription en cours...' : "S'inscrire"}
                        </button>
                    </form>

                    <div className="text-center text-sm mt-4">
                        Vous avez déjà un compte ?
                        <Link href="/signin" className="text-blue-500 hover:underline ml-1">
                            Connectez-vous !
                        </Link>
                        En cliquant sur S&apos;inscrire, vous acceptez nos{' '}
                        <Link href="#" className="text-blue-500 hover:underline">
                            conditions d&apos;utilisation
                        </Link>
                        .
                    </div>
                </div>
            </div>
        </div>
    );
}
