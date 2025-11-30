export function getIconUrl(wmoCode) {
  // 1. Create a map that translates the numbers to the icon codes
  const iconMap = {
    0: '01d', // Clear sky
    1: '02d', // Mainly clear
    2: '03d', // Partly cloudy
    3: '04d', // Overcast
    45: '50d', // Fog
    48: '50d', // Depositing rime fog
    51: '09d', // Drizzle: Light
    53: '09d', // Drizzle: Moderate
    55: '09d', // Drizzle: Dense
    61: '10d', // Rain: Slight
    63: '10d', // Rain: Moderate
    65: '10d', // Rain: Heavy
    71: '13d', // Snow: Slight
    73: '13d', // Snow: Moderate
    75: '13d', // Snow: Heavy
    95: '11d', // Thunderstorm: Slight or moderate
    96: '11d', // Thunderstorm with slight hail
    99: '11d'  // Thunderstorm with heavy hail
  };

  // 2. Get the code (default to '02d'/cloudy if not found)
  const iconCode = iconMap[wmoCode] || '02d';

  // 3. Return the full URL
  return `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
};