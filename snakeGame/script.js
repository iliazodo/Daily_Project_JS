// Snake game
// DOM refrences
const myCanvas = document.getElementById('myCanvas');
const ctx = myCanvas.getContext('2d');
const snakeLength = document.getElementById('snakeLength');
const container = document.querySelector('.game-container');
// Game variables
const canvasHeight = myCanvas.height;
const canvasWidth = myCanvas.width;
const canvasBackground = '#cc00ff';
const snakeColor = '#00ff95';
const foodColor = '#ff8000';
const unitSize = 25;
let isGameRunning = false;
let xSpeed = unitSize;
let ySpeed = 0;
let foodX;
let foodY;
let score = 1;
let snake = [{x:0 , y:0}]
// Game settings
window.addEventListener('keydown', changeDirection);

gameStart();


function gameStart(){
    isGameRunning = true;
    createFood();
    drawFood();
    nextTick();
}
function nextTick(){
    if(isGameRunning){
        setTimeout(() => {
            clearCanvas();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        }, 100);
    } else{
        displayGameOver();
    }
}
function clearCanvas(){
    ctx.fillStyle = canvasBackground;
    ctx.fillRect(0 , 0 , canvasWidth , canvasHeight);
}
function createFood(){
    function randomFood(min,max){
        return Math.round((Math.random() * (max-min) + min) / unitSize) * unitSize;
    }
    foodX = randomFood(0 , canvasWidth - unitSize);
    foodY = randomFood(0 , canvasHeight - unitSize);
    snake.forEach(snakePart => {
        if(snakePart.x == foodX && snakePart.y == foodY){
            createFood();
        }
    });
}
function drawFood(){
    ctx.fillStyle = foodColor;
    ctx.fillRect(foodX , foodY , unitSize , unitSize)
}
function moveSnake(){
    const head = {x: snake[0].x + xSpeed , y: snake[0].y + ySpeed};
    snake.unshift(head);
    if(snake[0].x == foodX && snake[0].y == foodY){
        score += 1;
        snakeLength.textContent = `snake length: ${score}`;
        createFood();
    } else {
        snake.pop();
    }
}
function drawSnake(){
    ctx.fillStyle = snakeColor;
    ctx.strokeStyle = 'black';
    snake.forEach(snakePart => {
        ctx.fillRect(snakePart.x , snakePart.y , unitSize , unitSize);
        ctx.strokeRect(snakePart.x , snakePart.y , unitSize , unitSize);
    });
}
function changeDirection(event){
    const keyPressed = event.keyCode;
    const up = 38;
    const down = 40;
    const left = 37;
    const right = 39;

    switch(true){
        case(keyPressed == left && xSpeed != unitSize):
            xSpeed = -unitSize;
            ySpeed = 0;
            break;
        case(keyPressed == right && xSpeed != -unitSize):
            xSpeed = unitSize;
            ySpeed = 0;
            break;
        case(keyPressed == up && ySpeed != unitSize):
            xSpeed = 0;
            ySpeed = -unitSize;
            break;
        case(keyPressed == down && ySpeed != -unitSize):
            xSpeed = 0;
            ySpeed = unitSize;
            break;
    }
}
function checkGameOver(){
    switch(true){
        case(snake[0].x < 0):
            isGameRunning = false;
            break;
        case(snake[0].x >= canvasWidth):
            isGameRunning = false;
            break;
        case(snake[0].y < 0):
            isGameRunning = false;
            break;
        case(snake[0].y >= canvasHeight):
            isGameRunning = false;
            break;
    }
    for(let i=1;i < snake.length;i++){
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y){
            isGameRunning = false;
        }
    }
}
function displayGameOver(){
    ctx.font = '50px arial';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.fillText('Game Over' , canvasWidth /2 , canvasHeight / 2);
    displayPlayAgain();
}
function displayPlayAgain(){
    const button = document.createElement('button');
    button.textContent = 'Play Again';
    button.classList.add('play-again');
    container.appendChild(button);
    button.addEventListener('click',resetGame);
}
function resetGame(){
   location.reload();
}