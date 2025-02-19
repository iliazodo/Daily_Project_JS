// DOM refrences
const board = document.getElementById('myCanvas');
const ctx = board.getContext('2d');

// Board
board.width = 450;
board.height = 800;

// Musics
let mainSong = new Audio('./assets/mainSong.mp3');
let boss1Song = new Audio('./assets/boss1Song.mp3');
let boss2Song = new Audio('./assets/boss2Song.mp3');
mainSong.loop = true;
boss1Song.loop = true;
boss2Song.loop = true;

// Rocket
const rocketWidth = 30;
const rocketHeight = 45;
let rocket = {
    x: board.width/2 - rocketWidth/2,
    y: board.height * 8/10,
    width:rocketWidth,
    height:rocketHeight,
}
let rocketImg = new Image();
rocketImg.src = './assets/rocket.png';

// Laser
let laser = {
    x: rocket.x + rocket.width * 2/5,
    y: 0,
    width: rocket.width/5,
    height: rocket.y,
}
let useLaser = false;
let isLaserActive = false;

// Enemy
const enemyWidth = 45;
const enemyHeight =  45;
let enemiesStorage = [];
let enemyImg = new Image();
enemyImg.src = './assets/enemy.png';
let dizzyEnemyImg = new Image();
dizzyEnemyImg.src = './assets/dizzyEnemy.png';
let bigEnemyImg = new Image();
bigEnemyImg.src = './assets/bigEnemy.png';

// Boss1
let boss1Hp = 1500;
let boss1Img = new Image();
boss1Img.src = './assets/boss1.png';
let boss1OnImg = new Image();
boss1OnImg.src = './assets/boss1On.png';
let boss1 = {
    x:board.width * 1/6,
    y:-150,
    width:board.width * 4/6 ,
    height:150,
    img:boss1Img,
}

// Boss2
let boss2Hp = 2000;
let boss2Img = new Image();
boss2Img.src = './assets/boss2.png';
let boss2OnImg = new Image();
boss2OnImg.src = './assets/boss2On.png';
let boss2 = {
    x:0,
    y:-board.height/5 - 20,
    width:board.width,
    height:board.height / 5,
    img: boss2Img,
}

// Game physics
let rocketVelocity = 0;
let enemyVelocity = 20;

// Game staffs
let score = 0;
let gameOver = false;
let currentLevel = 0;
let level1 = false;
let level2 = false;
let level3 = false;
let level4 = false;
let level5 = false;
let enemyInterval1 = null;
let enemyInterval2 = null;
let enemyInterval3 = null;
let enemyInterval4 = null;
let enemyInterval5 = null;
let enemyInterval6 = null;
let key3 = false;

// Game settings
window.onload = function(){
    
    // Draw rocket
    rocket.onload = function(){
        ctx.drawImage(rocketImg,rocket.x,rocket.y,rocket.width,rocket.height);
    }

    mainSong.play();

    // Key down event
    document.addEventListener('keydown',moveRocket);
    document.addEventListener('keyup', (event) => {
        if ((event.code === 'ArrowLeft' || event.code === 'KeyA') && rocketVelocity < 0) {
            rocketVelocity = 0;
        }
        if ((event.code === 'ArrowRight' || event.code === 'KeyD') && rocketVelocity > 0) {
            rocketVelocity = 0;
        }
        if (event.code == 'ArrowUp' || event.code == 'KeyW'){
            useLaser = false;
        }
    });
    

    requestAnimationFrame(gameUpdate);
    enemyInterval1 = setInterval(createEnemies1,1000);
}

