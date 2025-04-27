import { useState } from "react";
import rain from "./images/rain.png";
import humidity from "./images/humidity.png";
import wind from "./images/wind.png";
import search from "./images/search.png";
import "./weather.css";
import './App.css';

function App() {
  const [city, setCity] = useState("");
  const [temp, setTemp] = useState(null);
  const [humidityValue, setHumidity] = useState(null);
  const [windSpeed, setWindSpeed] = useState(null);

  const apiKey = process.env.REACT_APP_API_KEY;
  const apiUrl = process.env.REACT_APP_API_URL;

  async function checkWeather(city) {
    if (!city) return;

    try {
      const response = await fetch(`${apiUrl}${encodeURIComponent(city)}&appid=${apiKey}&units=metric`);
      let data = await response.json();

      if (data.cod === "404") {
        alert("City not found. Please try another city.");
        return;
      }

      if (data.main) {
        setCity(data.name);
        setTemp(data.main.temp);
        setHumidity(data.main.humidity);
        setWindSpeed(data.wind.speed);
      } else {
        alert("No weather data available.");
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      alert("Something went wrong. Please check your internet connection or try again later.");
    }
  }

  const handelKeyPress = (e) => {
    if (e.key === 'Enter') {
      checkWeather(city);
    }
  }

  return (
    <div className="App">
      <div className="card">
        <div className="search">
          <input type="text" className="text-box" placeholder="Name Of The City" onChange={(e) => setCity(e.target.value)} onKeyDown={handelKeyPress} />
          <button onClick={() => checkWeather(city)} className="search-btn"><img className="search-btn-img" src={search} /></button>
        </div>
        <div className="weather">
          <img src={rain} className='weather-icon' />
          <h1 className="temp">{temp ? temp + '°C' : '20°C'}</h1>
          <h2 className="city">{city || 'Famagusta'}</h2>
          <div className="details">
            <div className="colom">
              <img src={humidity} />
              <div>
                <p className="humidity">{humidityValue || '50'}%</p>
                <p>Humidity</p>
              </div>
            </div>
            <div className="colom">
              <img src={wind} />
              <div>
                <p className="wind">{windSpeed || '15'} km/h</p>
                <p>Wind Speed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
