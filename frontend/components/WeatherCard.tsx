import { CurrentWeather, TemperatureUnit } from '../types/weather';
import { formatTemperature } from '../utils/temperature';

interface WeatherCardProps {
  weather: CurrentWeather;
  unit: TemperatureUnit;
}

export default function WeatherCard({ weather, unit }: WeatherCardProps) {
  const mainWeather = weather.weather[0];
  const iconUrl = `https://openweathermap.org/img/wn/${mainWeather.icon}@2x.png`;
  const date = new Date(weather.dt * 1000);

  return (
    <div className="bg-white rounded-lg p-6 flex flex-col">
      <div className="mb-4">
        <img src={iconUrl} alt={mainWeather.description} className="w-24 h-24" />
      </div>
      <div className="mb-4">
        <h2 className="text-4xl font-bold mb-2">{formatTemperature(weather.main.temp, unit)}</h2>
        <p className="text-xl capitalize">{mainWeather.description}</p>
      </div>
      <div className="mt-auto">
        <p className="text-sm text-gray-600">
          {date.toLocaleDateString('en-US', { 
            day: 'numeric',
            month: 'short',
            year: 'numeric'
          })}
        </p>
        <p className="text-sm text-gray-600">{weather.name}</p>
      </div>
    </div>
  );
}