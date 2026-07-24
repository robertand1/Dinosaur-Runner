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
  if (isGameOver || dino.classList.contains("jump")) {
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

function gameLoop() {
  if (isGameOver) {
    return;
  }
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
  obstacleX -= obstacleSpeed;
  if (obstacleX < -20) {
    obstacleX = 600;
    ++gameScore;
    scoreText.innerText = "Score: " + gameScore;
    obstacleSpeed += 0.2;
  }
  obstacle.style.left = obstacleX + "px";
  let dinoRect = dino.getBoundingClientRect();
  let obsRect = obstacle.getBoundingClientRect();
  if (
    dinoRect.right > obsRect.left &&
    dinoRect.left < obsRect.right &&
    dinoRect.bottom > obsRect.top
  ) {
    isGameOver = true;
    statusText.innerText = "Game Over!";
    statusText.style.color = "red";
    scoreText.style.color = "red";
  }
  if (!isGameOver) {
    requestAnimationFrame(gameLoop);
  }
}

requestAnimationFrame(gameLoop);