function gameUpdate(){
    // Check game over
    if(gameOver){
        displayGameOver();
        return;
    }

    ctx.clearRect(0,0,board.width,board.height);
    requestAnimationFrame(gameUpdate);

    // Draw rocket
    rocket.x += rocketVelocity;
    rocket.x = Math.max(Math.min(rocket.x , board.width - rocket.width), 0);
    ctx.drawImage(rocketImg,rocket.x,rocket.y,rocket.width,rocket.height);

    // Message if lazer is active
    if(isLaserActive){
        ctx.fillStyle = 'red';
        ctx.font = '20px arial';
        ctx.fillText('Laser Activated!!!',board.width - 300,board.height - 10);
    }

    // Draw Lazer
    if(useLaser){
    laser.x = rocket.x + rocket.width * 2/5;
        ctx.fillStyle = 'red';
        ctx.fillRect(laser.x,laser.y,laser.width,laser.height);
    }

    // Draw enemies
    if(enemiesStorage){
        enemiesStorage.forEach((element , index) => {
            if(element.dizzy){
                let randomNum = Math.round(Math.random() + 1);
                if(randomNum == 1){
                    element.x -= 5;
                }
                if(randomNum == 2){
                    element.x += 5;
                } 
            }
            ctx.drawImage(element.img,element.x,element.y,element.width,element.height);
            element.y += enemyVelocity;
            if(checkCollision(rocket,element)){
                gameOver = true;
            }
        });
    }

    if(key3){
        
    }

    // Draw boss1
    if(currentLevel == 2){
        if(boss1.y < 0){
        boss1.y += 3;
        }
        if(checkCollision(laser,boss1) && useLaser){
            boss1Hp -= 1;
            boss1.img = boss1OnImg;
        } else {
            boss1.img = boss1Img;
        }
        ctx.drawImage(boss1.img,boss1.x,boss1.y,boss1.width,boss1.height);
        if(boss1Hp < 0){
            currentLevel = 3;
            score += 20;
        }
    }

    // Draw boss2
    if(currentLevel == 4){
        if(boss2.y < 0){
            boss2.y += 3;
        }
        if(checkCollision(laser,boss2) && useLaser){
            boss2Hp -= 1;
            boss2.img = boss2OnImg;
        } else {
            boss2.img = boss2Img;
        }
        ctx.drawImage(boss2.img,boss2.x,boss2.y,boss2.width,boss2.height);
        if(boss2Hp < 0){
            currentLevel = 5;
            score += 25;
        }
    }

    // Draw score
    ctx.fillStyle = 'green';
    ctx.font = '15px arial';
    ctx.fillText(`score: ${score}`,5,15);

    // Draw level
    ctx.fillStyle = 'white';
    ctx.font = '30px arial';
    ctx.fillText(`Level ${currentLevel}`,180,30);

    // Remove enemy
    try{
    if(enemiesStorage[0].y > board.height){
        enemiesStorage.shift();
        if(currentLevel != 2 && currentLevel !=4){
        score += 1;
        }
    }
    }catch(error){
        
    }
    
    // Leveling
    switch(true){
        case score >= 100 :
            currentLevel = 5;
            break;
        case score >= 75 :
            currentLevel = 4;
            break;
        case score >= 55 :
            currentLevel = 3;
            break;
        case score >= 35 :
            currentLevel = 2;
            break;
        case score >= 15 :
            currentLevel = 1;
            break;
    }

    if(currentLevel == 1 && !level1){
        enemyVelocity = 10;
        clearInterval(enemyInterval1);
        enemiesStorage = [];
        enemyInterval2 = setInterval(createEnemies2,500);
        level1 = true;
    }

    if(currentLevel == 2 && !level2){
        clearInterval(enemyInterval2);
        setTimeout(enemyInterval3 = setInterval(createEnemies3,1000),4000);
        isLaserActive = true;
        enemiesStorage = [];
        mainSong.pause();
        boss1Song.play();
        level2 = true;
    }

    if(currentLevel == 3 && !level3){
        clearInterval(enemyInterval3);
        enemyInterval4 = setInterval(createEnemies4,800);
        isLaserActive = false;
        enemiesStorage = [];
        boss1Song.pause();
        mainSong.play();
        level3 = true;
    }

    if(currentLevel == 4 && !level4){
        clearInterval(enemyInterval4);
        setTimeout(enemyInterval5 = setInterval(createEnemies5,1000),6000)
        isLaserActive = true;
        enemiesStorage = [];
        mainSong.pause();
        boss2Song.play();
        level4 = true;
    }

    if(currentLevel == 5 && !level5){
        clearInterval(enemyInterval5);
        enemyVelocity = 30;
        enemyInterval6 = setInterval(createEnemies1,1000);
        isLaserActive = false;
        enemiesStorage = [];
        boss2Song.pause();
        mainSong.play();
        level5 = true;
    }
}

function moveRocket(event){
    if(gameOver){
        window.location.reload();
    }
    if(event.code == 'ArrowLeft' || event.code == 'KeyA'){
        rocketVelocity = -15;
    } else if(event.code == 'ArrowRight' || event.code == 'KeyD'){
        rocketVelocity = 15;
    } else if ((event.code == 'ArrowUp' || event.code == 'KeyW') && isLaserActive){
        useLaser = true;
    }
}

