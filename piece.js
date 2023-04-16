const scoreGame = document.getElementById("score")

let score = 0

// Object Piece
function Piece (tetromino, color) {
  this.tetromino = tetromino
  this.color = color
  // start from first pattern
  this.tetrominoN = 0
  this.activeTetromino = this.tetromino[this.tetrominoN]
  // control pieces
  this.x = 3
  this.y = 0
}

Piece.prototype.fillPrePiece = function () {
  for (let row = 0; row < this.activeTetromino.length; row++) {
    for (let col = 0; col < this.activeTetromino.length; col++) {
      if (this.activeTetromino[row][col])
        if (this.activeTetromino[row].length > 3 ||
          this.activeTetromino[col].length > 3) {
          DrawPreSquare(col, row, this.color)
        }
        else {
          DrawPreSquare(col+1, row+1, this.color)
        }
    }
  }
}

Piece.prototype.fill = function (color) {
  for (let row = 0; row < this.activeTetromino.length; row++) {
    for (let col = 0; col < this.activeTetromino.length; col++) {
      if (this.activeTetromino[row][col])
        DrawSquare(this.x + col, this.y + row, color)
    }
  }
}

Piece.prototype.draw = function () {
  this.fill(this.color)
}

Piece.prototype.unDraw = function () {
  this.fill(EMPTY)
}

Piece.prototype.movePieceDown = function () {
  if (!this.collision(0, 1, this.activeTetromino)) {
    this.unDraw()
    this.y++
    this.draw()
  } else {
    this.lock()
    p = randomPiece()
  }
}

Piece.prototype.movePieceRight = function () {
  if (!this.collision(1, 0, this.activeTetromino)) {
    this.unDraw()
    this.x++
    this.draw()
  }
}

Piece.prototype.movePieceLeft = function () {
  if (!this.collision(-1, 0, this.activeTetromino)) {
    this.unDraw()
    this.x--
    this.draw()
  }
}

Piece.prototype.rotatePiece = function () {
  let nexPattern = this.tetromino[(this.tetrominoN + 1) % this.tetromino.length]
  let kick = 0

  if (this.collision(0, 0, nexPattern)) {
    if (this.x > board_X / 2) {
      // right wall, need move piece to the left to rotate
      kick = -1
    } else {
      // left wall, need move piece to the right to rotate
      kick = 1
    }
  }

  if (!this.collision(kick, 0, nexPattern)) {
    this.unDraw()
    this.x += kick
    this.tetrominoN = (this.tetrominoN + 1) % this.tetromino.length
    this.activeTetromino = this.tetromino[this.tetrominoN]
    this.draw()
  }
}

Piece.prototype.collision = function (x, y, piece) {
  for (let row = 0; row < piece.length; row++) {
    for (let col = 0; col < piece.length; col++) {
      // square is empty, continue
      if (!piece[row][col]) { continue }
      // x, y after movement
      let newX = this.x + col + x
      let newY = this.y + row + y
      if (newX < 0 || newX >= board_X || newY >= board_Y) {
        return true
      }
      // skip newY
      if (newY < 0) { continue }
      // check there is locked piece
      if (board[newY][newX] != EMPTY) {
        return true
      }
    }
  }
  return false
}

Piece.prototype.lock = function () {
  for (row = 0; row < this.activeTetromino.length; row++) {
    for (col = 0; col < this.activeTetromino.length; col++) {
      // we skip the vacant squares
      if (!this.activeTetromino[row][col]) {
        continue;
      }
      // pieces to lock on top = game over
      if (this.y + row < 0) {
        alert("Game Over");
        // stop request animation frame
        gameOver = true;
        break;
      }
      // we lock the piece
      board[this.y + row][this.x + col] = this.color;
    }
  }
  // remove full rows
  for (row = 0; row < board_Y; row++) {
    let isRowFull = true;
    for (col = 0; col < board_X; col++) {
      isRowFull = isRowFull && (board[row][col] != EMPTY);
    }
    if (isRowFull) {
      // if the row is full
      // we move down all the rows above it
      for (y = row; y > 1; y--) {
        for (col = 0; col < board_X; col++) {
          board[y][col] = board[y - 1][col];
        }
      }
      // the top row board[0][..] has no row above it
      for (col = 0; col < board_X; col++) {
        board[0][col] = EMPTY;
      }
      // increment the score
      score += 10;
    }
  }
  // update the board
  DrawBoard();

  // update the score
  //scoreGame.innerHTML = score;
}