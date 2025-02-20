// Digital clock app

const clock = document.getElementById('clock');

window.onload = function(){
    setInterval(displayClock,1000);
}

function displayClock(){
    let time = new Date();
    let second = time.getSeconds().toString().padStart('0',2);
    let minute = time.getMinutes().toString().padStart('0',2);
    let hour = time.getHours().toString().padStart('0',2);
    let meridiem = hour >= 12 ? 'PM' : 'AM';
    hour = hour > 12 ? hour - 12 : hour;
    clock.textContent = `${hour}:${minute}:${second} ${meridiem}`;
}

displayClock();