function createEnemies1(){
    let randomNum = Math.round((Math.random() * (board.width - 50)) / 50) * 50;

    let enemy = {
        x: randomNum,
        y: -50,
        width: enemyWidth,
        height: enemyHeight,
        img: enemyImg
    }

    enemiesStorage.push(enemy);
}

function createEnemies2(){
    
    let randomNum1 = Math.round((Math.random() * (board.width - 50)) / 50) * 50;
    let randomNum2 = Math.round((Math.random() * (board.width - 50)) / 50) * 50;

    if(randomNum1 != randomNum2){
    let enemy = {
        x: randomNum1,
        y: -50,
        width: enemyWidth,
        height: enemyHeight,
        img: enemyImg,
    }

    enemiesStorage.push(enemy);
    
    let enemy1 = {
        x: randomNum2,
        y: -50,
        width: enemyWidth,
        height: enemyHeight,
        img: enemyImg,
    }

    enemiesStorage.push(enemy1);  
    } else {
        createEnemies2();
    }  
}

function createEnemies3(){
    let randomNum = Math.round((((Math.random() * (board.width * 3/6)) + (boss1.x))) / 50) * 50;

    let enemy = {
        x: randomNum,
        y: boss1.y - 10,
        width: enemyWidth,
        height: enemyHeight,
        dizzy : true,
        img: dizzyEnemyImg,
    }

    enemiesStorage.push(enemy);
}

function createEnemies4(){
    let randomNum = Math.round((Math.random() * (board.width - 150)) / 150) * 150;

    let enemy = {
        x: randomNum,
        y: -400,
        width: 150,
        height: enemyHeight * 7,
        img: bigEnemyImg,
    }

    enemiesStorage.push(enemy);
}

function createEnemies5(){

    let randomAttack = Math.ceil(Math.random() * 6);

    if(randomAttack == 1 || randomAttack == 2 ){
        let randomNum1 = Math.round((Math.random() * (board.width - 50)) / 50) * 50;
        let randomNum2 = Math.round((Math.random() * (board.width - 50)) / 50) * 50;
        let randomNum3 = Math.round((Math.random() * (board.width - 50)) / 50) * 50;
    
        if(randomNum1 != randomNum2 && randomNum1 != randomNum3 && randomNum2 != randomNum3){
        let enemy = {
            x: randomNum1,
            y: -50,
            width: enemyWidth,
            height: enemyHeight,
            dizzy:true,
            img: dizzyEnemyImg,
        }
    
        enemiesStorage.push(enemy);
        
        let enemy1 = {
            x: randomNum2,
            y: -50,
            width: enemyWidth,
            height: enemyHeight,
            dizzy:true,
            img: dizzyEnemyImg,
        }
    
        enemiesStorage.push(enemy1);  

        let enemy2 = {
            x: randomNum3,
            y: -50,
            width: enemyWidth,
            height: enemyHeight,
            dizzy:true,
            img: dizzyEnemyImg,
        }
    
        enemiesStorage.push(enemy2);
        } else {
            createEnemies5();
        }  
    } else if(randomAttack == 3){

        createEnemies2();

    }  else if(randomAttack == 4 || randomAttack == 5 || randomAttack == 6){
        
        let randomNum1 = Math.round((Math.random() * (board.width - 150)) / 150) * 150;
        let randomNum2 = Math.round((Math.random() * (board.width - 150)) / 150) * 150;
    
        if(randomNum1 != randomNum2){
            let enemy1 = {
                x: randomNum1,
                y: -400,
                width: 150,
                height: enemyHeight * 7,
                img: bigEnemyImg,
            }
        
            enemiesStorage.push(enemy1);
        
            let enemy2 = {
                x: randomNum2,
                y: -400,
                width: 150,
                height: enemyHeight * 7,
                img: bigEnemyImg,
            }
        
            enemiesStorage.push(enemy2);
        } else {
            createEnemies5();
        }  
    }

}

function checkCollision(a,b){
    return  a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y;
}

function displayGameOver(){
    ctx.fillStyle = 'red';
    ctx.font = '50px arial';
    ctx.fillText('Game Over',board.width/5,board.height/2);
}