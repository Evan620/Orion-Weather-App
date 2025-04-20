export type TemperatureUnit = 'celsius' | 'fahrenheit';

export interface CurrentWeather {
  dt: number;
  name: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
    deg: number;
  };
  sys: {
    country: string;
  };
  coord: {
    lat: number;
    lon: number;
  };
}

export interface ForecastDay {
  date: number;
  temp: number;
  temp_min: number;
  temp_max: number;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  };
  wind_speed: number;
  humidity: number;
}

export interface GeocodingResult {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}