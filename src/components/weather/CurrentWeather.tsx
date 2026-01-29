import React from 'react';
import { WeatherData } from '../../types/weather';
import { getWeatherMood } from '../../design/weatherMood';
import { motion } from 'framer-motion';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface CurrentWeatherProps {
  data: WeatherData;
  unit: 'metric' | 'imperial';
}

export const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data }) => {
  const mood = getWeatherMood(data);
  const temp = Math.round(data.main.temp);
  const high = Math.round(data.main.temp_max);
  const low = Math.round(data.main.temp_min);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex flex-col items-center justify-center text-center pt-10 pb-10"
    >
      <h2 className="text-3xl md:text-4xl font-medium tracking-wide mb-1 drop-shadow-md">
        {data.name}
      </h2>
      
      <div className="flex flex-col items-center my-2">
        <span className="text-[6rem] md:text-[9rem] font-light leading-none tracking-tighter drop-shadow-lg">
          {temp}°
        </span>
        <p className="text-xl md:text-2xl font-light opacity-90 mt-2">{data.weather[0].description}</p>
        <p className="text-lg font-medium opacity-80 mt-1">{mood}</p>
      </div>

      <div className="flex items-center gap-6 text-lg mt-4 opacity-80">
        <div className="flex items-center gap-1">
          <span className="sr-only">High</span>
          <ArrowUp className="w-5 h-5" />
          {high}°
        </div>
        <div className="flex items-center gap-1">
          <span className="sr-only">Low</span>
          <ArrowDown className="w-5 h-5" />
          {low}°
        </div>
      </div>
    </motion.div>
  );
};
