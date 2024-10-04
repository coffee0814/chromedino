const player = document.getElementById("player");
const obstacle = document.getElementById("obstacle");
const timerDisplay = document.getElementById("timer");

let isJumping = false;
let isGameOver = false;
let gravity = 0.9;
let playerPosition = 0;
let gameStarted = false;
let timer = 0;
let timerInterval;

// ジャンプ機能とゲーム開始トリガ
document.addEventListener("keydown", function(event) {
    if (!gameStarted && (event.key === " " || event.key === "ArrowUp")) {
        startGame();
    }
    if (gameStarted && !isJumping && (event.key === " " || event.key === "ArrowUp")) {
        jump();
    }
});

// ゲーム開始トリガ
function startGame() {
    gameStarted = true;
    startTimer();
    moveObstacle();
}

// タイマー機能
function startTimer() {
    timer = 0;
    timerInterval = setInterval(() => {
        if (!isGameOver) {
            timer++;
            timerDisplay.textContent = timer;
        }
    }, 1000);
}






// ゲームオーバー処理
function gameOver(interval) {
    clearInterval(interval);
    clearInterval(timerInterval);
    isGameOver = true;
    alert(`Game Over! 記録: ${timer}秒`);
    location.reload();
}
