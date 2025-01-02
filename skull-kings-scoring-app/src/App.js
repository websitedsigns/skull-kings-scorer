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
    setAnimationClass(randomAnimation); // Set a random animation for character
    console.log('Animation triggered: ', randomAnimation);
  };

  // Debugging outputs
  console.log('Game Started:', gameStarted);
  console.log('Players:', players);

  return (
    <div className="background"> {/* Background container */}
      <div className={`app ${animationClass}`}> {/* App content */}
        {/* Character Animation */}
        {animationClass && <div className={`character ${animationClass}`}></div>} {/* Show character animation */}

        {/* Conditional Rendering of Pages */}
        {!gameStarted ? (
          <HomePage startGame={startGame} setNumPlayers={setNumPlayers} numPlayers={numPlayers} />
        ) : (
          <>
            <GamePage players={players} setPlayers={setPlayers} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
