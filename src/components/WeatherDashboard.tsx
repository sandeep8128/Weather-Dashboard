import React, { useState, useEffect } from 'react';
import { Search, MapPin, Thermometer, Droplets, Wind, Eye, Gauge, Sun, AlertTriangle } from 'lucide-react';
import CurrentWeather from './CurrentWeather';
import Forecast from './Forecast';
import HourlyForecast from './HourlyForecast';
import WeatherChart from './WeatherChart';
import WeatherAlerts from './WeatherAlerts';
import LocationSearch from './LocationSearch';

// Mock weather data - in a real app, this would come from OpenWeather API
const mockWeatherData = {
  current: {
    location: 'New York, NY',
    temperature: 72,
    condition: 'Partly Cloudy',
    description: 'Partly cloudy with gentle breeze',
    humidity: 65,
    windSpeed: 8,
    windDirection: 'NW',
    pressure: 30.12,
    visibility: 10,
    uvIndex: 6,
    feelsLike: 75,
    icon: 'partly-cloudy',
    sunrise: '6:24 AM',
    sunset: '7:45 PM'
  },
  hourly: Array.from({ length: 24 }, (_, i) => ({
    time: new Date(Date.now() + i * 60 * 60 * 1000).toLocaleTimeString('en-US', { hour: 'numeric' }),
    temperature: Math.round(72 + Math.sin(i * 0.3) * 8),
    precipitation: Math.max(0, Math.round(Math.sin(i * 0.4) * 30 + 20)),
    condition: i % 6 === 0 ? 'rain' : i % 4 === 0 ? 'cloudy' : 'sunny'
  })),
  daily: Array.from({ length: 7 }, (_, i) => ({
    day: new Date(Date.now() + i * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { weekday: 'short' }),
    high: Math.round(75 + Math.sin(i * 0.5) * 10),
    low: Math.round(55 + Math.sin(i * 0.5) * 8),
    condition: ['sunny', 'partly-cloudy', 'cloudy', 'rain', 'sunny'][i % 5],
    precipitation: Math.round(Math.random() * 60),
    description: ['Sunny skies', 'Partly cloudy', 'Overcast', 'Light rain', 'Clear'][i % 5]
  })),
  alerts: [
    {
      id: 1,
      title: 'Heat Advisory',
      severity: 'moderate',
      description: 'Temperatures may reach 90°F today. Stay hydrated and avoid prolonged sun exposure.',
      expires: '11:59 PM today'
    }
  ]
};

const WeatherDashboard: React.FC = () => {
  const [weatherData, setWeatherData] = useState(mockWeatherData);
  const [loading, setLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('New York, NY');

  const handleLocationSearch = async (location: string) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setSelectedLocation(location);
      // In a real app, you would fetch new weather data here
      setWeatherData({
        ...mockWeatherData,
        current: { ...mockWeatherData.current, location }
      });
      setLoading(false);
    }, 1000);
  };

  const getBackgroundGradient = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
        return 'from-slate-900 via-blue-900 to-indigo-900';
      case 'partly-cloudy':
        return 'from-slate-900 via-slate-800 to-gray-800';
      case 'cloudy':
        return 'from-gray-900 via-gray-800 to-slate-800';
      case 'rain':
        return 'from-slate-900 via-slate-800 to-gray-900';
      default:
        return 'from-slate-900 via-blue-900 to-indigo-900';
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getBackgroundGradient(weatherData.current.condition)} p-4`}>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center text-white mb-8">
          <h1 className="text-4xl font-bold mb-2">Weather Dashboard</h1>
          <p className="text-slate-300">Interactive forecasts and detailed weather insights</p>
        </div>

        {/* Location Search */}
        <LocationSearch onLocationSelect={handleLocationSearch} loading={loading} />

        {/* Weather Alerts */}
        <WeatherAlerts alerts={weatherData.alerts} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Current Weather - takes 1 column */}
          <div className="lg:col-span-1">
            <CurrentWeather data={weatherData.current} loading={loading} />
          </div>

          {/* Forecast - takes 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            <Forecast forecast={weatherData.daily} />
            <HourlyForecast hourly={weatherData.hourly} />
          </div>
        </div>

        {/* Weather Charts */}
        <WeatherChart hourlyData={weatherData.hourly} />
      </div>
    </div>
  );
};

export default WeatherDashboard;