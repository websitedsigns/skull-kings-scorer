import React, { useState } from 'react';

const PlayerInput = ({ player, onScoreUpdate }) => {
  const [tricksWon, setTricksWon] = useState('');
  const [bid, setBid] = useState('');

  const handleSubmit = () => {
    // Calculate the score based on the input
    const score = calculateScore(Number(tricksWon), Number(bid));
    onScoreUpdate(score);
    setTricksWon('');
    setBid('');
  };

  const calculateScore = (tricksWon, bid) => {
    if (tricksWon === bid) {
      return 10; // Correct prediction: +10 points
    }
    return -5; // Incorrect prediction: -5 points
  };

  return (
    <div className="player-input">
      <h3>{player.name}'s Turn</h3>
      <label>Tricks Won:</label>
      <input 
        type="number" 
        value={tricksWon} 
        onChange={(e) => setTricksWon(e.target.value)} 
      />
      <label>Bid:</label>
      <input 
        type="number" 
        value={bid} 
        onChange={(e) => setBid(e.target.value)} 
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default PlayerInput;
