import { changeUnit, getWeather } from "./weather.js";

export function displayWeather() {
    const searchInput = document.querySelector("[data-search-input]");
    const searchBtn = document.querySelector("[data-search-btn]");
    const toggleBtn = document.querySelector("[data-toggle-unit-btn]");
    const locationElement = document.querySelector("[data-location]");
    const temperatureElement = document.querySelector("[data-temperature]");
    const descriptionElement = document.querySelector("[data-description]");

    let currentCity = "Accra";
    let currentUnit = "metric"

    async function updateWeather(city) {
        try {
            const weatherData = await(getWeather(city));
            if (weatherData) {
                city = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
                const temperature = weatherData.temperature;
                const description = weatherData.description;
                const unitSymbol = currentUnit === "metric" ? "°C": "°F";
                locationElement.textContent = city;
                temperatureElement.textContent = `${temperature}${unitSymbol}`;
                descriptionElement.textContent = description;
            } else {
                alert(`Unable to fetch weather data for ${city}`);
            }

        } catch(error) {
            console.log("Error Fetching weather Data", error);
            alert("An Error Occured while fetching weather data");
        }
    }

    function handleSearch() {
        const city = searchInput.value.trim();
        if (city) {
            currentCity = city;
            updateWeather(currentCity);
        } else {
            alert("Please Enter A city name");
        }
        searchInput.value = "";
    }

    //Event Listeners for the search btn
    searchBtn.addEventListener("click", handleSearch);

    searchInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
           handleSearch();
        }
    })

    toggleBtn.addEventListener("click", () => {
        currentUnit = changeUnit();
        updateWeather(currentCity);
    })
}
