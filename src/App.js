import React, { useEffect, useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const apiKey = "87f3f9c4d78e052e4a55baa6e1437868";

  const getWeather = async () => {
    setErrorMsg("");
    setWeather(null);

    if (city.trim() === "") {
      setErrorMsg("Please enter a city name.");
      return;
    }

    const url =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&units=metric&appid=" +
      apiKey;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.cod !== 200) {
        setErrorMsg("City not found. Try another one.");
        return;
      }

      setWeather(data);
    } catch (error) {
      setErrorMsg("Something went wrong. Please try again.");
    }
  };

  // useEffect example: when weather updates, log it
  useEffect(() => {
    if (weather) {
      console.log("Weather updated:", weather.name, weather.main.temp);
    }
  }, [weather]);

  return (
    <div className="App">
      <h1>Weather App</h1>

      <SearchBar city={city} setCity={setCity} onSearch={getWeather} />

      {errorMsg && <p>{errorMsg}</p>}

      <WeatherCard weather={weather} />
    </div>
  );
}

export default App;