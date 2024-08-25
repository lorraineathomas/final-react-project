import React from "react";
import "./WeatherApp.css";
import axios from "axios";

export default function WeatherApp() {
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
        iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;
    }
    
    function searchCity(city){
        let apiKey = "8944afa6845bd7c413a687258d3211ef";
        let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
        axios.get(apiUrl).then(refreshWeather);
    }
    
    function convertTemperature(celcius){
        let temp = 9/5 * celcius + 32;
        return temp;
    }
    
    function handleSearchSubmit(event){
        event.preventDefault();
        let searchInput = document.querySelector("#search-form-input");
        searchCity(searchInput.value);
    }
    
    //let searchFormElement = document.querySelector("#search-form");
    //searchFormElement.addEventListener("submit", handleSearchSubmit);


    return (
        <div className="WeatherApp">
        <div class="weather-app">
        <header>
            <form class="search-form" id="search-form">
            <input class="search-form-input" id="search-form-input" type="search" placeholder="Enter a city..." required />
            <input class="search-form-button" type="submit" value="Search"/>
            </form>
        </header>

        <main>
            <div class="weather-app-data">
            <div>
                <h1 class="weather-app-city" id="city">New York</h1>
                <p class="weather-app-details">
                <span id="time">Friday 15:00</span>, <span id="description">sunny</span>
                <br />
                Humidity: <strong><span id="humidity">27</span>%</strong>, Wind: <strong><span id="wind-speed">19</span>mph</strong>
                </p>
            </div>

            <div class="weather-app-temperature-container">
            <div class="weather-app-icon" id="icon">☀️</div>
            <div class="weather-app-temperature-value" id="temperature">93</div>
            <div class="weather-app-unit">&deg;F</div>
            </div>


            </div> 
            <div>5-day forecast here</div>
        </main>

        <footer>Created by {" "}
            <a href="https://github.com/lorraineathomas">Lorraine Thomas</a> and is {" "}
            <a href="https://github.com/lorraineathomas/weather-app-project">hosted on Github</a>{" "}
            and <a href="https://another-weather-search.netlify.app/">hosted on Netlify</a>
        </footer>
        </div>
        </div>
    );
}