// script.js

// ===== Music =====
const bgMusic = document.getElementById("bgMusic");
const defeatMusic = document.getElementById("defeatMusic");
const victoryMusic = document.getElementById("victoryMusic");

// Start background music automatically when page loads
window.onload = () => {
    bgMusic.play();
};

// ===== Player =====
const player = document.getElementById("player");
let playerX = 275;      // initial X position
let playerY = 175;      // initial Y position
const playerSpeed = 10; // pixels per move

document.addEventListener("keydown", (e) => {
    if (!gameOver) {
        if (e.key === "ArrowUp") playerY -= playerSpeed;
        if (e.key === "ArrowDown") playerY += playerSpeed;
        if (e.key === "ArrowLeft") playerX -= playerSpeed;
        if (e.key === "ArrowRight") playerX += playerSpeed;

        // Keep player inside game area
        if (playerX < 0) playerX = 0;
        if (playerY < 0) playerY = 0;
        if (playerX > 550) playerX = 550; // 600px game area - 50px player
        if (playerY > 350) playerY = 350; // 400px game area - 50px player

        player.style.left = playerX + "px";
        player.style.top = playerY + "px";
    }
});

// ===== Threats =====
const threat1 = document.getElementById("threat1");
const threat2 = document.getElementById("threat2");
const threatSpeed = 2; // pixels per move

// Threats chase player
function chasePlayer(threat) {
    let threatX = parseInt(threat.style.left);
    let threatY = parseInt(threat.style.top);

    if (playerX > threatX) threatX += threatSpeed;
    if (playerX < threatX) threatX -= threatSpeed;
    if (playerY > threatY) threatY += threatSpeed;
    if (playerY < threatY) threatY -= threatSpeed;

    // Keep threats inside game area
    if (threatX < 0) threatX = 0;
    if (threatY < 0) threatY = 0;
    if (threatX > 550) threatX = 550;
    if (threatY > 350) threatY = 350;

    threat.style.left = threatX + "px";
    threat.style.top = threatY + "px";
}

// Update threats every 50ms for smooth chasing
setInterval(() => {
    if (!gameOver) {
        chasePlayer(threat1);
        chasePlayer(threat2);
    }
}, 50);

// ===== Collision Detection =====
const message = document.getElementById("message");
let gameOver = false;

function checkCollision(threat) {
    const threatRect = threat.getBoundingClientRect();
    const playerRect = player.getBoundingClientRect();

    return !(
        playerRect.top > threatRect.bottom ||
        playerRect.bottom < threatRect.top ||
        playerRect.left > threatRect.right ||
        playerRect.right < threatRect.left
    );
}

// Check collisions every 100ms
setInterval(() => {
    if (!gameOver && (checkCollision(threat1) || checkCollision(threat2))) {
        message.textContent = "Game Over!";
        gameOver = true;
        bgMusic.pause();
        defeatMusic.play();
    }
}, 100);

// ===== Score / Timer / Victory =====
let score = 0;
const scoreDisplay = document.getElementById("score");

// Increment score every second
const scoreInterval = setInterval(() => {
    if (!gameOver) {
        score++;
        scoreDisplay.textContent = score;

        // Victory condition: survive 30 seconds
        if (score >= 30) {
            message.textContent = "You Win!";
            gameOver = true;
            bgMusic.pause();
            victoryMusic.play();
        }
    }
}, 1000);

// ===== Restart Game =====
const restartBtn = document.getElementById("restartBtn");

restartBtn.addEventListener("click", () => {
    // Reset player position
    playerX = 275;
    playerY = 175;
    player.style.left = playerX + "px";
    player.style.top = playerY + "px";

    // Reset score
    score = 0;
    scoreDisplay.textContent = score;

    // Reset game over flag
    gameOver = false;

    // Clear message
    message.textContent = "";

    // Reset music
    defeatMusic.pause();
    defeatMusic.currentTime = 0;
    victoryMusic.pause();
    victoryMusic.currentTime = 0;
    bgMusic.currentTime = 0;
    bgMusic.play();
});
