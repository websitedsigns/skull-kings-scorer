import React, { useState } from 'react';
import HomePage from './pages/HomePage';
import GamePage from './pages/GamePage';
import './App.css';

// Function to generate players dynamically
const generatePlayers = (numPlayers) => {
  let newPlayers = [];
  for (let i = 1; i <= numPlayers; i++) {
    newPlayers.push({ name: `Player ${i}`, score: 0 });
  }
  return newPlayers;
};

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [numPlayers, setNumPlayers] = useState(2); // Default to 2 players
  const [players, setPlayers] = useState(generatePlayers(numPlayers)); // Initialize players based on numPlayers
  const [animationClass, setAnimationClass] = useState('');

  const startGame = () => {
    console.log('Game is starting...');
    setPlayers(generatePlayers(numPlayers)); // Regenerate players if the game restarts
    triggerCharacterAnimation(); // Trigger the character animation
    
    // Add a delay before showing the game page to ensure animation finishes
    setTimeout(() => {
      setGameStarted(true); // Set the game as started after animation
    }, 2000); // 2 seconds delay for animation to complete (adjust as needed)
  };

  const triggerCharacterAnimation = () => {
    const animations = ['mermaid', 'pirate', 'skullKing', 'skull'];
    const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
    setAnimationClass(randomAnimation); // Apply a random animation class
  };

  const renderPage = () => {
    if (gameStarted) {
      return <GamePage players={players} setPlayers={setPlayers} />;
    } else {
      return (
        <HomePage
          startGame={startGame}
          setNumPlayers={setNumPlayers}
          numPlayers={numPlayers}
        />
      );
    }
  };

  return (
    <div className={`App ${animationClass}`}>
      <header className="App-header">
        {renderPage()}
      </header>
    </div>
  );
}

export default App;
