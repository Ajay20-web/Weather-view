import dayjs from 'https://cdn.jsdelivr.net/npm/dayjs@1.11.18/+esm';

export async function hourlyForecastData(latitude, longitude) {
   const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,weather_code&current=temperature_2m&timezone=auto`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response error');
        };
        const data = await response.json();
        newDataStructure(data);
        return data;
    } catch (error) {
        console.log('Error fetching current weather data:', error.message);
    };
    
};

// -- This idea called object grouping--
function newDataStructure(apiData) {
 
    let WeatherDataGrouping = {};
    apiData.hourly.time.forEach((dailyDate, index) => {
        const date = dayjs(dailyDate).format('YYYY-MM-DD');
        const time = dayjs(dailyDate).format('h:mm A');
        const hourlyTemp = apiData.hourly.temperature_2m[index];
        const weatherCode = apiData.hourly.weather_code[index];
       
        if(!WeatherDataGrouping[date]){
            WeatherDataGrouping[date] = []; //--> Bracket Notation selector i used instant of dot Notation.
            
        }

        WeatherDataGrouping[date].push( {
            date,
            time,
            hourlyTemp,
            weatherCode
        });
       
    });
    
    console.log(WeatherDataGrouping);
    
    return {WeatherDataGrouping , apiData};
   
};