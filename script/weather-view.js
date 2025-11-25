import {fetchLocation} from "../data/weather-api.js"

// Search button functionality
function searchButton() {
    const searchBtn = document.querySelector(".js-search-btn");
    searchBtn.addEventListener('click' , () => {
       const userInput = document.querySelector('.js-search-bar');
       const inputValue = userInput.value;
       const searchString = inputValue;
       if (!searchString) {
        alert('Please enter a city name to search.');
        return;
       };
       fetchLocation(searchString.toLowerCase().trim());
       userInput.value = '';
    });
    
};

searchButton();

