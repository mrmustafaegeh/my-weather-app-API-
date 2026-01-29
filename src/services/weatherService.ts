import axios from 'axios';
import { WeatherData, ForecastData } from '../types/weather';
import { CacheService } from './cacheService';

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_API_URL || 'https://api.openweathermap.org/data/2.5';

if (!API_KEY) {
  console.error("API Key is missing! Please check your .env file.");
}

export const WeatherService = {
  inflightRequests: new Map<string, Promise<any>>(),

  async getWeather(city: string, units: 'metric' | 'imperial' = 'metric', signal?: AbortSignal): Promise<WeatherData> {
    const cacheKey = `weather_${city}_${units}`;
    const cached = await CacheService.getValid(cacheKey);
    if (cached) return cached;

    const requestKey = `getWeather:${city}:${units}`;
    if (this.inflightRequests.has(requestKey)) {
        return this.inflightRequests.get(requestKey);
    }

    const request = (async () => {
        try {
            const response = await axios.get<WeatherData>(`${BASE_URL}/weather`, {
                params: { q: city, appid: API_KEY, units },
                signal
            });
            await CacheService.set(cacheKey, response.data, 600); // 10 mins
            return response.data;
        } finally {
            this.inflightRequests.delete(requestKey);
        }
    })();

    this.inflightRequests.set(requestKey, request);
    return request;
  },

  async getForecast(city: string, units: 'metric' | 'imperial' = 'metric', signal?: AbortSignal): Promise<ForecastData> {
    const cacheKey = `forecast_${city}_${units}`;
    const cached = await CacheService.getValid(cacheKey);
    if (cached) return cached;

    const requestKey = `getForecast:${city}:${units}`;
    if (this.inflightRequests.has(requestKey)) return this.inflightRequests.get(requestKey);

    const request = (async () => {
        try {
            const response = await axios.get<ForecastData>(`${BASE_URL}/forecast`, {
                params: { q: city, appid: API_KEY, units },
                signal
            });
            await CacheService.set(cacheKey, response.data, 1800); // 30 mins
            return response.data;
        } finally {
            this.inflightRequests.delete(requestKey);
        }
    })();

    this.inflightRequests.set(requestKey, request);
    return request;
  },

  async getWeatherByCoords(lat: number, lon: number, units: 'metric' | 'imperial' = 'metric', signal?: AbortSignal): Promise<WeatherData> {
    const cacheKey = `weather_${lat}_${lon}_${units}`;
    const cached = await CacheService.getValid(cacheKey);
    if (cached) return cached;

    const requestKey = `getWeatherByCoords:${lat}:${lon}:${units}`;
    if (this.inflightRequests.has(requestKey)) return this.inflightRequests.get(requestKey);

    const request = (async () => {
        try {
            const response = await axios.get<WeatherData>(`${BASE_URL}/weather`, {
                params: { lat, lon, appid: API_KEY, units },
                signal
            });
            await CacheService.set(cacheKey, response.data, 600);
            return response.data;
        } finally {
            this.inflightRequests.delete(requestKey);
        }
    })();

    this.inflightRequests.set(requestKey, request);
    return request;
  },

  async getForecastByCoords(lat: number, lon: number, units: 'metric' | 'imperial' = 'metric', signal?: AbortSignal): Promise<ForecastData> {
    const cacheKey = `forecast_${lat}_${lon}_${units}`;
    const cached = await CacheService.getValid(cacheKey);
    if (cached) return cached;

    const requestKey = `getForecastByCoords:${lat}:${lon}:${units}`;
    if (this.inflightRequests.has(requestKey)) return this.inflightRequests.get(requestKey);

    const request = (async () => {
        try {
            const response = await axios.get<ForecastData>(`${BASE_URL}/forecast`, {
                params: { lat, lon, appid: API_KEY, units },
                signal
            });
            await CacheService.set(cacheKey, response.data, 1800);
            return response.data;
        } finally {
            this.inflightRequests.delete(requestKey);
        }
    })();

    this.inflightRequests.set(requestKey, request);
    return request;
  }
};
