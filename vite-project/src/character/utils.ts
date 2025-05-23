import type { Character } from './types';

export function calculateAgeEffects(character: Character): Character {
  const age = character.age;
  const updated = {...character};

  // Physical stats decline after 40
  if (age > 40) {
    updated.stats.health = Math.max(1, character.stats.health - (age - 40) * 0.5);
  }

  // Intelligence grows until 60 then declines
  updated.stats.intelligence = age < 60 
    ? character.stats.intelligence + (age * 0.1)
    : character.stats.intelligence - ((age - 60) * 0.2);

  return updated;
}

export function generateStartingStats(): Character['stats'] {
  return {
    health: 50 + Math.floor(Math.random() * 50),
    intelligence: 30 + Math.floor(Math.random() * 40),
    charisma: 30 + Math.floor(Math.random() * 40),
    morality: 50 + Math.floor(Math.random() * 50),
    luck: 20 + Math.floor(Math.random() * 60)
  };
}

export function applyTraitEffects(character: Character): Character {
  const traits = character.traits;
  const updated = {...character};

  traits.forEach(trait => {
    switch(trait) {
      case 'athletic':
        updated.stats.health += 10;
        break;
      case 'genius':
        updated.stats.intelligence += 15;
        break;
      case 'charmer':
        updated.stats.charisma += 15;
        break;
      case 'unlucky':
        updated.stats.luck -= 20;
        break;
    }
  });

  return updated;
}