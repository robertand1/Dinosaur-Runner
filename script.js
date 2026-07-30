const dino = document.getElementById("dino");
const obstacle = document.getElementById("obstacle");
const statusText = document.getElementById("statusText");
const scoreText = document.getElementById("scoreText");
let isGameOver = false;
let gameScore = 0;
let dinoY = 0;
let speedY = 0;
let gravity = 0.6;
let isJumping = false;
let obstacleX = 600;
let obstacleSpeed = 6;

function jump() {
  if (isGameOver || isJumping) {
    return;
  }
  isJumping = true;
  speedY = 10;
}

document.addEventListener("keydown", function (event) {
  if (event.code === "Space" || event.code === "ArrowUp") {
    jump();
  }
});

function updateDino() {
  if (isJumping) {
    dinoY += speedY;
    speedY -= gravity;
    if (dinoY <= 0) {
      dinoY = 0;
      isJumping = false;
      speedY = 0;
    }
    dino.style.bottom = dinoY + "px";
  }
}

function updateScore() {
  gameScore++;
  scoreText.innerText = "Score: " + gameScore;
  obstacleSpeed += 0.2;
}

function updateObstacle() {
  obstacleX -= obstacleSpeed;
  if (obstacleX < -20) {
    obstacleX = 600;
    updateScore();
  }
  obstacle.style.left = obstacleX + "px";
}

function checkCollision() {
  let dinoRect = dino.getBoundingClientRect();
  let obsRect = obstacle.getBoundingClientRect();
  return (
    dinoRect.right > obsRect.left &&
    dinoRect.left < obsRect.right &&
    dinoRect.bottom > obsRect.top
  );
}

function GameOver() {
  isGameOver = true;
  statusText.innerText = "Game Over!";
  statusText.style.color = "red";
  scoreText.style.color = "red";
}

function gameLoop() {
  if (isGameOver) {
    return;
  }
  updateDino();
  updateObstacle();
  if (checkCollision()) {
    GameOver();
  }
  if (!isGameOver) {
    requestAnimationFrame(gameLoop);
  }
}

// Pornim jocul
requestAnimationFrame(gameLoop);
