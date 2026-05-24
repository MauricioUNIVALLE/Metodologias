const boardElement = document.querySelector('.board');
const cells = document.querySelectorAll('.cell');
const statusElement = document.getElementById('status');

let currentPlayer = 'X';
let boardState = ["", "", "", "", "", "", "", "", ""];
let isGameActive = true;

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontales
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Verticales
    [0, 4, 8], [2, 4, 6]             // Diagonales
];

function handleCellClick(e) {
    const clickedCell = e.target;
    const clickedIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (boardState[clickedIndex] !== "" || !isGameActive) return;

    boardState[clickedIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    
    checkResult();
}

function checkResult() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusElement.textContent = `¡Ganador: Jugador ${currentPlayer}!`;
        isGameActive = false;
        return;
    }

    if (!boardState.includes("")) {
        statusElement.textContent = "¡Empate!";
        isGameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusElement.textContent = `Turno de: ${currentPlayer}`;
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));