import React from 'react';
import { Thermometer, Droplets, Wind, Eye, Gauge, Sun, Sunrise, Sunset, MapPin } from 'lucide-react';

interface CurrentWeatherProps {
  data: {
    location: string;
    temperature: number;
    condition: string;
    description: string;
    humidity: number;
    windSpeed: number;
    windDirection: string;
    pressure: number;
    visibility: number;
    uvIndex: number;
    feelsLike: number;
    sunrise: string;
    sunset: string;
  };
  loading: boolean;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data, loading }) => {
  if (loading) {
    return (
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-white animate-pulse">
        <div className="h-6 bg-white/20 rounded mb-4"></div>
        <div className="h-16 bg-white/20 rounded mb-4"></div>
        <div className="space-y-3">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-4 bg-white/20 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  const getTemperatureColor = (temp: number) => {
    if (temp >= 80) return 'text-red-300';
    if (temp >= 60) return 'text-yellow-300';
    return 'text-blue-300';
  };

  return (
    <div className="bg-slate-800/40 backdrop-blur-md rounded-2xl p-6 text-white border border-slate-600/30 hover:bg-slate-800/50 transition-all duration-300">
      {/* Location */}
      <div className="flex items-center mb-4">
        <MapPin className="w-5 h-5 mr-2 text-slate-300" />
        <h2 className="text-lg font-semibold">{data.location}</h2>
      </div>

      {/* Main Temperature */}
      <div className="text-center mb-6">
        <div className={`text-6xl font-bold ${getTemperatureColor(data.temperature)} mb-2`}>
          {data.temperature}°
        </div>
        <div className="text-xl font-medium mb-1">{data.condition}</div>
        <div className="text-sm text-slate-300">{data.description}</div>
        <div className="text-sm text-slate-400 mt-2">
          Feels like {data.feelsLike}°
        </div>
      </div>

      {/* Weather Details Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-center space-x-2">
          <Droplets className="w-4 h-4 text-cyan-400" />
          <span className="text-sm">
            <span className="text-slate-300">Humidity</span>
            <span className="block font-semibold">{data.humidity}%</span>
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <Wind className="w-4 h-4 text-emerald-400" />
          <span className="text-sm">
            <span className="text-slate-300">Wind</span>
            <span className="block font-semibold">{data.windSpeed} mph {data.windDirection}</span>
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <Gauge className="w-4 h-4 text-purple-400" />
          <span className="text-sm">
            <span className="text-slate-300">Pressure</span>
            <span className="block font-semibold">{data.pressure} in</span>
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <Eye className="w-4 h-4 text-indigo-400" />
          <span className="text-sm">
            <span className="text-slate-300">Visibility</span>
            <span className="block font-semibold">{data.visibility} mi</span>
          </span>
        </div>
      </div>

      {/* Sun Times */}
      <div className="border-t border-slate-600/30 pt-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Sunrise className="w-4 h-4 text-yellow-300" />
            <span className="text-sm">
              <span className="text-slate-300 block">Sunrise</span>
              <span className="font-semibold">{data.sunrise}</span>
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Sunset className="w-4 h-4 text-orange-300" />
            <span className="text-sm">
              <span className="text-slate-300 block">Sunset</span>
              <span className="font-semibold">{data.sunset}</span>
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-center space-x-2 mt-4 p-3 bg-slate-700/40 rounded-lg">
          <Sun className="w-4 h-4 text-yellow-300" />
          <span className="text-sm">
            <span className="text-slate-300">UV Index</span>
            <span className="font-semibold ml-2">{data.uvIndex}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;