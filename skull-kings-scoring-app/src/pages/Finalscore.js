// src/pages/Finalscore.js
import React from 'react';

function Finalscore({ players }) {
  const winner = players.reduce((prev, current) =>
    prev.score > current.score ? prev : current
  );

  return (
    <div className="finalscore">
      <h2>Game Over</h2>
      <h3>Winner: {winner.name} with {winner.score} points!</h3>
      <ul>
        {players.map((player, index) => (
          <li key={index}>
            {player.name}: {player.score} points
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Finalscore;
