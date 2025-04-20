import { useState, useCallback } from 'react';
import { CurrentWeather, ForecastDay, TemperatureUnit } from '../types/weather';

// We'll use a mock API for now, since the backend may not be running yet
// For a real implementation, this would be: 'http://localhost:8000/api'
// This temporary mock API is just for demonstration purposes
const useMockData = true;

// Mock data for testing the frontend when backend is not available
const mockWeatherData: CurrentWeather = {
  dt: Math.floor(Date.now() / 1000),
  name: "London",
  main: {
    temp: 15.25,
    feels_like: 14.8,
    temp_min: 12.78,
    temp_max: 16.99,
    pressure: 1024,
    humidity: 76
  },
  weather: [
    {
      id: 801,
      main: "Clouds",
      description: "few clouds",
      icon: "02d"
    }
  ],
  wind: {
    speed: 3.6,
    deg: 250
  },
  sys: {
    country: "GB"
  },
  coord: {
    lat: 51.5074,
    lon: -0.1278
  }
};

const mockForecastData: ForecastDay[] = [
  {
    date: Math.floor(Date.now() / 1000) + 86400,
    temp: 16.2,
    temp_min: 13.1,
    temp_max: 17.8,
    weather: {
      id: 800,
      main: "Clear",
      description: "clear sky",
      icon: "01d"
    },
    wind_speed: 4.1,
    humidity: 65
  },
  {
    date: Math.floor(Date.now() / 1000) + 172800,
    temp: 17.5,
    temp_min: 14.2,
    temp_max: 19.1,
    weather: {
      id: 803,
      main: "Clouds",
      description: "broken clouds",
      icon: "04d"
    },
    wind_speed: 3.8,
    humidity: 68
  },
  {
    date: Math.floor(Date.now() / 1000) + 259200,
    temp: 14.8,
    temp_min: 12.5,
    temp_max: 16.3,
    weather: {
      id: 500,
      main: "Rain",
      description: "light rain",
      icon: "10d"
    },
    wind_speed: 5.2,
    humidity: 82
  }
];

export const useWeather = (defaultUnit: TemperatureUnit = 'celsius') => {
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather | null>(null);
  const [forecast, setForecast] = useState<ForecastDay[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const fetchWeatherData = useCallback(async (city: string, unit: TemperatureUnit = defaultUnit) => {
    setLoading(true);
    setError(null);
    
    try {
      if (useMockData) {
        // Use mock data for frontend testing
        // In a real application, this would be replaced with actual API calls
        setTimeout(() => {
          // Convert temperatures based on the selected unit if needed
          if (unit === 'fahrenheit') {
            // Normally this would be done by the backend, but for mock data we do it here
            setCurrentWeather({
              ...mockWeatherData,
              name: city, // Use searched city name
              main: {
                ...mockWeatherData.main,
                temp: mockWeatherData.main.temp * 9/5 + 32,
                feels_like: mockWeatherData.main.feels_like * 9/5 + 32,
                temp_min: mockWeatherData.main.temp_min * 9/5 + 32,
                temp_max: mockWeatherData.main.temp_max * 9/5 + 32,
              }
            });
            
            setForecast(mockForecastData.map(day => ({
              ...day,
              temp: day.temp * 9/5 + 32,
              temp_min: day.temp_min * 9/5 + 32,
              temp_max: day.temp_max * 9/5 + 32,
            })));
          } else {
            setCurrentWeather({...mockWeatherData, name: city});
            setForecast(mockForecastData);
          }
          setLoading(false);
        }, 800); // Simulate network delay
        
        return;
      }
      
      // Real API implementation - would be used when the backend is ready
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
      if (!useMockData) { // Only set loading to false here if not using mock data
        setLoading(false);
      }
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
