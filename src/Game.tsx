import React, { useState } from 'react';
import { GameState, initialGameState, startGame, makeGuess } from './gameLogic';

const Game: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [guess, setGuess] = useState<string>('');

  React.useEffect(() => {
    setGameState(startGame(1, 100, 5)); // Start a new game when the component mounts
  }, []);

  const handleGuess = () => {
    const parsedGuess = parseInt(guess);
    if (isNaN(parsedGuess) || parsedGuess < 1 || parsedGuess > 100) {
      setGameState(prevState => ({ ...prevState, feedback: "Please enter a number between 1 and 100." }));
      return;
    }
    const newGameState = makeGuess(gameState, parsedGuess);
    setGameState(newGameState);
    setGuess('');
  };

  return (
    <div>
      <h1>Number Guessing Game</h1>
      <p>{gameState.feedback}</p>
      {!gameState.gameOver && (
        <div>
          <input
            type="number"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            disabled={gameState.gameOver}
          />
          <button onClick={handleGuess} disabled={gameState.gameOver}>Guess</button>
        </div>
      )}
      <p>Attempts Left: {gameState.attemptsLeft}</p>
      {gameState.gameOver && (
        gameState.hasWon ? <p>You won!</p> : <p>You lost! The secret number was {gameState.secretNumber}.</p>
      )}
    </div>
  );
};

export default Game;
