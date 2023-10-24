document.addEventListener("DOMContentLoaded", function () {
    const apiKey = "c5bc4b53da40fbb4ee8c3ec625006840";
    const temperatureElement = document.getElementById("temperature");
    const humidityElement = document.getElementById("humidity");
    const weatherDescriptionElement = document.getElementById("weather-description");
    const windSpeedElement = document.getElementById("wind-speed");
    const pressureElement = document.getElementById("pressure");
    const visibilityElement = document.getElementById("visibility");
    const windDirectionElement = document.getElementById("wind-direction");
    const sunriseTimeElement = document.getElementById("sunrise-time");
    const sunsetTimeElement = document.getElementById("sunset-time");
    const locationNameElement = document.getElementById("location-name");
    const cityInput = document.getElementById("city-input");
    const searchForm = document.getElementById("search-form"); // Added this line

    searchForm.addEventListener("submit", function (e) { // Listen for the "submit" event on the form
        e.preventDefault(); // Prevent the default form submission

        const cityName = cityInput.value.trim();

        if (cityName === "") {
            alert("Please enter a city name");
            return;
        }

        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                // Set the location name
                const locationName = `Weather in ${data.name}, ${data.sys.country}`;
                locationNameElement.textContent = locationName;

                // Set the input field's placeholder to the location name
                cityInput.placeholder = locationName;

                // Set other weather data
                temperatureElement.textContent = `${data.main.temp}°C`;
                humidityElement.textContent = `${data.main.humidity}%`;
                weatherDescriptionElement.textContent = data.weather[0].description;
                windSpeedElement.textContent = data.wind.speed;
                pressureElement.textContent = data.main.pressure;
                visibilityElement.textContent = data.visibility;
                windDirectionElement.textContent = `${data.wind.deg}°`;
                sunriseTimeElement.textContent = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
                sunsetTimeElement.textContent = new Date(data.sys.sunset * 1000).toLocaleTimeString();
            })
            .catch(error => {
                console.error("Error fetching weather data:", error);
                locationNameElement.textContent = "City not found!";
                cityInput.placeholder = "Periksa Nama Kota"; // Reset placeholder on error
            });
    });
});
