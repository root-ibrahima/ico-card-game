"use client";

import React from "react";

const CustomModePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-100 to-gray-300 py-10">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Mode Personnalisé</h1>
      <p className="text-lg text-gray-600 italic">
        Configurez vos propres règles pour une partie unique et amusante.
      </p>
    </div>
  );
};

export default CustomModePage;
