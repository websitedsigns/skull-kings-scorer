import React, { useState } from 'react';
import HomePage from './pages/HomePage';
import GamePage from './pages/Gamepage';
import './App.css';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [numPlayers, setNumPlayers] = useState(0);
  const [players, setPlayers] = useState([]);

  const startGame = () => {
    const initialPlayers = Array.from({ length: numPlayers }, (_, i) => ({
      name: `Player ${i + 1}`,
      score: 0,
    }));
    setPlayers(initialPlayers);
    setGameStarted(true);
  };

  return (
    <div className="app">
      {!gameStarted ? (
        <HomePage 
          numPlayers={numPlayers} 
          setNumPlayers={setNumPlayers} 
          startGame={startGame} 
        />
      ) : (
        <GamePage players={players} setPlayers={setPlayers} />
      )}
    </div>
  );
}

export default App;
