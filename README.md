# Orion Weather App

A modern weather application that provides real-time weather information and forecasts for locations worldwide using the OpenWeatherMap API.

![Orion Weather App](.github/screenshots/app-preview.png)

## Description

Orion Weather App is a full-stack application built with a Next.js frontend and Laravel backend. It offers users a clean, intuitive interface to search for weather information by city name, view current conditions, and check multi-day forecasts.

## Features

- **City Search**: Easily search for any city worldwide
- **Current Weather Display**: View detailed current weather information including:
  - Temperature (with feels-like indicator)
  - Weather conditions with icons
  - High and low temperatures
  - Wind speed
  - Humidity percentage
- **3-Day Forecast**: Plan ahead with a concise 3-day weather forecast
- **Unit Toggle**: Switch seamlessly between Celsius and Fahrenheit
- **Responsive Design**: Optimized for both desktop and mobile devices

## Tech Stack

### Frontend
- **Framework**: Next.js (React)
- **Styling**: Tailwind CSS, RippleUI
- **Language**: TypeScript
- **API Integration**: Fetch API with async/await

### Backend
- **Framework**: Laravel
- **API Integration**: OpenWeatherMap API (Weather, Forecast, and Geocoding)
- **Language**: PHP

## Project Structure

```
Orion-Weather-App/
├── frontend/                # Next.js frontend application
│   ├── components/          # React components
│   ├── hooks/               # Custom React hooks
│   ├── pages/               # Next.js pages
│   ├── types/               # TypeScript type definitions
│   └── utils/               # Utility functions
│
└── backend/                 # Laravel backend application
    ├── app/
    │   ├── Http/Controllers/
    │   └── Services/        # Weather service integration
    ├── routes/
    └── config/
```

## Getting Started

### Prerequisites

- Node.js (v14+)
- PHP (v8.1+)
- Composer
- OpenWeatherMap API key

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/orion-weather-app.git
   cd orion-weather-app
   ```

2. Frontend setup:
   ```
   cd frontend
   npm install
   ```

3. Backend setup:
   ```
   cd backend
   composer install
   cp .env.example .env
   ```

4. Configure your `.env` file with your OpenWeatherMap API key:
   ```
   OPENWEATHER_API_KEY=your_api_key_here
   ```

5. Start the development servers:
   - Frontend: `npm run dev` (runs on port 5000)
   - Backend: `php artisan serve` (runs on port 8000)

## Usage

1. Open your browser and navigate to `http://localhost:5000`
2. Enter a city name in the search bar
3. View the current weather and forecast
4. Toggle between Celsius and Fahrenheit using the temperature unit switch

## API Endpoints

The backend exposes the following API endpoints:

- `GET /api/weather?city={cityName}&units={unit}` - Get current weather data
- `GET /api/forecast?city={cityName}&units={unit}` - Get forecast data
- `GET /api/geocode?query={cityName}` - Get city geocoding data

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- Weather icons from OpenWeatherMap
