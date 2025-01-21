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
  isCrewMember?: boolean; // Indique si le joueur est un membre d'équipage
  isSelected?: boolean; // Indique si le joueur est sélectionné
  selectionNumber?: number; // Position du joueur dans la sélection
  voters?: Player[]; // Liste des joueurs ayant voté
  currentAction?: "ile" | "poison" | null;
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
  | "SIRENE_VOTE_UPDATE"
  | "SIRENE_IDENTIFIED"
  | "ACTION_SUBMITTED"
  | "ACTIONS_REVEALED"
  | "ACTION_SELECTION_PHASE" ;

/**
 * 🔹 Interface représentant un événement WebSocket “aplati”.
 */
export interface RoomEvent {
  type: RoomEventType;
  // Champs à plat :
  roomCode?: string;
  message?: string;
  player?: Player;
  players?: Player[];        
  selectedCrew?: string[];   
  votesYes?: number;
  votesNo?: number;
  approved?: boolean;
  newCaptain?: string;
  captain?: string;       
  avatar?: string;
  votes?: { [playerId: string]: number };
  identifiedSirene?: string;
  role?: string;      
  actions?: { username: string; action: "ile" | "poison" }[];
  winningSide?: "pirates" | "marins";
  action?: "ile" | "poison"; 
}


/**
 * 🔹 Props pour le composant `FooterGame`
 */
export interface FooterGameProps {
  role?: string | null;
  piratePoints: number;
  marinPoints: number;
  mancheGagnees: number;
}


export interface RoleDistributionProps {
  role: string;
  username: string;
  roomCode: string;
  onConfirmRole: () => void;
}

export interface CaptainChoicePageProps {
  captainName: string;
  username: string;
  roomCode: string;
  isCaptain: boolean;
  players: Player[];
  handleCaptainChange: (newCaptain: string) => void;
  handleCrewSelected: () => void;
  handleCrewSelectionPhase: () => void;
  handleGameStart: () => void;
  handleRoomUpdate: (players: Player[]) => void;
  handlePlayerLeft: (player: Player) => void;
  handleNewMessage: (message: string) => void;
  handlePlayerJoined: (player: Player) => void;
  handleRoleReceived: (role: string) => void;
}

export interface VoteCrewPageProps {
  currentUser: string;
  roomCode: string;
  captain: Player;
  crewMembers: Player[];
  allPlayers: Player[];
  handleVote: (vote: "yes" | "no") => void;
}




export interface HeaderGameProps {
  avatar: string;
}


export interface SelectCrewPageProps {
  players: Player[];   
  roomCode: string;
  username: string;     
  captainAvatar?: string; 
  maxCrewSize?: number;
}

export interface IdentificationSireneProps {
  currentUser: Player;
  roomCode: string;
  players: Player[];
  votes?: { [playerId: string]: number };
  identifiedSirene?: string | null;
  voteSubmitted?: boolean;
  handleVote?: (playerId: string) => void;
}

export interface ActionPageProps {
  currentUser: Player | null;
  crewMembers: Player[];
  selectedAction: string | null;
  actionsSent: boolean;
  roomCode: string;
  handleActionSelection: (action: string) => void;
}
