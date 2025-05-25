import React from "react";
import ReactAnimatedWeather from "react-animated-weather";
//import WeatherIcon from "./WeatherIcon.js";

export default function Forecast(){
    return (
        <div className="Forecast">
            <div className="row">
                <div className="col">
                    <ReactAnimatedWeather icon={'SUNNY_DAY'} color={'goldenrod'} size={80} animate={true} />
                </div>
            </div>
        </div>
    );
}
