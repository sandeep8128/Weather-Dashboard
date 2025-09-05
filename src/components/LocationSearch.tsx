import React, { useState } from 'react';
import { Search, MapPin, Loader2, Navigation } from 'lucide-react';

interface LocationSearchProps {
  onLocationSelect: (location: string) => void;
  loading: boolean;
}

const LocationSearch: React.FC<LocationSearchProps> = ({ onLocationSelect, loading }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isGeolocationLoading, setIsGeolocationLoading] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onLocationSelect(searchQuery.trim());
      setSearchQuery('');
    }
  };

  const handleGeolocation = () => {
    setIsGeolocationLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, you would reverse geocode these coordinates
          const mockLocation = `${position.coords.latitude.toFixed(2)}, ${position.coords.longitude.toFixed(2)}`;
          onLocationSelect(`Current Location (${mockLocation})`);
          setIsGeolocationLoading(false);
        },
        (error) => {
          console.error('Geolocation error:', error);
          setIsGeolocationLoading(false);
        }
      );
    } else {
      setIsGeolocationLoading(false);
    }
  };

  return (
    <div className="bg-slate-800/40 backdrop-blur-md rounded-2xl p-6 border border-slate-600/30">
      <div className="flex flex-col sm:flex-row gap-4">
        <form onSubmit={handleSearch} className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for a city or location..."
              className="w-full pl-10 pr-4 py-3 bg-slate-700/40 border border-slate-600/40 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200"
              disabled={loading}
            />
          </div>
        </form>

        <div className="flex gap-2">
          <button
            type="submit"
            onClick={handleSearch}
            disabled={loading || !searchQuery.trim()}
            className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-600 text-white rounded-xl font-medium transition-all duration-200 flex items-center space-x-2 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Search className="w-4 h-4" />
            )}
            <span>Search</span>
          </button>

          <button
            onClick={handleGeolocation}
            disabled={isGeolocationLoading || loading}
            className="px-4 py-3 bg-slate-700/40 hover:bg-slate-700/60 disabled:bg-slate-600 text-white rounded-xl font-medium transition-all duration-200 flex items-center space-x-2 disabled:cursor-not-allowed border border-slate-600/40"
          >
            {isGeolocationLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Navigation className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Popular locations */}
      <div className="mt-4">
        <div className="flex flex-wrap gap-2">
          {['New York, NY', 'Los Angeles, CA', 'Chicago, IL', 'Miami, FL', 'Seattle, WA'].map((city) => (
            <button
              key={city}
              onClick={() => onLocationSelect(city)}
              disabled={loading}
              className="px-3 py-1 bg-slate-700/30 hover:bg-slate-700/50 text-slate-300 text-sm rounded-lg transition-all duration-200 border border-slate-600/30 hover:border-slate-600/50 disabled:cursor-not-allowed"
            >
              {city}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocationSearch;