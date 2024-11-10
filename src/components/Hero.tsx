import React from 'react';
import { Shell } from 'lucide-react';
import SearchBar from './SearchBar';

interface HeroProps {
  onSearch: (query: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onSearch }) => {
  return (
    <div className="relative min-h-[70vh] flex items-center justify-center bg-gradient-to-b from-black to-gray-900 pt-20">
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-8">
          The World is Your F*cking Oyster
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 mb-12">
          Your taste buds deserve an upgrade.
          <br />
          Find the f*cking best oysters nearby.
        </p>
        <SearchBar onSearch={onSearch} />
      </div>
    </div>
  );
};

export default Hero;