'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
export default function BugReportPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState(''); // Nouveau champ "Objet"
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('low');
  const [statusMessage, setStatusMessage] = useState('');
  const [statusType, setStatusType] = useState<'success' | 'error' | null>(null); // Message de statut
  const [loading, setLoading] = useState(true);

  // Récupérer les informations utilisateur pour pré-remplir le champ email
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/auth/user');
        if (response.ok) {
          const userData = await response.json();
          setEmail(userData.email); // Pré-remplir l'email avec celui de l'utilisateur connecté
        }
      } catch (error) {
        console.error('Erreur lors de la récupération de l’utilisateur :', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Gestion de la soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage('');
    setStatusType(null);

    const bugReport = { name, email, subject, description, priority };

    try {
      const response = await fetch('/api/bug-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bugReport),
      });

      if (response.ok) {
        setStatusMessage('Merci ! Votre rapport de bug a été envoyé.');
        setStatusType('success'); // Message de succès
        setName('');
        setSubject('');
        setDescription('');
        setPriority('low');
      } else {
        setStatusMessage('Une erreur est survenue. Veuillez réessayer.');
        setStatusType('error'); // Message d'erreur
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi du rapport de bug :', error);
      setStatusMessage('Erreur interne. Veuillez réessayer plus tard.');
      setStatusType('error'); // Message d'erreur
    }
  };

  if (loading) {
    return <p>Chargement...</p>;
  }

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
            src="./img/ICO_LOGO 1.png"
            alt="Logo ICO"
            className="w-60 h-auto"

          />
          <h1 className="text-white text-3xl font-bold">
            Signalez un bug pour améliorer ICO !
          </h1>
        </div>

        {/* White box */}
        <div className="w-full max-w-sm bg-white rounded-lg shadow-md p-6">
          {/* Welcome Text */}
          <h2 className="text-lg font-semibold text-center mb-4">
            Formulaire de signalement
          </h2>
          <h4 className="text-sm text-center text-gray-500 mb-3">
            Merci de nous aider à identifier les problèmes
          </h4>

          {/* Status Message */}
          {statusMessage && (
            <p
              className={`text-center text-sm mb-4 ${
                statusType === 'success' ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {statusMessage}
            </p>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Nom ou pseudo */}
            <div className="mb-4">
              <label
                className="block text-gray-600 text-sm mb-2"
                htmlFor="name"
              >
                Nom ou pseudo
              </label>
              <div className="relative">
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Votre nom ou pseudo"
                  required
                />
                <span className="absolute left-3 top-3 text-gray-400">👤</span>
              </div>
            </div>

            {/* Adresse e-mail */}
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Votre adresse e-mail"
                  required
                />
                <span className="absolute left-3 top-3 text-gray-400">📧</span>
              </div>
            </div>

            {/* Objet (sujet) */}
            <div className="mb-4">
              <label
                className="block text-gray-600 text-sm mb-2"
                htmlFor="subject"
              >
                Objet (max. 50 caractères)
              </label>
              <div className="relative">
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  maxLength={50} // Limite côté formulaire
                  className="w-full border border-gray-300 rounded-lg p-3 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Sujet du bug"
                  required
                />
                <span className="absolute left-3 top-3 text-gray-400">📌</span>
              </div>
            </div>

            {/* Description du bug */}
            <div className="mb-4">
              <label
                className="block text-gray-600 text-sm mb-2"
                htmlFor="description"
              >
                Description du bug
              </label>
              <textarea
                id="description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Décrivez le problème"
                required
              />
            </div>

            {/* Priorité */}
            <div className="mb-4">
              <label
                className="block text-gray-600 text-sm mb-2"
                htmlFor="priority"
              >
                Priorité
              </label>
              <select
                id="priority"
                name="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="low">Faible</option>
                <option value="medium">Modérée</option>
                <option value="high">Critique</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-lg text-sm font-semibold bg-blue-500 hover:bg-blue-600 text-white"
            >
              Envoyer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
