// DOM refrences
const display = document.getElementById('display');
const start = document.getElementById('start');
const reset = document.getElementById('reset');
const stop = document.getElementById('stop');

// App variable
let time = new Date();
let miliSecond = 0;
let second = 0;
let minute = 0;
let hour = 0;
let countInterval = null;

// App process
start.addEventListener('click', startCount);
reset.addEventListener('click', resetCount);
stop.addEventListener('click', stopCount);

function startCount(){
    countInterval = setInterval(count,10);
}

function resetCount(){
    clearInterval(countInterval);
    miliSecond = 0;
    second = 0;
    minute = 0;
    hour = 0;
    displayCounter();
}

function stopCount(){
    clearInterval(countInterval);
}

function count(){
    miliSecond += 1;
    if(miliSecond == 100){
        miliSecond = 0;
        second += 1;
        if(second == 60){
            second = 0;
            minute += 1;
            if(minute == 60){
                hour += 1;
                if(hour == 99){
                    stopCount();
                }
            } 
        }
    }
   displayCounter();
}

function displayCounter(){
    display.textContent = `${hour.toString().padStart(2,'0')}:${minute.toString().padStart(2,'0')}:${second.toString().padStart(2,'0')}:${miliSecond.toString().padStart(2,'0')}`;
}