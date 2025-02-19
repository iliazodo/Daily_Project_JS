// Quote generator
//-------------------------------------------------------------------
const apiUrl = 'https://api.api-ninjas.com/v1/quotes';
// !!!Important: make sure you get your api key from https://www.api-ninjas.com/profile
// !!!Important: set your api key on below variable value
const apiKey = '!!!paste your apikey here!!!';
// DOM refrences
const mainApp = document.querySelector('.app');
// Api call
async function generateQuote(){
    try{
    const response = await fetch(apiUrl, { method: 'GET', headers: {'X-Api-Key': apiKey}});
    const data = await response.json();
    displayQuote(data[0]);
    } catch(error){
        console.error(error);
        window.alert(error);
    }
}
// Displaying quote
function displayQuote(data){
    mainApp.innerHTML = '';
    // Create elements
    const category = document.createElement('p');
    const quote = document.createElement('p');
    const author = document.createElement('p');
    // Adding class
    category.classList.add('app-category');
    quote.classList.add('app-quote');
    author.classList.add('app-author');
    // Setting values
    category.textContent = `Category: ${data.category}`;
    quote.textContent = data.quote;
    author.textContent = `by ${data.author}`;
    // Displaying elements
    mainApp.appendChild(category);
    mainApp.appendChild(quote);
    mainApp.appendChild(author);
}