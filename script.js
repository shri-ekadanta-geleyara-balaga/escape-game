const player=document.getElementById("player");
const threat1=document.getElementById("threat1");
const threat2=document.getElementById("threat2");

const scoreDisplay=document.getElementById("score");
const message=document.getElementById("message");
const restartBtn=document.getElementById("restartBtn");
const startBtn=document.getElementById("startBtn");
const startScreen=document.getElementById("startScreen");

const bgMusic=document.getElementById("bgMusic");
const defeatMusic=document.getElementById("defeatMusic");
const victoryMusic=document.getElementById("victoryMusic");

const gameArea=document.getElementById("gameArea");

let gameRunning=false;
let gameOver=false;
let score=0;

let playerX=window.innerWidth/2;
let playerY=window.innerHeight/2;

let speed=5;

let keys={};

let t1={x:50,y:50,speed:0.7};
let t2={x:window.innerWidth-100,y:window.innerHeight-100,speed:0.9};

/* START GAME */

startBtn.onclick=()=>{
startScreen.style.display="none";
gameRunning=true;
bgMusic.play();
};

/* RESTART */

restartBtn.onclick=()=>{
location.reload();
};

/* KEYBOARD */

document.addEventListener("keydown",e=>{
keys[e.key]=true;
});

document.addEventListener("keyup",e=>{
keys[e.key]=false;
});

/* PLAYER MOVEMENT */

function updatePlayer(){

let moveX=0;
let moveY=0;

if(keys["ArrowUp"])moveY-=1;
if(keys["ArrowDown"])moveY+=1;
if(keys["ArrowLeft"])moveX-=1;
if(keys["ArrowRight"])moveX+=1;

playerX+=moveX*speed;
playerY+=moveY*speed;

playerX=Math.max(0,Math.min(window.innerWidth-50,playerX));
playerY=Math.max(0,Math.min(window.innerHeight-50,playerY));
}

/* ENEMY MOVEMENT */

function moveEnemies(){

t1.x+=(playerX>t1.x?t1.speed:-t1.speed);
t1.y+=(playerY>t1.y?t1.speed:-t1.speed);

let offsetX=(Math.random()-0.5)*20;
let offsetY=(Math.random()-0.5)*20;

t2.x+=(playerX+offsetX>t2.x?t2.speed:-t2.speed);
t2.y+=(playerY+offsetY>t2.y?t2.speed:-t2.speed);
}

/* COLLISION */

function hit(a,b){
return !(
a.x+50<b.x||
a.x>b.x+50||
a.y+50<b.y||
a.y>b.y+50
);
}

/* UPDATE POSITIONS */

function update(){

player.style.left=playerX+"px";
player.style.top=playerY+"px";

threat1.style.left=t1.x+"px";
threat1.style.top=t1.y+"px";

threat2.style.left=t2.x+"px";
threat2.style.top=t2.y+"px";
}

/* GAME LOOP */

function loop(){

if(gameRunning && !gameOver){

updatePlayer();
moveEnemies();

if(hit({x:playerX,y:playerY},t1)||hit({x:playerX,y:playerY},t2)){

gameOver=true;
message.textContent="Game Over!";
restartBtn.style.display="block";

bgMusic.pause();
defeatMusic.play();
}

update();
}

requestAnimationFrame(loop);
}

loop();

/* SCORE SYSTEM */

setInterval(()=>{

if(gameRunning && !gameOver){

score++;
scoreDisplay.textContent=score;

if(score===20){
t1.speed+=0.2;
t2.speed+=0.2;
}

if(score>=40){

gameOver=true;
message.textContent="You Escaped!";
restartBtn.style.display="block";

bgMusic.pause();
victoryMusic.play();
}

}

},1000);
