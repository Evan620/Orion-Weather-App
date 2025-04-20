import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import SearchBar from '../components/SearchBar';
import WeatherCard from '../components/WeatherCard';
import ForecastCard from '../components/ForecastCard';
import WeatherDetails from '../components/WeatherDetails';
import TemperatureToggle from '../components/TemperatureToggle';
import { useWeather } from '../hooks/useWeather';
import { TemperatureUnit } from '../types/weather';

export default function Home() {
  const [city, setCity] = useState<string>('London');
  const [unit, setUnit] = useState<TemperatureUnit>('celsius');

  const { 
    currentWeather, 
    forecast, 
    loading, 
    error,
    fetchWeatherData 
  } = useWeather(unit);

  useEffect(() => {
    if (fetchWeatherData) {
      fetchWeatherData(city);
    }
  }, [fetchWeatherData, city]);

  const handleSearch = (searchTerm: string) => {
    setCity(searchTerm);
    fetchWeatherData(searchTerm);
  };

  const handleUnitToggle = (newUnit: TemperatureUnit) => {
    setUnit(newUnit);
    if (city) {
      fetchWeatherData(city, newUnit);
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <div className="flex-1 max-w-xl">
            <SearchBar onSearch={handleSearch} />
          </div>
          <div className="ml-4">
            <TemperatureToggle unit={unit} onToggle={handleUnitToggle} />
          </div>
        </div>

        {currentWeather && (
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-4">
              <WeatherCard weather={currentWeather} unit={unit} />
            </div>
            <div className="col-span-8">
              <div className="mb-6">
                <div className="grid grid-cols-3 gap-4">
                  {forecast && forecast.slice(0, 3).map((day, index) => (
                    <ForecastCard key={index} forecast={day} unit={unit} />
                  ))}
                </div>
              </div>
              <WeatherDetails 
                windSpeed={currentWeather.wind.speed} 
                humidity={currentWeather.main.humidity} 
              />
            </div>
          </div>
        )}

        {error && (
          <div className="text-red-500 mt-4">
            {error}
          </div>
        )}

        {loading && (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        )}
      </div>
    </Layout>
  );
}