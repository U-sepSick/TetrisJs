const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const pre_piece = document.getElementById("pre_piece");
const ptx = pre_piece.getContext("2d");

const blockSize = 35
const board_Y = 20
const board_X = 10

// Color empty square
const EMPTY = 'white'
let board = []
let preboard =[]

const PIECES = [
  [Z, 'red'],
  [S, 'green'],
  [T, 'cyan'],
  [O, 'indigo'],
  [I, 'blue'],
  [L, 'purple'],
  [J, 'orange']
]

function DrawSquare (x, y, color) {
  ctx.fillStyle = color
  ctx.fillRect(x * blockSize, y * blockSize, blockSize, blockSize)
  ctx.strokeStyle = 'black'
  ctx.strokeRect(x * blockSize, y * blockSize, blockSize, blockSize)
}

function CreateBoard () {
  for (let row = 0; row < board_Y; row++) {
    board[row] = [];
    for (let col = 0; col < board_X; col++) {
      board[row][col] = EMPTY;
    }
  }

  Prev_Board()
}

function DrawBoard () {
  for (let row = 0; row < board_Y; row++) {
    for (let col = 0; col < board_X; col++) {
      DrawSquare(col, row, board[row][col])
    }
  }
}

function randomPiece () {
  let randomN = Math.floor(Math.random() * PIECES.length)
  return new Piece(PIECES[randomN][0], PIECES[randomN][1])
}

function Prev_Board () {
  for (let row = 0; row < 4; row++) {
    preboard[row] = [];
    for (let col = 0; col < 4; col++) {
      preboard[row][col] = EMPTY;
    }
  }
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      DrawPreSquare(col, row, preboard[row][col])
    }
  }
}

function DrawPreSquare (x, y, color) {
  ptx.fillStyle = color
  ptx.fillRect(x * blockSize, y * blockSize, blockSize, blockSize)
  ptx.strokeStyle = 'black'
  ptx.strokeRect(x * blockSize, y * blockSize, blockSize, blockSize)
}
