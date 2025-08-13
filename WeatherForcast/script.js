const apiKey = "f434e5866eda0feb4d6afbe312cdaa70";
const weatherButton = document.getElementById("getWeather");
const resultDiv = document.getElementById("result");
const loader = document.getElementById("loader");
const cityInput = document.getElementById("city");

weatherButton.addEventListener("click", () => {
    const city = cityInput.value;
    if (!city) {
        resultDiv.innerHTML = "<p>Please enter a city name.</p>";
        return;
    }

    loader.style.display = "block";
    resultDiv.innerHTML = "";

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then((response) => {
            if (!response.ok) {
                throw new Error("City not found");
            }
            return response.json();
        })
        .then((data) => {
            const { main, weather, wind } = data;
            const weatherIcon = `http://openweathermap.org/img/wn/${weather[0].icon}.png`;
            resultDiv.innerHTML = `
                <h2>Weather in ${city}</h2>
                <img src="${weatherIcon}" alt="${weather[0].description}">
                <p>Temperature: ${main.temp}°C</p>
                <p>Condition: ${weather[0].description}</p>
                <p>Humidity: ${main.humidity}%</p>
                <p>Wind Speed: ${wind.speed} m/s</p>
            `;
        })
        .catch((error) => {
            resultDiv.innerHTML = `<p>${error.message}</p>`;
        })
        .finally(() => {
            loader.style.display = "none";
        });
});
