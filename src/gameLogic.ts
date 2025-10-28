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

export type Difficulty = "easy" | "medium" | "hard";

export const difficultySettings: Record<
  Difficulty,
  { attempts: number; range: [number, number] }
> = {
  easy: { attempts: 10, range: [1, 100] },
  medium: { attempts: 7, range: [1, 100] },
  hard: { attempts: 5, range: [1, 100] },
};

export const startGame = (difficulty: Difficulty): GameState => {
  const { attempts, range } = difficultySettings[difficulty];
  const [min, max] = range;
  const secretNumber = generateSecretNumber(min, max);
  return {
    ...initialGameState,
    secretNumber,
    attemptsLeft: attempts,
    feedback: `Guess a number between ${min} and ${max}. You have ${attempts} attempts.`,
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
