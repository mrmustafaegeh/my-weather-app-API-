import { WeatherData, ForecastData } from '../types/weather';

export interface WeatherConditionWeights {
  temp: number;
  wind: number;
  humidity: number;
  clouds: number;
}

export type ComfortLevel = 'Comfortable' | 'Noticeable' | 'Challenging' | 'Severe' | 'Extreme';

export const calculateComfortIndex = (data: WeatherData): { score: number; level: ComfortLevel; factors: string[] } => {
  let score = 0;
  const factors: string[] = [];
  const humidity = data.main.humidity;
  const wind = data.wind.speed; // m/s
  const feelsLike = data.main.feels_like;

  // 1. Temperature Deviation (0-40)
  // Ideal range assumed 18-24°C
  const deviation = Math.abs(feelsLike - 21);
  if (deviation > 5) {
     const tempScore = Math.min((deviation - 5) * 2, 40);
     score += tempScore;
     if (tempScore > 10) factors.push(feelsLike > 21 ? 'Heat' : 'Cold');
  }

  // 2. Wind Chill / Discomfort (0-30)
  if (wind > 5) {
      const windScore = Math.min((wind - 5) * 3, 30);
      score += windScore;
      if (windScore > 10) factors.push('Wind');
  }

  // 3. Humidity Impact (0-30)
  // High humidity is bad when hot, low humidity is bad when cold? strictly dew point is better but keeping simple
  if (humidity > 70 || humidity < 30) {
      const humScore = Math.min(Math.abs(humidity - 50) * 0.5, 30);
      score += humScore;
      if (humScore > 10) factors.push(humidity > 70 ? 'Humidity' : 'Dryness');
  }

  // Map Score to Level (0-100 scale, where 0 is perfect)
  let level: ComfortLevel = 'Comfortable';
  if (score > 20) level = 'Noticeable';
  if (score > 40) level = 'Challenging';
  if (score > 60) level = 'Severe';
  if (score > 80) level = 'Extreme';

  return { score: Math.round(score), level, factors };
};

export const analyzeTrends = (forecast: ForecastData) => {
    // Detect instability over next 24h
    const next24 = forecast.list.slice(0, 8);
    const temps = next24.map(i => i.main.temp);
    const pressures = next24.map(i => i.main.pressure);
    
    const tempRange = Math.max(...temps) - Math.min(...temps);
    const pressureChange = Math.max(...pressures) - Math.min(...pressures);

    const isVolatile = tempRange > 8 || pressureChange > 10;
    
    // Check for precipitation start
    const rain = next24.find(i => i.weather[0].main === 'Rain');
    
    return {
        isVolatile,
        tempRange,
        pressureChange,
        rainApproaching: !!rain,
        trendMessage: isVolatile 
            ? "Rapid weather changes expected in the next 24 hours." 
            : "Conditions are expected to remain stable."
    };
};
