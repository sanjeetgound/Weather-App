document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('weather-form');
    const cityInput = document.getElementById('city');
    const weatherInfo = document.getElementById('weather-info');
    const errorMessage = document.getElementById('error-message');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const city = cityInput.value;
        const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('City not found');
            }
            const data = await response.json();
            displayWeather(data);
        } catch (error) {
            showError(error.message);
        }
    });

    function displayWeather(data) {
        weatherInfo.classList.remove('hidden');
        errorMessage.classList.add('hidden');

        document.getElementById('city-name').textContent = data.name;
        document.getElementById('description').textContent = `Weather: ${data.weather[0].description}`;
        document.getElementById('temperature').textContent = `Temperature: ${data.main.temp} °C`;
        document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
    }

    function showError(message) {
        weatherInfo.classList.add('hidden');
        errorMessage.classList.remove('hidden');
        errorMessage.textContent = message;
    }
});
