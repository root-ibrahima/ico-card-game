"use client";

import React, { useState, useEffect } from "react";

interface TimerProps {
  duration: number; // Durée en secondes
  onTimerEnd?: () => void; // Fonction appelée à la fin du timer
}

const Timer: React.FC<TimerProps> = ({ duration, onTimerEnd }) => {
  const [timeLeft, setTimeLeft] = useState<number>(duration);

  useEffect(() => {
    if (timeLeft <= 0) {
      if (onTimerEnd) onTimerEnd(); // Appeler la fonction de fin si définie
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer); // Nettoyage
  }, [timeLeft, onTimerEnd]);

  return (
    <div className="text-xl font-semibold text-purple-500">
      {timeLeft}s
    </div>
  );
};

export default Timer;
