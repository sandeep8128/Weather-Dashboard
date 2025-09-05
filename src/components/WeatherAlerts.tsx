import React from 'react';
import { AlertTriangle, Info, XCircle } from 'lucide-react';

interface Alert {
  id: number;
  title: string;
  severity: 'low' | 'moderate' | 'high' | 'severe';
  description: string;
  expires: string;
}

interface WeatherAlertsProps {
  alerts: Alert[];
}

const WeatherAlerts: React.FC<WeatherAlertsProps> = ({ alerts }) => {
  if (alerts.length === 0) return null;

  const getSeverityConfig = (severity: string) => {
    switch (severity) {
      case 'low':
        return {
          icon: Info,
          bgColor: 'bg-blue-500/20',
          borderColor: 'border-blue-400/30',
          iconColor: 'text-blue-300',
          textColor: 'text-blue-100'
        };
      case 'moderate':
        return {
          icon: AlertTriangle,
          bgColor: 'bg-yellow-500/20',
          borderColor: 'border-yellow-400/30',
          iconColor: 'text-yellow-300',
          textColor: 'text-yellow-100'
        };
      case 'high':
        return {
          icon: AlertTriangle,
          bgColor: 'bg-orange-500/20',
          borderColor: 'border-orange-400/30',
          iconColor: 'text-orange-300',
          textColor: 'text-orange-100'
        };
      case 'severe':
        return {
          icon: XCircle,
          bgColor: 'bg-red-500/20',
          borderColor: 'border-red-400/30',
          iconColor: 'text-red-300',
          textColor: 'text-red-100'
        };
      default:
        return {
          icon: Info,
          bgColor: 'bg-blue-500/20',
          borderColor: 'border-blue-400/30',
          iconColor: 'text-blue-300',
          textColor: 'text-blue-100'
        };
    }
  };

  return (
    <div className="space-y-3">
      {alerts.map((alert) => {
        const config = getSeverityConfig(alert.severity);
        const Icon = config.icon;

        return (
          <div
            key={alert.id}
            className={`${config.bgColor} ${config.borderColor} backdrop-blur-md rounded-xl p-4 border hover:scale-[1.02] transition-all duration-200`}
          >
            <div className="flex items-start space-x-3">
              <Icon className={`w-6 h-6 ${config.iconColor} flex-shrink-0 mt-0.5`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <h4 className={`font-semibold ${config.textColor}`}>
                    {alert.title}
                  </h4>
                  <span className={`text-sm ${config.textColor} opacity-75`}>
                    Expires {alert.expires}
                  </span>
                </div>
                <p className={`text-sm ${config.textColor} opacity-90`}>
                  {alert.description}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WeatherAlerts;