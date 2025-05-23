import { useState } from 'react';
import { GameState, createNewGame } from '../state/gameState';
import { EventSystem } from '../events/eventSystem';

export function CharacterView() {
  const [gameState, setGameState] = useState<GameState>(createNewGame('Player'));
  const [eventSystem] = useState<EventSystem>(new EventSystem(gameState));
  const [currentEvent, setCurrentEvent] = useState<string | null>(null);

  const character = gameState.getCharacter();
  const possibleEvents = eventSystem.getPossibleEvents();

  const handleProgressYear = () => {
    gameState.progressYear();
    setGameState(new GameState(gameState.getCharacter()));
    
    // Check for random events
    if (Math.random() > 0.7 && possibleEvents.length > 0) {
      const randomEvent = possibleEvents[Math.floor(Math.random() * possibleEvents.length)];
      setCurrentEvent(randomEvent.id);
    }
  };

  const handleEventOutcome = () => {
    if (!currentEvent) return;
    
    const outcome = eventSystem.triggerEvent(currentEvent);
    setCurrentEvent(null);
    alert(`${outcome.description}\n\nEffects applied to your character.`);
    setGameState(new GameState(gameState.getCharacter()));
  };

  return (
    <div className="character-view">
      <h1>{character.name}</h1>
      <p>Age: {character.age}</p>
      <p>Year: {gameState.getCurrentYear()}</p>
      
      <div className="stats">
        <h2>Stats</h2>
        <ul>
          <li>Health: {character.stats.health}</li>
          <li>Intelligence: {character.stats.intelligence}</li>
          <li>Charisma: {character.stats.charisma}</li>
          <li>Morality: {character.stats.morality}</li>
          <li>Luck: {character.stats.luck}</li>
        </ul>
      </div>

      <div className="traits">
        <h2>Traits</h2>
        {character.traits.length > 0 ? (
          <ul>
            {character.traits.map(trait => (
              <li key={trait}>{trait}</li>
            ))}
          </ul>
        ) : (
          <p>No traits yet</p>
        )}
      </div>

      <button onClick={handleProgressYear}>Progress Year</button>

      {currentEvent && (
        <div className="event-modal">
          <h2>Life Event!</h2>
          <p>{possibleEvents.find(e => e.id === currentEvent)?.description}</p>
          <button onClick={handleEventOutcome}>Continue</button>
        </div>
      )}
    </div>
  );
}