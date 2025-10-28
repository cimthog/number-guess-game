export const generateSecretNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const checkGuess = (guess: number, secretNumber: number): string => {
  if (guess < secretNumber) {
    return "Too low!";
  } else if (guess > secretNumber) {
    return "Too high!";
  } else {
    return "Correct!";
  }
};

export interface GameState {
  secretNumber: number;
  attemptsLeft: number;
  feedback: string;
  gameOver: boolean;
  hasWon: boolean;
}

export const initialGameState: GameState = {
  secretNumber: 0,
  attemptsLeft: 5, // Default attempts
  feedback: "",
  gameOver: false,
  hasWon: false,
};

export const startGame = (min: number, max: number, initialAttempts: number): GameState => {
  const secretNumber = generateSecretNumber(min, max);
  return {
    ...initialGameState,
    secretNumber,
    attemptsLeft: initialAttempts,
    feedback: "Guess a number between " + min + " and " + max + ".",
  };
};

export const makeGuess = (gameState: GameState, guess: number): GameState => {
  if (gameState.gameOver) {
    return gameState;
  }

  const feedback = checkGuess(guess, gameState.secretNumber);
  const attemptsLeft = gameState.attemptsLeft - 1;
  const hasWon = feedback === "Correct!";
  const gameOver = hasWon || attemptsLeft === 0;

  return {
    ...gameState,
    attemptsLeft,
    feedback,
    gameOver,
    hasWon,
  };
};
