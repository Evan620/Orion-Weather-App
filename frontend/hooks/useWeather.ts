import { useState, useCallback } from 'react';
import { CurrentWeather, ForecastDay, TemperatureUnit } from '../types/weather';

export const useWeather = (defaultUnit: TemperatureUnit) => {
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather | null>(null);
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeatherData = useCallback(async (city: string, tempUnit: TemperatureUnit = defaultUnit) => {
    try {
      setLoading(true);
      setError(null);

      // Connect to our Laravel backend
      const API_BASE_URL = '/api';
      
      const weatherResponse = await fetch(`${API_BASE_URL}/weather?city=${encodeURIComponent(city)}&units=${tempUnit}`);
      const forecastResponse = await fetch(`${API_BASE_URL}/forecast?city=${encodeURIComponent(city)}&units=${tempUnit}`);

      const weatherData = await weatherResponse.json();
      const forecastData = await forecastResponse.json();

      if (!weatherResponse.ok) {
        throw new Error(weatherData.message || 'Failed to fetch weather data');
      }

      if (!forecastResponse.ok) {
        throw new Error(forecastData.message || 'Failed to fetch forecast data');
      }

      setCurrentWeather(weatherData);
      setForecast(forecastData);
      
      console.log('Weather Data:', weatherData);
      console.log('Forecast Data:', forecastData);
    } catch (err) {
      console.error('API Error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [defaultUnit]);

  return {
    currentWeather,
    forecast,
    loading,
    error,
    fetchWeatherData
  };
};