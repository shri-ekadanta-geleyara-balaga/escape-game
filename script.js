const player = document.getElementById("player");
const threat1 = document.getElementById("threat1");
const threat2 = document.getElementById("threat2");

const scoreDisplay = document.getElementById("score");
const message = document.getElementById("message");
const restartBtn = document.getElementById("restartBtn");

const bgMusic = document.getElementById("bgMusic");
const defeatMusic = document.getElementById("defeatMusic");
const victoryMusic = document.getElementById("victoryMusic");

const gameArea = document.getElementById("gameArea");

let gameOver=false;
let score=0;

let playerX=gameArea.clientWidth/2;
let playerY=gameArea.clientHeight/2;

let speed=8;

let keys={};

let t1={x:50,y:50,speed:0.7};
let t2={x:gameArea.clientWidth-100,y:gameArea.clientHeight-100,speed:0.9};

document.addEventListener("keydown",e=>{
    keys[e.key]=true;
});

document.addEventListener("keyup",e=>{
    keys[e.key]=false;
});

function updatePlayer(){

    let moveX=0;
    let moveY=0;

    if(keys["ArrowUp"])moveY=-1;
    if(keys["ArrowDown"])moveY=1;
    if(keys["ArrowLeft"])moveX=-1;
    if(keys["ArrowRight"])moveX=1;

    playerX+=moveX*speed;
    playerY+=moveY*speed;

    playerX=Math.max(0,Math.min(gameArea.clientWidth-50,playerX));
    playerY=Math.max(0,Math.min(gameArea.clientHeight-50,playerY));
}

function moveEnemies(){

    t1.x+=(playerX>t1.x?t1.speed:-t1.speed);
    t1.y+=(playerY>t1.y?t1.speed:-t1.speed);

    let offsetX=(Math.random()-0.5)*20;
    let offsetY=(Math.random()-0.5)*20;

    t2.x+=(playerX+offsetX>t2.x?t2.speed:-t2.speed);
    t2.y+=(playerY+offsetY>t2.y?t2.speed:-t2.speed);
}

function hit(a,b){
    return !(
        a.x+50<b.x||
        a.x>b.x+50||
        a.y+50<b.y||
        a.y>b.y+50
    );
}

function update(){

    player.style.left=playerX+"px";
    player.style.top=playerY+"px";

    threat1.style.left=t1.x+"px";
    threat1.style.top=t1.y+"px";

    threat2.style.left=t2.x+"px";
    threat2.style.top=t2.y+"px";
}

function loop(){

    if(!gameOver){

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

setInterval(()=>{

    if(!gameOver){

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

window.onload=()=>{
    document.body.addEventListener("click",()=>{
        bgMusic.play();
    },{once:true});
};
