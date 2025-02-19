// DOM refrences
const card = document.querySelector('.card-container');
const button = document.getElementById('generate');
let key = false;

// App process
button.addEventListener('click',generateCard);

async function generateCard(){
    if(!key){
        card.style.display = 'block';
    }
    card.innerHTML = '';
    characterNum = randomCharacterNumber();
    try{
        let response = (await fetch(`https://rickandmortyapi.com/api/character/${characterNum}`));
        let data = await response.json();
        displayCard(data);
    } catch(e){
        console.log(e);
    }
}

function randomCharacterNumber(){
    return Math.ceil(Math.random() * 826);
}

function displayCard(data){

    const image = document.createElement('img');
    const name = document.createElement('p');
    const gender = document.createElement('p');
    const status = document.createElement('p');
    const species = document.createElement('p');
    const location = document.createElement('p');

    image.src = data.image;
    name.textContent = data.name;
    gender.textContent = 'Gender: ' + data.gender;
    status.textContent = 'status: ' + data.status;
    species.textContent = 'species: ' + data.species;
    location.textContent = 'location: ' + data.location.name;

    image.classList.add('card-image');
    name.classList.add('card-name');
    gender.classList.add('card-gender');
    status.classList.add('card-status');
    species.classList.add('card-species');
    location.classList.add('card-location');

    card.appendChild(image);
    card.appendChild(name);
    card.appendChild(gender);
    card.appendChild(status);
    card.appendChild(species);
    card.appendChild(location);
}