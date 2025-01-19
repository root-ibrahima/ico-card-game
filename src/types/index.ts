/**
 * 🔹 Interface représentant un joueur.
 */
export interface Player {
  id: string;
  username: string;
  role: "marin" | "pirate" | "sirene" | "captain"; 
  avatar: string;
  isCaptain: boolean;
  roomCode: string;
  piratePoints?: number;
  marinPoints?: number;
  mancheGagnees?: number;
  readyState?: boolean; // ✅ Ajouté pour indiquer si un joueur est prêt
}

/**
 * 🔹 Interface représentant une salle de jeu.
 */
export interface Room {
  id: string;
  host: string;
  players: Player[];
  status: "waiting" | "in-progress" | "finished"; // ✅ Aligné avec Prisma
  playersCount?: number; // ✅ Ajouté pour éviter de recalculer
}

/**
 * 🔹 Liste des événements WebSocket possibles.
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
  | "CREW_SELECTION_PHASE"
  | "CAPTAIN_SELECTED"
  | "CAPTAIN_CHANGE"
  | "ACTION_SELECTION"
  | "ACTION_RESULTS"
  | "ROLE_CONFIRMED"
  | "SIRENE_VOTE_UPDATE"
  | "SIRENE_IDENTIFIED";

/**
 * 🔹 Interface représentant un événement WebSocket.
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
    newCaptain?: string;
    actions?: { name: string; action: string }[];
    votes?: { [playerId: string]: number };
    identifiedSirene?: string;
  };
}

/**
 * 🔹 Props pour le composant `FooterGame`
 */
export interface FooterGameProps {
  role?: string | null;
  piratePoints: number;
  marinPoints: number;
  mancheGagnees: number;
  captain: string | null;
  isCaptain: boolean;
  roomCode: string;
  username: string;
  players: Player[];
  gameStarted: boolean;
  crewSelectionPhase: boolean;
  crewMembers: Player[];
  votePhase: boolean;
  currentCaptain: string | null;
  startGame: () => void;
  confirmRole: () => void;
  handleVote: (vote: "yes" | "no") => void;
  handleAction: (action: string) => void;
  handleCaptainChange: (newCaptain: string) => void;
  handleRoleConfirmed: () => void;
  handleVoteResults: () => void;
  handleActionResults: () => void;
  handleCrewSelected: () => void;
  handleCaptainSelected: () => void;
  handleCrewSelectionPhase: () => void;
  handleGameStart: () => void;
  handleRoomUpdate: (players: Player[]) => void;
  handlePlayerLeft: (player: Player) => void;
  handleNewMessage: (message: string) => void;
  handlePlayerJoined: (player: Player) => void;
  handleRoleReceived: (role: string) => void;
}
