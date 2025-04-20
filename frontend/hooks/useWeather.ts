import { useState, useCallback } from 'react';
import { CurrentWeather, ForecastDay, TemperatureUnit } from '../types/weather';

export const useWeather = (defaultUnit: TemperatureUnit = 'celsius') => {
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather | null>(null);
  const [forecast, setForecast] = useState<ForecastDay[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const fetchWeatherData = useCallback(async (city: string, unit: TemperatureUnit = defaultUnit) => {
    setLoading(true);
    setError(null);
    
    try {
      // API base URL - would be set to backend in production
      const API_BASE_URL = 'http://localhost:8000/api';
      
      // Fetch current weather data
      const weatherResponse = await fetch(
        `${API_BASE_URL}/weather?city=${encodeURIComponent(city)}&units=${unit}`
      );
      
      if (!weatherResponse.ok) {
        const errorData = await weatherResponse.json();
        throw new Error(errorData.message || 'Failed to fetch weather data');
      }
      
      const weatherData = await weatherResponse.json();
      setCurrentWeather(weatherData);
      
      // Fetch forecast data
      const forecastResponse = await fetch(
        `${API_BASE_URL}/forecast?city=${encodeURIComponent(city)}&units=${unit}`
      );
      
      if (!forecastResponse.ok) {
        const errorData = await forecastResponse.json();
        throw new Error(errorData.message || 'Failed to fetch forecast data');
      }
      
      const forecastData = await forecastResponse.json();
      setForecast(forecastData);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setCurrentWeather(null);
      setForecast(null);
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