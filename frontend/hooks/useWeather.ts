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
      const API_BASE_URL = 'http://0.0.0.0:8000/api';
      
      const weatherResponse = await fetch(`${API_BASE_URL}/weather?city=${encodeURIComponent(city)}&units=${tempUnit}`);
      const forecastResponse = await fetch(`${API_BASE_URL}/forecast?city=${encodeURIComponent(city)}&units=${tempUnit}`);

      if (!weatherResponse.ok || !forecastResponse.ok) {
        throw new Error('Failed to fetch weather data');
      }

      const weatherData = await weatherResponse.json();
      const forecastData = await forecastResponse.json();

      setCurrentWeather(weatherData.data);
      setForecast(forecastData.data);
    } catch (err) {
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