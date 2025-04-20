
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
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">{weather.name}</h2>
        <p className="text-gray-600">
          {date.toLocaleDateString('en-US', { 
            weekday: 'long',
            month: 'short',
            day: 'numeric'
          })}
        </p>
      </div>
      
      <div className="flex flex-col items-center my-6">
        <img 
          src={iconUrl} 
          alt={mainWeather.description}
          className="w-24 h-24"
        />
        <p className="text-4xl font-bold my-4">
          {formatTemperature(weather.main.temp, unit)}
        </p>
        <p className="text-xl text-gray-700 capitalize">
          {mainWeather.description}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
        <div>
          <p className="text-gray-600">Feels like</p>
          <p className="font-semibold">{formatTemperature(weather.main.feels_like, unit)}</p>
        </div>
        <div>
          <p className="text-gray-600">High / Low</p>
          <p className="font-semibold">
            {formatTemperature(weather.main.temp_max, unit)} / {formatTemperature(weather.main.temp_min, unit)}
          </p>
        </div>
      </div>
    </div>
  );
}
