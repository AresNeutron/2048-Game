2048 Game Clone

This is a simple implementation of the popular 2048 game using JavaScript, HTML, and CSS. The game features a 4x4 grid where numbers can be combined by sliding tiles. Your goal is to combine numbers and reach the tile with the value of 2048.
Features

    Responsive 4x4 grid design
    Keyboard controls to move the tiles (Up, Down, Left, Right arrow keys)
    Automatic generation of a "2" tile after each valid move
    Score and best score tracking
    "New Game" button to reset the board
    Alerts when the game is over

How to Play

    Use the arrow keys to slide tiles in the desired direction:
        Up Arrow: Moves tiles up
        Down Arrow: Moves tiles down
        Left Arrow: Moves tiles left
        Right Arrow: Moves tiles right
    When two tiles with the same number collide, they will combine into a single tile with their sum (e.g., 2 + 2 = 4).
    The game ends when no more valid moves can be made.
    Try to reach the tile with the value of 2048 to win!

Code Structure

    index.html: Contains the HTML structure for the game grid and buttons.
    styles.css: Defines the appearance of the game grid and tiles.
    script.js: Contains all the game logic including tile movement, collision detection, and score updates.

Key JavaScript Functions

    newGame(): Resets the board and starts a new game.
    setBoard(board): Updates the grid based on the current board state.
    randomTwo(): Randomly generates a "2" tile at an empty position.
    adjustRow() & adjustCol(): Handles the movement of tiles horizontally or vertically, detecting any valid changes.
    checkCollision(): Merges tiles when they collide.
