import React, { createContext, useContext, useReducer } from "react";

interface Player {
  id: string;
  name: string;
  role?: "marin" | "pirate" | "sirène";
}

interface GameState {
  players: Player[];
  status: "waiting" | "in-progress" | "finished";
}

type Action =
  | { type: "ADD_PLAYER"; payload: Player }
  | { type: "REMOVE_PLAYER"; payload: string }
  | { type: "UPDATE_STATUS"; payload: GameState["status"] };

const initialState: GameState = {
  players: [],
  status: "waiting",
};

function gameReducer(state: GameState, action: Action): GameState {
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
    default:
      return state;
  }
}

const GameContext = createContext<{
  state: GameState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => undefined,
});

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);
