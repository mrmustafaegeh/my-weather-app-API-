import React from 'react';
import { motion } from 'framer-motion';
import { useWeatherTheme } from '../../hooks/useWeatherTheme';
import { WeatherData } from '../../types/weather';

interface AtmosphericBackgroundProps {
  weather: WeatherData | null;
}

export const AtmosphericBackground: React.FC<AtmosphericBackgroundProps> = ({ weather }) => {
  const theme = useWeatherTheme(weather);

  // Derive atmospheric layers from current theme
  const baseGradient = `linear-gradient(to bottom, ${theme.from} 0%, ${theme.via || theme.to} 50%, ${theme.to} 100%)`;
  
  // Specific atmospheric effects based on weather condition
  // These are SVG/CSS layers that add depth without images
  const condition = weather?.weather[0].main.toLowerCase() || 'clear';
  
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Layer 1: Base Skyscape (Dynamic Gradient) */}
        <div 
          className="absolute inset-0 transition-all duration-[2000ms] ease-out"
          style={{ background: baseGradient }}
        />

        {/* Layer 2: Light Diffusion / Bloom (Top Gradient) */}
        <div className="absolute top-0 left-0 right-0 h-[60vh] bg-gradient-to-b from-white/10 to-transparent opacity-30 mix-blend-soft-light" />

        {/* Layer 3: Atmospheric Depth (Bottom Fog) */}
        <div className="absolute bottom-0 left-0 right-0 h-[40vh] bg-gradient-to-t from-black/20 to-transparent opacity-60" />

        {/* Layer 4: Procedural Noise (Film Grain) - High Quality SVG */}
        <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay contrast-125" 
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
        />

        {/* Layer 5: Condition Specific Atmosphere */}
        {condition.includes('cloud') && <CloudAtmosphere />}
        {condition.includes('rain') && <RainAtmosphere />}
        {condition.includes('clear') && <SunAtmosphere isNight={false} />} 
        {/* We need isNight logic check. For now assume day/dynamic from theme */}
    </div>
  );
};

// --- Atmospheric Sub-Components (Pure CSS/SVG) ---

const CloudAtmosphere = () => (
    <motion.div 
       initial={{ opacity: 0 }} 
       animate={{ opacity: 1 }} 
       transition={{ duration: 2 }}
       className="absolute inset-0"
    >
        {/* Static blurred shapes simulating distant clouds */}
        <div className="absolute top-1/4 -left-20 w-[600px] h-[400px] bg-white/5 rounded-full blur-[120px] mix-blend-overlay" />
        <div className="absolute top-1/3 -right-20 w-[500px] h-[300px] bg-white/5 rounded-full blur-[100px] mix-blend-overlay" />
    </motion.div>
);

const RainAtmosphere = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0">
         <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 to-slate-800/20 mix-blend-multiply" />
    </motion.div>
);

const SunAtmosphere = ({ isNight }: { isNight: boolean }) => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0">
        {!isNight && (
            <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-yellow-100/10 rounded-full blur-[150px] mix-blend-soft-light" />
        )}
    </motion.div>
);
