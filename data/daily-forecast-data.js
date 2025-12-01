export async function fetchDailyForecastData(latitude, longitude) {
   const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=auto`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response error');
        };
        const data = await response.json();
       // console.log(data);
        return data;
    } catch (error) {
        console.log('Error fetching current weather data:', error.message);
    };
   
};