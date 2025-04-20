import React from 'react';
import { ForecastDay, TemperatureUnit } from '../types/weather';
import { formatDate } from '../utils/dateFormat';

interface ForecastCardProps {
  forecast: ForecastDay;
  unit: TemperatureUnit;
}

const ForecastCard: React.FC<ForecastCardProps> = ({ forecast, unit }) => {
  const temperatureSymbol = unit === 'celsius' ? '°C' : '°F';
  const iconUrl = `https://openweathermap.org/img/wn/${forecast.weather.icon}@2x.png`;

  return (
    <div className="card bg-base-200 shadow-lg overflow-hidden">
      <div className="card-body p-4">
        <h3 className="card-title text-lg justify-center">{formatDate(forecast.date)}</h3>
        <div className="flex flex-col items-center">
          <img 
            src={iconUrl} 
            alt={forecast.weather.description} 
            className="w-16 h-16"
          />
          <div className="text-2xl font-bold mt-1">
            {Math.round(forecast.temp)}{temperatureSymbol}
          </div>
          <div className="text-sm capitalize opacity-70">
            {forecast.weather.description}
          </div>
          <div className="flex justify-around w-full mt-3 text-sm">
            <div>
              <div className="opacity-70">Min</div>
              <div>{Math.round(forecast.temp_min)}{temperatureSymbol}</div>
            </div>
            <div>
              <div className="opacity-70">Max</div>
              <div>{Math.round(forecast.temp_max)}{temperatureSymbol}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForecastCard;
