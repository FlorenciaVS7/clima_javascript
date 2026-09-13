const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    if (!city) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".clima").style.display = "none";
        return;
    }
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if (!response.ok) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".clima").style.display = "none";
        return; 
    }   
    const data = await response.json();

    document.querySelector(".ciudad").innerHTML = data.name;
    document.querySelector(".temperatura").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humedad").innerHTML = data.main.humidity + "%";
    document.querySelector(".viento").innerHTML = data.wind.speed + " km/h";

    if (data.weather[0].main == "Clouds") {
        weatherIcon.src = "imagenes/clouds.png";
    } else if (data.weather[0].main == "Clear") {
        weatherIcon.src = "imagenes/clear.png";
    } else if (data.weather[0].main == "Rain") {
        weatherIcon.src = "imagenes/rain.png";
    } else if (data.weather[0].main == "Drizzle") {
        weatherIcon.src = "imagenes/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
        weatherIcon.src = "imagenes/mist.png";
    }

    document.querySelector(".clima").style.display = "block";
    document.querySelector(".error").style.display = "none";
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value.trim());
});

searchBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchBox.value.trim());
    }
});