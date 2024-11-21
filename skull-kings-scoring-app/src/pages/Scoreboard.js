// src/pages/Scoreboard.js
import React from 'react';

function Scoreboard({ players }) {
  return (
    <div className="scoreboard">
      <h3>Scoreboard</h3>
      <ul>
        {players.map((player, index) => (
          <li key={index}>
            {player.name}: {player.score}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Scoreboard;
