export type Role = 'marin' | 'pirate' | 'sirène';

export interface Player {
  id: number;
  name: string;
  role?: Role;
}
