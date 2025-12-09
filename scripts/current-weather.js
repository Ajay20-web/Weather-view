import dayjs from 'https://cdn.jsdelivr.net/npm/dayjs@1.11.18/+esm';

//--main rendering for current weather data 
export function renderCurrentWeather(cityName,weatherData) {
    updateWeatherViewHero(cityName,weatherData); 
};
//--Hero section--
function updateWeatherViewHero(cityName,weatherData) {
 //--data--
 const dateIso = weatherData.current.time
 let date = dayjs(dateIso).format('dddd, MMM D, YYYY');
 const temperature = weatherData.current.temperature_2m;
 const temperatureUnit = weatherData.current_units.temperature_2m;
 //--DOM elements--
 const cityNameElement = document.querySelector('.js-city-name');
 cityNameElement.innerHTML = cityName;
 const dateElement = document.querySelector('.js-hero-date');
 dateElement.innerHTML = date;
 const temperatureElement = document.querySelector('.js-temperature');
 temperatureElement.innerHTML = `${temperature}${temperatureUnit}`;
 updateWeatherViewDataCarts(weatherData);
};
//--Weather data--
function updateWeatherViewDataCarts(weatherData) {
    //--data--
    const feelsLike = Math.round(weatherData.current.apparent_temperature);
    const humidity = weatherData.current.relative_humidity_2m;
    const wind = weatherData.current.wind_speed_10m;
    const pressure = weatherData.current.pressure_msl;
    const feelsLikeUnit = weatherData.current_units.apparent_temperature;
    const humidityUnit = weatherData.current_units.relative_humidity_2m;
    const windUnit = weatherData.current_units.wind_speed_10m;
    const pressureUnit = weatherData.current_units.pressure_msl;
    //--DOM elements--
    const feelsLikeElement = document.querySelector('.js-feels-like');
    feelsLikeElement.innerHTML = `${feelsLike} ${feelsLikeUnit}`;
    const humidityElement = document.querySelector('.js-humidity');
    humidityElement.innerHTML = `${humidity}${humidityUnit}`;
    const windElement = document.querySelector('.js-wind');
    windElement.innerHTML = `${wind} ${windUnit}`;
    const pressureElement = document.querySelector('.js-pressure');
    pressureElement.innerHTML = `${pressure} ${pressureUnit}`;
};
