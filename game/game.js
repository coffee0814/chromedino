const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const timerDisplay = document.getElementById("timer");

let isJumping = false;
let isGameOver = false;
let gravity = 0.9;
let dinoPosition = 0;
let gameStarted = false;
let timer = 0;
let timerInterval;

// ジャンプ機能
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
    moveCactus();
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
        if (dinoPosition >= 150) {
            clearInterval(upInterval);
            // 恐竜が落下する処理
            let downInterval = setInterval(() => {
                if (dinoPosition <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                } else {
                    dinoPosition -= 5;
                    dino.style.bottom = dinoPosition + "px";
                }
            }, 20);
        } else {
            // ジャンプ中
            isJumping = true;
            dinoPosition += 20;
            dino.style.bottom = dinoPosition + "px";
        }
    }, 20);
}

// サボテンを動かす
// サボテンを動かす
function moveCactus() {
    let cactusPosition = 1000;  // 初期位置を右端に設定
    let interval = setInterval(() => {
        if (!isGameOver) {
            cactusPosition -= 10;  // サボテンを左に移動させる
            cactus.style.right = cactusPosition + "px";  // 数値と"px"を正しく連結

            // サボテンが画面外に出たらリセット
            if (cactusPosition < -20) {  // サボテンが画面外に出たら再生成
                cactusPosition = 1000;   // 再び右端に戻す
            }

            // 恐竜とサボテンの衝突判定
            if (cactusPosition > 0 && cactusPosition < 60 && dinoPosition <= 40) {
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
    alert(`Game Over! あなたの記録: ${timer}秒`);
    location.reload();
}
