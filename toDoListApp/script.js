// To Do List app
// DOM References
const form = document.getElementById('app-form');
const input = document.getElementById('app-input');
const display = document.querySelector('.app-display');
// JS Variables
let texts = JSON.parse(localStorage.getItem('zdm-todolist')) || [];
// Initialize Display
displayTexts();

// Adding Input Value to Array on Form Submission
form.addEventListener('submit', (event) => {
    event.preventDefault();
    try {
        const trimmedValue = input.value.trim();
        if (trimmedValue === '') {
            window.alert('Input is empty!');
        } else {
            texts.push(trimmedValue);
            localStorage.setItem('zdm-todolist', JSON.stringify(texts));
            input.value = '';
        }
    } catch (error) {
        console.error(error);
        window.alert('An error occurred! Check the console for details.');
    }
    displayTexts();
});

// Function to Display To-Do List Items
function displayTexts() {
    display.innerHTML = ''; 
    texts = JSON.parse(localStorage.getItem('zdm-todolist')) || [];
    texts.forEach((text, index) => {

        // Create a container for each list item
        const container = document.createElement('div');
        container.classList.add('item-container');
        container.id = `div-${index}`;

        // Create the label
        const label = document.createElement('label');
        label.htmlFor = `item-${index}`;
        label.classList.add('app-texts')
        label.textContent = text;
        container.appendChild(label);

        // Create the checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `item-${index}`;
        checkbox.classList.add('app-checkboxes');
        checkbox.dataset.index = index;
        container.appendChild(checkbox);

        // Append to the display area
        display.appendChild(container);

        // Add an event listener to the checkbox
        checkbox.addEventListener('change', handleCheckboxChange);

    });

    // Scroll to the newest task
    const newestTask = display.lastElementChild;
    if (newestTask) {
        newestTask.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
}

// Event Handler for Checkbox Change
function handleCheckboxChange(event) {
    const checkbox = event.target;
    if (checkbox.checked) {
        const index = parseInt(checkbox.dataset.index, 10);
        document.getElementById(`div-${index}`).style.animation = 'vanish 2s';
        // Remove item from the array
        texts.splice(index , 1); 
        // Update local storage
        localStorage.setItem('zdm-todolist', JSON.stringify(texts)); 
        // Re-render the list
       setTimeout(displayTexts , 1700); 
    }
}
