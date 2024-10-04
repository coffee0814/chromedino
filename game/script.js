const player = document.getElementById("player");
const obstacle = document.getElementById("obstacle");
const timerDisplay = document.getElementById("time");
let isGameOver = false;
let timer = 0;
let obstaclePosition = 800;

// ゲームを開始する関数
function startGame() {
    isGameOver = false;
    timer = 0;
    obstaclePosition = 800; 
    updateTimer();
    moveObstacle();
}

// タイマーを更新する関数
function updateTimer() {
    const interval = setInterval(() => {
        if (!isGameOver) {
            timer++;
            timerDisplay.innerText = timer;
        } else {
            clearInterval(interval);
        }
    }, 1000);
}

// 障害物を動かす関数
function moveObstacle() {
    const interval = setInterval(() => {
        if (!isGameOver) {
            obstaclePosition -= 10;  // 障害物を左に移動
            obstacle.style.right = obstaclePosition + "px";  // 障害物の位置を更新

            // 障害物が画面外に出たら再生成
            if (obstaclePosition < -30) {
                obstaclePosition = 800;  // 右端に戻す
            }

            // プレイヤーと障害物の衝突判定
            if (obstaclePosition > 50 && obstaclePosition < 90 && player.style.bottom === '0px') {
                gameOver(interval);
            }
        }
    }, 20);
}

// ゲームオーバー処理
function gameOver(interval) {
    isGameOver = true;
    clearInterval(interval);
    alert(`ゲームオーバー! あなたのタイムは ${timer} 秒です。`);
}

// スペースキーでジャンプ
document.addEventListener("keydown", function(event) {
    if (event.code === "Space" && !isGameOver) {
        jump();
    } else if (event.code === "Enter" && isGameOver) {
        startGame();
    }
});

// ジャンプ処理
function jump() {
    if (player.style.bottom === '0px') {
        player.style.bottom = '100px';  // ジャンプの高さ
        setTimeout(() => {
            player.style.bottom = '0px';  // 地面に戻る
        }, 500);  // ジャンプの時間
    }
}

// ゲーム開始
startGame();
