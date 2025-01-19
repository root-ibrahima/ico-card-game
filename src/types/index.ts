/**
 * Interface représentant un joueur.
 */
export interface Player {
  id: string;
  name: string;
  role: "marin" | "pirate" | "sirene" | "captain"; 
  avatar: string;
  isCaptain: boolean;
  roomCode: string;
}
/**
 * Interface représentant une salle de jeu.
 */
export interface Room {
  host: string;
  players: Player[];
  status: "waiting" | "in-progress" | "finished";
}
/**
 * Événements possibles dans le WebSocket.
 */
export type RoomEventType =
  | "PLAYER_JOINED"
  | "ROOM_UPDATE"
  | "PLAYER_LEFT"
  | "NEW_MESSAGE"
  | "GAME_START"
  | "YOUR_ROLE"
  | "VOTE_RESULTS"
  | "CREW_SELECTED"
  | "VOTE_RESULTS"
  | "CAPTAIN_SELECTED"; 

/**
 * Interface représentant un événement WebSocket.
 */
export interface RoomEvent {
  type: RoomEventType;
  payload: {
    roomCode?: string;
    message?: string;
    player?: Player;
    selectedCrew?: Player[];
    votesYes?: number;
    votesNo?: number;
    approved?: boolean;
  };
}