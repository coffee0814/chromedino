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

// ジャンプ機能
function jump() {
    let upInterval = setInterval(() => {
        if (playerPosition >= 150) {
            clearInterval(upInterval);
            // 落下処理
            let downInterval = setInterval(() => {
                if (playerPosition <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                } else {
                    playerPosition -= 5;
                    player.style.bottom = playerPosition + "px";
                }
            }, 20);
        } else {
            // ジャンプ中
            isJumping = true;
            playerPosition += 20;
            player.style.bottom = playerPosition + "px";
        }
    }, 20);
}

// 障害物を動かす
function moveObstacle() {
    let obstaclePosition = 800;  // 右端から生成
    let interval = setInterval(() => {
        if (!isGameOver) {
            obstaclePosition -= 10;  // 障害物を左に移動
            obstacle.style.right = obstaclePosition + "px";  // 障害物の位置を更新

            // 障害物が画面外に出たら再生成
            if (obstaclePosition < -30) {
                obstaclePosition = 800;  // 右端に戻す
            }

            // プレイヤーと障害物の衝突判定
            if (obstaclePosition > 50 && obstaclePosition < 90 && playerPosition <= 40) {
                gameOver(interval);
            }
        }
    }, 20);
}

// ゲームオーバー処理
function gameOver(interval) {
    clearInterval(interval);
    clearInterval(timerInterval);
    isGameOver = true;
    alert(`Game Over! 記録: ${timer}秒`);
    location.reload();
}
