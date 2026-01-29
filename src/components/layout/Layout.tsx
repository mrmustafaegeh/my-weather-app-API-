import React, { ReactNode } from 'react';
import { WeatherData } from '../../types/weather';
import { useWeatherTheme } from '../../hooks/useWeatherTheme';

interface LayoutProps {
  weather: WeatherData | null;
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ weather, children }) => {
  const theme = useWeatherTheme(weather);

  return (
    <div 
      className={`min-h-screen transition-all duration-[2000ms] ease-out relative overflow-hidden flex flex-col ${theme.text}`}
      style={{
        background: `linear-gradient(to bottom, ${theme.from}, ${theme.via || theme.to} 50%, ${theme.to})`
      }}
    >
      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none z-0 mix-blend-overlay" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />

      {/* Dark Overlay for Contrast */}
      <div className="absolute inset-0 bg-black/15 pointer-events-none z-0" />
      
      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto flex-1 flex flex-col">
        {children}
      </div>
    </div>
  );
};
