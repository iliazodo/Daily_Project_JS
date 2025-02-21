// DOM refrences
const display = document.querySelector('.output-container');
const input = document.getElementById('input');
const submit = document.getElementById('myForm');
const amount = document.getElementById('amount');
const totalAmount = document.getElementById('totalAmount');

// App variables
let myStorage = [];

// App process
window.onload = function(){
    myStorage = JSON.parse(localStorage.getItem('zdm-expense-tracker')) || [];
    displayExpense();
    evalTotal();
    display.lastElementChild?.scrollIntoView({ behavior: 'smooth' });
}

submit.addEventListener('submit', event =>{
    event.preventDefault();
    if(input.value.trim() != '' && amount.value.trim() != ''){
        let text;
        if(amount.value > 0){
            text = input.value.trim() + ' +$' + Number(amount.value.trim()).toFixed(2);
        } else {
            text = input.value.trim() + ' -$' + Number(-amount.value.trim()).toFixed(2);
        }
        myStorage.push(text);
        localStorage.setItem('zdm-expense-tracker' , JSON.stringify(myStorage));
        displayExpense();
        evalTotal();
        input.value = '';
        amount.value = '';
        display.lastElementChild?.scrollIntoView({ behavior: 'smooth' });
    }
});

function displayExpense(){
    display.innerHTML = '';
    myStorage.forEach(element =>{
        let text = document.createElement('p');
        text.textContent = element;
        text.classList.add('transaction');
        display.appendChild(text);
    });
}

function evalTotal(){
    let total = 0;
    myStorage.forEach(element =>{
        let seprateBySpace = element.split(' ');
        let number = seprateBySpace[seprateBySpace.length - 1].split('$');
        if(number[0] == '-'){
            total -= Number(number[1]);
        } else {
            total += Number(number[1]);
        }

    });
    totalAmount.textContent = 'Total amount: $' + total.toFixed(2);
}