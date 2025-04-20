import { ForecastDay, TemperatureUnit } from '../types/weather';
import { formatTemperature } from '../utils/temperature';
import { formatDate } from '../utils/dateFormat';

interface ForecastCardProps {
  forecast: ForecastDay;
  unit: TemperatureUnit;
}

export default function ForecastCard({ forecast, unit }: ForecastCardProps) {
  const iconUrl = `https://openweathermap.org/img/wn/${forecast.weather.icon}@2x.png`;
  
  return (
    <div className="card bg-base-100 shadow-md">
      <div className="card-body p-4 text-center">
        <h3 className="text-lg font-medium mb-2">
          {formatDate(forecast.date).split(',')[0]}
        </h3>
        <div className="flex justify-center mb-2">
          <img 
            src={iconUrl} 
            alt={forecast.weather.description} 
            className="w-16 h-16"
          />
        </div>
        <p className="text-xl font-semibold">
          {formatTemperature(forecast.temp, unit)}
        </p>
        <p className="text-sm text-gray-500">
          {formatTemperature(forecast.temp_min, unit)} - {formatTemperature(forecast.temp_max, unit)}
        </p>
      </div>
    </div>
  );
}