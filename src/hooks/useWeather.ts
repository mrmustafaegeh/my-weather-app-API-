import { useState, useCallback, useRef } from 'react';
import axios from 'axios';
import { WeatherService } from '../services/weatherService';
import { AIService, AIInsights } from '../services/aiService';
import { WeatherData, ForecastData } from '../types/weather';

export const useWeather = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [aiInsights, setAiInsights] = useState<AIInsights | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchWeather = useCallback(async (city: string, units: 'metric' | 'imperial' = 'metric') => {
    if (abortControllerRef.current) {
        abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setLoading(true);
    setError(null);
    try {
      const weatherData = await WeatherService.getWeather(city, units, controller.signal);
      const forecastData = await WeatherService.getForecast(city, units, controller.signal);
      
      setWeather(weatherData);
      setForecast(forecastData);

      // Fetch AI insights in background
      try {
        const insights = await AIService.getInsights(weatherData, forecastData);
        if (!controller.signal.aborted) {
            setAiInsights(insights);
        }
      } catch (aiErr) {
        console.error("AI Insight fetch failed", aiErr);
      }

    } catch (err: any) {
      if (axios.isCancel(err)) return;
      setError(err.response?.data?.message || err.message || "Failed to fetch weather data");
    } finally {
        if (!controller.signal.aborted) {
            setLoading(false);
        }
    }
  }, []);

  const fetchWeatherByCoords = useCallback(async (lat: number, lon: number, units: 'metric' | 'imperial' = 'metric') => {
    if (abortControllerRef.current) {
        abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setLoading(true);
    setError(null);
    try {
      const weatherData = await WeatherService.getWeatherByCoords(lat, lon, units, controller.signal);
      const forecastData = await WeatherService.getForecastByCoords(lat, lon, units, controller.signal);
      
      setWeather(weatherData);
      setForecast(forecastData);

      try {
        const insights = await AIService.getInsights(weatherData, forecastData);
        if (!controller.signal.aborted) {
            setAiInsights(insights);
        }
      } catch (aiErr) {
        console.error("AI Insight fetch failed, using fallback", aiErr);
      }

    } catch (err: any) {
      if (axios.isCancel(err)) return;
      setError(err.response?.data?.message || "Failed to fetch weather data");
    } finally {
        if (!controller.signal.aborted) {
            setLoading(false);
        }
    }
  }, []);

  return { weather, forecast, aiInsights, loading, error, fetchWeather, fetchWeatherByCoords };
};
