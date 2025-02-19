// DOM refrences
const display = document.getElementById('calc-display');
// JS variables
let result;
let input = '';
// Setting input
function calcInput(char){
    // Resetting input if it had error input
    if(input === 'Error'){
        input = '';
    }
    input += char;
    calcDisplay();
}
// Calcute result
function calcEvaluate(){
    result = eval(input);
    try{
    if(result === Infinity || result === -Infinity || result === NaN){
        input = 'Error';
    } else{
        input = result;
    }
    } catch {
        input = 'Error';
    }
    calcDisplay();
}
// Restting display
function calcReset(){
    input = '';
    calcDisplay();
}
// Display buttons and results
function calcDisplay(){
    display.value = input;
}