import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, BarChart, Bar } from 'recharts';

interface HourlyData {
  time: string;
  temperature: number;
  precipitation: number;
  condition: string;
}

interface WeatherChartProps {
  hourlyData: HourlyData[];
}

const WeatherChart: React.FC<WeatherChartProps> = ({ hourlyData }) => {
  const [activeChart, setActiveChart] = useState<'temperature' | 'precipitation'>('temperature');

  const chartData = hourlyData.slice(0, 12).map(hour => ({
    time: hour.time,
    temperature: hour.temperature,
    precipitation: hour.precipitation
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-white/20">
          <p className="text-gray-800 font-medium">{label}</p>
          {activeChart === 'temperature' ? (
            <p className="text-blue-600">
              Temperature: <span className="font-semibold">{payload[0].value}°F</span>
            </p>
          ) : (
            <p className="text-blue-600">
              Precipitation: <span className="font-semibold">{payload[0].value}%</span>
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-slate-800/40 backdrop-blur-md rounded-2xl p-6 border border-slate-600/30">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">Weather Trends</h3>
        
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveChart('temperature')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeChart === 'temperature'
                ? 'bg-slate-600/50 text-white'
                : 'bg-slate-700/30 text-slate-300 hover:bg-slate-700/50'
            }`}
          >
            Temperature
          </button>
          <button
            onClick={() => setActiveChart('precipitation')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeChart === 'precipitation'
                ? 'bg-slate-600/50 text-white'
                : 'bg-slate-700/30 text-slate-300 hover:bg-slate-700/50'
            }`}
          >
            Precipitation
          </button>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          {activeChart === 'temperature' ? (
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.2)" />
              <XAxis 
                dataKey="time" 
                stroke="rgba(203,213,225,0.8)"
                fontSize={12}
              />
              <YAxis 
                stroke="rgba(203,213,225,0.8)"
                fontSize={12}
                domain={['dataMin - 5', 'dataMax + 5']}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="temperature"
                stroke="#F59E0B"
                strokeWidth={3}
                dot={{ fill: '#F59E0B', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#F59E0B', strokeWidth: 2 }}
              />
            </LineChart>
          ) : (
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.2)" />
              <XAxis 
                dataKey="time" 
                stroke="rgba(203,213,225,0.8)"
                fontSize={12}
              />
              <YAxis 
                stroke="rgba(203,213,225,0.8)"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="precipitation"
                fill="#06B6D4"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      <div className="flex justify-center space-x-6 mt-4 text-sm text-slate-300">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
          <span>Temperature (°F)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
          <span>Precipitation (%)</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherChart;