export type Role = "marin" | "pirate" | "sirène";


export interface Player {

  id: string;

  name: string;

  role: Role;

  isCaptain: boolean;

}
