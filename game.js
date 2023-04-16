let dropStart = Date.now()
let startGame = false
let gameOver = false
let p;

function gameStart () {
    console.log('comienza el juego')
    startGame = true
    CreateBoard()
    DrawBoard()
    // init piece
    p = randomPiece()
    gameLoop()
}

function gameLoop () {
    let now = Date.now()
    let delta = now - dropStart
    if (delta > 1000) {
        p.movePieceDown()
        p.fillPrePiece()
        dropStart = Date.now()
    }
    if (!gameOver) {
        requestAnimationFrame(gameLoop)
    }
}

const startBtn = document.getElementById('startButton')
startBtn.addEventListener('click', function () { gameStart() })