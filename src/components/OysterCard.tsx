import React from 'react';
import { Shell, Share2, ThumbsUp } from 'lucide-react';
import ShareableReview from './ShareableReview';

interface OysterRating {
  pearls: number;
  slurpFactor: number;
  presentation: number;
}

interface OysterCardProps {
  name: string;
  location: string;
  image: string;
  rating: OysterRating;
  category: string;
  description: string;
}

export default function OysterCard({
  name,
  location,
  image,
  rating,
  category,
  description,
}: OysterCardProps) {
  const renderPearls = (count: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Shell
          key={i}
          className={`h-5 w-5 ${
            i < count ? 'text-pink-500' : 'text-gray-300'
          }`}
        />
      ));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover"
        />
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">{name}</h3>
              <p className="text-gray-400">{location}</p>
            </div>
            <span className="bg-pink-500 text-white px-3 py-1 rounded-full text-sm">
              {category}
            </span>
          </div>
          
          <p className="text-gray-300 mb-4">{description}</p>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Overall</span>
              <div className="flex gap-1">{renderPearls(rating.pearls)}</div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Slurp Factor</span>
              <div className="flex gap-1">{renderPearls(rating.slurpFactor)}</div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Presentation</span>
              <div className="flex gap-1">{renderPearls(rating.presentation)}</div>
            </div>
          </div>
          
          <div className="flex gap-4 mt-6">
            <button className="flex-1 flex items-center justify-center gap-2 bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-full transition-colors">
              <ThumbsUp className="h-4 w-4" />
              Rate
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white py-2 rounded-full transition-colors">
              <Share2 className="h-4 w-4" />
              Share
            </button>
          </div>
        </div>
      </div>

      <ShareableReview
        restaurantName={name}
        rating={rating.pearls}
        image={image}
      />
    </div>
  );
}