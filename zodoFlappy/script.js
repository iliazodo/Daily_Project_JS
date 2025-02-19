const gameBoard = document.getElementById('myCanvas');
const ctx = gameBoard.getContext('2d');

// Game variables
let game = {
    width: 400 , 
    height: 700
}
gameBoard.width = game.width;
gameBoard.height = game.height;
// Character
let character = {
    x: game.width / 7,
    y: game.height /2.1,
    width: 40,
    height: 40
}
let characterImg = new Image();
characterImg.src = './assets/character.png';
// Obsatcles
let obstacleArray =[];
let obstacle = {
    x: gameBoard.width,
    y: 0,
    width: 80,
    height: 640
}
const bottomObstacleImg = new Image();
bottomObstacleImg.src ='./assets/bottomPipe.png';
const topObstacleImg = new Image();
topObstacleImg.src ='./assets/topPipe.png';
// Game physics
let characterVelocity = 0;
let gravity = .15;
const obstacleVelocity = -2;
// Game sounds
let boostSound = new Audio('./assets/rocket-sound.mp3');
boostSound.volume = 0.1;
let boostSoundLoop = new Audio('./assets/full-rocket-sound.mp3');
boostSoundLoop.loop = true;
boostSoundLoop.volume = 0.1;
let hitSound = new Audio('./assets/sfx_hit.wav');
hitSound.volume = 0.5;
let nightSound = new Audio('./assets/night-city.mp3');
nightSound.loop = true;
// Other variables
let isGameRunning = true;
let isHoldingSpace = false;
let score = 0;
gameStart();

function gameStart(){
    nightSound.play();
    characterImg.onload = function(){
    ctx.drawImage(characterImg,character.x,character.y,character.width,character.height);
    }
    document.addEventListener('keydown',characterBoost);
    document.addEventListener('keyup', resetCharacterImg);
    requestAnimationFrame(update);
    setInterval(makeObstacle, 1900);
}

function update() {
    if(isGameRunning){
      requestAnimationFrame(update);
      ctx.clearRect(0, 0, gameBoard.width, gameBoard.height);

      // Space setting
      if(isHoldingSpace){
        boostSoundLoop.play();
        gravity = 0;
      } else {
        boostSoundLoop.pause();
        boostSoundLoop.currentTime = 0;
        gravity = .15;
      }

      // Apply gravity
      characterVelocity += gravity;

      // Update character position
      character.y = Math.max(character.y + characterVelocity, 0);

      // Draw character
      ctx.drawImage(characterImg, character.x, character.y, character.width, character.height);

      // Draw obstacles
       obstacleArray.forEach(element => {
          element.x += obstacleVelocity;
          ctx.drawImage(element.img , element.x, element.y,element.width,element.height);
          if(detectCollision(character,element) || character.y > gameBoard.height){
              isGameRunning = false;
              hitSound.play();
          }
          if(!element.passed && character.x > element.x + element.width){
            score += .5;
            element.passed = true;
          }
       });
       // Remove obstacle
       if(obstacleArray[0].x + obstacle.width< 0){
        obstacleArray.shift();
       }

       // Draw score
       ctx.fillStyle = '#00ff6e';
       ctx.font = '90px arial';
       ctx.strokeStyle = 'black';
       ctx.lineWidth = 5;
       ctx.strokeText(score,5,80);
       ctx.fillText(score,5,80);


    } else {
        displayGameOver();
        return;
    }
}

function characterBoost(event){
    if(event.code == 'Space' || event.code == 'KeyW' || event.code == 'ArrowUp'){
        if(isGameRunning){
         if(!isHoldingSpace){
             characterImg.src = './assets/characterUp.png';
                isHoldingSpace = true;
         }
         characterVelocity = -3;
         boostSound.play();
      } else {
        window.location.reload();
      }
    }
}
function resetCharacterImg(event){
    if (event.code === 'Space' || event.code === 'KeyW' || event.code === 'ArrowUp') {
        characterImg.src = './assets/character.png';
        isHoldingSpace = false;
    }
}
function makeObstacle(){
    let randomObstacle = obstacle.y - obstacle.height/4 - Math.random() * obstacle.height / 2;
    let openingSpace = gameBoard.height/4;
    let topObstacle = {
        img: topObstacleImg,
        x: obstacle.x,
        y: randomObstacle,
        width: obstacle.width,
        height: obstacle.height,
        passed: false        
    }
    obstacleArray.push(topObstacle);
    let bottomObstacle = {
        img: bottomObstacleImg,
        x: obstacle.x,
        y: randomObstacle + openingSpace + obstacle.height,
        width: obstacle.width,
        height: obstacle.height,
        passed: false
    }
    obstacleArray.push(bottomObstacle);
}
function detectCollision(a,b){
    return  a.x < b.x + b.width && 
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y;       
}

function displayGameOver(){
    ctx.strokeStyle = 'black';
    ctx.font = '50px arial';
    ctx.lineWidth = 5;
    ctx.strokeText('Game Over',gameBoard.width/6,gameBoard.height/2);
    ctx.fillStyle = '00ff6e';
    ctx.font = '50px arial';
    ctx.fillText('Game Over',gameBoard.width/6,gameBoard.height/2);
}