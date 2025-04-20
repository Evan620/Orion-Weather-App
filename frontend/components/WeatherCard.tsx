
import { CurrentWeather, TemperatureUnit } from '../types/weather';
import { formatTemperature } from '../utils/temperature';
import { formatDate } from '../utils/dateFormat';

interface WeatherCardProps {
  weather: CurrentWeather;
  unit: TemperatureUnit;
}

export default function WeatherCard({ weather, unit }: WeatherCardProps) {
  if (!weather || !weather.weather || weather.weather.length === 0) {
    return <div>Weather data unavailable</div>;
  }

  const mainWeather = weather.weather[0];
  const iconUrl = `https://openweathermap.org/img/wn/${mainWeather.icon}@2x.png`;
  const date = new Date(weather.dt * 1000);
  
  return (
    <div className="card bg-base-100 shadow-lg p-6">
      <div className="flex flex-col">
        <div className="flex items-center mb-2">
          <img src={iconUrl} alt={mainWeather.description} className="w-16 h-16" />
          <div className="ml-4">
            <h2 className="text-4xl font-bold">
              {formatTemperature(weather.main.temp, unit)}
            </h2>
            <p className="text-xl capitalize">{mainWeather.main}</p>
          </div>
        </div>
        <div className="mt-2">
          <p className="text-lg">
            {weather.name}, {weather.sys.country}
          </p>
          <p className="text-sm text-gray-500">
            {date.toLocaleDateString('en-US', { 
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
          </p>
        </div>
      </div>
    </div>
  );
}
