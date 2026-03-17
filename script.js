// ===== ELEMENTS =====
const player = document.getElementById("player");
const threat1 = document.getElementById("threat1");
const threat2 = document.getElementById("threat2");

const bgMusic = document.getElementById("bgMusic");
const defeatMusic = document.getElementById("defeatMusic");
const victoryMusic = document.getElementById("victoryMusic");

const scoreDisplay = document.getElementById("score");
const message = document.getElementById("message");
const restartBtn = document.getElementById("restartBtn");

// ===== GAME STATE =====
let gameOver = false;
let score = 0;

// PLAYER
let playerX = 275;
let playerY = 175;
const playerSpeed = 5;

// THREATS
let t1 = { x: 50, y: 50, speed: 2 };
let t2 = { x: 500, y: 300, speed: 3 };

// ===== UPDATE POSITIONS =====
function updatePositions() {
    player.style.left = playerX + "px";
    player.style.top = playerY + "px";

    threat1.style.left = t1.x + "px";
    threat1.style.top = t1.y + "px";

    threat2.style.left = t2.x + "px";
    threat2.style.top = t2.y + "px";
}

updatePositions();

// ===== CONTROLS =====
let moving = false;

document.addEventListener("keydown", (e) => {
    if (gameOver) return;

    moving = true;
    player.classList.add("moving");

    if (e.key === "ArrowUp") playerY -= playerSpeed;
    if (e.key === "ArrowDown") playerY += playerSpeed;
    if (e.key === "ArrowLeft") playerX -= playerSpeed;
    if (e.key === "ArrowRight") playerX += playerSpeed;

    playerX = Math.max(0, Math.min(550, playerX));
    playerY = Math.max(0, Math.min(350, playerY));
});

document.addEventListener("keyup", () => {
    moving = false;
    player.classList.remove("moving");
});

// ===== ENEMY AI =====
function moveThreats() {
    // Threat 1 (direct chase)
    if (playerX > t1.x) t1.x += t1.speed;
    if (playerX < t1.x) t1.x -= t1.speed;
    if (playerY > t1.y) t1.y += t1.speed;
    if (playerY < t1.y) t1.y -= t1.speed;

    // Threat 2 (random chase)
    let offsetX = (Math.random() - 0.5) * 20;
    let offsetY = (Math.random() - 0.5) * 20;

    t2.x += (playerX + offsetX > t2.x) ? t2.speed : -t2.speed;
    t2.y += (playerY + offsetY > t2.y) ? t2.speed : -t2.speed;

    // bounds
    t1.x = Math.max(0, Math.min(550, t1.x));
    t1.y = Math.max(0, Math.min(350, t1.y));

    t2.x = Math.max(0, Math.min(550, t2.x));
    t2.y = Math.max(0, Math.min(350, t2.y));
}

// ===== COLLISION =====
function isColliding(a, b) {
    return !(
        a.x + 50 < b.x ||
        a.x > b.x + 50 ||
        a.y + 50 < b.y ||
        a.y > b.y + 50
    );
}

// ===== GAME LOOP =====
function gameLoop() {
    if (!gameOver) {
        moveThreats();

        if (
            isColliding({ x: playerX, y: playerY }, t1) ||
            isColliding({ x: playerX, y: playerY }, t2)
        ) {
            gameOver = true;
            message.textContent = "Game Over!";
            bgMusic.pause();
            defeatMusic.play();
        }

        updatePositions();
    }

    requestAnimationFrame(gameLoop);
}

gameLoop();

// ===== SCORE =====
setInterval(() => {
    if (!gameOver) {
        score++;
        scoreDisplay.textContent = score;

        if (score >= 30) {
            gameOver = true;
            message.textContent = "You Win!";
            bgMusic.pause();
            victoryMusic.play();
        }
    }
}, 1000);

// ===== MUSIC =====
window.onload = () => {
    bgMusic.play().catch(() => {
        console.log("Click screen to enable music");
    });
};

// ===== RESTART =====
restartBtn.addEventListener("click", () => {
    playerX = 275;
    playerY = 175;

    t1 = { x: 50, y: 50, speed: 2 };
    t2 = { x: 500, y: 300, speed: 3 };

    score = 0;
    gameOver = false;

    message.textContent = "";
    scoreDisplay.textContent = 0;

    defeatMusic.pause();
    defeatMusic.currentTime = 0;
    victoryMusic.pause();
    victoryMusic.currentTime = 0;

    bgMusic.currentTime = 0;
    bgMusic.play();

    updatePositions();
});
