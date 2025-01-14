"use client";
import React, { useState } from "react";
import Image from "next/image";

const ProfilePage = () => {
  const [pseudo, setPseudo] = useState("LLeloup");
  const [gender, setGender] = useState("Femme");

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-200">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-center mb-4">
          <Image src="/wolvesville-logo.png" alt="Wolvesville" width={150} height={50} />
        </div>
        <label className="block text-gray-700">Pseudo</label>
        <input
          type="text"
          value={pseudo}
          onChange={(e) => setPseudo(e.target.value)}
          className="w-full p-2 border rounded mt-1 mb-4"
        />
        <label className="block text-gray-700">Genre</label>
        <div className="mt-1 mb-4 space-x-4">
          {["Homme", "Femme", "Autre"].map((option) => (
            <label key={option} className="inline-flex items-center">
              <input
                type="radio"
                name="gender"
                value={option}
                checked={gender === option}
                onChange={() => setGender(option)}
                className="form-radio text-blue-600"
              />
              <span className="ml-2">{option}</span>
            </label>
          ))}
        </div>
        <button className="w-full bg-gray-400 text-white p-2 rounded mb-2" disabled>
          Sauvegarder
        </button>
        <button className="w-full bg-black text-white p-2 rounded mb-2">
          Activer l'A2F
        </button>
        <button className="w-full bg-red-600 text-white p-2 rounded">
          Supprimer mon compte
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
