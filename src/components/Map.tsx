import React from 'react';
import { MapPin } from 'lucide-react';

interface MapProps {
  searchQuery: string;
  onPlaceSelected?: (place: any) => void;
}

const Map: React.FC<MapProps> = ({ searchQuery }) => {
  return (
    <div className="w-full h-[400px] rounded-lg bg-gradient-to-br from-gray-900 to-black border border-white/10">
      <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center">
        <div className="bg-white/10 backdrop-blur-sm rounded-full p-4 mb-6">
          <MapPin className="h-8 w-8 text-pink-500" />
        </div>
        <h3 className="text-2xl font-bold mb-2">Exploring {searchQuery}</h3>
        <p className="text-gray-400 mb-6 max-w-md">
          We're finding the best oyster spots in your area. Use the search bar above to refine your location.
        </p>
      </div>
    </div>
  );
};

export default Map;