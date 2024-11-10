import React from 'react';
import { Star } from 'lucide-react';

interface FeaturedSpotProps {
  name: string;
  location: string;
  image: string;
  rating: number;
  reviews: number;
  description: string;
}

const FeaturedSpot: React.FC<FeaturedSpotProps> = ({
  name,
  location,
  image,
  rating,
  reviews,
  description
}) => {
  return (
    <div className="bg-black/30 rounded-lg overflow-hidden transform transition-all hover:scale-105">
      <img
        src={image}
        alt={name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h4 className="font-bold text-lg mb-1">{name}</h4>
        <p className="text-gray-400 text-sm mb-2">{location}</p>
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="ml-1 text-yellow-400">{rating}</span>
          </div>
          <span className="text-gray-400 text-sm">({reviews} reviews)</span>
        </div>
        <p className="text-sm text-gray-300">{description}</p>
      </div>
    </div>
  );
};

export default FeaturedSpot;