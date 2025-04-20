<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class WeatherResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  Request  $request
     * @return array
     */
    public function toArray($request): array
    {
        return [
            'dt' => $this->resource['dt'],
            'name' => $this->resource['name'],
            'main' => [
                'temp' => $this->resource['main']['temp'],
                'feels_like' => $this->resource['main']['feels_like'],
                'temp_min' => $this->resource['main']['temp_min'],
                'temp_max' => $this->resource['main']['temp_max'],
                'pressure' => $this->resource['main']['pressure'],
                'humidity' => $this->resource['main']['humidity'],
            ],
            'weather' => $this->resource['weather'],
            'wind' => [
                'speed' => $this->resource['wind']['speed'],
                'deg' => $this->resource['wind']['deg'],
            ],
            'sys' => [
                'country' => $this->resource['sys']['country'],
            ],
            'coord' => [
                'lat' => $this->resource['coord']['lat'],
                'lon' => $this->resource['coord']['lon'],
            ],
        ];
    }
}
