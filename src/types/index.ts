// src/types/index.ts

/**
 * Interface représentant un joueur.
 */
export interface Player {
  id: string;
  name: string;
  role: "marin" | "pirate" | "sirene" | "captain"; // Ajout des rôles de jeu
  avatar: string; // Ajout pour la gestion des avatars
  isCaptain: boolean; // Détermine si le joueur est le narrateur
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
  | "YOUR_ROLE"; // Ajout de YOUR_ROLE pour informer chaque joueur de son rôle

/**
 * Interface représentant un événement WebSocket.
 */
export interface RoomEvent {
  type: RoomEventType;
  payload: {
    roomCode?: string; // Code de la salle
    message?: string; // Message envoyé
    username?: string; // Pseudo du joueur concerné
    players?: Player[]; // Liste complète des joueurs mis à jour
    role?: string; // Rôle attribué à un joueur spécifique
    isCaptain?: boolean; // Information si un joueur est le capitaine
    [key: string]: unknown; // Permet d'ajouter d'autres clés si nécessaire
  };
}
