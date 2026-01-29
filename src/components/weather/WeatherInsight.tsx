import React from 'react';
import { WeatherData } from '../../types/weather';
import { motion } from 'framer-motion';

interface WeatherInsightProps {
  data: WeatherData;
}

export const WeatherInsight: React.FC<WeatherInsightProps> = ({ data }) => {
  const temp = data.main.temp;
  const feelsLike = data.main.feels_like;
  const diff = feelsLike - temp;

  let message = "";
  if (Math.abs(diff) < 1) {
    message = "It feels exactly as it is.";
  } else if (diff > 0) {
    message = `Humidity makes it feel closer to ${Math.round(feelsLike)}°.`;
  } else {
    message = `Wind chill makes it feel like ${Math.round(feelsLike)}°.`;
  }

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 }}
      className="max-w-md mx-auto bg-white/5 backdrop-blur-md rounded-2xl p-6 text-center border border-white/10 shadow-lg my-8"
    >
       <h4 className="text-sm font-semibold uppercase tracking-widest text-white/50 mb-2">Insight</h4>
       <p className="text-lg font-light leading-relaxed">
         "Although it's <span className="font-medium">{Math.round(temp)}°</span>, {message.toLowerCase()}"
       </p>
    </motion.div>
  );
};
