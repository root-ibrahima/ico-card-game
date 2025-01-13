import React, { createContext, useReducer, useContext } from "react";
import type { Player } from "@/types";

type Status = "idle" | "active" | "completed"; // Ajout du type Status

// Définition de l'état global du jeu
interface GameState {
  players: Player[];
  currentTurn: number;
  status: Status; // Utilisation du type Status
}

// Définition des actions possibles
type Action =
  | { type: "ADD_PLAYER"; payload: Player }
  | { type: "REMOVE_PLAYER"; payload: string }
  | { type: "UPDATE_STATUS"; payload: Status }
  | { type: "NEXT_TURN" };

// État initial du jeu
const initialState: GameState = {
  players: [],
  currentTurn: 0,
  status: "idle",
};

// Réducteur pour gérer les actions
const gameReducer = (state: GameState, action: Action): GameState => {
  switch (action.type) {
    case "ADD_PLAYER":
      return { ...state, players: [...state.players, action.payload] };

    case "REMOVE_PLAYER":
      return {
        ...state,
        players: state.players.filter((player) => player.id !== action.payload),
      };

    case "UPDATE_STATUS":
      return { ...state, status: action.payload };

    case "NEXT_TURN": {
      if (state.players.length === 0) return state;

      const nextTurn = (state.currentTurn + 1) % state.players.length;

      const updatedPlayers = state.players.map((player, index) => ({
        ...player,
        isCaptain: index === nextTurn, // Le capitaine change à chaque tour
      }));

      return { ...state, players: updatedPlayers, currentTurn: nextTurn };
    }

    default:
      return state;
  }
};

// Contexte global du jeu
const GameContext = createContext<{
  state: GameState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => undefined,
});

// Fournisseur de contexte
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
