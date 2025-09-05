import React from 'react';
import { Cloud, Sun, CloudRain } from 'lucide-react';

interface HourlyData {
  time: string;
  temperature: number;
  precipitation: number;
  condition: string;
}

interface HourlyForecastProps {
  hourly: HourlyData[];
}

const HourlyForecast: React.FC<HourlyForecastProps> = ({ hourly }) => {
  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'sunny':
        return <Sun className="w-5 h-5 text-yellow-400" />;
      case 'cloudy':
        return <Cloud className="w-5 h-5 text-gray-300" />;
      case 'rain':
        return <CloudRain className="w-5 h-5 text-blue-400" />;
      default:
        return <Sun className="w-5 h-5 text-yellow-400" />;
    }
  };

  const getTemperatureColor = (temp: number) => {
    if (temp >= 80) return 'text-red-300';
    if (temp >= 60) return 'text-yellow-300';
    return 'text-blue-300';
  };

  return (
    <div className="bg-slate-800/40 backdrop-blur-md rounded-2xl p-6 border border-slate-600/30">
      <h3 className="text-xl font-semibold text-white mb-4">24-Hour Forecast</h3>
      
      <div className="overflow-x-auto">
        <div className="flex space-x-4 pb-4" style={{ width: 'max-content' }}>
          {hourly.slice(0, 24).map((hour, index) => (
            <div
              key={index}
              className="flex flex-col items-center space-y-2 p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-all duration-200 min-w-[80px] group cursor-pointer"
            >
              <span className="text-slate-300 text-sm font-medium">
                {index === 0 ? 'Now' : hour.time}
              </span>
              
              <div className="group-hover:scale-110 transition-transform">
                {getWeatherIcon(hour.condition)}
              </div>
              
              <span className={`font-semibold ${getTemperatureColor(hour.temperature)}`}>
                {hour.temperature}°
              </span>
              
              {hour.precipitation > 0 && (
                <div className="text-cyan-300 text-xs">
                  {hour.precipitation}%
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HourlyForecast;