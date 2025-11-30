import { fetchLocation } from "../data/geocoding-api-data.js";
import { fetchDailyForecastData } from "../data/daily-forecast-data.js";
import { getIconUrl } from "./utilities/weather-icon-owncode-url.js";
import dayjs from 'https://cdn.jsdelivr.net/npm/dayjs@1.11.18/+esm';
async function loadingForecast() {
  document.querySelector('body').classList.add('loading');
  const { latitude, longitude } = await fetchLocation();
  const foreCastData = await fetchDailyForecastData(latitude, longitude);
  //console.log(foreCastData);
  renderForecast(foreCastData);
 document.querySelector('body').classList.remove('loading');
    
};

loadingForecast();

function createForecastHtml(foreCastData) {
   let forecastHtml = foreCastData.daily.time.map( (date, index) => {
        let forecastDates = dayjs(date).format('ddd');
        let maxTemp = Math.round(foreCastData.daily.temperature_2m_max[index]);
        let minTemp = Math.round(foreCastData.daily.temperature_2m_min[index]);
        let weatherCode = foreCastData.daily.weather_code[index];
       
       return`
            <article data-load>
                <p>${forecastDates}</p>
                <img src="${getIconUrl(weatherCode)}" class="weather-icon">
                <div class="minmax-tem">
                    <span>${maxTemp}°</span> 
                    <span>${minTemp}°</span>  
                </div>
            </article>
        `;
       
    }).join("");
    return forecastHtml;
};

function renderForecast(foreCastData) {
    const dailyForecast = document.querySelector(".js-daily-forecast-data");
    dailyForecast.innerHTML = createForecastHtml(foreCastData);
};
