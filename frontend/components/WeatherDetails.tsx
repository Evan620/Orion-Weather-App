interface WeatherDetailsProps {
  windSpeed: number;
  humidity: number;
}

export default function WeatherDetails({ windSpeed, humidity }: WeatherDetailsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Wind Status (I) */}
      <div className="card bg-base-100 shadow-md">
        <div className="card-body p-4">
          <h3 className="card-title text-base">Wind Status</h3>
          <div className="flex items-center justify-center my-2">
            <p className="text-3xl font-bold">{Math.round(windSpeed)} km/h</p>
          </div>
          <div className="flex justify-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6 text-primary" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Humidity (J) */}
      <div className="card bg-base-100 shadow-md">
        <div className="card-body p-4">
          <h3 className="card-title text-base">Humidity</h3>
          <div className="flex items-center justify-center my-2">
            <p className="text-3xl font-bold">{humidity}%</p>
          </div>
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