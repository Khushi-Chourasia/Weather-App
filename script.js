document.addEventListener('DOMContentLoaded', function () {
    const searchBtn = document.getElementById('searchBtn');
    const locationInput = document.getElementById('location');
    const weatherData = document.getElementById('weatherData');
  
    searchBtn.addEventListener('click', fetchWeather);
    locationInput.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        fetchWeather();
      }
    });
  
    function fetchWeather() {
      const location = locationInput.value.trim();
  
      if (location !== '') {
        const apiKey = '28bc439e098fbc524722af2108b10df0'; 
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
  
        fetch(apiUrl)
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            displayWeather(data);
          })
          .catch(error => {
            console.error('There was a problem with your fetch operation:', error);
            alert('There was an error fetching weather data. Please try again later.');
          });
      } else {
        alert('Please enter a location');
      }
    }
  
    function displayWeather(data) {
        const cityName = data.name;
        const temperature = data.main.temp;
        const description = data.weather[0].description;
        let emoji;
      
        if (temperature < 15) {
          emoji = '❄️';
        } else if (temperature >= 15 && temperature < 27) {
          emoji = '🌤️'; 
        } else {
          emoji = '☀️'; 
        }
      
        weatherData.innerHTML = `
          <h2>${cityName}</h2>
          <p>Temperature: ${temperature}°C</p>
          <p>Description: ${description}</p>
          <p>Weather: ${emoji}</p>
        `;
      }      
  });  