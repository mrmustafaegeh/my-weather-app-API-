import React, { ReactNode } from 'react';
import { WeatherData } from '../../types/weather';
import { useWeatherTheme } from '../../hooks/useWeatherTheme'; // Keep hook for text color only
import { AtmosphericBackground } from '../../design/atoms/AtmosphericBackground';

interface LayoutProps {
  weather: WeatherData | null;
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ weather, children }) => {
  const theme = useWeatherTheme(weather);

  return (
    <div className={`min-h-screen relative overflow-hidden flex flex-col ${theme.text}`}>
      
      {/* New Atmospheric System */}
      <AtmosphericBackground weather={weather} />
      
      {/* Dark Contrast Overlay (Global "Sunglasses") */}
      <div className="absolute inset-0 bg-black/15 pointer-events-none z-10" />
      
      <div className="relative z-20 w-full max-w-5xl mx-auto flex-1 flex flex-col">
        {children}
      </div>
    </div>
  );
};
