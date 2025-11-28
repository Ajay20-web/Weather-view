import { fetchLocation } from "./geocoding-api.js";

let currentWeatherData;
export async function fetchCurrentWeather() {
   const {latitude, longitude} = await fetchLocation();
   const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,pressure_msl`
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response error');
        };
        const data = await response.json();
       // console.log(data);
        currentWeatherData = data;
        return data;
    } catch (error) {
        console.log('Error fetching current weather data:', error.message);
    };
   
};