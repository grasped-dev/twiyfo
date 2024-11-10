import React, { useState } from 'react';
import { Share2, Camera, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';

interface ShareableReviewProps {
  restaurantName: string;
  rating: number;
  image: string;
}

const reviewTemplates = [
  "Just found my f*cking oyster paradise at {restaurant}! 🦪✨",
  "Living my best life at {restaurant}! These oysters are the real f*cking deal! 🌊",
  "If you're not eating oysters at {restaurant}, what the shell are you doing? 🦪",
  "Dear diary, today I peaked at {restaurant}. The oysters were *chef's kiss* 👨‍🍳",
  "Found my pearl of wisdom: always get the oysters at {restaurant}! 💎"
];

export default function ShareableReview({ restaurantName, rating, image }: ShareableReviewProps) {
  const [selectedTemplate, setSelectedTemplate] = useState(0);
  const { user } = useAuth();

  const getMessage = () => {
    return reviewTemplates[selectedTemplate].replace('{restaurant}', restaurantName) +
           `\n\nRated ${rating}/5 pearls on TWiYFO`;
  };

  const cycleTemplate = () => {
    setSelectedTemplate((prev) => (prev + 1) % reviewTemplates.length);
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `My TWiYFO Review of ${restaurantName}`,
          text: getMessage(),
          url: window.location.href
        });
      } else {
        await navigator.clipboard.writeText(`${getMessage()}\n${window.location.href}`);
        toast.success('Review copied to clipboard!');
      }
    } catch (error) {
      toast.error('Failed to share review');
    }
  };

  if (!user) return null;

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <Camera className="h-5 w-5 text-pink-500" />
          Share Your Experience
        </h3>
        <button
          onClick={cycleTemplate}
          className="text-pink-500 hover:text-pink-400 transition-colors"
          title="Change message style"
        >
          <Sparkles className="h-5 w-5" />
        </button>
      </div>

      <div className="relative">
        <img
          src={image}
          alt={restaurantName}
          className="w-full h-48 object-cover rounded-lg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
          <p className="text-white text-lg font-bold">{getMessage()}</p>
        </div>
      </div>

      <button
        onClick={handleShare}
        className="w-full flex items-center justify-center gap-2 bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-lg transition-colors"
      >
        <Share2 className="h-5 w-5" />
        Share Review
      </button>
    </div>
  );
}