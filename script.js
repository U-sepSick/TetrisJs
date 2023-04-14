const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const tetrominoes = [
  {
    shape: [[1, 1, 1, 1]],
    color: "#FF0D72",
  },
  {
    shape: [[1, 1], [1, 1]],
    color: "#0DC2FF",
  },
  {
    shape: [[1, 1, 1], [0, 1, 0]],
    color: "#0DFF72",
  },
  {
    shape: [[1, 1, 0], [0, 1, 1]],
    color: "#F538FF",
  },
  {
    shape: [[0, 1, 1], [1, 1, 0]],
    color: "#FF8E0D",
  },
  {
    shape: [[0, 1, 0], [1, 1, 1]],
    color: "#FFE138",
  },
  {
    shape: [[1, 0, 0], [1, 1, 1]],
    color: "#3877FF",
  },
];

const gameSpeed = 500;
const blockSize = 30;
const boardWidth = 10;
const boardHeight = 20;
let currentPiece;
let board
let requestAnimationFrameID;

document.addEventListener('DOMContentLoaded', () => {

  let gameRunning = true;

  const createBoard = () => {
    const board = [];
    for (let row = 0; row < 20; row++) {
      board[row] = Array.from({ length: 10 }).fill(0);
    }
    return board;
  };

  const startGame = () => {
    board = createBoard();
    currentPiece = generateRandomPiece();
    requestAnimationFrame(gameLoop);
  };

  const generateRandomPiece = () => {
    const pieces = [
      { blocks: [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0]], color: "#00ffff", },
      { blocks: [[1, 0, 0], [1, 1, 1], [0, 0, 0]], color: "#0000ff", },
      { blocks: [[0, 0, 1], [1, 1, 1], [0, 0, 0]], color: "#ffa500", },
      { blocks: [[1, 1], [1, 1]], color: "#ffff00", },
      { blocks: [[0, 1, 1], [1, 1, 0], [0, 0, 0]], color: "#00ff00", },
      { blocks: [[0, 1, 0], [1, 1, 1], [0, 0, 0]], color: "#800080", },
      { blocks: [[1, 1, 0], [0, 1, 1], [0, 0, 0]], color: "#ff0000", },
    ];

    const index = Math.floor(Math.random() * pieces.length);
    return { ...pieces[index], x: 4, y: 0 };
  };

  const drawPiece = (piece) => {
    const { x, y, color, blocks } = piece;
    ctx.fillStyle = color;
    for (let row = 0; row < blocks.length; row++) {
      for (let col = 0; col < blocks[row].length; col++) {
        if (blocks[row][col]) {
          ctx.fillRect(
            (col + x) * blockSize,
            (row + y) * blockSize,
            blockSize,
            blockSize
          );
        }
      }
    }
  }

  function drawBoard (board) {
    for (let row = 0; row < boardHeight; row++) {
      for (let col = 0; col < boardWidth; col++) {
        const color = board[row][col];
        if (color) {
          drawBlock(col, row, color);
        }
      }
    }
  }

  function drawBlock (x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
    ctx.strokeStyle = 'white';
    ctx.strokeRect(x * blockSize, y * blockSize, blockSize, blockSize);
  }

  ///----------------///

  function movePieceDown () {
    currentPiece.y++;
    /* FIX CHECKCOLLISION --------------------------------
    if (checkCollision()) {
      currentPiece.y--;
      addPieceToBoard();
      spawnNewPiece();
    }*/
  }


  function lockPiece () {
    // Añadir los bloques de la pieza actual al tablero
    for (let row = 0; row < currentPiece.blocks.length; row++) {
      for (let col = 0; col < currentPiece.blocks[row].length; col++) {
        if (currentPiece.blocks[row][col]) {
          board[currentPiece.y + row][currentPiece.x + col] = currentPiece.color;
        }
      }
    }

    // Generar una nueva pieza al azar y establecerla como la pieza actual
    currentPiece = generateRandomPiece();

    // Comprobar si la nueva pieza colisiona inmediatamente después de ser generada
    if (checkCollision()) {
      gameRunning = false;
      alert('Game over!');
    }
  }

  function checkCollision (piece, board, row, col) {
    console.log(piece)
    for (let i = 0; i < piece.length; i++) {
      for (let j = 0; j < piece[i].length; j++) {
        if (piece[i][j] && (board[row + i] === undefined || board[row + i][col + j] === undefined || board[row + i][col + j])) {
          return true;
        }
      }
    }
    return false;
  }


  function addPieceToBoard () {
    const [pieceRows, pieceCols] = [currentPiece.shape.length, currentPiece.shape[0].length];

    for (let row = 0; row < pieceRows; row++) {
      for (let col = 0; col < pieceCols; col++) {
        if (currentPiece.shape[row][col]) {
          const boardRow = currentPiece.row + row;
          const boardCol = currentPiece.col + col;
          board[boardRow][boardCol] = currentPiece.color;
        }
      }
    }
  }

  function spawnNewPiece () {
    const randomIndex = Math.floor(Math.random() * tetrominoes.length);
    currentPiece = {
      shape: tetrominoes[randomIndex].shape,
      color: tetrominoes[randomIndex].color,
      row: 0,
      col: Math.floor((board[0].length - tetrominoes[randomIndex].shape[0].length) / 2),
    };
  }

  function clearCanvas () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function gameLoop () {

    // Si el juego está en ejecución, mover la pieza actual hacia abajo
    if (gameRunning) {
      movePieceDown();
    }

    clearCanvas()

    // Dibujar el tablero y la pieza actual en el canvas
    drawBoard(board);
    drawPiece(currentPiece);

    // Programar el siguiente ciclo del loop de juego
    setTimeout(() => {
      requestAnimationFrameID = requestAnimationFrame(gameLoop);
    }, gameSpeed);
  }

  startGame();
})

const stopButton = document.getElementById('stopButton');
stopButton.addEventListener('click', () => {
  cancelAnimationFrame(requestAnimationFrameID);
});