document.addEventListener('keydown', UserInput)
function UserInput (event) {
  switch (event.code) {
    case "ArrowLeft":
    case "KeyA":
      p.movePieceLeft();
      dropStart = Date.now()
      break;
    case "ArrowRight":
    case 'KeyD':
      p.movePieceRight();
      dropStart = Date.now()
      break;
    case "ArrowDown":
    case 'KeyS':
      p.movePieceDown();
      break;
    case "Space":
      p.rotatePiece();
      dropStart = Date.now()
      break;
  }
}
