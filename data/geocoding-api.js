export async function fetchLocation() {
    let userLocationInput = JSON.parse(localStorage.getItem('userInput')) || 'chennai'; 
    let userLocation = userLocationInput;
    try{ 
    const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${userLocation}&count=1&language=en&format=json`);
    if (!response.ok) {
        throw new Error('Network response error' );
    };

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
     alert("City not found. Try another name.");
     return;
   };

    console.log(data);
    const latitude = data.results[0].latitude;
    const longitude = data.results[0].longitude;
    console.log(latitude, longitude);
 
} catch (error) {
    console.log('Error fetching location:', error.message);
    if ( error.message === `Cannot read properties of undefined (reading '0')` ) {
    alert( 'Location not found. Please try again with a different city name.');
    }else {
    alert( error.message || 'Location not found. Please try again with a different city name.');
    };
};
};
