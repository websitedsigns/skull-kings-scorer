import React from 'react';
import '../index.css'; // Import the CSS for modern styling

const HomePage = ({ startGame, setNumPlayers, numPlayers }) => {

  const handleNumPlayersChange = (e) => {
    setNumPlayers(Number(e.target.value)); // Update numPlayers when the user selects a value
  };

  return (
    <div className="home">
      <h2 className="header">Skull Kings Game</h2>
      <div className="player-selection">
        <label htmlFor="num-players">Select Number of Players:</label>
        <select 
          id="num-players" 
          value={numPlayers} 
          onChange={handleNumPlayersChange} // Handle input change
        >
          <option value={2}>2 Players</option>
          <option value={3}>3 Players</option>
          <option value={4}>4 Players</option>
          <option value={5}>5 Players</option>
          <option value={6}>6 Players</option>
          <option value={7}>7 Players</option>
          <option value={8}>8 Players</option>
        </select>
      </div>
      <button onClick={startGame}>Start Game</button>
    </div>
  );
};

export default HomePage;
