<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ForecastResource extends JsonResource
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
            'date' => $this->resource['date'],
            'temp' => $this->resource['temp'],
            'temp_min' => $this->resource['temp_min'],
            'temp_max' => $this->resource['temp_max'],
            'weather' => $this->resource['weather'],
            'wind_speed' => $this->resource['wind_speed'],
            'humidity' => $this->resource['humidity'],
        ];
    }
}
