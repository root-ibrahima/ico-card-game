"use client";

import React, { createContext, useContext, useReducer, Dispatch } from "react";

// Types pour le jeu
export type GameStatus = "idle" | "active" | "finished";

export type Player = {
  id: string; // ID unique du joueur
  name: string; // Nom du joueur
  role: string; // Rôle du joueur (ex. : marin, pirate, sirène)
  isCaptain: boolean; // Indique si le joueur est Capitaine
};

// État initial du jeu
type GameState = {
  players: Player[]; // Liste des joueurs
  currentTurn: number; // Tour actuel (index des joueurs)
  status: GameStatus; // Statut du jeu
};

const initialState: GameState = {
  players: [],
  currentTurn: 0,
  status: "idle",
};

// Types des actions possibles
export type Action =
  | { type: "ADD_PLAYER"; payload: Player }
  | { type: "REMOVE_PLAYER"; payload: string }
  | { type: "NEXT_TURN" }
  | { type: "UPDATE_STATUS"; payload: GameStatus };

// Reducer pour gérer l'état du jeu
const gameReducer = (state: GameState, action: Action): GameState => {
  switch (action.type) {
    case "ADD_PLAYER":
      return {
        ...state,
        players: [...state.players, action.payload],
      };
    case "REMOVE_PLAYER":
      return {
        ...state,
        players: state.players.filter((player) => player.id !== action.payload),
      };
    case "NEXT_TURN":
      return {
        ...state,
        currentTurn: (state.currentTurn + 1) % state.players.length,
      };
    case "UPDATE_STATUS":
      return {
        ...state,
        status: action.payload,
      };
    default:
      return state;
  }
};

// Création du contexte
const GameContext = createContext<{
  state: GameState;
  dispatch: Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null, // Par défaut, une fonction vide
});

// Provider pour encapsuler l'application
export const GameProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte
export const useGame = () => useContext(GameContext);
