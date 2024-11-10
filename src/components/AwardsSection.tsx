import React from 'react';
import { Crown, Heart, Scale, Trophy } from 'lucide-react';
import FeaturedSpot from './FeaturedSpot';

export default function AwardsSection() {
  const awardWinners = {
    bougie: {
      name: "Le Bernardin",
      location: "New York, NY",
      image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&q=80",
      rating: 5,
      reviews: 1284,
      description: "Winner: Most Bougie 2024. Michelin-starred excellence with a legendary raw bar."
    },
    date: {
      name: "Maré Oyster Bar",
      location: "San Francisco, CA",
      image: "https://images.unsplash.com/photo-1553484771-047a44eee27f?auto=format&fit=crop&q=80",
      rating: 4.8,
      reviews: 856,
      description: "Winner: Best First Date Spot 2024. Intimate atmosphere with stunning bay views."
    },
    huge: {
      name: "Big Papa's Shuck Shack",
      location: "New Orleans, LA",
      image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&q=80",
      rating: 4.9,
      reviews: 1102,
      description: "Winner: F*cking Huge Oysters 2024. Home of the legendary 'Titan' Gulf oysters."
    }
  };

  return (
    <div className="py-20 bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block bg-black/50 backdrop-blur-sm rounded-full px-6 py-2 mb-4">
            <div className="flex items-center justify-center gap-2">
              <Trophy className="h-8 w-8 text-pink-500" />
              <h2 className="text-3xl md:text-4xl font-bold">Shell Yeah! Our Top Shucking Picks</h2>
            </div>
          </div>
          <p className="text-xl text-gray-400">These mother-shuckers know how to serve it up right!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-black/50 backdrop-blur-sm rounded-xl p-6 transform hover:scale-105 transition-transform duration-300">
            <Crown className="h-8 w-8 text-pink-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2 text-center">Most Bougie</h3>
            <p className="text-gray-400 mb-6 text-center">For when you're feeling fancy AF</p>
            <FeaturedSpot {...awardWinners.bougie} />
          </div>
          
          <div className="bg-black/50 backdrop-blur-sm rounded-xl p-6 transform hover:scale-105 transition-transform duration-300">
            <Heart className="h-8 w-8 text-pink-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2 text-center">Suits a First Date</h3>
            <p className="text-gray-400 mb-6 text-center">Impress your date, thank us later</p>
            <FeaturedSpot {...awardWinners.date} />
          </div>
          
          <div className="bg-black/50 backdrop-blur-sm rounded-xl p-6 transform hover:scale-105 transition-transform duration-300">
            <Scale className="h-8 w-8 text-pink-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2 text-center">F*cking Huge Oysters Only</h3>
            <p className="text-gray-400 mb-6 text-center">Size matters, no judgment</p>
            <FeaturedSpot {...awardWinners.huge} />
          </div>
        </div>
      </div>
    </div>
  );
}