import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Shell, Award, Star, Trophy } from 'lucide-react';

export default function UserStats() {
  const { user } = useAuth();

  // Mock stats for demonstration
  const stats = {
    reviews: 42,
    topReviewer: "Pearl Pioneer",
    favoriteSpot: "Le Bernardin",
    streak: 7
  };

  if (!user) {
    return (
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 h-full flex items-center justify-center text-center">
        <div>
          <Shell className="h-8 w-8 text-pink-500 mx-auto mb-3" />
          <p className="text-gray-400">Log in to see your shucking stats!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 h-full">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-pink-500 rounded-full p-2">
          <Shell className="h-5 w-5 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-lg">{user.name || user.businessName}</h3>
          <p className="text-sm text-gray-400">{user.role === 'owner' ? 'Shell Master' : 'Pearl Hunter'}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-pink-500" />
            <span className="text-sm text-gray-400">Reviews</span>
          </div>
          <span className="font-bold">{stats.reviews}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="h-4 w-4 text-pink-500" />
            <span className="text-sm text-gray-400">Status</span>
          </div>
          <span className="font-bold">{stats.topReviewer}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="h-4 w-4 text-pink-500" />
            <span className="text-sm text-gray-400">Streak</span>
          </div>
          <span className="font-bold">{stats.streak} days</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-white/10">
        <p className="text-sm text-gray-400 italic">
          "{stats.streak} days of shucking? You're on a roll(mop)! 🦪"
        </p>
      </div>
    </div>
  );
}