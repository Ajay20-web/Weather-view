import { hourlyForecastData } from "../data/hourly-forecast-data.js";
import { fetchLocation } from "../data/geocoding-api-data.js";
import { getIconUrl } from "./utilities/weather-icon-owncode-url.js";
import dayjs from 'https://cdn.jsdelivr.net/npm/dayjs@1.11.18/+esm';

let topLevelWeatherData;
let topLevelApiData;
//addEventListenerToSelector(topLevelWeatherData, topLevelApiData);

async function loadingHourlyForecast() {
    const { latitude, longitude } = await fetchLocation();
    const { WeatherDataGrouping , apiData } = await hourlyForecastData(latitude, longitude);
    topLevelWeatherData = WeatherDataGrouping;
    topLevelApiData = apiData;
    renderHourlyForecast(WeatherDataGrouping , apiData);
};
loadingHourlyForecast();

function renderHourlyForecast(WeatherDataGrouping, apiData) {
    renderOptions(WeatherDataGrouping, apiData);
    hourlyForecastDataSlice(WeatherDataGrouping , apiData);
};

function renderOptions(WeatherDataGrouping, apiData) {

    const currentDate = dayjs(apiData.current.time).format('YYYY-MM-DD');
   //const objectIntoArray = Object.values(WeatherDataGrouping);//--> This convert full objects into array.
    const objectIntoArray = Object.keys(WeatherDataGrouping);//--> This convert only keys of object.
    const slicedArray = objectIntoArray.slice(0,7);//--> Hide one array by slicing.
      
    const options = slicedArray.map(dailyDates => { 
        const valueDate = dailyDates;
        const dateInWords = dayjs(valueDate).format('dddd')
        let label = currentDate == valueDate ? "Today" : dateInWords;

        return`
           <option value="${valueDate}">${label}</option>
        `;
    }).join("");
    
   const dateSelector = document.querySelector(".js-selector");
   dateSelector.innerHTML = options;
};

function hourlyForecastDataSlice(WeatherDataGrouping , apiData, changedValue){
    const selectorValue = changedValue || document.querySelector(".js-selector").value;
    let dataSelection = WeatherDataGrouping[selectorValue];
    const nextDate = dayjs(selectorValue).add(1, 'day').format('YYYY-MM-DD');
    let nextDayData = WeatherDataGrouping[nextDate];
    if(!nextDayData) nextDayData = dataSelection;

    const currentDate = dayjs(apiData.current.time).format('YYYY-MM-DD');
    let currentDaySlicingData;
    if(currentDate == selectorValue){
        const currentTime = dayjs(apiData.current.time).format('h A');
        let currentTimeIndex = dataSelection.findIndex(hourlyData =>{
        return currentTime === hourlyData.time
        });
        if(currentTimeIndex ==-1) currentTimeIndex = 0;

        currentDaySlicingData = dataSelection.slice(currentTimeIndex, currentTimeIndex + 6);
    
        const neededData = 6 - currentDaySlicingData.length;
        if (neededData > 0) {
            const nextDaySlicingData = nextDayData.slice(0, neededData);
            currentDaySlicingData.push(...nextDaySlicingData);//--> This three dots means just push array index only this a spread operator(...) in js .
        };

        renderHourlyList(currentDaySlicingData);
        return;
    };
    currentDaySlicingData = dataSelection.slice(0,6);
   //console.log(currentDaySlicingData);
   //console.log(changedValue);
   renderHourlyList(currentDaySlicingData);
};

function renderHourlyList(currentDaySlicingData) {

    const hourlyList = currentDaySlicingData.map(hourlyData => {
        const time = hourlyData.time;
        const temperature = Math.round(hourlyData.hourlyTemp);
        const weatherCode = hourlyData.weatherCode;
        
        return`
            <div class="hour-row" data-load>
                <img class ="weather-icon" src="${getIconUrl(weatherCode)}">
                <span class="time">${time}</span>
                <span class="temp">${temperature}°</span>
            </div>
        `;
        
    }).join("");
    document.querySelector(".js-hourly-list").innerHTML = hourlyList;
  
};

  
const selector = document.querySelector(".js-selector");  
selector.addEventListener('change', () => {
    const selectorValue = document.querySelector(".js-selector").value;
    hourlyForecastDataSlice(topLevelWeatherData, topLevelApiData, selectorValue);
});

