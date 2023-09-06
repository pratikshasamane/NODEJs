const cron = require("node-cron");
const axios = require("axios");
const dotenv = require("dotenv").config();

async function fetchWeatherData() {
  try {
    const response = await axios.get(
      `      https://api.openweathermap.org/data/2.5/weather?q=pune&appid=${process.env.API_KEY}`
    );

    const weatherData = response;
    // console.log(weatherData.data.weather);
    return weatherData;
  } catch (error) {
    console.error("Error in fatching data");
    return null;
  }
}

module.exports = fetchWeatherData;
