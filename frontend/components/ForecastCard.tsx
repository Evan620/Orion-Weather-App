
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
    <div className="bg-white rounded-lg p-4 text-center">
      <p className="text-sm text-gray-600 mb-2">
        {date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
      </p>
      <img 
        src={iconUrl} 
        alt={mainWeather.description} 
        className="w-16 h-16 mx-auto"
      />
      <p className="text-sm mt-2">
        {formatTemperature(forecast.main.temp, unit)}
      </p>
    </div>
  );
}
