import React from 'react';
import { CurrentWeather, TemperatureUnit } from '../types/weather';
import { formatDate } from '../utils/dateFormat';

interface WeatherCardProps {
  weather: CurrentWeather;
  unit: TemperatureUnit;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weather, unit }) => {
  const temperatureSymbol = unit === 'celsius' ? '°C' : '°F';

  // Get weather icon URL
  const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`;

  return (
    <div className="card bg-base-200 shadow-lg overflow-hidden h-full">
      <div className="card-body p-6">
        <div className="flex flex-col md:flex-row items-center">
          <div className="flex-1">
            <h2 className="card-title text-3xl mb-1">{weather.name}, {weather.sys.country}</h2>
            <p className="text-lg opacity-70">{formatDate(weather.dt)}</p>
            <div className="flex items-center mt-4">
              <img 
                src={iconUrl} 
                alt={weather.weather[0].description} 
                className="w-24 h-24 mr-2"
              />
              <div>
                <div className="text-5xl font-bold">
                  {Math.round(weather.main.temp)}{temperatureSymbol}
                </div>
                <div className="text-xl capitalize">
                  {weather.weather[0].description}
                </div>
              </div>
            </div>
          </div>
          
          <div className="divider md:divider-horizontal"></div>
          
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="stat-value">
              <div className="stat-title">Min</div>
              <div className="text-2xl">
                {Math.round(weather.main.temp_min)}{temperatureSymbol}
              </div>
            </div>
            <div>
              <div className="stat-title">Max</div>
              <div className="text-2xl">
                {Math.round(weather.main.temp_max)}{temperatureSymbol}
              </div>
            </div>
            <div>
              <div className="stat-title">Feels like</div>
              <div className="text-2xl">
                {Math.round(weather.main.feels_like)}{temperatureSymbol}
              </div>
            </div>
            <div>
              <div className="stat-title">Pressure</div>
              <div className="text-2xl">
                {weather.main.pressure} hPa
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
