import React from 'react';

interface WeatherDetailsProps {
  windSpeed: number;
  humidity: number;
}

const WeatherDetails: React.FC<WeatherDetailsProps> = ({ windSpeed, humidity }) => {
  return (
    <div className="card bg-base-200 shadow-lg h-full">
      <div className="card-body p-6">
        <h2 className="card-title text-xl mb-4">Weather Details</h2>
        
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Wind Status</h3>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
            <div>
              <p className="text-3xl font-bold">{windSpeed} <span className="text-base font-normal">m/s</span></p>
            </div>
          </div>
        </div>
        
        <div className="divider"></div>
        
        <div>
          <h3 className="text-lg font-medium mb-2">Humidity</h3>
          <div className="flex items-center mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
            <div>
              <p className="text-3xl font-bold">{humidity}<span className="text-base font-normal">%</span></p>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
            <div 
              className="bg-primary h-4 rounded-full" 
              style={{ width: `${humidity}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDetails;
