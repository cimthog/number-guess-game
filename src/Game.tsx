import React, { useState } from "react";
import {
  type GameState,
  initialGameState,
  startGame,
  makeGuess,
  type Difficulty,
  difficultySettings,
} from "./gameLogic";

const Game: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [guess, setGuess] = useState<string>("");
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");

  React.useEffect(() => {
    setGameState(startGame(difficulty)); // Start a new game when the component mounts
  }, [difficulty]);

  const handleRestart = () => {
    setGameState(startGame(difficulty));
  };

  const handleGuess = () => {
    const parsedGuess = parseInt(guess);
    const [min, max] = difficultySettings[difficulty].range;
    if (isNaN(parsedGuess) || parsedGuess < min || parsedGuess > max) {
      setGameState((prevState) => ({
        ...prevState,
        feedback: `Please enter a number between ${min} and ${max}.`,
      }));
      return;
    }
    const newGameState = makeGuess(gameState, parsedGuess);
    setGameState(newGameState);
    setGuess("");
  };

  return (
    <div className="game-container">
      <h1>Number Guessing Game</h1>
      <p
        className={`feedback-message ${
          gameState.feedback === "Correct!"
            ? "correct"
            : gameState.feedback.includes("Too")
            ? "wrong"
            : ""
        }`}
      >
        {gameState.feedback}
      </p>
      {!gameState.gameOver && (
        <div className="input-section">
          <input
            type="number"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            disabled={gameState.gameOver}
          />
          <button onClick={handleGuess} disabled={gameState.gameOver}>
            Guess
          </button>
        </div>
      )}
      <p className="attempts-left">Attempts Left: {gameState.attemptsLeft}</p>
      {gameState.gameOver && (
        <div className="game-over-message">
          {gameState.hasWon ? (
            <p>You won!</p>
          ) : (
            <p>You lost! The secret number was {gameState.secretNumber}.</p>
          )}
          <button onClick={handleRestart}>Play Again</button>
        </div>
      )}
      <div className="difficulty-selection">
        <p>Select Difficulty:</p>
        <label>
          <input
            type="radio"
            value="easy"
            checked={difficulty === "easy"}
            onChange={() => setDifficulty("easy")}
          />
          Easy
        </label>
        <label>
          <input
            type="radio"
            value="medium"
            checked={difficulty === "medium"}
            onChange={() => setDifficulty("medium")}
          />
          Medium
        </label>
        <label>
          <input
            type="radio"
            value="hard"
            checked={difficulty === "hard"}
            onChange={() => setDifficulty("hard")}
          />
          Hard
        </label>
      </div>
    </div>
  );
};

export default Game;
