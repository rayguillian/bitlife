import type { Character } from '../character/types';
import { calculateAgeEffects, applyTraitEffects, generateStartingStats } from '../character/utils';

export class GameState {
  private currentCharacter: Character;
  private year: number = 2025;

  constructor(initialCharacter: Character) {
    this.currentCharacter = initialCharacter;
  }

  progressYear(): void {
    this.year++;
    this.currentCharacter.age++;
    this.currentCharacter = calculateAgeEffects(this.currentCharacter);
  }

  getCharacter(): Character {
    return {...this.currentCharacter};
  }

  updateCharacter(updates: Partial<Character>): void {
    this.currentCharacter = {
      ...this.currentCharacter,
      ...updates,
      stats: {
        ...this.currentCharacter.stats,
        ...(updates.stats || {})
      }
    };
    this.currentCharacter = applyTraitEffects(this.currentCharacter);
  }

  getCurrentYear(): number {
    return this.year;
  }
}

export function createNewGame(name: string): GameState {
  const stats = generateStartingStats();
  const character: Character = {
    id: crypto.randomUUID(),
    name,
    age: 0,
    stats,
    traits: [],
    relationships: []
  };
  return new GameState(character);
}