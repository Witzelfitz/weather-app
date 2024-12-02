const cities = [
    { name: 'Bern', latitude: 46.9481, longitude: 7.4474, elementId: 'bern' },
    { name: 'Zürich', latitude: 47.3769, longitude: 8.5417, elementId: 'zurich' },
    { name: 'Chur', latitude: 46.8523, longitude: 9.5309, elementId: 'chur' }
];

const apiEndpoint = 'https://api.open-meteo.com/v1/forecast?hourly=temperature_2m,precipitation_probability,weather_code';

async function fetchWeatherData(city) {
    const response = await fetch(`${apiEndpoint}&latitude=${city.latitude}&longitude=${city.longitude}`);
    const data = await response.json();
    return data;
}

function displayWeatherData(city, data) {
    const weatherDataElement = document.getElementById(city.elementId).querySelector('.weather-data');
    weatherDataElement.innerHTML = `
        <p>Temperature: ${data.hourly.temperature_2m[0]}°C</p>
        <p>Precipitation Probability: ${data.hourly.precipitation_probability[0]}%</p>
        <p>Weather Code: ${data.hourly.weather_code[0]}</p>
    `;
}

async function updateWeather() {
    for (const city of cities) {
        const data = await fetchWeatherData(city);
        displayWeatherData(city, data);
    }
}

updateWeather();
