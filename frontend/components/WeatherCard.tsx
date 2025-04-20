import { CurrentWeather, TemperatureUnit } from '../types/weather';
import { formatTemperature } from '../utils/temperature';
import { formatDate } from '../utils/dateFormat';

interface WeatherCardProps {
  weather: CurrentWeather;
  unit: TemperatureUnit;
}

export default function WeatherCard({ weather, unit }: WeatherCardProps) {
  // Safety check for weather data
  if (!weather || !weather.weather || weather.weather.length === 0) {
    return <div>Weather data unavailable</div>;
  }

  const mainWeather = weather.weather[0];
  const iconUrl = `https://openweathermap.org/img/wn/${mainWeather.icon}@2x.png`;
  
  return (
    <div className="card bg-base-100 shadow-lg overflow-hidden">
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left side - Weather icon and temperature (D, E) */}
          <div className="flex flex-col items-center justify-center">
            <div className="flex justify-center mb-2">
              <img 
                src={iconUrl} 
                alt={mainWeather.description} 
                className="w-24 h-24"
              />
            </div>
            <h2 className="text-4xl font-bold text-center mb-1">
              {formatTemperature(weather.main.temp, unit)}
            </h2>
            {/* Weather description (F) */}
            <p className="text-xl text-center capitalize">{mainWeather.main}</p>
          </div>
          
          {/* Right side - Location and date (G) */}
          <div className="flex flex-col justify-end items-center md:items-end">
            <h3 className="text-2xl font-medium">
              {weather.name}, {weather.sys.country}
            </h3>
            <p className="text-base">{formatDate(weather.dt)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}