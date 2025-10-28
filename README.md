# Number Guessing Game

Welcome to the Number Guessing Game! This is a simple yet engaging web-based game where you try to guess a secret number within a limited number of attempts.

## Table of Contents

- [Features](#features)
- [Optional Features](#optional-features)
- [Error Handling](#error-handling)
- [How to Play](#how-to-play)
- [Setup and Installation](#setup-and-installation)
- [Testing](#testing)
- [Project Structure](#project-structure)

## Features

- **Random Secret Number Generation**: The game randomly selects a secret number between 1 and 100 for each new game.
- **Interactive Guess Input**: Players can input their guesses through a graphical user interface.
- **Instant Feedback**: After each guess, the game provides immediate feedback, indicating if the guess is too high, too low, or correct.
- **Limited Attempts**: Players have a predefined number of attempts to guess the secret number.
- **Win/Loss Messages**: Clear messages are displayed at the end of the game to indicate whether the player won or lost, along with the secret number if they lost.
- **Restart Game**: Players can easily restart the game at any time without needing to reload the page.
- **Difficulty Levels**: Choose from different difficulty levels (Easy, Medium, Hard), each with varying numbers of allowed guesses.

## Optional Features

- **Difficulty Levels**: (Already implemented) Players can select from 'Easy', 'Medium', or 'Hard' modes, each providing a different number of attempts.
- **Restart Game**: (Already implemented) The game can be restarted with a click of a button, resetting the secret number and attempts.
- **Aesthetically Pleasing UI with Animations**: (Already implemented) The game features a modern, navy blue color theme with subtle animations for feedback messages to enhance the user experience.

## Error Handling

- **Input Validation**: Player inputs are validated to ensure they are indeed numbers and fall within the valid range (1 to 100). Invalid inputs trigger an informative feedback message.
- **Robustness**: The game is designed to handle invalid inputs gracefully, ensuring the application does not crash or break.

## How to Play

1.  **Start the Game**: The game begins automatically when you open the application. A secret number is generated, and you'll see a prompt to guess.
2.  **Select Difficulty**: Choose your desired difficulty level (Easy, Medium, Hard) using the radio buttons. This will affect the number of attempts you have.
3.  **Enter Your Guess**: Type a number between 1 and 100 into the input field.
4.  **Submit Guess**: Click the "Guess" button to submit your guess.
5.  **Receive Feedback**: The game will tell you if your guess was "Too low!", "Too high!", or "Correct!".
6.  **Monitor Attempts**: Keep an eye on the "Attempts Left" counter. It decreases with each guess.
7.  **Win or Lose**: If you guess the number correctly, you win! If you run out of attempts, you lose, and the secret number will be revealed.
8.  **Play Again**: After the game ends, click the "Play Again" button to start a new round.

## Setup and Installation

To run this project locally, follow these steps:

1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd number-guess-game
    ```
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Start the development server**:
    ```bash
    npm run dev
    ```
    The game will be accessible in your browser, usually at `http://localhost:5173`.

## Testing

This project uses Jest for unit testing of the core game logic.

To run the tests:

1.  Ensure all dependencies are installed (`npm install`).
2.  Execute the test command:
    ```bash
    npm test
    ```

## Project Structure

- `src/App.tsx`: The main application component, rendering the `Game` component.
- `src/App.css`: Global styles and theme for the application, including animations.
- `src/Game.tsx`: The primary game component, managing game state, user input, and displaying game information.
- `src/gameLogic.ts`: Contains the core game logic functions, such as `generateSecretNumber`, `checkGuess`, `startGame`, and `makeGuess`.
- `src/gameLogic.test.ts`: Unit tests for the core game logic functions.
- `jest.config.cjs`: Jest configuration file for testing setup.
- `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`: TypeScript configuration files.
- `package.json`: Project dependencies and scripts.
