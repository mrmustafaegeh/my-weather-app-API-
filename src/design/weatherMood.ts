import { WeatherData } from '../types/weather';

export const getWeatherMood = (data: WeatherData | null): string => {
  if (!data) return "Waiting for nature...";
  
  const temp = data.main.temp;
  const isRain = data.weather.some(w => w.main.toLowerCase().includes('rain'));
  const isClear = data.weather.some(w => w.main.toLowerCase().includes('clear'));
  const wind = data.wind.speed;

  if (isRain) {
    if (wind > 10) return "Wild & Stormy";
    return "Soft Rains";
  }
  
  if (isClear) {
    if (temp > 25) return "Bright & Radiant";
    if (temp < 10) return "Crisp & Clear";
    return "Calm & Blue";
  }
  
  if (data.weather[0].main === 'Clouds') {
    if (data.weather[0].description === 'overcast clouds') return "Heavy & Grey";
    return "Softly Clouded";
  }

  if (data.weather[0].main === 'Snow') return "Quiet & White";
  
  return "Peaceful";
};
