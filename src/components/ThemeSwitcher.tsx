"use client";

import React, { useState } from "react";

const ThemeSwitcher: React.FC = () => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
    setIsDark(!isDark);
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-md hover:shadow-glow transition-transform transform hover:scale-110"
    >
      {isDark ? "🌙" : "☀️"}
    </button>
  );
};

export default ThemeSwitcher;
