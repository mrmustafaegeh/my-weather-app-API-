import { useEffect, useState } from 'react';
import { getTheme, ThemeGradient } from '../design/backgroundSystem';
import { WeatherData } from '../types/weather';

export const useWeatherTheme = (weather: WeatherData | null) => {
  const [theme, setTheme] = useState<ThemeGradient>({ 
    from: '#0f172a', 
    to: '#1e293b', 
    text: 'text-white' 
  });

  useEffect(() => {
    if (weather) {
      const newTheme = getTheme(
        weather.weather[0].id, 
        Date.now() / 1000, 
        weather.sys.sunrise, 
        weather.sys.sunset
      );
      setTheme(newTheme);
    }
  }, [weather]);

  return theme;
};
