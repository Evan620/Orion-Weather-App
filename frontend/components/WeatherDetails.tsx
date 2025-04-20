interface WeatherDetailsProps {
  windSpeed: number;
  humidity: number;
}

export default function WeatherDetails({ windSpeed, humidity }: WeatherDetailsProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="card bg-base-100 shadow-md p-4">
        <h3 className="text-sm text-gray-500 mb-2">Wind Status</h3>
        <div className="flex items-center justify-center">
          <p className="text-2xl font-bold">{Math.round(windSpeed)} km/h</p>
        </div>
      </div>

      <div className="card bg-base-100 shadow-md p-4">
        <h3 className="text-sm text-gray-500 mb-2">Humidity</h3>
        <div className="flex flex-col items-center">
          <p className="text-2xl font-bold mb-2">{humidity}%</p>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full" 
              style={{ width: `${humidity}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}