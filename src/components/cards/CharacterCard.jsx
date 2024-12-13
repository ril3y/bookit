import React from 'react';
import './CharacterCard.css';

const CharacterCard = ({ character }) => {
  return (
    <div className="character-card">
      <h2>{character.name}</h2>
      <p className="pronunciation">Pronounced: {character.pronunciation}</p>
      
      <div className="character-section">
        <h3>Species</h3>
        <p>{character.species}</p>
      </div>

      <div className="character-section">
        <h3>Background</h3>
        <div className="scrollable-content">
          <p>{character.background}</p>
        </div>
      </div>

      <div className="character-section">
        <h3>Equipment</h3>
        <div className="scrollable-content">
          <ul>
            {character.equipment.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="character-section">
        <h3>Quirks</h3>
        <div className="scrollable-content">
          <ul>
            {character.quirks.map((quirk, index) => (
              <li key={index}>{quirk}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;
