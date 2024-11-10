import React, { useState } from 'react';
import { Share2, Download, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';

const memes = [
  {
    image: "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?auto=format&fit=crop&q=80",
    caption: "When they say the oysters aren't fresh but you're too bougie to care 💅",
  },
  {
    image: "https://images.unsplash.com/photo-1599458252573-56ae36120de1?auto=format&fit=crop&q=80",
    caption: "Me after my 12th oyster: 'I can taste the f*cking ocean!' 🌊",
  },
  {
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80",
    caption: "First date tip: If they can't shuck, they can't f*ck 😘",
  },
];

export default function MemeOfTheDay() {
  const [currentMeme, setCurrentMeme] = useState(memes[Math.floor(Math.random() * memes.length)]);
  const [isAnimating, setIsAnimating] = useState(false);

  const getNewMeme = () => {
    setIsAnimating(true);
    const newMeme = memes[Math.floor(Math.random() * memes.length)];
    setCurrentMeme(newMeme);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'The World is Your F*cking Oyster',
          text: currentMeme.caption,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(`${currentMeme.caption} - ${window.location.href}`);
        toast.success('Meme link copied to clipboard!');
      }
    } catch (error) {
      toast.error('Failed to share meme');
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = currentMeme.image;
    link.download = 'oyster-meme.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Downloading meme!');
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 shadow-lg">
      <div className="space-y-4">
        <div className="relative rounded-lg overflow-hidden">
          <img
            src={currentMeme.image}
            alt="Meme of the day"
            className="w-full h-48 object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <p className="text-white text-sm">{currentMeme.caption}</p>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <button
            onClick={getNewMeme}
            className="flex items-center gap-2 text-pink-500 text-sm hover:text-pink-400 transition-colors"
          >
            <RefreshCw className={`h-4 w-4 ${isAnimating ? 'animate-spin' : ''}`} />
            New meme
          </button>
          
          <div className="flex gap-2">
            <button
              onClick={handleShare}
              className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors"
            >
              <Share2 className="h-4 w-4" />
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors"
            >
              <Download className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}