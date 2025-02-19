// Chatroom app-------------------------------------------------
// DOM refrences
const display = document.querySelector('.display');
const input = document.getElementById('chat-input');
const form = document.getElementById('chat-form');
// Using array as chat saver
let messages = JSON.parse(localStorage.getItem('myArray')) || [];
displayArray();
// Using event for setting input value
form.addEventListener('submit',event => {
    event.preventDefault();
    if(input.value === ''){
        window.alert('Input is empty!');
    } else if (input.value === '!clear'){
        if(confirm("do you want to delete all messages?")){
        localStorage.removeItem("myArray");
        location.reload();
        }
    } else{
        messages.push(input.value);
        localStorage.setItem("myArray" , JSON.stringify(messages));
        input.value = '';
    }
    displayArray();
});
// Displaying messages
function displayArray(){
    // Reset display
    display.innerHTML = '';
    // Read all message and display it
    messages.forEach(element => {
        const message = document.createElement('p');
        message.textContent = element;
        display.append(message);
        message.classList.add('texts');
        // Scrolling to the newest chat
        display.scrollTop = display.scrollHeight;
    });
}