let unit = 'metric'

export async function getWeather(city) {
    const apiKey = "472VRLXTLAVC3CXWN2EQ9C43K";
    const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${apiKey}&unitGroup=${unit}`;

    try {
        const response = await fetch(apiUrl)
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const weatherData = await response.json();
        const temperature = weatherData.currentConditions.temp
        const description = weatherData.currentConditions.conditions

        console.log(weatherData);
        console.log(temperature);
        console.log(description);

        return {
            temperature,
            description,
        };

    } catch(error) {
        console.error('There was a problem with the fetch operation' + error);
    }
}

export function changeUnit() {
    unit = unit === "metric" ? "us" : "metric";
    return unit
}