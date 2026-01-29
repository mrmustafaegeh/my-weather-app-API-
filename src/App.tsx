import { useEffect } from 'react';
import { useWeather } from './hooks/useWeather';
import { useGeolocation } from './hooks/useGeolocation';
import { SearchBar } from './components/weather/SearchBar';
import { CurrentWeather } from './components/weather/CurrentWeather';
import { HourlyForecast } from './components/weather/HourlyForecast';
import { DailyForecast } from './components/weather/DailyForecast';
import { DayRhythm } from './components/weather/DayRhythm';
import { WeatherInsight } from './components/weather/WeatherInsight';
import { SmartSummary } from './components/weather/SmartSummary';
import { WeatherSkeleton } from './components/weather/WeatherSkeleton';
import { WeatherIntelligence } from './components/weather/WeatherIntelligence';
import { Layout } from './components/layout/Layout';
import { CloudSun } from 'lucide-react';

function App() {
  const { weather, forecast, aiInsights, loading, error, fetchWeather, fetchWeatherByCoords } = useWeather();
  const { location, getLocation } = useGeolocation();

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    if (weather) {
      document.title = `${weather.name} ${Math.round(weather.main.temp)}° - WeatherSense`;
    } else {
      document.title = "WeatherSense";
    }
  }, [weather]);

  useEffect(() => {
    if (location) {
      fetchWeatherByCoords(location.lat, location.lon);
    }
  }, [location, fetchWeatherByCoords]);

  const handleSearch = (city: string) => {
    fetchWeather(city);
  };

  return (
    <Layout weather={weather}>
        <header className="flex items-center justify-between p-6">
          <div className="flex items-center gap-2 opacity-80">
            <CloudSun className="w-6 h-6" />
            <h1 className="text-lg font-semibold tracking-tight">WeatherSense</h1>
          </div>
          <div className="text-xs font-medium opacity-60 uppercase tracking-widest hidden sm:block">
            {new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
          </div>
        </header>

        <div className="px-4 w-full max-w-xl mx-auto z-50">
           <SearchBar 
              onSearch={handleSearch} 
              onLocationClick={getLocation} 
              loading={loading}
           />
        </div>

        {error && (
            <div className="mx-4 bg-red-500/10 border border-red-500/20 p-4 rounded-xl text-center mb-8 backdrop-blur-sm">
                <p className="text-sm">{error}</p>
            </div>
        )}

        {!weather && !loading && !error && (
            <div className="text-center mt-32 opacity-40 animate-pulse">
                <p className="text-2xl font-light">Search for a city...</p>
            </div>
        )}

        {loading && !weather && <WeatherSkeleton />}

        {weather && (
          <div className="animate-fade-in flex flex-col pb-20">
            {/* Main Hero */}
            <CurrentWeather data={weather} unit="metric" />
            
            {/* Senior Feature: Weather Intelligence Engine */}
            {forecast && <WeatherIntelligence weather={weather} forecast={forecast} />}

            {/* AI Summary (Optional Layer) */}
            {aiInsights && <SmartSummary data={aiInsights} />}

            {/* Horizontal Scroll */}
            {forecast && <HourlyForecast data={forecast} />}

            {/* Story Section: Rhythm + Insight */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 max-w-4xl mx-auto w-full">
               {forecast && <DayRhythm data={forecast} />}
               <div className="flex flex-col justify-center">
                  <WeatherInsight data={weather} />
               </div>
            </div>
            
            {/* Long Term */}
            {forecast && <DailyForecast data={forecast} />}

            <footer className="text-center opacity-30 text-xs mt-10 mb-6 flex flex-col gap-2">
               <p>WeatherSense v2.0 • Senior Architecture Demo</p>
               <p className="opacity-50">Powered by OpenWeatherMap • Cached via IndexedDB</p>
            </footer>
          </div>
        )}
    </Layout>
  );
}

export default App;
