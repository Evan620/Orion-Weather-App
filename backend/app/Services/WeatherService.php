<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class WeatherService
{
    private $apiKey;
    private $baseUrl = 'https://api.openweathermap.org/data/2.5';

    public function __construct()
    {
        $this->apiKey = env('OPENWEATHERMAP_API_KEY');
    }

    public function getCurrentWeather($city, $units)
    {
        $response = Http::get("{$this->baseUrl}/weather", [
            'q' => $city,
            'units' => $units === 'celsius' ? 'metric' : 'imperial',
            'appid' => $this->apiKey
        ]);

        return $response->json();
    }

    public function getForecast($city, $units)
    {
        $response = Http::get("{$this->baseUrl}/forecast", [
            'q' => $city,
            'units' => $units === 'celsius' ? 'metric' : 'imperial',
            'appid' => $this->apiKey
        ]);

        return $response->json();
    }
}