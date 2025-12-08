import {fetchLocation} from "../data/geocoding-api-data.js";
import {fetchCurrentWeather} from "../data/current-weather-data.js";
import {fetchDailyForecastData} from "../data/daily-forecast-data.js";
import {hourlyForecastData} from "../data/hourly-forecast-data.js";
import {renderCurrentWeather} from "./current-weather.js";
import {renderDailyForecast} from './daily-forecast.js';
import  {renderHourlyForecast , hourlyForecastDataSlice} from"./hourly-forecast.js";

//--Top Level variables for adding event to the select element for the hourly forecast this prevent the multiple event listener adding
let topLevelWeatherData;
let topLevelApiData;

async function loadingAllFiles() {
   try{
      //--Rendering the current weather data--
      const {cityName , latitude, longitude} = await fetchLocation();
      const weatherData = await fetchCurrentWeather(latitude, longitude);
      renderCurrentWeather(cityName,weatherData);
      //--Rendering the daily forecast data--
      const foreCastData = await fetchDailyForecastData(latitude, longitude);
      renderDailyForecast(foreCastData);
      //--Rendering the hourly forecast data--
      const {WeatherDataGrouping , apiData} = await hourlyForecastData(latitude, longitude);
      topLevelWeatherData = WeatherDataGrouping;
      topLevelApiData = apiData;
      renderHourlyForecast(WeatherDataGrouping , apiData);
   document.querySelector('body').classList.remove('loading');
   } catch{
      tryAgain();
   }

};
//--Search button functionality--
function searchButton() {
   const searchBtn = document.querySelector(".js-search-btn");
   searchBtn.addEventListener('click' , () => {
      document.querySelector('body').classList.add('loading');
      const userInput = document.querySelector('.js-search-bar');
      const inputValue = userInput.value;
      const searchString = inputValue.toLowerCase().trim();
      if (!searchString) {
      alert('Please enter a city name to search.');
      return;
      };
      saveData(searchString);
      userInput.value = '';
      loadingAllFiles();
   });
    
};
//--Save the user city into local storage--
function saveData(userSearch) {
   localStorage.setItem('userInput',JSON.stringify(userSearch));
};
//--Global event listener for preventing the multiple event listener adding to select day element--
const selector = document.querySelector(".js-selector");  
selector.addEventListener('change', () => {
   if (topLevelWeatherData && topLevelApiData) { 
   const selectorValue = document.querySelector(".js-selector").value;
   hourlyForecastDataSlice(topLevelWeatherData, topLevelApiData, selectorValue);
   };
});
//--Error handling logic--
function showError() { 
   const errorHtml=`
      <div class="error-box-container error-display">
         <div class="error-box">
            <h2>Something Went Wrong</h2>
            <p>Please try again later.</p>
            <button class="js-try-again-btn">Try Again</button>
         </div>
      </div>
   `;
   document.querySelector('body').innerHTML = errorHtml;
};
//--Try again button functionality--
function tryAgain() {
   showError();
   const tryAgainBtn = document.querySelector('.js-try-again-btn');
   tryAgainBtn.addEventListener('click', () => {
      tryAgainBtn.disabled = true;
      location.reload();
   });
};
//-- Dark mode button functionality--
function modeBtn() {
   const modeBtn = document.querySelector('.dark-mode-btn'); 
   const savedMode = JSON.parse(localStorage.getItem('mode'));
   
   const html = document.documentElement; 

   if (savedMode === 'dark') {
      modeBtn.innerHTML = '☀️';
   }

   modeBtn.addEventListener('click', () => {
      const isDark = html.classList.contains('dark');

      if (isDark) {
         html.classList.remove('dark');
         modeBtn.innerHTML = '🌙';
         localStorage.removeItem('mode');
      } else {
         html.classList.add('dark');
         modeBtn.innerHTML = '☀️';
         localStorage.setItem('mode', JSON.stringify('dark'));
      }
   });
};
loadingAllFiles();
searchButton();
modeBtn();