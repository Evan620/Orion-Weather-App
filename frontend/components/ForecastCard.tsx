
import { Forecast, TemperatureUnit } from '../types/weather';
import { formatTemperature } from '../utils/temperature';

interface ForecastCardProps {
  forecast: Forecast;
  unit: TemperatureUnit;
}

export default function ForecastCard({ forecast, unit }: ForecastCardProps) {
  const mainWeather = forecast.weather[0];
  const iconUrl = `https://openweathermap.org/img/wn/${mainWeather.icon}@2x.png`;
  const date = new Date(forecast.dt * 1000);

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-700">
      <p className="text-lg font-semibold text-gray-700">
        {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
      </p>
      <div className="flex flex-col items-center my-4">
        <img 
          src={iconUrl} 
          alt={mainWeather.description}
          className="w-16 h-16"
        />
        <p className="text-xl font-bold mt-2">
          {formatTemperature(forecast.main.temp, unit)}
        </p>
        <p className="text-sm text-gray-600 capitalize mt-1">
          {mainWeather.description}
        </p>
      </div>
    </div>
  );
}
