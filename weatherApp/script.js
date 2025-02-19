// Weather App
//!!!!!!!!!! first get you'r apikey from https://home.openweathermap.org/api_keys and set it with this variable!!!!!!!!!!!!
const apiKey = 'YOUR API KEY';
// DOM refrences
const input = document.getElementById('app-input');
const container = document.querySelector('.app-container');
const mainApp = document.querySelector('.app-container');
// JS variables
let lat;
let lon;
// API call
async function getWeather(){

    if(input.value === ''){
        window.alert('Please enter the city name');
    } else {

        const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${input.value}&appid=${apiKey}`;
        try{
        await fetch(geoUrl)
                .then(response => response.json())
                .then(data =>{
                    lat = data[0].lat;
                    lon = data[0].lon;
                });
            }catch(error){
                console.error(error);
                window.alert(error);
            }
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
        try{
        await fetch(weatherUrl)
            .then(Response => Response.json())
            .then(data =>{
                displayWeather(data);
            })
            }catch(error){
                console.error(error);
                window.alert(error);      
            }
    }
}

function displayWeather(data){
    // Reseting
    container.innerHTML = '';
    // Creating elements for container div
    const cityName = document.createElement('p');
    const cityIcon = document.createElement('img');
    const cityTemp = document.createElement('p');
    const cityDesc = document.createElement('p');
    // Setting elements contents
    cityName.textContent = data.name;
    cityIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    cityTemp.textContent = ((data.main.temp - 273) * 1.8 + 32 ).toFixed(1) + '°F';
    cityDesc.textContent = data.weather[0].description;
    // Setting elements id
    cityName.id = 'city-name';
    cityIcon.id = 'city-icon';
    cityTemp.id = 'city-temp';
    cityDesc.id = 'city-desc';
    // Displaying elements
    mainApp.appendChild(cityName);
    mainApp.appendChild(cityIcon);
    mainApp.appendChild(cityTemp);
    mainApp.appendChild(cityDesc);
}