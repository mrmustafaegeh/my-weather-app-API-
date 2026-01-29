import React from 'react';
import { ForecastData } from '../../types/weather';
import { formatDate, getWeatherIconUrl, processDailyForecast } from '../../utils/helpers';
import { motion } from 'framer-motion';

interface DailyForecastProps {
  data: ForecastData;
}

export const DailyForecast: React.FC<DailyForecastProps> = ({ data }) => {
  const daily = processDailyForecast(data);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className="w-full max-w-4xl mx-auto px-4 mb-20"
    >
       <h3 className="text-white/60 text-sm font-medium uppercase tracking-wider mb-4">5-Day Outlook</h3>
       <div className="space-y-4">
          {daily.map((item: any, i: number) => (
             <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                <span className="w-16 font-medium text-lg">{i === 0 ? 'Today' : formatDate(item.dt).split(',')[0]}</span>
                
                <div className="flex-1 flex justify-center items-center gap-2">
                   <img 
                      src={getWeatherIconUrl(item.weather[0].icon)} 
                      alt="" 
                      className="w-8 h-8 opacity-80"
                      width={32}
                      height={32}
                   />
                   <span className="text-sm opacity-50 hidden sm:block w-24 text-center">{item.weather[0].main}</span>
                </div>

                <div className="flex items-center gap-6 w-24 justify-end">
                   <span className="font-semibold text-lg opacity-90">{Math.round(item.temp_max)}°</span>
                   <span className="font-medium text-lg opacity-40">{Math.round(item.temp_min)}°</span>
                </div>
             </div>
          ))}
       </div>
    </motion.div>
  );
};
