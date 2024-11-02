document.getElementById('weatherForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const zipCode = document.getElementById('zipCode').value;
    const apiKey = '3998e57eb8f64703b80143954240211'; // Replace with your API key
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${zipCode}&aqi=yes`;
    
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('Invalid ZIP code or API request failed.');
        }
        
        const data = await response.json();
        displayWeatherData(data);
        clearError();
    } catch (error) {
        showError(error.message);
    }
});

function displayWeatherData(data) {
    const weatherDataDiv = document.getElementById('weatherData');
    weatherDataDiv.innerHTML = `
        <h2>${data.location.name}, ${data.location.country}</h2>
        <p>Temperature: ${data.current.temp_f} °F / ${data.current.temp_c} °C</p>
        <p>Condition: ${data.current.condition.text}</p>
        <p>AQI: ${data.current.air_quality["us-epa-index"]} - ${getAQIDescription(data.current.air_quality["us-epa-index"])}</p>
    `;
    weatherDataDiv.classList.remove('hidden');
}

function getAQIDescription(aqi) {
    switch(aqi) {
        case 1: return 'Good';
        case 2: return 'Moderate';
        case 3: return 'Unhealthy for Sensitive Groups';
        case 4: return 'Unhealthy';
        case 5: return 'Very Unhealthy';
        case 6: return 'Hazardous';
        default: return 'Unknown';
    }
}

function showError(message) {
    const errorDiv = document.getElementById('error');
    errorDiv.textContent = message;
    errorDiv.classList.remove('hidden');
}

function clearError() {
    const errorDiv = document.getElementById('error');
    errorDiv.classList.add('hidden');
}
