import { WeatherData, ForecastData } from '../types/weather';

export const validateWeatherData = (data: any): WeatherData => {
  if (!data || typeof data !== 'object') {
    throw new Error("Invalid API response: Root object missing");
  }

  // Ensure critical fields exist
  const requiredFields = ['main', 'weather', 'wind', 'sys', 'dt', 'name'];
  for (const field of requiredFields) {
    if (!(field in data)) {
      throw new Error(`Invalid API response: Missing critical field '${field}'`);
    }
  }

  // Normalize Temp (ensure celsius if requested, or just ensure number)
  // Here we just ensure types are correct
  if (typeof data.main.temp !== 'number') throw new Error("Invalid temp data");
  if (!Array.isArray(data.weather) || data.weather.length === 0) throw new Error("Invalid weather array");

  // Sanitize values (e.g. clamp humidity)
  data.main.humidity = Math.max(0, Math.min(100, data.main.humidity));

  return data as WeatherData;
};

export const validateForecastData = (data: any): ForecastData => {
  if (!data || !Array.isArray(data.list)) {
      throw new Error("Invalid Forecast API response");
  }

  // Filter out any malformed list items
  data.list = data.list.filter((item: any) => {
      return item.main && typeof item.main.temp === 'number' && item.weather;
  });

  if (data.list.length === 0) {
      throw new Error("Forecast data is empty after validation");
  }

  return data as ForecastData;
};

export const normalizeTimezone = (data: WeatherData): WeatherData => {
    // If we wanted to adjust all dates to a specific timezone we could do it here.
    // For now, we mainly ensure that `dt` is a valid timestamp
    if (data.dt < 1000000000) {
        console.warn("Timestamp seems too small, potential millisecond/second confusion?");
    }
    return data;
};
