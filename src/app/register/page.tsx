import React from "react";

const Login = () => {
  return (
    <div
      className="w-full h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('./img/Carte_Fond_Connexion 1.png')" }}
    >
      <div className="w-full max-w-sm bg-white rounded-lg shadow-md p-6">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img
            src="./img/ICO_LOGO 2.png"
            alt="Logo ICO"
            className="w-32 h-auto"
          />
        </div>

        {/* Welcome Text */}
        <h2 className="text-lg font-semibold text-center mb-4">
          Ravis de vous revoir !
        </h2>

        {/* Form */}
        <form>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm mb-2" htmlFor="email">
              Adresse e-mail
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                className="w-full border border-gray-300 rounded-lg p-3 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Adresse e-mail"
              />
              <span className="absolute left-3 top-3 text-gray-400">
                📧
              </span>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 text-sm mb-2" htmlFor="password">
              Mot de passe
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                className="w-full border border-gray-300 rounded-lg p-3 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Mot de passe"
              />
              <span className="absolute left-3 top-3 text-gray-400">
                🔒
              </span>
            </div>
            <div className="text-right text-sm mt-1">
              <a href="#" className="text-blue-500 hover:underline">
                Mot de passe oublié ?
              </a>
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
          Nouvel utilisateur ?
          <a href="#" className="text-blue-500 hover:underline ml-1">
            S’inscrire
          </a>
        </div>

        <p className="text-xs text-center text-gray-500 mt-4">
          En cliquant sur Se connecter, vous acceptez nos
          <a href="#" className="text-blue-500 hover:underline">
            conditions d’utilisation
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default Login;
