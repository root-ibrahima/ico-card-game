// src/types/index.ts
export interface Player {
  id: string;
  name: string;
  role: "player" | "captain";
}

export interface Room {
  host: string;
  players: Player[];
  status: "waiting" | "in-progress" | "finished";
}

export interface RoomEvent {
  type: "PLAYER_JOINED" | "ROOM_UPDATE" | "PLAYER_LEFT" | "NEW_MESSAGE";
  payload: {
    roomCode?: string;
    [key: string]: unknown;
  };
}

