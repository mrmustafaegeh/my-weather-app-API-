import { WeatherData, ForecastData } from '../types/weather';
import { CacheService } from './cacheService';

export interface AIInsights {
  summary: string;
  outfit: string;
  activity: string;
  risks: string[];
}

const AI_API_KEY = import.meta.env.VITE_AI_API_KEY;

// Fallback heuristic if no AI Key is provided (Simulation Mode)
function simulateAI(weather: WeatherData): AIInsights {
  const isRain = weather.weather.some(c => c.main.toLowerCase().includes('rain'));
  const temp = weather.main.temp;
  
  let summary = `The current temperature is ${Math.round(temp)}°C with ${weather.weather[0].description}.`;
  let outfit = temp < 10 ? "Wear a heavy coat." : temp < 20 ? "A light jacket is recommended." : "T-shirt weather!";
  if (isRain) outfit += " Don't forget an umbrella.";
  
  return {
    summary: summary,
    outfit: outfit,
    activity: isRain ? "Indoor activities are best today." : "Great day for a walk!",
    risks: isRain ? ["Slippery roads"] : [],
  };
}

export const AIService = {
  async getInsights(weather: WeatherData, forecast: ForecastData): Promise<AIInsights> {
    const cacheKey = `ai_insights_${weather.name}_${new Date().getHours()}`;
    const cached = await CacheService.getValid(cacheKey);
    if (cached) return cached;

    if (!AI_API_KEY) {
      console.warn("No AI API Key found. Using simulation mode. Set VITE_AI_API_KEY in .env");
      return simulateAI(weather);
    }

    try {
      // Example implementation for OpenAI
      const prompt = `
        Analyze this weather data for ${weather.name}:
        Current: ${weather.main.temp}°C, ${weather.weather[0].description}, Wind: ${weather.wind.speed}m/s.
        Forecast includes rain in upcoming hours: ${forecast.list.slice(0, 3).some(x => x.weather[0].main === 'Rain')}.
        
        Provide a JSON response with keys: summary, outfit, activity, risks (array).
        Keep summary under 20 words. Friendly tone.
      `;

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${AI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7,
        })
      });

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content;
      
      let parsed: AIInsights;
      try {
        parsed = JSON.parse(content);
      } catch (e) {
        // Fallback if structured JSON fails
        parsed = simulateAI(weather); 
        parsed.summary = content || parsed.summary;
      }

      await CacheService.set(cacheKey, parsed, 3600); // Cache for 1 hour
      return parsed;

    } catch (error) {
      console.error("AI Service Error:", error);
      return simulateAI(weather);
    }
  }
};
