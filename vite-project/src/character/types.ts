export interface Character {
  id: string;
  name: string;
  age: number;
  stats: {
    health: number;
    intelligence: number;
    charisma: number;
    morality: number;
    luck: number;
  };
  traits: string[];
  relationships: Relationship[];
}

export interface Relationship {
  characterId: string;
  type: 'friend' | 'family' | 'romantic' | 'rival';
  strength: number;
  history: Interaction[];
}

export interface Interaction {
  type: string;
  effect: number;
  timestamp: number;
}