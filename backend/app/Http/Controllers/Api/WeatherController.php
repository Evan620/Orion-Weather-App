<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\WeatherService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;


class WeatherController extends Controller
{
    private $weatherService;

    public function __construct(WeatherService $weatherService)
    {
        $this->weatherService = $weatherService;
    }

    public function getCurrentWeather(Request $request)
    {
        $city = $request->query('city');
        $units = $request->query('units', 'metric');

        try {
            $weatherData = $this->weatherService->getCurrentWeather($city, $units);
            return response()->json($weatherData);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 404);
        }
    }

    public function getForecast(Request $request)
    {
        $city = $request->query('city');
        $units = $request->query('units', 'metric');

        try {
            $forecastData = $this->weatherService->getForecast($city, $units);
            return response()->json($forecastData);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 404);
        }
    }

    /**
     * Geocode a city name to coordinates
     * 
     * @param Request $request
     * @return JsonResponse
     */
    public function geocodeCity(Request $request): JsonResponse
    {
        $request->validate([
            'city' => 'required|string|max:100',
            'limit' => 'sometimes|integer|min:1|max:5'
        ]);

        try {
            $city = $request->input('city');
            $limit = $request->input('limit', 1);
            
            $geocodeData = $this->weatherService->geocodeCity($city, $limit);
            
            return response()->json($geocodeData);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage()
            ], 404);
        }
    }
}