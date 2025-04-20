
import { ForecastDay, TemperatureUnit } from '../types/weather';
import { formatTemperature } from '../utils/temperature';

interface ForecastCardProps {
  forecast: ForecastDay;
  unit: TemperatureUnit;
}

export default function ForecastCard({ forecast, unit }: ForecastCardProps) {
  const date = new Date(forecast.dt * 1000);
  const iconUrl = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`;

  return (
    <div className="card bg-base-100 shadow-sm p-4 text-center">
      <p className="text-sm mb-2">
        {date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
      </p>
      <img 
        src={iconUrl} 
        alt={forecast.weather[0].description} 
        className="w-12 h-12 mx-auto"
      />
      <p className="text-sm mt-2">
        {formatTemperature(forecast.temp.max, unit)}
      </p>
    </div>
  );
}
