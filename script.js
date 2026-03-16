// script.js

// Music
const bgMusic = document.getElementById("bgMusic");
const defeatMusic = document.getElementById("defeatMusic");
const victoryMusic = document.getElementById("victoryMusic");

// Start background music when page loads
window.onload = () => {
    bgMusic.play();
};

// Player
const player = document.getElementById("player");
let playerX = 275;
let playerY = 175;
const playerSpeed = 10;

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") playerY -= playerSpeed;
    if (e.key === "ArrowDown") playerY += playerSpeed;
    if (e.key === "ArrowLeft") playerX -= playerSpeed;
    if (e.key === "ArrowRight") playerX += playerSpeed;

    if (playerX < 0) playerX = 0;
    if (playerY < 0) playerY = 0;
    if (playerX > 550) playerX = 550;
    if (playerY > 350) playerY = 350;

    player.style.left = playerX + "px";
    player.style.top = playerY + "px";
});

// Threats
const threat1 = document.getElementById("threat1");
const threat2 = document.getElementById("threat2");

// Move threats randomly
function moveThreat(threat) {
    const x = Math.floor(Math.random() * 550);
    const y = Math.floor(Math.random() * 350);
    threat.style.left = x + "px";
    threat.style.top = y + "px";
}

setInterval(() => {
    moveThreat(threat1);
    moveThreat(threat2);
}, 1000);

// Collision detection
const message = document.getElementById("message");

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

setInterval(() => {
    if (checkCollision(threat1) || checkCollision(threat2)) {
        message.textContent = "Game Over!";
        bgMusic.pause();
        defeatMusic.play();
    }
}, 100);
