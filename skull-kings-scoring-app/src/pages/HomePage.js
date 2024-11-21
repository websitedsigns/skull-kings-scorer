// src/pages/HomePage.js
import React from 'react';

function HomePage({ numPlayers, setNumPlayers, startGame }) {
  return (
    <div className="homepage">
      <h1>Welcome to Skull Kings</h1>
      <label>
        Number of Players:
        <input
          type="number"
          min="1"
          value={numPlayers}
          onChange={(e) => setNumPlayers(Number(e.target.value))}
        />
      </label>
      <button onClick={startGame} disabled={numPlayers < 1}>
        Start Game
      </button>
    </div>
  );
}

export default HomePage;
