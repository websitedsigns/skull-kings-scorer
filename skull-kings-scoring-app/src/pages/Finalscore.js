import React from 'react';

function FinalScore({ players }) {
  return (
    <div className="finalscore">
      <h2>Final Scores</h2>
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

export default FinalScore;
