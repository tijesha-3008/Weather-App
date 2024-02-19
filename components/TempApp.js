
import React, { useState } from 'react';
import './TempApp.css';
import search_icon from './Assets/search.png';
import drizzle_icon from './Assets/drizzle.png';
import cloud_icon from './Assets/cloud.png';
import humidity_icon from './Assets/humidity.png';
import clear_icon from './Assets/clear.png';
import rain_icon from './Assets/rain.png';
import snow_icon from './Assets/snow.png';
import wind_icon from './Assets/wind.png';

const TempApp = () => {
    //we have to get an api key from openweatherapp to fetch data from the server which we are going to show in our weather app
    let api_key = "34220910b994cd3181877ec57eda6031";
    //we need to install thunder client extension ,using which we can see response data coming from the API
    const [wicon, setWicon] = useState(cloud_icon);
    //now we create search function for our search button

    const search = async() => {
        //here we will write all the logics to fetch the data from the API and display it to our weather app
        const element = document.getElementsByClassName("cityInput");
        if (element[0].value === "") return 0; //if we have nothing in the input field and someone is searching then it will return 0
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`  //by using template literals we can insert a variable into a string. To convert this into template literal we enclose the string within black ticks

        let response = await fetch(url); //fetching data using url and storing it into the response variable
        let data = await response.json();
        const humidity = document.getElementsByClassName("humidity-percent");
        const wind = document.getElementsByClassName("wind-rate");
        const temperature = document.getElementsByClassName("weather-temp");
        const location = document.getElementsByClassName("weather-location");

        humidity[0].innerHTML = data.main.humidity + " %";
        wind[0].innerHTML = Math.floor(data.wind.speed)+" km/h";
        temperature[0].innerHTML = Math.floor(data.main.temp)+ "°c"; //Math.floor to remove decimal places
        location[0].innerHTML = data.name;
        
        if(data.weather[0].icon ==="01d" || data.weather[0].icon ==="01n")
        {
            setWicon(clear_icon);
        }
        else if(data.weather[0].icon ==="02d" || data.weather[0].icon ==="02n"){
            setWicon(cloud_icon);     
        }
        else if (data.weather[0].icon ==="03d" || data.weather[0].icon ==="03n") {
            setWicon(drizzle_icon);
        }
        else if (data.weather[0].icon ==="04d" || data.weather[0].icon ==="04n") {
            setWicon(drizzle_icon);
        }
        else if (data.weather[0].icon ==="09d" || data.weather[0].icon ==="09n") {
            setWicon(rain_icon)
        }
        else if (data.weather[0].icon ==="10d" || data.weather[0].icon ==="10n") {
            setWicon(rain_icon);
        }
        else if (data.weather[0].icon ==="13d" || data.weather[0].icon ==="13n") {
            setWicon(snow_icon);
        }
        else {
            setWicon(clear_icon);
        }
    }
    return (
        <div className='container'>
            <div className='top-bar'>
                <input type="text" className="cityInput" placeholder='Search' />
                <div className="search-icon">
                    <img src={search_icon} onClick={() => { search() }} alt=""/>
                </div>
            </div>
            <div className='weather-image'>
                <img src={wicon} alt=""/>
            </div>
            <div className="weather-temp">24°c</div>
            <div className="weather-location">London</div>
            <div className="data-container">
                <div className="element">
                    <img src={humidity_icon} alt="" className="icon" />
                    <div className="data">
                        <div className="humidity-percent">64%</div>
                        <div className="text">Humidity</div>
                    </div>
                </div>
                <div className="element">
                    <img src={wind_icon} alt="" className="icon" />
                    <div className="data">
                        <div className="wind-rate">18 km/hr</div>
                        <div className="text">Wind Speed</div>
                    </div>
                </div>
            </div>
        </div>
    );  
}

export default TempApp;