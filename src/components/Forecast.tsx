import React from "react";
import { Cloud, Sun, CloudRain, CloudSnow } from "lucide-react";

interface ForecastDay {
  day: string;
  high: number;
  low: number;
  condition: string;
  precipitation: number;
  description: string;
}

interface ForecastProps {
  forecast: ForecastDay[];
}

const Forecast: React.FC<ForecastProps> = ({ forecast }) => {
  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case "sunny":
        return <Sun className="w-8 h-8 text-yellow-400" />;
      case "partly-cloudy":
        return <Cloud className="w-8 h-8 text-gray-300" />;
      case "cloudy":
        return <Cloud className="w-8 h-8 text-gray-400" />;
      case "rain":
        return <CloudRain className="w-8 h-8 text-blue-400" />;
      case "snow":
        return <CloudSnow className="w-8 h-8 text-white" />;
      default:
        return <Sun className="w-8 h-8 text-yellow-400" />;
    }
  };

  const getTemperatureColor = (temp: number) => {
    if (temp >= 80) return "text-red-300";
    if (temp >= 60) return "text-yellow-300";
    return "text-blue-300";
  };

  return (
    <div className="bg-slate-800/40 backdrop-blur-md rounded-2xl p-6 border border-slate-600/30">
      <h3 className="text-xl font-semibold text-white mb-4">7-Day Forecast</h3>

      <div className="space-y-3">
        {forecast.map((day, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-all duration-200 cursor-pointer group"
          >
            <div className="flex items-center space-x-4 flex-1">
              <div className="w-12 text-center">
                <span className="text-white font-medium">
                  {index === 0 ? "Today" : day.day}
                </span>
              </div>

              <div className="flex-shrink-0 group-hover:scale-110 transition-transform">
                {getWeatherIcon(day.condition)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="text-white font-medium">{day.description}</div>
                {day.precipitation > 0 && (
                  <div className="text-cyan-300 text-sm">
                    {day.precipitation}% chance of rain
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <span
                className={`text-lg font-semibold ${getTemperatureColor(
                  day.high
                )}`}
              >
                {day.high}°
              </span>
              <span className="text-slate-400 text-sm">{day.low}°</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
