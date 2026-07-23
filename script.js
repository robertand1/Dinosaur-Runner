const dino = document.getElementById("dino");
const obstacle = document.getElementById("obstacle");
const statusText = document.getElementById("statusText");
const scoreText = document.getElementById("scoreText");
let isGameOver = false;
let gameScore = 0;

function jump() {
  if (isGameOver || dino.classList.contains("jump")) {
    return;
  }
  dino.classList.add("jump");
  setTimeout(() => {
    dino.classList.remove("jump");
  }, 500);
}

document.addEventListener("keydown", function (event) {
  if (event.code === "Space" || event.code === "ArrowUp") {
    jump();
  }
});

obstacle.addEventListener("animationiteration", () => {
  if (!isGameOver) {
    ++gameScore;
    scoreText.innerText = "Score: " + gameScore;
  }
});

const checkCollision = setInterval(function () {
  let dinoRect = dino.getBoundingClientRect();
  let obsRect = obstacle.getBoundingClientRect();
  if (
    dinoRect.right > obsRect.left &&
    dinoRect.left < obsRect.right &&
    dinoRect.bottom > obsRect.top
  ) {
    isGameOver = true;
    obstacle.style.animationPlayState = "paused";
    dino.style.animationPlayState = "paused";
    statusText.innerText = "Game Over!";
    statusText.style.color = "red";
    scoreText.style.color = "red";
    clearInterval(checkCollision);
  }
}, 10);
