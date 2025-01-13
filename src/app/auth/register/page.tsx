'use client';

import React, { useState } from 'react';
import axios from 'axios';

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/register', { email, password });
      alert('Inscription réussie !');
    } catch {
      alert('Erreur lors de l’inscription');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form className="bg-white p-6 rounded shadow-md" onSubmit={handleRegister}>
        <h1 className="text-xl font-bold mb-4">Inscription</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 mb-4 w-full"
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 mb-4 w-full"
        />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          S&apos;inscrire
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
