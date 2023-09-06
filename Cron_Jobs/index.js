const cron = require("node-cron");
const axios = require("axios");
require("dotenv").config();
const nodemailer = require("nodemailer");
const fetchWeatherData = require("./weather_data/weather_api");

API_KEY = process.env.API_KEY;
CITY_NAME = "pune";

const email_config = {
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_ID,
    pass: process.env.EMAIL_PASSWORD,
  },
};

async function sendWeatherData() {
  const weather_data = await fetchWeatherData();
  //   console.log(weather_data);
  if (weather_data) {
    const transport = nodemailer.createTransport(email_config);

    console.log(weather_data.data.weather[0].description);
    const mailOptions = {
      from: process.env.EMAIL_ID,
      to: "pratikshab@maveric-systems.com",
      subject: "Weather Data Scheduler",
      html: `<html><head><style>* {
        margin: 0;
        padding: 0;
        box-sizing: inherit;
      }
      
      html {
        font-size: 62.5%;
        box-sizing: border-box;
      }
      
      body {
        font-family: system-ui;
        color: #333;
        background-color: #f7f7f7;
        min-height: 100vh;
      
        display: flex;
        align-items: center;
        justify-content: center;
        background-image: url("../images/bg.jpg");
        background-size: cover; /* Scale the image to cover the entire element */
        background-repeat: no-repeat; /* Prevent the image from repeating */
        background-position: center center;
      }
      
      .Weather-app {
        background-color: rgba(255, 255, 255, 0.5);
      }
      
      .notice {
        color: white;
        text-align: center;
        margin-top: 9px;
      }
      #search-input:focus {
        outline: none;
      }
      .weather {
        /* background-color: #fff; */
        background-color: rgba(255, 255, 255, 0.6);
        box-shadow: 0 2rem 5rem 1rem rgba(0, 0, 0, 0.1);
        font-size: 1.8rem;
        /* width: 30rem; */
        border-radius: 0.7rem;
        margin: 17px 3rem;
        display: flex;
        justify-content: center; /* Center horizontally */
        align-items: center; /* Center vertically */
        width: 100%; /* Set the container's width as needed */
        height: 300px;
      }
      
      .weather_img {
        background-color: #eee;
        border-top-left-radius: 0.7rem;
        border-top-right-radius: 0.7rem;
      }
      
      .weather_desp {
        text-transform: capitalize;
      }
      .weather_data {
        text-align: center;
        padding: 2.5rem 3.75rem 3rem 3.75rem;
      }
      
      .heading {
        color: white;
        text-align: center;
        font-size: 5rem;
        margin-bottom: 4rem;
        font-family: cursive;
      }
      .weather_name {
        font-size: 2.7rem;
        margin-bottom: 0.7rem;
        color: #000000c2;
      }
      
      .weather_location {
        margin-bottom: 1rem;
        /* color: #888; */
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .weather_location span {
        display: inline-block;
        margin-right: 1rem;
        font-size: 2rem;
      }
      
      .container-sub {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 20px;
      }
      
      .humidity,
      .feels-like {
        padding: 20px;
        /* border: 1px solid #ccc; */
      }
      
      .feels-like span,
      .humidity span {
        font-size: 15px;
      }
      .search-container {
        display: flex;
        align-items: center;
        max-width: 300px;
        background-color: #f2f2f2;
        border: 2px solid #ddd;
        border-radius: 30px;
        padding: 5px;
        margin: auto;
      }
      
      .search-container input {
        flex: 1;
        border: none;
        padding: 10px;
        font-size: 16px;
        background-color: transparent;
      }
      
      .search-container button {
        background-color: #5e7793;
        color: #fff;
        border: none;
        padding: 10px;
        border-radius: 30px;
        cursor: pointer;
      }
      
      .search-container button i {
        font-size: 18px;
      }
      </style></head><body><div id="weather_cont" class="weather">
      
      <div class="weather_data">
        <h3 class="weather_name"><span> ${Math.floor(
          weather_data.data.main.temp - 273.15
        )} &#8451;</span></h3>
        <h4 class="weather_desp ">${
          weather_data.data.weather[0].description
        }</h4>
        <p class="weather_location"><span class="_text">${
          weather_data.data.name
        } ${weather_data.data.sys.country}</span>
       
        <div class="container-sub">
        
            <div class="feels-like">
                ${Math.floor(
                  weather_data.data.main.feels_like - 273.15
                )}&#8451; <span>Feels like</span></div>
            <div class="humidity">${
              weather_data.data.main.humidity
            }% <span>Humidity</span></div>
        </div>
    </div>
    </div> </body></html>`,
    };

    transport.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error sending email", error);
      } else {
        console.log("Email sent", info.response);
      }
    });
  }
}

sendWeatherData();
// cron.schedule("54 15 * * *", sendWeatherData);
