import { useState, useCallback } from 'react';
import { CurrentWeather, ForecastDay, TemperatureUnit } from '../types/weather';

export const useWeather = (defaultUnit: TemperatureUnit) => {
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather | null>(null);
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeatherData = useCallback(async (city: string) => {
    try {
      setLoading(true);
      setError(null);

      const weatherResponse = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
      const forecastResponse = await fetch(`/api/forecast?city=${encodeURIComponent(city)}`);

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
  }, []);

  return {
    currentWeather,
    forecast,
    loading,
    error,
    fetchWeatherData
  };
};