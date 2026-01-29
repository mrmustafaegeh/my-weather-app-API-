import React from 'react';
import { ForecastData } from '../../types/weather';
import { formatTime, getWeatherIconUrl } from '../../utils/helpers';
import { motion } from 'framer-motion';

interface HourlyForecastProps {
  data: ForecastData;
}

export const HourlyForecast: React.FC<HourlyForecastProps> = ({ data }) => {
  // Take next 24 hours (approx 8 items x 3 hours)
  const list = data.list.slice(0, 10);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="w-full max-w-4xl mx-auto my-8"
    >
      <h3 className="text-white/60 text-sm font-medium uppercase tracking-wider mb-4 px-4">Hourly Forecast</h3>
      <div className="flex overflow-x-auto pb-6 px-4 gap-6 hide-scrollbar snap-x snap-mandatory">
        {list.map((item, i) => (
          <div key={i} className="flex flex-col items-center min-w-[70px] snap-center">
            <span className="text-sm font-medium opacity-80 mb-2">{formatTime(item.dt)}</span>
            <img 
              src={getWeatherIconUrl(item.weather[0].icon)} 
              alt={item.weather[0].main} 
              className="w-12 h-12 mb-2 drop-shadow-sm opacity-90"
              width={48}
              height={48}
            />
            <span className="text-xl font-semibold">{Math.round(item.main.temp)}°</span>
            <span className="text-xs opacity-50 mt-1">{Math.round(item.pop * 100)}%</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
