<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;
use Illuminate\Http\Client\ConnectionException;

class WeatherService
{
    protected string $apiKey;
    protected string $baseUrl;

    /**
     * WeatherService constructor.
     */
    public function __construct()
    {
        $this->apiKey = env('OPENWEATHERMAP_API_KEY', '');
        $this->baseUrl = 'https://api.openweathermap.org';
    }

    /**
     * Get current weather by city name
     * 
     * @param string $city City name
     * @param string $units Units (celsius or fahrenheit)
     * @return array Weather data
     * @throws \Exception If city not found or API error
     */
    public function getCurrentWeatherByCity(string $city, string $units = 'celsius'): array
    {
        $cacheKey = "weather_{$city}_{$units}";
        
        return Cache::remember($cacheKey, 1800, function () use ($city, $units) {
            // First geocode the city to get coordinates
            $geocodeData = $this->geocodeCity($city, 1);
            
            if (empty($geocodeData)) {
                throw new \Exception("City not found: {$city}");
            }
            
            $location = $geocodeData[0];
            
            $unitParam = $units === 'fahrenheit' ? 'imperial' : 'metric';
            
            try {
                $response = Http::get("{$this->baseUrl}/data/2.5/weather", [
                    'lat' => $location['lat'],
                    'lon' => $location['lon'],
                    'appid' => $this->apiKey,
                    'units' => $unitParam
                ]);
                
                if ($response->failed()) {
                    throw new \Exception("Failed to fetch weather data: " . $response->body());
                }
                
                return $response->json();
            } catch (ConnectionException $e) {
                throw new \Exception("Connection error: " . $e->getMessage());
            }
        });
    }

    /**
     * Get weather forecast by city name
     * 
     * @param string $city City name
     * @param string $units Units (celsius or fahrenheit)
     * @param int $days Number of days for forecast
     * @return array Forecast data
     * @throws \Exception If city not found or API error
     */
    public function getForecastByCity(string $city, string $units = 'celsius', int $days = 3): array
    {
        $cacheKey = "forecast_{$city}_{$units}_{$days}";
        
        return Cache::remember($cacheKey, 1800, function () use ($city, $units, $days) {
            // First geocode the city to get coordinates
            $geocodeData = $this->geocodeCity($city, 1);
            
            if (empty($geocodeData)) {
                throw new \Exception("City not found: {$city}");
            }
            
            $location = $geocodeData[0];
            $unitParam = $units === 'fahrenheit' ? 'imperial' : 'metric';
            
            try {
                $response = Http::get("{$this->baseUrl}/data/2.5/forecast", [
                    'lat' => $location['lat'],
                    'lon' => $location['lon'],
                    'appid' => $this->apiKey,
                    'units' => $unitParam
                ]);
                
                if ($response->failed()) {
                    throw new \Exception("Failed to fetch forecast data: " . $response->body());
                }
                
                $forecastData = $response->json();
                
                // Process and extract daily forecasts (one per day)
                return $this->processForecastData($forecastData, $days);
            } catch (ConnectionException $e) {
                throw new \Exception("Connection error: " . $e->getMessage());
            }
        });
    }

    /**
     * Geocode a city name to get coordinates
     * 
     * @param string $city City name
     * @param int $limit Maximum number of results
     * @return array Geocoding data
     * @throws \Exception If API error
     */
    public function geocodeCity(string $city, int $limit = 1): array
    {
        $cacheKey = "geocode_{$city}_{$limit}";
        
        return Cache::remember($cacheKey, 86400, function () use ($city, $limit) {
            try {
                $response = Http::get("{$this->baseUrl}/geo/1.0/direct", [
                    'q' => $city,
                    'limit' => $limit,
                    'appid' => $this->apiKey
                ]);
                
                if ($response->failed()) {
                    throw new \Exception("Failed to geocode city: " . $response->body());
                }
                
                $data = $response->json();
                
                if (empty($data)) {
                    throw new \Exception("City not found: {$city}");
                }
                
                return $data;
            } catch (ConnectionException $e) {
                throw new \Exception("Connection error: " . $e->getMessage());
            }
        });
    }

    /**
     * Process forecast data to extract daily forecasts
     * 
     * @param array $forecastData Raw forecast data
     * @param int $days Number of days for forecast
     * @return array Processed daily forecast
     */
    protected function processForecastData(array $forecastData, int $days): array
    {
        $dailyForecasts = [];
        $currentDay = null;
        $dayCount = 0;
        
        foreach ($forecastData['list'] as $forecast) {
            // Get the day from the forecast time
            $forecastDate = date('Y-m-d', $forecast['dt']);
            
            // If we're starting a new day
            if ($currentDay !== $forecastDate) {
                // Only process if we haven't reached the requested number of days
                if ($dayCount < $days) {
                    $currentDay = $forecastDate;
                    $dayCount++;
                    
                    // Extract the data for this day
                    $dailyForecasts[] = [
                        'date' => $forecast['dt'],
                        'temp' => $forecast['main']['temp'],
                        'temp_min' => $forecast['main']['temp_min'],
                        'temp_max' => $forecast['main']['temp_max'],
                        'weather' => $forecast['weather'][0],
                        'wind_speed' => $forecast['wind']['speed'],
                        'humidity' => $forecast['main']['humidity']
                    ];
                } else {
                    // We've reached the requested number of days
                    break;
                }
            } else {
                // Update the min/max temperatures for the current day if needed
                $lastIndex = count($dailyForecasts) - 1;
                
                if ($forecast['main']['temp_min'] < $dailyForecasts[$lastIndex]['temp_min']) {
                    $dailyForecasts[$lastIndex]['temp_min'] = $forecast['main']['temp_min'];
                }
                
                if ($forecast['main']['temp_max'] > $dailyForecasts[$lastIndex]['temp_max']) {
                    $dailyForecasts[$lastIndex]['temp_max'] = $forecast['main']['temp_max'];
                }
            }
        }
        
        return $dailyForecasts;
    }
}
