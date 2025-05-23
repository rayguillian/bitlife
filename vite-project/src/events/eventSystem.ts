import type { Character } from '../character/types';
import { GameState } from '../state/gameState';

type EventOutcome = {
  description: string;
  effects: {
    statChanges?: Partial<Character['stats']>;
    newTraits?: string[];
    relationshipChanges?: {
      characterId: string;
      change: number;
    }[];
  };
};

type Event = {
  id: string;
  name: string;
  description: string;
  conditions: (character: Character) => boolean;
  possibleOutcomes: EventOutcome[];
};

export class EventSystem {
  private events: Event[] = [];
  private state: GameState;

  constructor(state: GameState) {
    this.state = state;
    this.initializeEvents();
  }

  private initializeEvents() {
    this.events = [
      {
        id: 'school-exam',
        name: 'School Exam',
        description: 'You have an important exam coming up',
        conditions: (c) => c.age >= 6 && c.age <= 18,
        possibleOutcomes: [
          {
            description: 'You studied hard and aced the exam!',
            effects: {
              statChanges: { intelligence: 5 },
              newTraits: ['studious']
            }
          },
          {
            description: 'You barely passed the exam',
            effects: {
              statChanges: { intelligence: 1 }
            }
          }
        ]
      },
      {
        id: 'job-interview',
        name: 'Job Interview',
        description: 'You have a job interview for your dream position',
        conditions: (c) => c.age >= 18,
        possibleOutcomes: [
          {
            description: 'You impressed them with your skills!',
            effects: {
              statChanges: { charisma: 3 }
            }
          },
          {
            description: 'You got nervous and bombed the interview',
            effects: {
              statChanges: { charisma: -2 }
            }
          }
        ]
      }
    ];
  }

  getPossibleEvents(): Event[] {
    return this.events.filter(event => 
      event.conditions(this.state.getCharacter())
    );
  }

  triggerEvent(eventId: string): EventOutcome {
    const event = this.events.find(e => e.id === eventId);
    if (!event) {
      throw new Error(`Event ${eventId} not found`);
    }

    const outcomes = event.possibleOutcomes;
    const selected = outcomes[Math.floor(Math.random() * outcomes.length)];
    
    // Apply effects to character
    if (selected.effects.statChanges) {
      this.state.updateCharacter({ stats: selected.effects.statChanges });
    }
    if (selected.effects.newTraits) {
      const currentTraits = this.state.getCharacter().traits;
      this.state.updateCharacter({ 
        traits: [...currentTraits, ...selected.effects.newTraits] 
      });
    }

    return selected;
  }
}