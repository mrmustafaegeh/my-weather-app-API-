import React from 'react';
import { ForecastData } from '../../types/weather';
import { motion } from 'framer-motion';
import { getWeatherIconUrl } from '../../utils/helpers';

interface DayRhythmProps {
  data: ForecastData;
}

// Helper to determine phase of day from timestamp
const getPhase = (hour: number) => {
  if (hour >= 5 && hour < 12) return 'Morning';
  if (hour >= 12 && hour < 17) return 'Afternoon';
  if (hour >= 17 && hour < 21) return 'Evening';
  return 'Night';
};

export const DayRhythm: React.FC<DayRhythmProps> = ({ data }) => {
  // Aggregate forecast items into phases for the NEXT 24 hours
  const phases = ['Morning', 'Afternoon', 'Evening', 'Night'];
  const now = new Date();
  
  // Find next occurrence of each phase
  const rhythmItems = phases.map(phase => {
    return data.list.find(item => {
      const date = new Date(item.dt * 1000);
      return getPhase(date.getHours()) === phase && date.getTime() > now.getTime();
    });
  }).filter(Boolean); // Remove if current time passed a phase already today

  if (rhythmItems.length === 0) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="w-full max-w-xs mx-auto my-12 relative pl-8 border-l border-white/10"
    >
       <h3 className="absolute -left-1 -top-8 text-sm font-medium opacity-50 uppercase tracking-widest -rotate-90 origin-bottom-left">Day Rhythm</h3>
       
       <div className="space-y-8">
         {rhythmItems.map((item: any, i) => {
             const date = new Date(item.dt * 1000);
             const phase = getPhase(date.getHours());
             
             return (
               <div key={i} className="relative group">
                  <div className="absolute -left-[37px] top-1 w-4 h-4 rounded-full bg-white/20 border-2 border-white/50 group-hover:bg-white group-hover:scale-110 transition-all"></div>
                  <div className="flex items-center justify-between">
                     <div>
                        <p className="text-sm opacity-50 uppercase tracking-wide">{phase}</p>
                        <p className="text-xl font-medium">{Math.round(item.main.temp)}°</p>
                     </div>
                     <div className="flex flex-col items-end">
                       <img src={getWeatherIconUrl(item.weather[0].icon)} alt="" className="w-10 h-10" width={40} height={40}/>
                       <p className="text-xs opacity-60 capitalize">{item.weather[0].description}</p>
                     </div>
                  </div>
               </div>
             );
         })}
       </div>
    </motion.div>
  );
};
