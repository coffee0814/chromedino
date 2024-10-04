const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
let isJumping = false;
let gravity = 0.9;
let dinoPosition = 0;

document.addEventListener("keydown", function(event) {
    if (event.key === " " || event.key === "ArrowUp") {
        if (!isJumping) {
            jump();
        }
    }
});

function jump() {
    let upInterval = setInterval(() => {
        if (dinoPosition >= 150) {
            clearInterval(upInterval);
            // 落下
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

function moveCactus() {
    let cactusPosition = 1000;
    let interval = setInterval(() => {
        cactusPosition -= 10;
        cactus.style.right = cactusPosition + "px";

        // 恐竜とサボテンの衝突判定
        if (cactusPosition > 0 && cactusPosition < 60 && dinoPosition <= 40) {
            clearInterval(interval);
            alert("Game Over!");
            location.reload();
        }
    }, 20);
}

moveCactus();

