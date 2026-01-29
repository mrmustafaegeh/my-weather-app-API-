export type WeatherTime = 'dawn' | 'day' | 'dusk' | 'night';
export type WeatherCondition = 'clear' | 'clouds' | 'rain' | 'snow' | 'thunder' | 'drizzle' | 'fog';

export interface ThemeGradient {
  from: string;
  via?: string;
  to: string;
  text: string;
}

export const getWeatherCondition = (id: number): WeatherCondition => {
  if (id >= 200 && id < 300) return 'thunder';
  if (id >= 300 && id < 400) return 'drizzle';
  if (id >= 500 && id < 600) return 'rain';
  if (id >= 600 && id < 700) return 'snow';
  if (id >= 700 && id < 800) return 'fog';
  if (id === 800) return 'clear';
  return 'clouds';
};

export const getTimeOfDay = (dt: number, sunrise: number, sunset: number): WeatherTime => {
  const time = dt;
  if (time >= sunrise - 3600 && time < sunrise + 3600) return 'dawn';
  if (time >= sunrise + 3600 && time < sunset - 3600) return 'day';
  if (time >= sunset - 3600 && time < sunset + 3600) return 'dusk';
  return 'night';
};

// Apple-inspired smooth gradients (Darkened for better contrast)
const gradients: Record<WeatherCondition, Record<WeatherTime, ThemeGradient>> = {
  clear: {
    dawn: { from: '#5f2c82', to: '#49a09d', text: 'text-white' }, // Deep Purple/Teal
    day: { from: '#005C97', to: '#363795', text: 'text-white' }, // Deep Royal Blue
    dusk: { from: '#2C3E50', to: '#FD746C', text: 'text-white' }, // Dark Grey to Sunset Red
    night: { from: '#0f172a', via: '#1e293b', to: '#0f172a', text: 'text-white' },
  },
  clouds: {
    dawn: { from: '#232526', to: '#414345', text: 'text-white' },
    day: { from: '#373B44', to: '#4286f4', text: 'text-white' }, // Dark Grey to Blue
    dusk: { from: '#2C3E50', to: '#4CA1AF', text: 'text-white' },
    night: { from: '#232526', to: '#414345', text: 'text-white' },
  },
  rain: {
    dawn: { from: '#1F1C2C', to: '#928DAB', text: 'text-white' },
    day: { from: '#203A43', to: '#2C5364', text: 'text-white' }, // Forest/Dark Blue
    dusk: { from: '#16222A', to: '#3A6073', text: 'text-white' },
    night: { from: '#000000', via: '#141E30', to: '#243B55', text: 'text-white' },
  },
  drizzle: {
    dawn: { from: '#2c3e50', to: '#3498db', text: 'text-white' },
    day: { from: '#3a6073', to: '#3b5998', text: 'text-white' },
    dusk: { from: '#141E30', to: '#243B55', text: 'text-white' },
    night: { from: '#141E30', to: '#243B55', text: 'text-white' },
  },
  snow: {
    dawn: { from: '#2980B9', to: '#6DD5FA', text: 'text-white' },
    day: { from: '#4B79A1', to: '#283E51', text: 'text-white' }, // Dark Blue/Grey
    dusk: { from: '#2C3E50', to: '#4CA1AF', text: 'text-white' },
    night: { from: '#1e130c', to: '#9a8478', text: 'text-white' },
  },
  thunder: {
    dawn: { from: '#0F2027', to: '#203A43', text: 'text-white' },
    day: { from: '#232526', to: '#414345', text: 'text-white' },
    dusk: { from: '#141E30', to: '#243B55', text: 'text-white' },
    night: { from: '#000000', via: '#130F40', to: '#000000', text: 'text-white' },
  },
  fog: {
    dawn: { from: '#3E5151', to: '#DECBA4', text: 'text-white' }, // Keeping this one slightly lighter but acceptable
    day: { from: '#485563', to: '#29323c', text: 'text-white' }, // Deep Grey
    dusk: { from: '#3E5151', to: '#DECBA4', text: 'text-white' },
    night: { from: '#0f172a', to: '#2b5876', text: 'text-white' },
  },
};

export const getTheme = (weatherId: number, dt: number, sunrise: number, sunset: number) => {
  const condition = getWeatherCondition(weatherId);
  const time = getTimeOfDay(dt, sunrise, sunset);
  return gradients[condition][time];
};
