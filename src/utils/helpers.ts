import { ForecastData } from '../types/weather';

export const formatTemp = (temp: number, units: 'metric' | 'imperial' = 'metric') => {
  return `${Math.round(temp)}°${units === 'metric' ? 'C' : 'F'}`;
};

export const formatDate = (timestamp: number) => {
  return new Date(timestamp * 1000).toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
};

export const formatTime = (timestamp: number) => {
  return new Date(timestamp * 1000).toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const getWeatherIconUrl = (iconCode: string) => {
  return `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
};

export const processDailyForecast = (data: ForecastData) => {
  const dailyMap = new Map<string, {
    dt: number;
    temp_min: number;
    temp_max: number;
    weather: any[];
  }>();

  data.list.forEach(item => {
    const date = new Date(item.dt * 1000).toLocaleDateString();
    
    if (!dailyMap.has(date)) {
      dailyMap.set(date, {
        dt: item.dt,
        temp_min: item.main.temp_min,
        temp_max: item.main.temp_max,
        weather: item.weather
      });
    } else {
      const existing = dailyMap.get(date)!;
      // Update min/max to find TRUE daily range
      existing.temp_min = Math.min(existing.temp_min, item.main.temp_min);
      existing.temp_max = Math.max(existing.temp_max, item.main.temp_max);
      
      // Heuristic: If this item is closer to noon (12:00), use its icon/weather
      // Or: prioritize "worst" weather (Rain > Cloud > Clear) - keeping it simple for now: use noon
      const itemHour = new Date(item.dt * 1000).getHours();
      const existingHour = new Date(existing.dt * 1000).getHours();
      
      if (Math.abs(itemHour - 12) < Math.abs(existingHour - 12)) {
         existing.dt = item.dt; // Use noon timestamp for display date? 
         existing.weather = item.weather;
      }
    }
  });

  return Array.from(dailyMap.values()).slice(0, 5);
};
