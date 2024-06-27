// *** Global Variables ***
const gameBoxNode = document.querySelector("#game-box");

const ballNode = document.createElement("div"); // se crea la pelotita
ballNode.id = "ball"; // se asigna un id a la pelotita (para CSS)
gameBoxNode.append(ballNode); // se añade la pelotita a la caja de juego

const paddleNode = document.createElement("div"); // se crea la paleta
paddleNode.id = "paddle"; // se asigna un id a la paleta (para CSS)
gameBoxNode.append(paddleNode); // se añade la pelotita a la caja de juego

let ballX = 30; // el left del css
let ballY = 30; // el top del css
let isBallMovingRight = true; // es true porque la pelotita empieza moviendose a la derecha. Si fuese false se movieria a la izquierda.
let isBallMovingDown = true;
let ballSpeed = 3;
const wallRightSide = gameBoxNode.offsetWidth // el valor numero de el ancho del elemento
const wallBottomSide = gameBoxNode.offsetHeight // el valor numero de el alto del elemento
const ballWidth = ballNode.offsetWidth
const ballHeight = ballNode.offsetHeight

let paddleX = 200 // el left del css
let paddleY = 550 // el top del css
const paddleWidth = paddleNode.offsetWidth

let isGameOver = false;

let gameOveTextPositionY = 0;
let scoreNode = document.querySelector("#score")

// *** Game Functions ***

function ballMovement() {
  if (isBallMovingRight) {
    ballX += ballSpeed
    ballNode.style.left = `${ballX}px`
  } else {
    ballX -= ballSpeed
    ballNode.style.left = `${ballX}px`
  }

  if (isBallMovingDown) {
    ballY += ballSpeed
    ballNode.style.top = `${ballY}px`
  } else {
    ballY -= ballSpeed
    ballNode.style.top = `${ballY}px`
  }
}

function ballWallCollision() {

  if (ballX > (wallRightSide - ballWidth)) {
    // colision pared derecha
    isBallMovingRight = false;
  }

  if (ballY > (wallBottomSide - ballHeight)) {
    // colision pared abajo
    // isBallMovingDown = false;
    isGameOver = true;
  }

  if (ballX < 0) {
    // colision pared izquierda
    isBallMovingRight = true;
  }

  if (ballY < 0) {
    // colision pared arriba
    isBallMovingDown = true;
  }

}

function gameOverCheck() {
  if (isGameOver) {
    clearInterval(intervalId)
    // alert("Has perdido :( refresca para empezar de nuevo")
    gameBoxNode.style.backgroundColor = "darkred"
    let gameOverTextNode = document.createElement("h1")
    gameOverTextNode.innerText = "GAME OVER"
    gameOverTextNode.style.textAlign = "center"
    gameOverTextNode.style.position = "absolute"
    gameOverTextNode.style.left = "100px"
    gameOverTextNode.style.top = `${gameOveTextPositionY}px`
    gameBoxNode.append(gameOverTextNode)

    let invertalIdGameOver = setInterval(() => {

      gameOveTextPositionY += 1
      gameOverTextNode.style.top = `${gameOveTextPositionY}px`

      if (gameOveTextPositionY > 200) {
        clearInterval(invertalIdGameOver)
      }

    }, 1000/60)

  }
}

function ballPaddleCollision() {

  if (ballX > paddleX && (ballX + ballWidth) < (paddleX + paddleWidth) && (ballY + ballHeight) > paddleY) {
    // console.log("pelotita colisiono con paleta")
    isBallMovingDown = false;

    // incremento el score
    scoreNode.innerText++
    ballSpeed++
    paddleNode.style.backgroundColor = "#" + ((1 << 24) * Math.random() | 0).toString(16).padStart(6, "0")
  }

}

function gameLoop() {
  // esto es lo que se ejecuta 60 veces por segundo


  // funciones de movimiento automatico, colisions y cualquier otro efecto automatico deberia invocarse aqui
  ballMovement()
  ballWallCollision()
  ballPaddleCollision()
  gameOverCheck()

}

// *** Game Loop Interval ***
const intervalId = setInterval(() => {
  // console.log("el juego está andando")
  //* los console logs los deberiamos hacer para pruebas pero siempre deberiamos quitarlos cuando no los usemos.
  gameLoop()

}, 1000/60) // 60fps (No deberiamos estar modificando este valor)


// *** Event Listeners ***
document.addEventListener("keydown", (event) => {
  // console.log(event.key)

  //? como limitar el movimiento de la paleta
  if (event.key === "ArrowRight" && (paddleX + paddleWidth) < wallRightSide) {
    // movemos la paleta a la derecha
    paddleX += 20
    paddleNode.style.left = `${paddleX}px`
  } else if (event.key === "ArrowLeft" && paddleX > 0) {
    // movemos la paleta a la izquierda
    paddleX -= 20
    paddleNode.style.left = `${paddleX}px`
  }
})

// ejemplo de movimiendo de paleta con el cursor
// gameBoxNode.addEventListener("mousemove", (event) => {
//   console.log(event.offsetX)
//    paddleX = event.offsetX
//   paddleNode.style.left = `${paddleX}px`
// })


