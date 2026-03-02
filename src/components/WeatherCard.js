import React from "react";

function WeatherCard({ weather }) {
  // simple safety checks
  if (!weather || !weather.main || !weather.weather) return null;

  return (
    <div>
      <h2>{weather.name}</h2>
      <p>Temperature: {weather.main.temp} °C</p>
      <p>Weather: {weather.weather[0].description}</p>
    </div>
  );
}

export default WeatherCard;