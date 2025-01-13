"use client";

import React from "react";

const MultiplayerModePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-100 to-gray-300 py-10">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Mode Multijoueur</h1>
      <p className="text-lg text-gray-600 italic">
        Créez une salle ou rejoignez une partie en ligne avec vos amis !
      </p>
    </div>
  );
};

export default MultiplayerModePage;
