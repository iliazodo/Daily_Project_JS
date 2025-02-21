// DOM refrences
const input = document.getElementById('colorPicker');
const displayHex = document.getElementById('hex');

// App process
input.onchange = function(){
    displayHex.textContent = `Color: ${input.value}`;
}