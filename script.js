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

// Function to move a threat to a random position
function moveThreat(threat) {
    const x = Math.floor(Math.random() * 550); // 600 - 50
    const y = Math.floor(Math.random() * 350); // 400 - 50
    threat.style.left = x + "px";
    threat.style.top = y + "px";
}

// Move threats randomly every 1 second
setInterval(() => {
    if (!gameOver) {
        moveThreat(threat1);
        moveThreat(threat2);
    }
}, 1000);

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
