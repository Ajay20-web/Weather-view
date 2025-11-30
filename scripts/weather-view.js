import {fetchLocation} from "../data/geocoding-api.js";
import {fetchCurrentWeather} from "../data/current-weatherData.js";
import {fetchDailyForecastData} from "../data/daily-forecastData.js";
import './current-weather.js';
// Search button functionality
function searchButton() {
    const searchBtn = document.querySelector(".js-search-btn");
    searchBtn.addEventListener('click' , () => {
       const userInput = document.querySelector('.js-search-bar');
       const inputValue = userInput.value;
       const searchString = inputValue.toLowerCase().trim();
       if (!searchString) {
        alert('Please enter a city name to search.');
        return;
       };
       saveData(searchString);
       fetchLocation();
        fetchCurrentWeather();
       userInput.value = '';
    });
    
};


function saveData(userSearch) {
   localStorage.setItem('userInput',JSON.stringify(userSearch));
};

searchButton();
 

