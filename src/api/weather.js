// Mock API service for weather data
export const fetchWeatherData = async (location) => {
    // Simulating an API call
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                temp: 27,
                condition: "Partly Cloudy",
                high: 31,
                low: 22,
                humidity: 68,
                rainChance: 12,
                wind: 9,
                nextRain: "Tonight (approx. 22:30)",
                location: location || "Bafoussam, Cameroon",
            });
        }, 1000);
    });
};
