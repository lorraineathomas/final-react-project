import React , { useState } from "react";
import Forecast from "./Forecast.js";
import "./WeatherApp.css";
import axios from "axios";

export default function WeatherApp(props) {
    const [ weatherDataset , setData ] = useState({ready:false});
    const [ city, searchCity ] = useState(props.c);

    function refreshWeather(response){
        setData({
            ready: true,
            coord: response.data.coordinates,
            temperature: response.data.temperature.current,
            humidity: response.data.temperature.humidity,
            date: new Date(response.data.time * 1000),
            description: response.data.condition.description,
            icon: response.data.condition.icon,
            wind: response.data.wind.speed,
            city: response.data.city
        });
    }

    function handleCityChange(event){
        searchCity(event.target.value);
    }
    
    function handleButtonClick(event){
        event.preventDefault();
        cityLookup(city);    
    }
    
    function cityLookup(city){
        let apiKey = "5863935ee9cca4c02ed68203f807c65b";
        let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
        axios.get(apiUrl).then(refreshWeather);
    }

    
    
   if (weatherDataset.ready) {
    return (
        <div className="WeatherApp">
        <header>
            <h1 id="app-title">WEATHER WATCH</h1>
            <form className="search-form" id="search-form" onSubmit={handleButtonClick}>
            <input className="search-form-input" id="search-form-input" type="search" placeholder="Enter a city..." onChange={handleCityChange} />
            <input className="search-form-button" type="submit" value="Search"/>
            </form>
        </header>

        <main>
            <div className="weather-app-data">
            <div>
                <h1 className="weather-app-city" id="city">New York</h1>
                <p className="weather-app-details">
                <span id="time">Friday 15:00</span>, <span id="description">sunny</span>
                <br />
                Humidity: <strong><span id="humidity">27</span>%</strong>, Wind: <strong><span id="wind-speed">19</span>mph</strong>
                </p>
            </div>

            <div className="weather-app-temperature-container">
            <div className="weather-app-icon" id="icon">☀️</div>
            <div className="weather-app-temperature-value" id="temperature">93</div>
            <div className="weather-app-unit">&deg;F</div>
            </div>


            </div> 
            <Forecast />
        </main>

        <footer>Created by {" "}
            <a href="https://github.com/lorraineathomas">Lorraine Thomas</a> and is {" "}
            <a href="https://github.com/lorraineathomas/weather-app-project">hosted on Github</a>{" "}
            and <a href="https://another-weather-search.netlify.app/">hosted on Netlify</a>
        </footer>
        </div>
    );
} else {
    cityLookup();
    return "Searching..."
}
}
/*
else {
    cityLookup();
    return "Searching..."
}*/


//Pure js syntax
/*
function refreshWeather(response){
    let temperatureElement = document.querySelector("#temperature");
    let temperatureValue = Math.round(convertTemperature(response.data.temperature.current));
    temperatureElement.innerHTML = temperatureValue;
    
    let cityElement = document.querySelector("#city");
    cityElement.innerHTML = response.data.city;

    let descriptionElement = document.querySelector("#description");
    descriptionElement.innerHTML = response.data.main.condition.description;

    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = response.data.temperature.humidity;

    let windElement = document.querySelector("#wind-speed");
    let speed = Math.round(response.data.wind.speed * 1.609344);
    windElement.innerHTML = speed;

    let dayTime = new Date(response.data.time * 1000);
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let timeElement = document.querySelector("#time");
    let minutes = dayTime.getMinutes();
    if (minutes < 10) {
        minutes = `0${dayTime.getMinutes()}`;
    }
    timeElement.innerHTML = `${days[dayTime.getDay()]} ${dayTime.getHours()}:${minutes}`;

    let iconElement = document.querySelector("#icon");
    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" className="weather-app-icon" />`;
    }
    function convertTemperature(celcius){
        let temp = 9/5 * celcius + 32;
        return temp;
    }
    
    //let searchFormElement = document.querySelector("#search-form");
    //searchFormElement.addEventListener("submit", handleSearchSubmit);
*/