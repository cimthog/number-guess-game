import { generateSecretNumber, checkGuess, startGame, makeGuess, difficultySettings } from './gameLogic';

describe('generateSecretNumber', () => {
  it('should generate a number within the specified range', () => {
    const min = 1;
    const max = 100;
    const secretNumber = generateSecretNumber(min, max);
    expect(secretNumber).toBeGreaterThanOrEqual(min);
    expect(secretNumber).toBeLessThanOrEqual(max);
  });
});

describe('checkGuess', () => {
  it('should return "Too low!" if the guess is less than the secret number', () => {
    expect(checkGuess(50, 75)).toBe('Too low!');
  });

  it('should return "Too high!" if the guess is greater than the secret number', () => {
    expect(checkGuess(75, 50)).toBe('Too high!');
  });

  it('should return "Correct!" if the guess is equal to the secret number', () => {
    expect(checkGuess(50, 50)).toBe('Correct!');
  });
});

describe('startGame', () => {
  it('should initialize the game state for easy difficulty', () => {
    const gameState = startGame('easy');
    const { attempts, range } = difficultySettings.easy;
    expect(gameState.attemptsLeft).toBe(attempts);
    expect(gameState.feedback).toContain(`Guess a number between ${range[0]} and ${range[1]}`);
    expect(gameState.gameOver).toBe(false);
    expect(gameState.hasWon).toBe(false);
    expect(gameState.secretNumber).toBeGreaterThanOrEqual(range[0]);
    expect(gameState.secretNumber).toBeLessThanOrEqual(range[1]);
  });

  it('should initialize the game state for medium difficulty', () => {
    const gameState = startGame('medium');
    const { attempts, range } = difficultySettings.medium;
    expect(gameState.attemptsLeft).toBe(attempts);
    expect(gameState.feedback).toContain(`Guess a number between ${range[0]} and ${range[1]}`);
    expect(gameState.gameOver).toBe(false);
    expect(gameState.hasWon).toBe(false);
    expect(gameState.secretNumber).toBeGreaterThanOrEqual(range[0]);
    expect(gameState.secretNumber).toBeLessThanOrEqual(range[1]);
  });

  it('should initialize the game state for hard difficulty', () => {
    const gameState = startGame('hard');
    const { attempts, range } = difficultySettings.hard;
    expect(gameState.attemptsLeft).toBe(attempts);
    expect(gameState.feedback).toContain(`Guess a number between ${range[0]} and ${range[1]}`);
    expect(gameState.gameOver).toBe(false);
    expect(gameState.hasWon).toBe(false);
    expect(gameState.secretNumber).toBeGreaterThanOrEqual(range[0]);
    expect(gameState.secretNumber).toBeLessThanOrEqual(range[1]);
  });
});

describe('makeGuess', () => {
  it('should decrease attemptsLeft and update feedback for a low guess', () => {
    const initialGameState = startGame('medium');
    const newState = makeGuess({ ...initialGameState, secretNumber: 50 }, 25);
    expect(newState.attemptsLeft).toBe(initialGameState.attemptsLeft - 1);
    expect(newState.feedback).toBe('Too low!');
    expect(newState.gameOver).toBe(false);
    expect(newState.hasWon).toBe(false);
  });

  it('should decrease attemptsLeft and update feedback for a high guess', () => {
    const initialGameState = startGame('medium');
    const newState = makeGuess({ ...initialGameState, secretNumber: 50 }, 75);
    expect(newState.attemptsLeft).toBe(initialGameState.attemptsLeft - 1);
    expect(newState.feedback).toBe('Too high!');
    expect(newState.gameOver).toBe(false);
    expect(newState.hasWon).toBe(false);
  });

  it('should set hasWon to true and gameOver to true for a correct guess', () => {
    const initialGameState = startGame('medium');
    const newState = makeGuess({ ...initialGameState, secretNumber: 50 }, 50);
    expect(newState.attemptsLeft).toBe(initialGameState.attemptsLeft - 1);
    expect(newState.feedback).toBe('Correct!');
    expect(newState.gameOver).toBe(true);
    expect(newState.hasWon).toBe(true);
  });

  it('should set gameOver to true if attempts run out', () => {
    let gameState = startGame('hard'); // 5 attempts
    gameState = makeGuess({ ...gameState, secretNumber: 1 }, 2); // 4 attempts
    gameState = makeGuess({ ...gameState, secretNumber: 1 }, 3); // 3 attempts
    gameState = makeGuess({ ...gameState, secretNumber: 1 }, 4); // 2 attempts
    gameState = makeGuess({ ...gameState, secretNumber: 1 }, 5); // 1 attempt
    const newState = makeGuess({ ...gameState, secretNumber: 1 }, 6); // 0 attempts, game over
    expect(newState.attemptsLeft).toBe(0);
    expect(newState.gameOver).toBe(true);
    expect(newState.hasWon).toBe(false);
  });

  it('should not change state if game is already over', () => {
    const initialGameState = { ...startGame('easy'), gameOver: true, feedback: "Game Over!", hasWon: false };
    const newState = makeGuess(initialGameState, 50);
    expect(newState).toEqual(initialGameState);
  });
});
