const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset');
const aiToggleButton = document.getElementById('ai-toggle');
const scoreX = document.getElementById('scoreX');
const scoreO = document.getElementById('scoreO');

let currentPlayer = 'X';
let scores = { X: 0, O: 0 };
let gameActive = true;
let aiEnabled = false;

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
];

const board = ['', '', '', '', '', '', '', '', ''];

cells.forEach(cell => {
    cell.addEventListener('click', () => {
        if (cell.textContent !== '' || !gameActive) {
            return;
        }
        cell.textContent = currentPlayer;
        updateBoard(cell.dataset.index);
        checkResult();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        if (aiEnabled && currentPlayer === 'O' && gameActive) {
            setTimeout(aiMove, 500); // AI moves after a short delay
        }
    });
});

const updateBoard = (index) => {
    board[index] = currentPlayer;
};

const checkResult = () => {
    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            endGame(board[a]);
            return;
        }
    }
    if (!board.includes('')) {
        endGame('draw');
    }
};

const endGame = (winner) => {
    gameActive = false;
    if (winner !== 'draw') {
        scores[winner]++;
        winner === 'X' ? scoreX.textContent = scores.X : scoreO.textContent = scores.O;
        alert(`Player ${winner} wins!`);
    } else {
        alert('Game is a draw!');
    }
};

const resetGame = () => {
    cells.forEach(cell => cell.textContent = '');
    gameActive = true;
    currentPlayer = 'X';
    board.fill('');
};

const toggleAI = () => {
    aiEnabled = !aiEnabled;
    aiToggleButton.textContent = `Play Against AI: ${aiEnabled ? 'On' : 'Off'}`;
    resetGame();
};

resetButton.addEventListener('click', resetGame);
aiToggleButton.addEventListener('click', toggleAI);

const aiMove = () => {
    let availableCells = board.reduce((acc, cell, index) => {
        if (cell === '') acc.push(index);
        return acc;
    }, []);

    let randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
    cells[randomIndex].textContent = 'O';
    updateBoard(randomIndex);
    checkResult();
    currentPlayer = 'X';
};
