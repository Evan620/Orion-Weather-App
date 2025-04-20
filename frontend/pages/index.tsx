import React, { useState } from 'react';
import Layout from '../components/Layout';
import SearchBar from '../components/SearchBar';
import WeatherCard from '../components/WeatherCard';
import ForecastCard from '../components/ForecastCard';
import WeatherDetails from '../components/WeatherDetails';
import TemperatureToggle from '../components/TemperatureToggle';
import { useWeather } from '../hooks/useWeather';
import { TemperatureUnit } from '../types/weather';

const Home: React.FC = () => {
  const [city, setCity] = useState<string>('');
  const [unit, setUnit] = useState<TemperatureUnit>('celsius');

  const { 
    currentWeather, 
    forecast, 
    loading, 
    error,
    fetchWeatherData 
  } = useWeather(unit);

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
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-4 md:mb-0">Weather App</h1>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <SearchBar onSearch={handleSearch} />
            <TemperatureToggle unit={unit} onToggle={handleUnitToggle} />
          </div>
        </div>

        {error && (
          <div className="alert alert-error mb-4">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-6 h-6 stroke-current mr-3">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
              </svg>
              <span>{error}</span>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="loading loading-spinner loading-lg text-primary"></div>
          </div>
        ) : (
          <div>
            {currentWeather && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="lg:col-span-2">
                  <WeatherCard weather={currentWeather} unit={unit} />
                </div>
                <div>
                  <WeatherDetails 
                    windSpeed={currentWeather.wind.speed} 
                    humidity={currentWeather.main.humidity} 
                  />
                </div>
              </div>
            )}

            {forecast && forecast.length > 0 && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">3-Day Forecast</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {forecast.map((day, index) => (
                    <ForecastCard key={index} forecast={day} unit={unit} />
                  ))}
                </div>
              </div>
            )}

            {!currentWeather && !loading && !error && (
              <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-primary mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h2 className="text-xl font-medium mb-2">Search for a city to get started</h2>
                <p className="text-gray-500">Enter a city name to see the current weather and forecast</p>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Home;
