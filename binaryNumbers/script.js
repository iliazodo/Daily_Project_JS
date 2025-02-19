// DOM refrences
const label = document.getElementById('decimal-number');
const buttons = document.querySelectorAll('.app-bit');
// JS variables
let binaryNumber = '';
// Add event to each button
buttons.forEach(button =>{
    button.addEventListener('click', event => {
        button.textContent = button.textContent === '0' ? '1' : '0';
        getBinary();
        updateResult();
    })
});
// Getting binary number
function getBinary(){
    binaryNumber = '';
    buttons.forEach(button => {
        binaryNumber += button.textContent;
    });
}
// Display decimal number
function updateResult(){
    label.textContent = parseInt(Number(binaryNumber) , 2);
}
