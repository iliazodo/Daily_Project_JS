// DOM refrences
const gameG = document.getElementById('game-main');
const timerG = document.getElementById('timer');
const scoreG = document.getElementById('score');
const startBtn = document.getElementById('startBtn');
const endBtn = document.getElementById('endBtn');
// Game variables
let score = 0;
let isGameRunning = false;
let storing = [];
let timer = 50;
// Game settings

startBtn.addEventListener('click', (event)=>{
    isGameRunning = true;
    startBtn.classList.toggle('hide');
    gameStart();
});

function reStart(){
    isGameRunning = true;
    endBtn.style.display = 'none';
    timer = 50;
    score = 0;
    displayScore();
    storing = [];
    gameStart();
}

function gameStart(){
    createHoles();
    drawRandomMole();
    setTimer();
}


function createHoles(){
    for(let i = 0; i <9;i++){
        const hole = document.createElement('div');
        hole.classList.add('holes');
        storing.push(hole);
        gameG.appendChild(hole);
        hole.addEventListener('click',hitMole);
    }
}

function drawRandomMole(){
    const randomNum = Math.floor(Math.random() * 9);
    const mole = storing[randomNum];
    mole.offsetWidth;
    mole.classList.toggle('show');
}

function hitMole(event){
    const mole = event.target;
    if(mole.classList.contains('show')){
        mole.classList.toggle('show');
        score += 1;
        clearHoles();
        drawRandomMole();
    } else {
        const miss = document.createElement('p');
        miss.textContent = 'miss';
        miss.classList.add('miss');
        mole.appendChild(miss);
    }
    displayScore();
}

function clearHoles(){
    storing.forEach(hole =>{
        hole.innerHTML = '';
    });
}

function displayScore(){
    scoreG.textContent = `Score: ${score}`;
}

function setTimer(){
    if(isGameRunning && timer >= 0){
        timerG.textContent = `Time: ${timer}`;
        timer -= 1;
    }
    if(timer == 0){
        theEnd();
    }
}

setInterval(setTimer,1000);

function theEnd(){
    setTimeout(() => {
        gameG.innerHTML = '';
        endBtn.style.display = 'block';
        endBtn.addEventListener('click', reStart);
    }, 1300);
}
