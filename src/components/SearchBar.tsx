import React, { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import toast from 'react-hot-toast';
import { googleMapsService } from '../utils/googleMapsLoader';
import { googlePlacesService, PlaceResult } from '../utils/googlePlacesService';

interface SearchBarProps {
  onSearch: (query: string, places: PlaceResult[]) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  useEffect(() => {
    const initAutocomplete = async () => {
      try {
        const google = await googleMapsService.load();
        if (searchInputRef.current) {
          autocompleteRef.current = new google.maps.places.Autocomplete(searchInputRef.current, {
            types: ['(cities)'],
            fields: ['geometry', 'formatted_address']
          });

          autocompleteRef.current.addListener('place_changed', handlePlaceSelected);
        }
      } catch (error) {
        console.error('Error initializing autocomplete:', error);
      }
    };

    initAutocomplete();
  }, []);

  const handlePlaceSelected = async () => {
    const place = autocompleteRef.current?.getPlace();
    if (place?.geometry?.location) {
      try {
        const places = await googlePlacesService.searchNearbyOysterBars(place.geometry.location);
        onSearch(place.formatted_address || searchValue, places);
      } catch (error) {
        console.error('Error fetching nearby places:', error);
        toast.error('Failed to find oyster bars nearby');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      try {
        const google = await googleMapsService.load();
        const geocoder = new google.maps.Geocoder();
        
        const result = await new Promise<google.maps.GeocoderResult>((resolve, reject) => {
          geocoder.geocode({ address: searchValue }, (results, status) => {
            if (status === 'OK' && results?.[0]) {
              resolve(results[0]);
            } else {
              reject(new Error('Location not found'));
            }
          });
        });

        const places = await googlePlacesService.searchNearbyOysterBars(result.geometry.location);
        onSearch(result.formatted_address, places);
      } catch (error) {
        console.error('Geocoding error:', error);
        toast.error('Location not found');
      }
    } else {
      toast.error('Please enter a location to search');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative max-w-2xl mx-auto">
      <input
        ref={searchInputRef}
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Where the shell are you?"
        className="w-full px-6 py-4 pr-12 text-lg rounded-full bg-white/90 
                 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 
                 focus:ring-pink-500 shadow-lg"
      />
      <button
        type="submit"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-pink-500 transition-colors"
      >
        <Search className="h-6 w-6" />
      </button>
    </form>
  );
};

export default SearchBar;