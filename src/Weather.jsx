import { useState } from "react";
import rain from "./images/rain.png";
import humidity from "./images/humidity.png";
import wind from "./images/wind.png";
import { FaSearch } from "react-icons/fa";
import "./weather.css";

export default function Weather() {
  const [city, setCity] = useState("");
  const [temp, setTemp] = useState(null);
  const [humidityValue, setHumidity] = useState(null);
  const [windSpeed, setWindSpeed] = useState(null);
  const [searchCity, setSearchCity] = useState("");

  const apiKey = process.env.REACT_APP_API_KEY;
  const apiUrl = process.env.REACT_APP_API_URL;

  async function checkWeather(cityName) {
    if (!cityName) return;

    try {
      const response = await fetch(
        `${apiUrl}${encodeURIComponent(cityName)}&appid=${apiKey}&units=metric`
      );
      const data = await response.json();

      if (data.cod === 404) {
        alert("City not found. Please try another city.");
        return;
      }

      if (data.main) {
        setCity(data.name);
        setTemp(Math.round(data.main.temp));
        setHumidity(Math.round(data.main.humidity));
        setWindSpeed(Math.round(data.wind.speed));
      } else {
        alert("No weather data available.");
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      alert("Something went wrong. Please try again later.");
    }
  }

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      checkWeather(searchCity);
    }
  };

  return (
    <div className="card">
      <div className="search">
        <input
          className="text-box"
          type="text"
          placeholder="Enter a city"
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button className="search-btn" onClick={() => checkWeather(searchCity)}>
          <FaSearch />
        </button>
      </div>

      <div className="weather">
        <img src={rain} alt="rain" />
        <h1>{city || "Your City"}</h1>
        <h2>{temp !== null ? `${temp}°C` : "— °C"}</h2>
      </div>

      <div className="details">
        <div className="col">
          <img src={humidity} alt="humidity" />
          <div>
            <p className="humidity">
              {humidityValue !== null ? `${humidityValue}%` : "— %"}
            </p>
            <p>Humidity</p>
          </div>
        </div>
        <div className="col">
          <img src={wind} alt="wind" />
          <div>
            <p className="wind">
              {windSpeed !== null ? `${windSpeed} km/h` : "— km/h"}
            </p>
            <p>Wind Speed</p>
          </div>
        </div>
      </div>
    </div>
  );
}
