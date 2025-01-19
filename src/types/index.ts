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
  piratePoints?: number;
  marinPoints?: number;
  mancheGagnees?: number;
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
  | "CAPTAIN_SELECTED"
  | "CAPTAIN_CHANGE"  // Ajouté pour gérer le changement de capitaine après plusieurs refus
  | "ACTION_SELECTION" // Ajouté pour gérer la sélection des actions par l’équipage
  | "ACTION_RESULTS";  // Ajouté pour afficher le résultat des actions après choix

/**
 * Interface représentant un événement WebSocket.
 */
export interface RoomEvent {
  type: RoomEventType;
  payload: {
    roomCode?: string;
    message?: string;
    player?: Player; // ✅ Utilisation de l'interface `Player`
    selectedCrew?: Player[]; // ✅ Utilisation de `Player[]` pour éviter la duplication
    votesYes?: number;
    votesNo?: number;
    approved?: boolean;
    newCaptain?: string; // ✅ Ajouté pour savoir quel est le nouveau capitaine
    actions?: { name: string; action: string }[]; // ✅ Ajouté pour gérer les choix d’action
  };
}
