import React, { useState } from 'react';
import './GamePage.css'; // Import the CSS for modern styling

function GamePage({ players, setPlayers }) {
  const [currentRound, setCurrentRound] = useState(1);
  const [roundScores, setRoundScores] = useState([]); // Stores detailed round data
  const [bids, setBids] = useState(Array(players.length).fill(''));
  const [tricksWon, setTricksWon] = useState(Array(players.length).fill(''));
  const [specialBonuses, setSpecialBonuses] = useState(Array(players.length).fill([]));
  const [scoringPhase, setScoringPhase] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // Controls the visibility of the popup

  const specialCardOptions = [
    { value: 0, label: "None" },
    { value: 10, label: "+10: Standard Fourteens" },
    { value: 20, label: "+20: Black Fourteens" },
    { value: 20, label: "Mermaid captures Pirate (+20 each)" },
    { value: 30, label: "Skull King captures Pirate (+30 each)" },
    { value: 40, label: "Skull King captured by Mermaid (+40)" },
  ];

  const handleBidSubmit = () => {
    setScoringPhase(true);
  };

  const handleScoringSubmit = () => {
    const updatedPlayers = players.map((player, index) => {
      const bid = Number(bids[index]);
      const tricks = Number(tricksWon[index]);
      const bonus = specialBonuses[index]
        .map((event) => Number(event))
        .reduce((total, value) => total + value, 0); // Sum up selected special bonuses

      // Calculate round score
      const roundScore = calculateScore(bid, tricks) + bonus;

      return {
        ...player,
        score: player.score + roundScore,
      };
    });

    setPlayers(updatedPlayers);

    // Store detailed round data
    const roundData = {
      round: currentRound,
      playersData: updatedPlayers.map((player, index) => ({
        name: player.name,
        bid: bids[index],
        tricks: tricksWon[index],
        bonuses: specialBonuses[index].map((bonusValue) =>
          specialCardOptions.find((option) => option.value === Number(bonusValue))?.label
        ),
        totalScore: updatedPlayers[index].score,
      })),
    };

    setRoundScores((prevScores) => [...prevScores, roundData]);

    setScoringPhase(false);
    setBids(Array(players.length).fill(''));
    setTricksWon(Array(players.length).fill(''));
    setSpecialBonuses(Array(players.length).fill([]));

    if (currentRound < 10) {
      setCurrentRound(currentRound + 1);
    } else {
      alert('Game Over! Check the final scores.');
    }
  };

  const calculateScore = (predicted, actual, round) => {
    let score = 0;
  
    // First round logic: +10 if correct, -10 per off trick if incorrect
    if (round === 1) {
      if (predicted === actual) {
        score = 10; // Correct bid in round 1 gets 10 points
      } else {
        score = -10 * Math.abs(predicted - actual); // Penalize for being off by tricks
      }
    } else {
      // Subsequent rounds logic: 20 points per card if correct, -10 per card if incorrect
      if (predicted === actual) {
        score = 20 * actual; // Correct prediction for each card
      } else {
        score = -10 * Math.abs(predicted - actual); // Penalize for being off by tricks
      }
    }
  
    return score;
  };
  
  const handleBonusChange = (playerIndex, value) => {
    setSpecialBonuses((prevBonuses) => {
      const newBonuses = [...prevBonuses];
      newBonuses[playerIndex] = [...newBonuses[playerIndex], value];
      return newBonuses;
    });
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleBidChange = (e, index) => {
    const value = e.target.value;
    if (value >= 0 && value <= currentRound) {
      setBids((prevBids) => {
        const newBids = [...prevBids];
        newBids[index] = value;
        return newBids;
      });
    }
  };

  const handleTricksWonChange = (e, index) => {
    const value = e.target.value;
    if (value >= 0) {
      setTricksWon((prevTricks) => {
        const newTricks = [...prevTricks];
        newTricks[index] = value;
        return newTricks;
      });
    }
  };

  return (
    <div className="gamepage">
      <h2>Round {currentRound}</h2>

      {!scoringPhase ? (
        <>
          <h3>Enter Bids</h3>
          {players.map((player, index) => (
            <div key={index} className="input-group">
              <label>{player.name}'s Bid:</label>
              <select
                className="modern-select"
                value={bids[index]}
                onChange={(e) => handleBidChange(e, index)}
              >
                <option value="">--Select--</option>
                {[...Array(currentRound + 1).keys()].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
          ))}
          <button className="modern-button" onClick={handleBidSubmit} disabled={bids.includes('')}>
            Start Round
          </button>
        </>
      ) : (
        <>
          <h3>Round {currentRound}: Let's Score!</h3>
          {players.map((player, index) => (
            <div key={index} className="input-group">
              <h4>{player.name}</h4>
              <label>Tricks Won:</label>
              <input
                className="modern-input"
                type="number"
                min="0"
                value={tricksWon[index]}
                onChange={(e) => handleTricksWonChange(e, index)}
              />
              <label>Special Bonuses:</label>
              <select
                className="modern-select"
                value=""
                onChange={(e) => handleBonusChange(index, e.target.value)}
              >
                <option value="">--Select--</option>
                {specialCardOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ul>
                {specialBonuses[index].map((bonus, i) => (
                  <li key={i}>{specialCardOptions.find((opt) => opt.value === bonus)?.label}</li>
                ))}
              </ul>
            </div>
          ))}
          <button className="modern-button" onClick={handleScoringSubmit}>
            Submit Scores
          </button>
        </>
      )}

      <h3>Scores:</h3>
      <ul>
        {players.map((player, index) => (
          <li key={index}>
            {player.name}: {player.score} points
          </li>
        ))}
      </ul>

      <button className="modern-button" onClick={togglePopup}>
        View Round Scores
      </button>

      {/* Popup Modal for Round Scores */}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>Round Scores</h3>
            <button onClick={togglePopup} className="close-btn">
              X
            </button>
            <div className="score-grid">
              {roundScores.map((round, index) => (
                <div key={index} className="round">
                  <h4>Round {round.round}</h4>
                  <div className="grid">
                    {round.playersData.map((playerData, idx) => (
                      <div key={idx} className="score">
                        <p>{playerData.name}</p>
                        <p>Bid: {playerData.bid}</p>
                        <p>Tricks Won: {playerData.tricks}</p>
                        <p>Bonuses: {playerData.bonuses.join(', ') || 'None'}</p>
                        <p>Total Score: {playerData.totalScore}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GamePage;
