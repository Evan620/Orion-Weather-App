<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\WeatherService;
// Not using resources for this demo
use Illuminate\Http\JsonResponse;

class WeatherController extends Controller
{
    protected $weatherService;

    /**
     * WeatherController constructor.
     * 
     * @param WeatherService $weatherService
     */
    public function __construct(WeatherService $weatherService)
    {
        $this->weatherService = $weatherService;
    }

    /**
     * Get current weather for a city
     * 
     * @param Request $request
     * @return JsonResponse
     */
    public function getCurrentWeather(Request $request): JsonResponse
    {
        $request->validate([
            'city' => 'required|string|max:100',
            'units' => 'sometimes|string|in:celsius,fahrenheit'
        ]);

        try {
            $units = $request->input('units', 'celsius');
            $city = $request->input('city');
            
            $weatherData = $this->weatherService->getCurrentWeatherByCity($city, $units);
            
            return response()->json($weatherData);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage()
            ], 404);
        }
    }

    /**
     * Get weather forecast for a city
     * 
     * @param Request $request
     * @return JsonResponse
     */
    public function getForecast(Request $request): JsonResponse
    {
        $request->validate([
            'city' => 'required|string|max:100',
            'units' => 'sometimes|string|in:celsius,fahrenheit',
            'days' => 'sometimes|integer|min:1|max:5'
        ]);

        try {
            $city = $request->input('city');
            $units = $request->input('units', 'celsius');
            $days = $request->input('days', 3);
            
            $forecastData = $this->weatherService->getForecastByCity($city, $units, $days);
            
            return response()->json($forecastData);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage()
            ], 404);
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
<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\WeatherService;
use Illuminate\Http\Request;

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
        
        if (!$city) {
            return response()->json(['error' => 'City parameter is required'], 400);
        }

        try {
            $data = $this->weatherService->getCurrentWeather($city);
            return response()->json(['data' => $data]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to fetch weather data'], 500);
        }
    }

    public function getForecast(Request $request)
    {
        $city = $request->query('city');
        
        if (!$city) {
            return response()->json(['error' => 'City parameter is required'], 400);
        }

        try {
            $data = $this->weatherService->getForecast($city);
            return response()->json(['data' => $data]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to fetch forecast data'], 500);
        }
    }
}
