import React, { useMemo } from 'react';
import { WeatherData, ForecastData } from '../../types/weather';
import { calculateComfortIndex, analyzeTrends } from '../../domain/weatherLogic';
import { motion } from 'framer-motion';
import { AlertCircle, Activity, Wind, Droplets } from 'lucide-react';

interface WeatherIntelligenceProps {
  weather: WeatherData;
  forecast: ForecastData;
}

export const WeatherIntelligence: React.FC<WeatherIntelligenceProps> = ({ weather, forecast }) => {
  const comfort = useMemo(() => calculateComfortIndex(weather), [weather]);
  const trends = useMemo(() => analyzeTrends(forecast), [forecast]);

  // Determine accent color based on comfort level
  const getAccent = (level: string) => {
    switch(level) {
        case 'Extreme': return 'bg-red-500/20 text-red-200 border-red-500/30';
        case 'Severe': return 'bg-orange-500/20 text-orange-200 border-orange-500/30';
        case 'Challenging': return 'bg-yellow-500/20 text-yellow-200 border-yellow-500/30';
        default: return 'bg-emerald-500/20 text-emerald-200 border-emerald-500/30';
    }
  };

  const accentClass = getAccent(comfort.level);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 my-8 grid grid-cols-1 md:grid-cols-2 gap-6">
       
       {/* Comfort Index Card */}
       <motion.div 
         initial={{ opacity: 0, scale: 0.95 }}
         animate={{ opacity: 1, scale: 1 }}
         transition={{ delay: 0.3 }}
         className={`p-6 rounded-3xl border backdrop-blur-md ${accentClass}`}
       >
          <div className="flex items-center gap-2 mb-2 opacity-80">
            <Activity className="w-5 h-5" />
            <h3 className="text-sm font-bold uppercase tracking-widest">Comfort Index</h3>
          </div>
          <p className="text-3xl font-light mb-1">{comfort.level}</p>
          <p className="text-sm opacity-70">
            Score: {100 - comfort.score}/100 
            {comfort.factors.length > 0 && ` • Impacted by ${comfort.factors.join(', ')}`}
          </p>
       </motion.div>

       {/* Trend Analysis Card */}
       <motion.div 
         initial={{ opacity: 0, scale: 0.95 }}
         animate={{ opacity: 1, scale: 1 }}
         transition={{ delay: 0.4 }}
         className="p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md"
       >
          <div className="flex items-center gap-2 mb-2 text-blue-200 opacity-80">
            <AlertCircle className="w-5 h-5" />
            <h3 className="text-sm font-bold uppercase tracking-widest">Forecast Trend</h3>
          </div>
          <p className="text-lg font-light leading-snug mb-2">
            {trends.trendMessage}
          </p>
          <div className="flex gap-4 text-xs opacity-50 mt-4">
             {trends.rainApproaching && <span className='flex items-center gap-1'><Droplets className="w-3 h-3"/> Rain Exp.</span>}
             {trends.tempRange > 8 && <span className='flex items-center gap-1'><Activity className="w-3 h-3"/> High Variance</span>}
             <span className='flex items-center gap-1'><Wind className="w-3 h-3"/> Pressure Δ {Math.round(trends.pressureChange)}hPa</span>
          </div>
       </motion.div>

    </div>
  );
};
