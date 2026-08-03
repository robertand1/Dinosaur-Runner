const gameContainer = document.getElementById("game");
const dino = document.getElementById("dino");
const statusText = document.getElementById("statusText");
const scoreText = document.getElementById("scoreText");
let isGameOver = false;
let gameScore = 0;
let dinoY = 0;
let speedY = 0;
let gravity = 0.6;
let isJumping = false;
let activeObstacles = [];
let obstacleSpeed = 6;
let nextObstacle = 30;
let minSpawnFrequency = 40;
let randomSpawnFrequency = 50;

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
  ++gameScore;
  scoreText.innerText = "Score: " + gameScore;
  obstacleSpeed += 0.1;
}

function spawnObstacle() {
  let obsDiv = document.createElement("div");
  obsDiv.classList.add("obstacle");
  gameContainer.appendChild(obsDiv);
  activeObstacles.push({
    element: obsDiv,
    x: 600,
  });
}

function updateObstacles(obstaclesList) {
  for (let i = obstaclesList.length - 1; i >= 0; --i) {
    let obs = obstaclesList[i];
    obs.x -= obstacleSpeed;
    obs.element.style.left = obs.x + "px";
    if (obs.x < -20) {
      obs.element.remove();
      obstaclesList.splice(i, 1);
      updateScore();
    }
  }
}

function checkCollision(obstaclesList) {
  let dinoRect = dino.getBoundingClientRect();
  for (let i = 0; i < obstaclesList.length; ++i) {
    let obsRect = obstaclesList[i].element.getBoundingClientRect();
    if (
      dinoRect.right > obsRect.left &&
      dinoRect.left < obsRect.right &&
      dinoRect.bottom > obsRect.top
    ) {
      return true;
    }
  }
  return false;
}

function gameOver() {
  isGameOver = true;
  statusText.innerText = "Game Over!";
  statusText.style.color = "red";
  scoreText.style.color = "red";
}

function gameLoop() {
  if (isGameOver) {
    return;
  }
  --nextObstacle;
  if (nextObstacle <= 0) {
    spawnObstacle();
    nextObstacle =
      Math.floor(Math.random() * randomSpawnFrequency) + minSpawnFrequency;
  }
  updateDino();
  updateObstacles(activeObstacles);
  if (checkCollision(activeObstacles)) {
    gameOver();
  }
  if (!isGameOver) {
    requestAnimationFrame(gameLoop);
  }
}

requestAnimationFrame(gameLoop);
