export type Player = {
    id: string;
    name: string;
    role: string;
    isCaptain: boolean;
  };
  
  // Fonction pour assigner des rôles aux joueurs
  export const assignRoles = (playerNames: string[]): Player[] => {
    const roles = ['Marin', 'Marin', 'Marin', 'Pirate', 'Pirate', 'Pirate', 'Sirène'];
    const shuffledRoles = roles.sort(() => Math.random() - 0.5);
  
    // Sélectionner un Capitaine au hasard
    const captainIndex = Math.floor(Math.random() * playerNames.length);
  
    return playerNames.map((name, index) => ({
      id: `player-${index}`,
      name,
      role: shuffledRoles[index] || 'Observateur',
      isCaptain: index === captainIndex,
    }));
  };
  